"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, memo } from "react";
import { ConstructionBuilding } from "./ConstructionBuilding";
import { ConstructionLot } from "./ConstructionLot";
import { ConstructionSkyline } from "./ConstructionSkyline";
import { ConstructionParallax } from "./ConstructionParallax";
import { WebGLCleanup } from "@/components/webgl/WebGLCleanup";

type Props = {
  progressRef: React.MutableRefObject<number>;
  className?: string;
};

/**
 * Full code-generated BIM construction scene.
 * Fixed camera (~22° yaw, ~12° elevation), pulled back for lot context.
 * No photos. No OrbitControls. Scroll drives build; mouse = soft parallax.
 */
function StickyConstructionSceneInner({
  progressRef,
  className = "",
}: Props) {
  // ~22° horizontal, ~12° down, distance ≈19 (≈38% farther than prior ~13.5)
  const camPos: [number, number, number] = [7.15, 6.35, 17.8];

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#090909] ${className}`}
    >
      <Canvas
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop="always"
        camera={{
          position: camPos,
          fov: 28,
          near: 0.1,
          far: 120,
        }}
        onCreated={({ gl, camera, scene }) => {
          gl.setClearColor(0x090909, 1);
          camera.lookAt(0, 1.1, 0);
          scene.fog = null;
        }}
      >
        <WebGLCleanup />
        <color attach="background" args={["#090909"]} />
        <fog attach="fog" args={["#090909", 28, 72]} />

        {/* Bogotá-warm lighting stack */}
        <hemisphereLight
          args={["#c8d0dc", "#2a241c", 0.55]}
        />
        <ambientLight intensity={0.28} color="#e8e4dc" />
        <directionalLight
          castShadow
          position={[8, 16, 10]}
          intensity={1.15}
          color="#fff2e0"
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={60}
          shadow-camera-left={-18}
          shadow-camera-right={18}
          shadow-camera-top={18}
          shadow-camera-bottom={-18}
          shadow-bias={-0.0002}
        />
        <directionalLight
          position={[-6, 6, -4]}
          intensity={0.25}
          color="#a8b4c8"
        />
        <directionalLight
          position={[2, 4, 6]}
          intensity={0.15}
          color="#f57c00"
        />

        <ConstructionParallax basePosition={camPos} lookAt={[0, 1.15, 0]}>
          <Suspense fallback={null}>
            <ConstructionLot progress={progressRef} />
            <ConstructionSkyline />
            <ConstructionBuilding progress={progressRef} />
          </Suspense>
        </ConstructionParallax>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-y-0 left-0 w-[16%] bg-gradient-to-r from-ma-black via-ma-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-ma-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-ma-black/55 to-transparent" />
      </div>
    </div>
  );
}

export const StickyConstructionScene = memo(StickyConstructionSceneInner);
