#!/usr/bin/env node
/**
 * filler-cut.mjs — Remove filler words from a video using word-level timestamps.
 *
 * Usage:
 *   node scripts/filler-cut.mjs <input.mp4> [options]
 *
 * Options:
 *   --transcript <path>      Use existing transcript JSON instead of re-transcribing
 *   --transcribe-only        Only transcribe; do not cut the video
 *   --fillers "um,uh,hmm"    Override default filler word list (comma-separated)
 *   --pad 0.05               Silence padding to keep around each kept word (seconds)
 *   --output <path>          Output path (default: <input>-edited.mp4)
 *   --model small.en         Whisper model for transcription (default: small.en)
 *
 * Outputs:
 *   assets/<name>-edited.mp4              — filler-free video
 *   assets/<name>-edited.transcript.json  — transcript with timestamps remapped to edited time
 *   assets/<name>-edited.cutlog.json      — list of every removed segment for review
 *
 * Requires: Node 20+, FFmpeg in PATH, OPENAI_API_KEY in .env (for transcription)
 */

import { readFile, writeFile, access } from "node:fs/promises";
import { execSync, spawnSync } from "node:child_process";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");

const DEFAULT_FILLERS = new Set([
  "um", "uh", "umm", "uhh", "hmm", "hm",
  "like", "basically", "literally", "honestly", "actually",
  "right", "okay", "ok", "so", "you know", "i mean",
]);

const PAD = 0.04; // seconds of silence to keep around each retained word

// ─── CLI parsing ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help") {
  console.log("Usage: node scripts/filler-cut.mjs <input.mp4> [--transcript path] [--transcribe-only] [--fillers um,uh] [--output path]");
  process.exit(0);
}

const inputPath = resolve(args[0]);
let transcriptPath = null;
let transcribeOnly = false;
let fillerOverride = null;
let outputPath = null;
let whisperModel = "small.en";

for (let i = 1; i < args.length; i++) {
  if (args[i] === "--transcript") transcriptPath = resolve(args[++i]);
  else if (args[i] === "--transcribe-only") transcribeOnly = true;
  else if (args[i] === "--fillers") fillerOverride = args[++i];
  else if (args[i] === "--output") outputPath = resolve(args[++i]);
  else if (args[i] === "--model") whisperModel = args[++i];
}

const fillers = fillerOverride
  ? new Set(fillerOverride.split(",").map((w) => w.trim().toLowerCase()))
  : DEFAULT_FILLERS;

const stem = basename(inputPath, extname(inputPath));
const projectAssets = resolve(dirname(inputPath));
if (!outputPath) outputPath = resolve(projectAssets, `${stem}-edited.mp4`);
const editedTranscriptPath = resolve(projectAssets, `${stem}-edited.transcript.json`);
const cutlogPath = resolve(projectAssets, `${stem}-edited.cutlog.json`);
if (!transcriptPath) transcriptPath = resolve(projectAssets, `${stem}.transcript.json`);

// ─── Helpers ────────────────────────────────────────────────────────────────

async function loadEnv() {
  try {
    const text = await readFile(resolve(WORKSPACE_ROOT, ".env"), "utf8");
    const env = {};
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      env[m[1]] = v;
    }
    return env;
  } catch {
    return {};
  }
}

function ffprobeDuration(path) {
  const r = spawnSync("ffprobe", ["-v", "quiet", "-print_format", "json", "-show_format", path], { encoding: "utf8" });
  return JSON.parse(r.stdout).format.duration * 1;
}

async function transcribe(videoPath, model) {
  const env = await loadEnv();
  const apiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Fall back to local Hyperframes transcription
    console.log("No OPENAI_API_KEY — using npx hyperframes transcribe (local Whisper)...");
    execSync(`npx hyperframes transcribe "${videoPath}" --model ${model} --json`, { stdio: "inherit" });
    // hyperframes outputs <stem>.json in the same directory
    const hfOut = resolve(dirname(videoPath), `${basename(videoPath, extname(videoPath))}.json`);
    return JSON.parse(await readFile(hfOut, "utf8"));
  }

  console.log("Transcribing via OpenAI Whisper API...");
  const bytes = await readFile(videoPath);
  const ext = extname(videoPath).slice(1) || "mp4";
  const form = new FormData();
  form.append("file", new Blob([bytes], { type: `video/${ext}` }), basename(videoPath));
  form.append("model", "whisper-1");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "word");
  form.append("timestamp_granularities[]", "segment");
  form.append("language", "en");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!res.ok) throw new Error(`Whisper API ${res.status}: ${await res.text()}`);
  const data = await res.json();

  // Reshape into { text, segments: [{ start, end, text, words: [{word,start,end}] }] }
  const segs = (data.segments || []).map((s) => ({
    start: +s.start.toFixed(3),
    end: +s.end.toFixed(3),
    text: s.text,
    words: [],
  }));
  let segIdx = 0;
  for (const w of data.words || []) {
    const word = { word: w.word.startsWith(" ") ? w.word : ` ${w.word}`, start: +w.start.toFixed(3), end: +w.end.toFixed(3) };
    const mid = (word.start + word.end) / 2;
    while (segIdx < segs.length - 1 && mid > segs[segIdx].end) segIdx++;
    segs[segIdx].words.push(word);
  }
  return { text: data.text, segments: segs };
}

// ─── Core: build keep-intervals from transcript ──────────────────────────────

