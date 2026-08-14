export type NarrativeRange = [number, number];

export type NarrativeStyle = {
  opacity: number;
  y: number;
  blur: number;
  active: boolean;
};

/** Smoothstep 0–1 */
export function smoothstep(t: number, a: number, b: number) {
  if (b <= a) return t >= b ? 1 : 0;
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

/**
 * Continuous document-like blending between narrative blocks.
 * Adjacent blocks overlap — previous fades while next rises.
 */
export function getNarrativeStyle(
  progress: number,
  range: NarrativeRange,
  overlap = 0.1,
): NarrativeStyle {
  const [start, end] = range;
  const mid = (start + end) / 2;

  // Soft windows that intentionally overlap neighbors
  const inStart = Math.max(0, start - overlap * 0.35);
  const inPeak = start + (end - start) * 0.18;
  const outPeak = end - (end - start) * 0.18;
  const outEnd = Math.min(1, end + overlap * 0.35);

  let opacity = 0;
  if (progress < inStart || progress > outEnd) {
    opacity = 0;
  } else if (progress < inPeak) {
    opacity = smoothstep(progress, inStart, inPeak);
  } else if (progress <= outPeak) {
    opacity = 1;
  } else {
    opacity = 1 - smoothstep(progress, outPeak, outEnd);
  }

  // Soft vertical drift & blur as blocks leave / enter focus
  const dist = Math.abs(progress - mid) / Math.max(0.001, (end - start) * 0.75);
  const y = (progress < mid ? 18 : -14) * Math.min(1, dist);
  const blur = Math.min(6, dist * 5.5) * (opacity > 0.05 ? 1 : 0);

  return {
    opacity,
    y,
    blur,
    active: opacity > 0.45,
  };
}
