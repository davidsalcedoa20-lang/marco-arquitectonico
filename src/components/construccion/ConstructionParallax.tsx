"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MAX_YAW = (6 * Math.PI) / 180;
const MAX_PITCH = (3.5 * Math.PI) / 180;
const CAM_PARALLAX = 0.32;
const LERP = 0.06;

type Props = {
  /** Resting camera world position */
  basePosition: [number, number, number];
  lookAt?: [number, number, number];
  children: React.ReactNode;
};

/**
 * Fixed camera + premium mouse parallax (≤6°).
 * No OrbitControls — scroll alone drives construction.
 */
export function ConstructionParallax({
  basePosition,
  lookAt = [0, 1.1, 0],
  children,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(...lookAt));
  const look = useRef(new THREE.Vector3(...lookAt));

  useFrame(() => {
    const mx = THREE.MathUtils.clamp(pointer.x, -1, 1);
    const my = THREE.MathUtils.clamp(pointer.y, -1, 1);

    if (group.current) {
      const ty = mx * MAX_YAW;
      const tx = -my * MAX_PITCH;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        ty,
        LERP,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        tx,
        LERP,
      );
    }

    const cx = basePosition[0] + mx * CAM_PARALLAX;
    const cy = basePosition[1] + my * CAM_PARALLAX * 0.45;
    const cz = basePosition[2];
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cx, LERP);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cy, LERP);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cz, LERP);
    look.current.lerp(target.current, LERP);
    camera.lookAt(look.current);
  });

  return <group ref={group}>{children}</group>;
}
