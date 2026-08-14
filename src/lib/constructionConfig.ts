/** Scroll progress → construction stage blend helpers */

export function stageWeight(
  progress: number,
  start: number,
  end: number,
): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/** BIM build timeline (scroll 0→1) */
export const BIM_STAGES = {
  excavation: [0.0, 0.08] as const,
  footings: [0.06, 0.2] as const,
  foundation: [0.16, 0.32] as const,
  columns: [0.28, 0.42] as const,
  beams: [0.38, 0.52] as const,
  slabs: [0.48, 0.62] as const,
  walls: [0.58, 0.74] as const,
  stairs: [0.7, 0.82] as const,
  roof: [0.78, 0.9] as const,
  complete: [0.86, 1.0] as const,
} as const;

export const BUILD_W = 5.4;
export const BUILD_D = 4.2;
export const FLOORS = 5;
export const FLOOR_H = 1.2;

export const COL_X = [-1.9, -0.65, 0.65, 1.9] as const;
export const COL_Z = [-1.5, 0, 1.5] as const;

export const PIT_W = 8.2;
export const PIT_D = 6.4;
export const PIT_DEPTH = 1.35;

/** Soft reveal: opacity + lift + scale */
export function revealFactors(t: number) {
  const w = Math.max(0, Math.min(1, t));
  return {
    opacity: w,
    y: (1 - w) * 0.28,
    scale: 0.9 + 0.1 * w,
    visible: w > 0.02,
  };
}
