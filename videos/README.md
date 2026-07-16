Drop raw footage in a subfolder here, e.g. `videos/launch-promo/take1.mp4`,
then start a session and say something like *"edit these into a launch video."*

Everything the pipeline produces (transcripts, cut decisions, rendered
animations, the final export) lands in `videos/<project>/edit/` — nothing
here gets committed to git (see `.gitignore`), so treat this as scratch
space and pull finished exports out with the file-send tool when you want
to keep them.

## Footage over ~30MB

Chat uploads are capped around 30MB, so raw footage bigger than that can't
come in as an attachment. Instead, host the file somewhere with a direct
download link (Google Drive/Dropbox/S3 share link, unlisted YouTube, etc.)
and hand over the URL — the pipeline pulls it with `yt-dlp`/`curl` into
`videos/<project>/edit/downloads/`, with no size limit. `yt-dlp` installs
on first use if it isn't already on the machine.
