"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { frameUrl, type FrameManifest } from "@/lib/frames";

type Options = {
  sequenceId: string;
  initialBatch?: number;
  lookahead?: number;
};

type Slot = {
  img: HTMLImageElement | null;
  status: "idle" | "loading" | "ready" | "error";
};

function scheduleIdle(cb: () => void, timeout = 800): number {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return (
      window as Window & {
        requestIdleCallback: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
      }
    ).requestIdleCallback(cb, { timeout });
  }
  return setTimeout(cb, 32) as unknown as number;
}

function cancelIdle(id: number) {
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    (
      window as Window & { cancelIdleCallback: (id: number) => void }
    ).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

export function useFrameSequence({
  sequenceId,
  initialBatch = 16,
  lookahead = 10,
}: Options) {
  const [manifest, setManifest] = useState<FrameManifest | null>(null);
  const [readyCount, setReadyCount] = useState(0);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const slotsRef = useRef<Slot[]>([]);
  const loadingRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function loadManifest() {
      try {
        const res = await fetch(`/assets/frames/${sequenceId}/manifest.json`, {
          cache: "force-cache",
        });
        if (!res.ok) throw new Error(`Manifest no encontrado: ${sequenceId}`);
        const data = (await res.json()) as FrameManifest;
        if (cancelled) return;

        slotsRef.current = Array.from({ length: data.totalFrames }, () => ({
          img: null,
          status: "idle" as const,
        }));
        setManifest(data);
        setReadyCount(0);
        setBootstrapped(false);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error cargando frames");
        }
      }
    }

    loadManifest();
    return () => {
      cancelled = true;
    };
  }, [sequenceId]);

  const loadFrame = useCallback(
    (index: number) => {
      if (!manifest) return;
      if (index < 1 || index > manifest.totalFrames) return;

      const slot = slotsRef.current[index - 1];
      if (!slot || slot.status === "ready" || slot.status === "loading") return;
      if (loadingRef.current.has(index)) return;

      loadingRef.current.add(index);
      slot.status = "loading";

      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(manifest.framePath, index, manifest.framePattern);

      const settle = (ok: boolean) => {
        loadingRef.current.delete(index);
        if (ok) {
          slot.img = img;
          slot.status = "ready";
          setReadyCount((c) => c + 1);
        } else {
          slot.status = "error";
        }
      };

      img.onload = () => settle(true);
      img.onerror = () => settle(false);
    },
    [manifest],
  );

  useEffect(() => {
    if (!manifest) return;

    const total = manifest.totalFrames;
    const first = Math.min(initialBatch, total);
    for (let i = 1; i <= first; i++) loadFrame(i);

    let idleId: number | null = null;
    let next = first + 1;

    const pump = () => {
      let loaded = 0;
      while (next <= total && loaded < 4) {
        loadFrame(next);
        next += 1;
        loaded += 1;
      }
      if (next <= total) {
        idleId = scheduleIdle(pump, 800);
      }
    };

    idleId = scheduleIdle(pump, 500);

    return () => {
      if (idleId != null) cancelIdle(idleId);
    };
  }, [manifest, initialBatch, loadFrame]);

  useEffect(() => {
    if (!manifest || bootstrapped) return;
    const need = Math.min(initialBatch, manifest.totalFrames);
    if (readyCount >= Math.max(1, Math.floor(need * 0.6))) {
      setBootstrapped(true);
    }
  }, [readyCount, manifest, initialBatch, bootstrapped]);

  const ensureAround = useCallback(
    (frameIndex: number) => {
      if (!manifest) return;
      const start = Math.max(1, frameIndex - lookahead);
      const end = Math.min(manifest.totalFrames, frameIndex + lookahead);
      for (let i = start; i <= end; i++) loadFrame(i);
    },
    [manifest, lookahead, loadFrame],
  );

  const getFrame = useCallback((frameIndex: number): HTMLImageElement | null => {
    const slot = slotsRef.current[frameIndex - 1];
    return slot?.status === "ready" ? slot.img : null;
  }, []);

  const getNearestFrame = useCallback(
    (frameIndex: number): HTMLImageElement | null => {
      if (!manifest) return null;
      const direct = getFrame(frameIndex);
      if (direct) return direct;

      for (let d = 1; d < 24; d++) {
        const before = getFrame(frameIndex - d);
        if (before) return before;
        const after = getFrame(frameIndex + d);
        if (after) return after;
      }
      return null;
    },
    [getFrame, manifest],
  );

  return {
    manifest,
    error,
    bootstrapped,
    readyCount,
    progress: manifest ? readyCount / manifest.totalFrames : 0,
    ensureAround,
    getFrame,
    getNearestFrame,
  };
}
