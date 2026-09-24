import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "public", "img");
const outputDir = path.join(process.cwd(), "public", "img-transparent");
await fs.mkdir(outputDir, { recursive: true });

const files = (await fs.readdir(sourceDir)).filter((name) => /\.png$/i.test(name));

for (const name of files) {
  const input = path.join(sourceDir, name);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const distanceFromWhite = (pixel) => {
    const offset = pixel * channels;
    const dr = 255 - data[offset];
    const dg = 255 - data[offset + 1];
    const db = 255 - data[offset + 2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };
  const enqueue = (pixel) => {
    if (visited[pixel] || distanceFromWhite(pixel) > 92) return;
    visited[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const pixel = queue[head++];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }

  for (let pixel = 0; pixel < visited.length; pixel += 1) {
    if (!visited[pixel]) continue;
    const distance = distanceFromWhite(pixel);
    data[pixel * channels + 3] = Math.max(0, Math.min(255, Math.round((distance / 92) * 255)));
  }

  const cleaned = await sharp(data, { raw: info })
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const cleanedMetadata = await sharp(cleaned).metadata();
  const targetWidth = Math.max(1200, (cleanedMetadata.width ?? width) * 4);
  const transparent = await sharp(cleaned)
    .resize({ width: targetWidth, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.7 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  await fs.writeFile(path.join(outputDir, name), transparent);
}

console.log(`Created ${files.length} transparent client logos in ${outputDir}`);
