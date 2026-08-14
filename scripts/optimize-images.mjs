#!/usr/bin/env node
/**
 * Convert raster images under public/ to WebP (in place sibling files).
 * Skips: logo.png, already-.webp, frames (already webp).
 * Usage: node scripts/optimize-images.mjs
 */
import { spawn } from "node:child_process";
import {
  existsSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { extname, join, relative, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const SKIP_NAMES = new Set(["logo.png"]);
const SKIP_DIRS = new Set(["frames"]); // already webp sequences
const EXTS = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(p, out);
    } else if (EXTS.has(extname(name).toLowerCase())) {
      if (SKIP_NAMES.has(name.toLowerCase())) continue;
      out.push(p);
    }
  }
  return out;
}

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err || `exit ${code}`));
    });
  });
}

async function convert(input) {
  const out = input.replace(/\.(png|jpe?g)$/i, ".webp");
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(input).mtimeMs) {
    return { input, out, skipped: true, before: statSync(input).size, after: statSync(out).size };
  }
  await run([
    "-y",
    "-i",
    input,
    "-c:v",
    "libwebp",
    "-quality",
    "82",
    "-compression_level",
    "6",
    out,
  ]);
  return {
    input,
    out,
    skipped: false,
    before: statSync(input).size,
    after: statSync(out).size,
  };
}

async function main() {
  if (!ffmpegPath || !existsSync(ffmpegPath)) {
    throw new Error("ffmpeg-static missing");
  }
  const files = walk(PUBLIC);
  console.log(`Converting ${files.length} images…`);
  const results = [];
  for (const f of files) {
    try {
      const r = await convert(f);
      results.push(r);
      const rel = relative(PUBLIC, f);
      console.log(
        `  ${r.skipped ? "·" : "✓"} ${rel} → ${(r.after / 1024).toFixed(0)} KB (was ${(r.before / 1024).toFixed(0)} KB)`,
      );
    } catch (e) {
      console.error(`  ✗ ${relative(PUBLIC, f)}: ${e.message}`);
    }
  }
  writeFileSync(
    join(ROOT, "scripts", ".optimize-images-report.json"),
    JSON.stringify(results, null, 2),
  );
  const saved = results.reduce((s, r) => s + (r.before - r.after), 0);
  console.log(`\nDone. Est. savings if PNG removed: ${(saved / 1024 / 1024).toFixed(1)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
