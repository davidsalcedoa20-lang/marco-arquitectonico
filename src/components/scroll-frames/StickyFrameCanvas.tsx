"use client";

import { useEffect, useRef, useState } from "react";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { frameUrl } from "@/lib/frames";

type Props = {
  sequenceId: string;
  /** 0–1 frame scrub. Values ≥ 1 hold the last frame. */
  progress: number;
  buildingScale?: number;
  className?: string;
  variant?: "editorial" | "cinematic";
};

function supportsCanvas() {
  if (typeof document === "undefined") return true;
  try {
    return Boolean(document.createElement("canvas").getContext("2d"));
  } catch {
    return false;
  }
}

/**
 * Sticky frame stage — scroll progress drives WebP frames.
 * Holds the last frame when progress ≥ 1. Never unmounts mid-section.
 * Never clears the canvas without a valid image ready.
 */
export function StickyFrameCanvas({
  sequenceId,
  progress,
  buildingScale = 0.8,
  className = "",
  variant = "editorial",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef(1);
  const rafRef = useRef(0);
  const needsDraw = useRef(true);
  const lastImageRef = useRef<HTMLImageElement | null>(null);
  const [displayFrame, setDisplayFrame] = useState(1);
  const [canvasOk] = useState(() => supportsCanvas());
  const cinematic = variant === "cinematic";

  const {
    manifest,
    error,
    bootstrapped,
    progress: loadProgress,
    ensureAround,
    getNearestFrame,
  } = useFrameSequence({ sequenceId });

  const frameProgress = Math.min(1, Math.max(0, progress));

  useEffect(() => {
    if (!manifest) return;
    const total = manifest.totalFrames;
    const idx =
      frameProgress >= 1
        ? total
        : Math.round(frameProgress * (total - 1)) + 1;
    const clamped = Math.min(total, Math.max(1, idx));
    if (clamped !== frameIndexRef.current) {
      frameIndexRef.current = clamped;
      setDisplayFrame(clamped);
      ensureAround(clamped);
      needsDraw.current = true;
    } else if (frameProgress >= 1) {
      frameIndexRef.current = total;
      ensureAround(total);
      needsDraw.current = true;
    }
  }, [frameProgress, manifest, ensureAround]);

  useEffect(() => {
    if (!canvasOk || !manifest || !bootstrapped) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const drawContain = (img: HTMLImageElement) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw < 1 || ch < 1) return;

      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      dw *= buildingScale;
      dh *= buildingScale;

      const xBias = cinematic ? cw * 0.03 : 0;
      const dx = (cw - dw) / 2 + xBias;
      const dy = (ch - dh) / 2 + (cinematic ? ch * 0.035 : 0);

      ctx.fillStyle = "#090909";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastImageRef.current = img;
    };

    const tryDraw = () => {
      const next = getNearestFrame(frameIndexRef.current);
      if (next) {
        drawContain(next);
        needsDraw.current = false;
        return;
      }
      if (lastImageRef.current) {
        drawContain(lastImageRef.current);
        needsDraw.current = false;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 1 || h < 1) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsDraw.current = true;
      tryDraw();
    };

    const loop = () => {
      if (needsDraw.current) tryDraw();
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [
    canvasOk,
    manifest,
    bootstrapped,
    getNearestFrame,
    buildingScale,
    cinematic,
  ]);

  const floatScale = cinematic ? 1 + frameProgress * 0.015 : 1;
  const floatY = cinematic ? 36 + frameProgress * -14 : 0;
  const floatX = cinematic ? 4 + frameProgress * 10 : 0;

  const fallbackSrc = manifest
    ? frameUrl(
        manifest.framePath,
        canvasOk ? displayFrame : manifest.totalFrames,
        manifest.framePattern,
      )
    : "";

  return (
    <div
      className={`relative h-full w-full ${
        cinematic ? "overflow-visible bg-transparent" : "overflow-hidden bg-ma-black"
      } ${className}`}
    >
      {cinematic && (
        <div
          className="pointer-events-none absolute -inset-[12%] z-0 opacity-50 blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 58% 48%, rgba(245,124,0,0.11) 0%, rgba(160,80,20,0.04) 40%, transparent 68%)",
            transform: `translate3d(${floatX * 0.25}px, ${floatY * 0.35}px, 0)`,
          }}
          aria-hidden
        />
      )}

      <div
        className={
          cinematic
            ? "frame-video-mask absolute -top-[5%] -right-[8%] -bottom-[6%] left-[-3%] md:left-[-5%]"
            : "absolute inset-[5%] md:inset-[5%]"
        }
        style={
          cinematic
            ? {
                transform: `translate3d(${floatX}px, ${floatY}px, 0) scale(${floatScale})`,
                transformOrigin: "55% 42%",
                transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
              }
            : undefined
        }
      >
        {canvasOk ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-label={`${sequenceId} frame sequence`}
          />
        ) : (
          fallbackSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fallbackSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
            />
          )
        )}
      </div>

      {!cinematic && (
        <>
          <div className="pointer-events-none absolute inset-0 z-[1]">
            <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-ma-black via-ma-black/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-ma-black via-ma-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-ma-black via-ma-black/75 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-ma-black/80 to-transparent" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 55% 45%, transparent 35%, rgba(9,9,9,0.25) 70%, rgba(9,9,9,0.55) 100%)",
            }}
          />
        </>
      )}

      {cinematic && (
        <div
          className="frame-edge-fade pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
        />
      )}

      {!bootstrapped && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center">
          <div className="h-px w-28 overflow-hidden bg-white/10">
            <div
              className="h-full bg-ma-orange transition-[width] duration-500"
              style={{
                width: `${Math.round(loadProgress * 100)}%`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="absolute bottom-6 left-6 z-[3] font-mono text-[9px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
