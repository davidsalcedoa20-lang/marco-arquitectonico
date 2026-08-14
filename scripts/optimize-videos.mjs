#!/usr/bin/env node
/**
 * Re-encode source MP4s in /video with H.264 (CRF 23), same resolution/duration.
 * Writes *-opt.mp4 then replaces original if smaller.
 */
import { spawn } from "node:child_process";
import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const VIDEO_DIR = join(ROOT, "video");

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.slice(-800) || `exit ${code}`));
    });
  });
}

async function optimize(file) {
  const input = join(VIDEO_DIR, file);
  const tmp = join(VIDEO_DIR, `${basename(file, extname(file))}.tmp.mp4`);
  const before = statSync(input).size;
  await run([
    "-y",
    "-i",
    input,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    tmp,
  ]);
  const after = statSync(tmp).size;
  if (after < before) {
    unlinkSync(input);
    renameSync(tmp, input);
  } else {
    unlinkSync(tmp);
  }
  return { file, before, after: Math.min(before, after), replaced: after < before };
}

async function main() {
  const files = readdirSync(VIDEO_DIR).filter((f) => extname(f).toLowerCase() === ".mp4");
  console.log(`Optimizing ${files.length} videos…`);
  for (const f of files) {
    try {
      const r = await optimize(f);
      console.log(
        `  ${r.replaced ? "✓" : "·"} ${f}: ${(r.before / 1024 / 1024).toFixed(2)} → ${(r.after / 1024 / 1024).toFixed(2)} MB`,
      );
    } catch (e) {
      console.error(`  ✗ ${f}: ${e.message}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
