Drop raw footage in a subfolder here, e.g. `videos/launch-promo/take1.mp4`,
then start a session and say something like *"edit these into a launch video."*

Everything the pipeline produces (transcripts, cut decisions, rendered
animations, the final export) lands in `videos/<project>/edit/` — nothing
here gets committed to git (see `.gitignore`), so treat this as scratch
space and pull finished exports out with the file-send tool when you want
to keep them.
