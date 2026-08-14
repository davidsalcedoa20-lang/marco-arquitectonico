export type FrameManifest = {
  id: string;
  video: string;
  totalFrames: number;
  framePattern: string;
  framePath: string;
  fps: number;
  quality: number;
  width: number;
  height: number | null;
  duration: number;
  generatedAt: string;
  files: string[];
};

export function frameUrl(
  framePath: string,
  index: number,
  pattern = "frame_%04d.webp",
): string {
  // Convert printf-style %04d → zero-padded index (1-based)
  const match = pattern.match(/%0(\d+)d/);
  const pad = match ? Number(match[1]) : 4;
  const name = pattern.replace(/%0\d+d/, String(index).padStart(pad, "0"));
  return `${framePath}/${name}`;
}
