---
name: analyze-video
description: Analyzes a video file by extracting frames and reading them visually. Use when the user wants to replicate motion graphics, animations, or video content in code. Invoke with /analyze-video <path-to-video>.
argument-hint: <path-to-video> [fps]
allowed-tools: Bash, Read, Glob
---

The user wants to analyze a video file: `$ARGUMENTS`

Parse the arguments:
- First argument = video file path (required)
- Second argument = frames per second to extract (optional, default: 1)

## Step 1 — Extract frames

Run the extraction script:

```
node .claude/skills/analyze-video/extract-frames.js <video-path> <fps>
```

Use `fps=2` if the user wants more detail, or `fps=0.5` for long videos. Default to `fps=1`.

The script will print the output directory and the list of extracted frame paths.

## Step 2 — Read and analyze every frame

Use the Read tool to open **each frame image** returned by the script. Read them all — do not skip any.

For each frame, note:
- What elements are visible (text, shapes, images, backgrounds)
- Colors (exact hex if possible, or descriptive names)
- Layout and positioning
- Any visible animation state (entrance, hold, exit)

## Step 3 — Reconstruct the motion graphic

After reading all frames, describe the full animation sequence:

1. **Elements**: List every visual element (text blocks, shapes, icons, backgrounds)
2. **Timeline**: Frame-by-frame breakdown of what enters, moves, fades, or exits
3. **Easing / feel**: Is it snappy, smooth, bouncy, slow-fade?
4. **Colors & typography**: Exact colors, font weight/style if visible

Then, implement the animation in the website using CSS keyframes and/or JavaScript (GSAP / Framer Motion / vanilla JS) — whichever fits the existing codebase.

If the video has audio or is too long for full frame extraction, note that and extract only key sections.
