import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const IMAGE_EXT = /\.(png|jpe?g|webp|svg)$/i;

/**
 * Reads `public/img/` at build/request time and returns public URLs sorted by filename.
 */
export function getClientLogos(): string[] {
  const dir = join(process.cwd(), "public", "img");
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/img/${name}`);
}
