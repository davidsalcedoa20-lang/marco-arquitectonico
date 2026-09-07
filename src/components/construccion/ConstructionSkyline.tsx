"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Simplified Bogotá-context skyline — block buildings, trees, distant hills.
 * Intentionally low-detail for BIM presentation feel.
 */
export function ConstructionSkyline() {
  const buildings = useMemo(() => {
    const list: {
      x: number;
      z: number;
      w: number;
      h: number;
      d: number;
      tone: string;
    }[] = [];
    // Mix of dark towers with muted brick tones — ladrillo bogotano cue.
    const tones = [
      "#1a1a1c",
      "#222226",
      "#18181b",
      "#2a2a30",
      "#141416",
      "#4a3226",
      "#3a2a20",
    ];
    for (let i = 0; i < 28; i++) {
      const x = -22 + (i % 14) * 3.4 + (i > 13 ? 1.2 : 0);
      const z = -26 - (i > 13 ? 6 : 0) - (i % 3) * 1.5;
      list.push({
        x,
        z,
        w: 1.2 + (i % 4) * 0.55,
        h: 1.8 + (i % 7) * 1.35 + (i % 5 === 0 ? 4 : 0),
        d: 1.0 + (i % 3) * 0.4,
        tone: tones[i % tones.length],
      });
    }
    return list;
  }, []);

  const trees = useMemo(() => {
    const t: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < 18; i++) {
      t.push({
        x: -18 + i * 2.15 + (i % 2) * 0.4,
        z: -18 - (i % 4) * 0.8,
        h: 0.9 + (i % 3) * 0.35,
      });
    }
    return t;
  }, []);

  const mountainGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-40, 0);
    shape.lineTo(-28, 3.2);
    shape.lineTo(-18, 1.4);
    shape.lineTo(-8, 4.5);
    shape.lineTo(2, 2.1);
    shape.lineTo(12, 5.2);
    shape.lineTo(24, 2.4);
    shape.lineTo(40, 0);
    shape.lineTo(-40, 0);
    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  /** Solitary tall peak — breaks up the ridge line, closer & taller than the rolling hills. */
  const tallPeakGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-40, 0);
    shape.lineTo(-15, 2.4);
    shape.lineTo(-6.5, 6.2);
    shape.lineTo(-1, 9.8);
    shape.lineTo(3.5, 6.6);
    shape.lineTo(11, 3.6);
    shape.lineTo(24, 1.8);
    shape.lineTo(40, 0);
    shape.lineTo(-40, 0);
    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  return (
    <group>
      {/* Soft dusk sky wash via large back plane */}
      <mesh position={[0, 8, -48]}>
        <planeGeometry args={[90, 36]} />
        <meshBasicMaterial color="#12151c" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-12, 10, -47.5]}>
        <planeGeometry args={[28, 14]} />
        <meshBasicMaterial color="#2a2218" transparent opacity={0.35} />
      </mesh>

      {/* Mountains — cerros orientales de Bogotá */}
      <mesh
        geometry={mountainGeo}
        position={[0, 0.2, -42]}
        scale={[1.1, 1.15, 1]}
      >
        <meshStandardMaterial
          color="#232b38"
          roughness={1}
          metalness={0}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>
      <mesh
        geometry={mountainGeo}
        position={[8, 0.1, -38]}
        scale={[0.85, 0.7, 1]}
      >
        <meshStandardMaterial
          color="#2c3440"
          roughness={1}
          metalness={0}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* Solitary tall peak, closer and taller than the ridge */}
      <mesh
        geometry={tallPeakGeo}
        position={[2, 0.15, -34]}
        scale={[0.6, 1.05, 1]}
      >
        <meshStandardMaterial
          color="#333c4a"
          emissive="#5a3a1c"
          emissiveIntensity={0.06}
          roughness={0.95}
          metalness={0}
          side={THREE.DoubleSide}
          fog={false}
        />
      </mesh>

      {/* Block buildings */}
      {buildings.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, b.h / 2, b.z]}
          castShadow
        >
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={b.tone}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Window accents (sparse orange glow — brand cue at distance) */}
      {buildings
        .filter((_, i) => i % 5 === 0)
        .map((b, i) => (
          <mesh key={`w-${i}`} position={[b.x, b.h * 0.55, b.z + b.d / 2 + 0.02]}>
            <planeGeometry args={[b.w * 0.55, b.h * 0.35]} />
            <meshBasicMaterial
              color="#f57c00"
              transparent
              opacity={0.08}
            />
          </mesh>
        ))}

      {/* Simple trees */}
      {trees.map((t, i) => (
        <group key={`tree-${i}`} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.h * 0.35, 0]}>
            <cylinderGeometry args={[0.06, 0.08, t.h * 0.7, 5]} />
            <meshStandardMaterial color="#2a2218" roughness={1} />
          </mesh>
          <mesh position={[0, t.h * 0.85, 0]}>
            <coneGeometry args={[0.45, t.h * 0.9, 6]} />
            <meshStandardMaterial color="#1a2420" roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}
