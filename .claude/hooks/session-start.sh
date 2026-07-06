#!/bin/bash
set -euo pipefail

# This studio's tools (ffmpeg, video-use's Python deps, HyperFrames skills)
# live outside git because the container resets between sessions. Only run
# this on Claude Code on the web, where that reset actually happens.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# 1. ffmpeg + ffprobe — hard requirement for every video-use helper.
if ! command -v ffmpeg >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y -qq ffmpeg
fi

# 2. video-use's Python deps (requests, librosa, matplotlib, pillow, numpy).
cd "$CLAUDE_PROJECT_DIR/pipeline/video-use"
if command -v uv >/dev/null 2>&1; then
  uv sync
else
  pip install -e . -q
fi

# 3. HyperFrames motion-graphics skill catalog (~50MB+, changes upstream
# often) — fetched fresh into .claude/skills instead of committed to git.
cd "$CLAUDE_PROJECT_DIR"
npx --yes skills add heygen-com/hyperframes --agent claude-code --yes
