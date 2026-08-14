#!/usr/bin/env node
/**
 * Extract optimized WebP frames from videos in /video
 * Usage:
 *   npm run generate:frames
 *   npm run generate:frames -- mantenimiento
 *   npm run generate:frames -- --fps 12 --width 1280 --quality 78
 */

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const VIDEO_DIR = join(ROOT, "video");
const FRAMES_ROOT = join(ROOT, "public", "assets", "frames");

const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".mkv", ".m4v"]);

function parseArgs(argv) {
  const opts = {
    videos: [],
    fps: 12,
    width: 1280,
    height: null,
    quality: 78,
    clear: true,
    slug: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--fps") opts.fps = Number(argv[++i]);
    else if (arg === "--width") opts.width = Number(argv[++i]);
    else if (arg === "--height") opts.height = Number(argv[++i]);
    else if (arg === "--quality") opts.quality = Number(argv[++i]);
    else if (arg === "--slug" || arg === "--as") opts.slug = argv[++i];
    else if (arg === "--no-clear") opts.clear = false;
    else if (!arg.startsWith("-")) opts.videos.push(arg.replace(/\.[^.]+$/, ""));
  }

  return opts;
}

function run(cmd, args, { allowFail = false } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0 || allowFail) resolvePromise({ stdout, stderr, code });
      else reject(new Error(stderr || `FFmpeg exited with code ${code}`));
    });
  });
}

async function probeVideo(input) {
  // FFmpeg prints stream info to stderr and exits non-zero without an output file
  const { stderr } = await run(ffmpegPath, ["-hide_banner", "-i", input], {
    allowFail: true,
  });
  const durationMatch = stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  const fpsMatch = stderr.match(/,\s*(\d+(?:\.\d+)?)\s*fps/);
  const sizeMatch = stderr.match(/,\s*(\d{2,5})x(\d{2,5})/);

  let duration = 0;
  if (durationMatch) {
    duration =
      Number(durationMatch[1]) * 3600 +
      Number(durationMatch[2]) * 60 +
      Number(durationMatch[3]);
  }

  return {
    duration,
    sourceFps: fpsMatch ? Number(fpsMatch[1]) : null,
    width: sizeMatch ? Number(sizeMatch[1]) : null,
    height: sizeMatch ? Number(sizeMatch[2]) : null,
  };
}

function listVideos(filterNames) {
  if (!existsSync(VIDEO_DIR)) {
    throw new Error(`No existe la carpeta de videos: ${VIDEO_DIR}`);
  }

  const files = readdirSync(VIDEO_DIR).filter((f) =>
    VIDEO_EXTS.has(extname(f).toLowerCase()),
  );

  if (!files.length) {
    throw new Error(`No hay videos en ${VIDEO_DIR}`);
  }

  if (!filterNames.length) return files;

  return filterNames.map((name) => {
    const match = files.find(
      (f) => basename(f, extname(f)).toLowerCase() === name.toLowerCase(),
    );
    if (!match) {
      throw new Error(`Video no encontrado: ${name} (en ${VIDEO_DIR})`);
    }
    return match;
  });
}

async function extractFrames(videoFile, opts) {
  const slug = opts.slug || basename(videoFile, extname(videoFile));
  const input = join(VIDEO_DIR, videoFile);
  const outDir = join(FRAMES_ROOT, slug);

  console.log(`\n▶ Procesando: ${videoFile}`);
  const info = await probeVideo(input);
  console.log(
    `  Duración: ${info.duration.toFixed(2)}s | Origen: ${info.width}x${info.height} @ ${info.sourceFps ?? "?"}fps`,
  );

  if (opts.clear && existsSync(outDir)) {
    rmSync(outDir, { recursive: true, force: true });
  }
  mkdirSync(outDir, { recursive: true });

  const pattern = join(outDir, "frame_%04d.webp");
  const scale =
    opts.height != null
      ? `scale=-1:${opts.height}:flags=lanczos`
      : `scale=${opts.width}:-1:flags=lanczos`;
  const vf = `fps=${opts.fps},${scale}`;

  console.log(
    `  Extrayendo WebP → public/assets/frames/${slug}/ (${opts.fps} fps, q=${opts.quality}, ${
      opts.height != null ? `h=${opts.height}` : `w=${opts.width}`
    })`,
  );

  await run(ffmpegPath, [
    "-y",
    "-i",
    input,
    "-vf",
    vf,
    "-c:v",
    "libwebp",
    "-quality",
    String(opts.quality),
    "-compression_level",
    "6",
    "-start_number",
    "1",
    pattern,
  ]);

  const frames = readdirSync(outDir)
    .filter((f) => /^frame_\d+\.webp$/i.test(f))
    .sort();

  if (!frames.length) {
    throw new Error(`No se generaron frames para ${slug}`);
  }

  // Probe first frame size via ffmpeg
  const firstFrame = join(outDir, frames[0]);
  const frameProbe = await probeVideo(firstFrame);

  const manifest = {
    id: slug,
    video: `video/${videoFile}`,
    totalFrames: frames.length,
    framePattern: "frame_%04d.webp",
    framePath: `/assets/frames/${slug}`,
    fps: opts.fps,
    quality: opts.quality,
    width: frameProbe.width ?? opts.width,
    height: frameProbe.height ?? null,
    duration: info.duration,
    generatedAt: new Date().toISOString(),
    files: frames,
  };

  writeFileSync(
    join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  const bytes = frames.reduce(
    (sum, f) => sum + statSync(join(outDir, f)).size,
    0,
  );

  console.log(
    `  ✓ ${frames.length} frames | ${(bytes / 1024 / 1024).toFixed(2)} MB | manifest.json`,
  );

  return manifest;
}

async function main() {
  if (!ffmpegPath || !existsSync(ffmpegPath)) {
    throw new Error(
      "ffmpeg-static no está disponible. Ejecuta: npm install -D ffmpeg-static",
    );
  }

  const opts = parseArgs(process.argv.slice(2));
  const videos = listVideos(opts.videos);

  console.log(`FFmpeg: ${ffmpegPath}`);
  console.log(`Videos a procesar: ${videos.join(", ")}`);

  const manifests = [];
  for (const video of videos) {
    manifests.push(await extractFrames(video, opts));
  }

  // Index of all available frame sequences (merge so other services stay registered)
  const indexPath = join(FRAMES_ROOT, "index.json");
  let existing = [];
  if (existsSync(indexPath)) {
    try {
      const prev = JSON.parse(readFileSync(indexPath, "utf8"));
      existing = Array.isArray(prev.sequences) ? prev.sequences : [];
    } catch {
      existing = [];
    }
  }

  const byId = new Map(existing.map((s) => [s.id, s]));
  for (const m of manifests) {
    byId.set(m.id, {
      id: m.id,
      totalFrames: m.totalFrames,
      framePath: m.framePath,
      width: m.width,
      height: m.height,
    });
  }

  writeFileSync(
    indexPath,
    JSON.stringify(
      {
        sequences: [...byId.values()],
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\nListo. Secuencias: ${manifests.map((m) => m.id).join(", ")}`);
}

main().catch((err) => {
  console.error("\n✗ Error generando frames:\n", err.message || err);
  process.exit(1);
});
