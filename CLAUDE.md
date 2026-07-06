# Armina's video editing studio

This repo is a conversation-driven video editing pipeline. Drop raw footage
in, describe what you want, get an edited `final.mp4` with filler words cut
and motion graphics composited in — no timeline UI.

## How to use it

1. Put raw footage in `videos/<project-name>/` (one folder per project).
2. Start a session and say something like *"edit these into a launch video"*
   or *"inventory these takes and propose a strategy."*
3. Approve the plain-English edit plan before anything gets cut.
4. Find the result in `videos/<project-name>/edit/` — `final.mp4`, plus the
   transcript, EDL, per-cut previews, and animation sources it built along
   the way.

## What's actually doing the work

- **`pipeline/video-use/`** (vendored, symlinked at `.claude/skills/video-use`)
  is the orchestrator: transcribe → tag filler words/silence → propose an
  EDL → cut (lossless per-segment extract + concat, never a single-pass
  filtergraph) → color grade → burn subtitles → self-check the rendered
  output at every cut boundary. Read `pipeline/video-use/SKILL.md` for the
  full ruleset (hard rules on audio fades, word-boundary cuts, animation
  sync, etc.) — that file is the actual contract this pipeline follows, this
  doc is just the map.
- **Transcription** is ElevenLabs Scribe (word-level timestamps + speaker
  diarization + audio events). Needs `ELEVENLABS_API_KEY` — copy
  `.env.example` to `.env` at the repo root and fill it in (`.env` is
  gitignored, never commit it).
- **Motion graphics** are generated per animation slot by whichever engine
  fits: HyperFrames (browser-native HTML/CSS/GSAP — the default for
  UI-motion, kinetic type, data-viz, logo reveals), Remotion (React
  compositions), Manim (diagrams/equations), or PIL+ffmpeg (simple overlay
  cards). The HyperFrames skill catalog (`hyperframes`, `motion-graphics`,
  `hyperframes-animation`, etc.) is pulled fresh into `.claude/skills/` by
  the SessionStart hook every session — it's ~50MB and changes upstream
  often, so it's intentionally not committed to this repo.
- Multiple animations in one edit are built in **parallel sub-agents**
  (one per slot), never sequentially.

## Environment setup

`.claude/hooks/session-start.sh` runs automatically on Claude Code on the
web (gated on `$CLAUDE_CODE_REMOTE`, since this container resets between
sessions) and installs: `ffmpeg`/`ffprobe`, video-use's Python deps
(`uv sync` inside `pipeline/video-use`), and the HyperFrames skill catalog
(`npx skills add heygen-com/hyperframes --agent claude-code`).

Working locally instead? Follow `pipeline/video-use/install.md` directly —
it's written as a self-contained install script for an agent to run.

## Source projects

- https://github.com/browser-use/video-use — the editor skill vendored here
- https://github.com/heygen-com/hyperframes — the HTML-to-MP4 motion
  graphics engine video-use calls into per animation slot
