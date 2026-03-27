#!/usr/bin/env node
/**
 * extract-frames.cjs
 * Extracts frames from a video file using ffmpeg-static.
 * Usage: node extract-frames.cjs <video-path> [fps] [output-dir]
 *   fps defaults to 1 (one frame per second)
 *   output-dir defaults to /tmp/video-frames
 */

const { execSync, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const videoPath = process.argv[2];
if (!videoPath) {
  console.error("Usage: node extract-frames.js <video-path> [fps] [output-dir]");
  process.exit(1);
}

const fps = process.argv[3] || "1";
const outputDir = process.argv[4] || path.join(os.tmpdir(), "video-frames");

// Ensure ffmpeg-static is installed
const projectRoot = path.resolve(__dirname, "../../../..");
const ffmpegStaticPath = path.join(projectRoot, "node_modules", "ffmpeg-static");
if (!fs.existsSync(ffmpegStaticPath)) {
  console.log("Installing ffmpeg-static (one-time setup)...");
  execSync("npm install ffmpeg-static --save-dev", { cwd: projectRoot, stdio: "inherit" });
}

const ffmpegBin = require(path.join(projectRoot, "node_modules", "ffmpeg-static"));

// Clean and create output dir
if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

// Get video duration first
const probeResult = spawnSync(ffmpegBin, [
  "-i", videoPath,
  "-hide_banner"
], { encoding: "utf8" });

const durationMatch = (probeResult.stderr || "").match(/Duration:\s*([\d:.]+)/);
const duration = durationMatch ? durationMatch[1] : "unknown";

console.log(`Video: ${videoPath}`);
console.log(`Duration: ${duration}`);
console.log(`Extracting frames at ${fps} fps to: ${outputDir}`);

// Extract frames
const result = spawnSync(ffmpegBin, [
  "-i", videoPath,
  "-vf", `fps=${fps}`,
  "-q:v", "2",
  path.join(outputDir, "frame_%04d.jpg")
], { encoding: "utf8" });

if (result.status !== 0 && result.status !== null) {
  console.error("ffmpeg error:", result.stderr);
  process.exit(1);
}

const frames = fs.readdirSync(outputDir).filter(f => f.endsWith(".jpg")).sort();
console.log(`\nExtracted ${frames.length} frames:`);
frames.forEach(f => console.log(path.join(outputDir, f)));