function buildKeepIntervals(transcript, totalDuration) {
  const allWords = transcript.segments.flatMap((s) => s.words);
  const cutlog = [];
  const keepIntervals = []; // [{start, end}] in original time

  let i = 0;
  while (i < allWords.length) {
    const w = allWords[i];
    const clean = w.word.trim().toLowerCase().replace(/[^a-z' ]/g, "");

    if (fillers.has(clean)) {
      cutlog.push({ word: w.word.trim(), start: w.start, end: w.end });
      i++;
      continue;
    }

    // Find the run of kept words that can be merged into one interval
    const intervalStart = Math.max(0, w.start - PAD);
    let intervalEnd = w.end + PAD;
    i++;
    while (i < allWords.length) {
      const next = allWords[i];
      const nextClean = next.word.trim().toLowerCase().replace(/[^a-z' ]/g, "");
      if (!fillers.has(nextClean)) {
        intervalEnd = next.end + PAD;
        i++;
      } else {
        break;
      }
    }
    keepIntervals.push({ start: intervalStart, end: Math.min(intervalEnd, totalDuration) });
  }

  // Merge overlapping intervals
  const merged = [];
  for (const iv of keepIntervals) {
    if (merged.length && iv.start <= merged[merged.length - 1].end) {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, iv.end);
    } else {
      merged.push({ ...iv });
    }
  }

  return { keepIntervals: merged, cutlog };
}

// Remap original timestamps to edited time based on keep intervals
function remapTranscript(transcript, keepIntervals) {
  const timeMap = (t) => {
    let offset = 0;
    for (const iv of keepIntervals) {
      if (t < iv.start) return null; // in a cut region
      if (t <= iv.end) return offset + (t - iv.start);
      offset += iv.end - iv.start;
    }
    return null;
  };

  const newSegs = [];
  for (const seg of transcript.segments) {
    const newWords = [];
    for (const w of seg.words) {
      const ns = timeMap(w.start);
      const ne = timeMap(w.end);
      if (ns !== null && ne !== null) {
        newWords.push({ word: w.word, start: +ns.toFixed(3), end: +ne.toFixed(3) });
      }
    }
    if (newWords.length) {
      newSegs.push({ start: newWords[0].start, end: newWords[newWords.length - 1].end, text: seg.text, words: newWords });
    }
  }
  return { text: transcript.text, segments: newSegs };
}

// Build FFmpeg select filter from keep intervals
function buildFFmpegSelectFilter(keepIntervals) {
  const parts = keepIntervals.map(
    (iv) => `between(t,${iv.start.toFixed(3)},${iv.end.toFixed(3)})`
  );
  return parts.join("+");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Transcribe if needed
  let transcript;
  try {
    await access(transcriptPath);
    console.log(`Using existing transcript: ${transcriptPath}`);
    transcript = JSON.parse(await readFile(transcriptPath, "utf8"));
  } catch {
    transcript = await transcribe(inputPath, whisperModel);
    await writeFile(transcriptPath, JSON.stringify(transcript, null, 2));
    console.log(`Transcript written → ${transcriptPath}`);
  }

  if (transcribeOnly) {
    console.log("\nTranscript preview:\n" + transcript.text.slice(0, 500));
    console.log(`\nTotal segments: ${transcript.segments.length}`);
    return;
  }

  // 2. Build cut list
  const totalDuration = ffprobeDuration(inputPath);
  const { keepIntervals, cutlog } = buildKeepIntervals(transcript, totalDuration);

  const removedCount = cutlog.length;
  const keptDuration = keepIntervals.reduce((s, iv) => s + iv.end - iv.start, 0);
  console.log(`\nFiller words removed: ${removedCount}`);
  console.log(`Original duration: ${totalDuration.toFixed(2)}s → Edited: ${keptDuration.toFixed(2)}s`);
  console.log(`Saved: ${(totalDuration - keptDuration).toFixed(2)}s`);

  if (cutlog.length) {
    console.log("\nRemoved segments:");
    cutlog.forEach((c) => console.log(`  [${c.start.toFixed(2)}s–${c.end.toFixed(2)}s] "${c.word}"`));
  }

  await writeFile(cutlogPath, JSON.stringify({ removed: cutlog, keepIntervals }, null, 2));
  console.log(`\nCut log → ${cutlogPath}`);
  console.log("Review cuts above before proceeding. Ctrl+C to abort, or wait 5s to continue...\n");
  await new Promise((r) => setTimeout(r, 5000));

  // 3. Cut video with FFmpeg
  const selectExpr = buildFFmpegSelectFilter(keepIntervals);
  const ffmpegCmd = [
    "ffmpeg", "-y",
    "-i", inputPath,
    "-vf", `select='${selectExpr}',setpts=N/FRAME_RATE/TB`,
    "-af", `aselect='${selectExpr}',asetpts=N/SR/TB`,
    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
    "-c:a", "aac", "-b:a", "192k",
    "-movflags", "+faststart",
    outputPath,
  ];

  console.log("Running FFmpeg to splice video...");
  const result = spawnSync(ffmpegCmd[0], ffmpegCmd.slice(1), { stdio: "inherit" });
  if (result.status !== 0) throw new Error("FFmpeg failed — check output above");
  console.log(`\nEdited video → ${outputPath}`);

  // 4. Remap transcript to edited time
  const editedTranscript = remapTranscript(transcript, keepIntervals);
  await writeFile(editedTranscriptPath, JSON.stringify(editedTranscript, null, 2));
  console.log(`Remapped transcript → ${editedTranscriptPath}`);

  console.log("\n✓ Done. Next: use the edited video + transcript to build your Hyperframes composition.");
  console.log("  See CLAUDE.md 'Raw Video → Edited MP4 Pipeline' for Step 4 (motion graphics).");
}

main().catch((err) => { console.error(err.message); process.exit(1); });
