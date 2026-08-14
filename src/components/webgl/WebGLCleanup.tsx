"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Releases the WebGL context when the R3F Canvas unmounts (route change).
 * Prevents orphan contexts from surviving navigation → Context Lost on the next page.
 */
export function WebGLCleanup() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const canvas = gl.domElement;

    const onLost = (e: Event) => {
      e.preventDefault();
    };

    canvas.addEventListener("webglcontextlost", onLost, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", onLost, false);

      try {
        // Free the GPU context slot immediately for the next route's Canvas
        gl.forceContextLoss();
      } catch {
        /* ignore */
      }

      try {
        gl.dispose();
      } catch {
        /* ignore */
      }
    };
  }, [gl]);

  return null;
}
