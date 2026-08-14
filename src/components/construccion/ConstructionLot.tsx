"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PIT_D, PIT_DEPTH, PIT_W, stageWeight } from "@/lib/constructionConfig";

type Props = {
  progress: React.MutableRefObject<number>;
};

function hash(i: number) {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Procedural construction lot — excavation, soil, slopes, stones.
 * All code-generated; no textures from disk.
 */
export function ConstructionLot({ progress }: Props) {
  const pitRef = useRef<THREE.Group>(null);
  const stonesRef = useRef<THREE.InstancedMesh>(null);

  const groundGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(52, 52, 56, 56);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const n =
        Math.sin(x * 0.35) * Math.cos(z * 0.28) * 0.08 +
        Math.sin(x * 1.1 + z * 0.7) * 0.03;
      const inPit =
        Math.abs(x) < PIT_W / 2 + 0.8 && Math.abs(z) < PIT_D / 2 + 0.8;
      if (!inPit) {
        pos.setY(i, n * 0.45);
      } else {
        pos.setY(i, -0.02);
      }
      const shade = 0.14 + hash(i) * 0.07 + n * 0.15;
      colors[i * 3] = 0.18 + shade * 0.35;
      colors[i * 3 + 1] = 0.12 + shade * 0.22;
      colors[i * 3 + 2] = 0.08 + shade * 0.12;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    return () => {
      groundGeo.dispose();
    };
  }, [groundGeo]);

  const stoneData = useMemo(() => {
    const items: { x: number; y: number; z: number; s: number; r: number }[] =
      [];
    for (let i = 0; i < 48; i++) {
      let x = (hash(i) - 0.5) * 28;
      const z = (hash(i + 40) - 0.5) * 28;
      // Keep out of pit
      if (Math.abs(x) < PIT_W / 2 + 1.2 && Math.abs(z) < PIT_D / 2 + 1.2) {
        x += Math.sign(x || 1) * (PIT_W / 2 + 2);
      }
      items.push({
        x,
        y: 0.04 + hash(i + 3) * 0.06,
        z,
        s: 0.06 + hash(i + 7) * 0.14,
        r: hash(i + 11) * Math.PI,
      });
    }
    return items;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const mesh = stonesRef.current;
    if (mesh && !mesh.userData.placed) {
      stoneData.forEach((s, i) => {
        dummy.position.set(s.x, s.y, s.z);
        dummy.rotation.set(s.r * 0.4, s.r, s.r * 0.2);
        dummy.scale.setScalar(s.s);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.userData.placed = true;
    }

    const dig = stageWeight(progress.current, 0, 0.1);
    if (pitRef.current) {
      pitRef.current.scale.y = 0.15 + dig * 0.85;
      pitRef.current.position.y = -PIT_DEPTH * dig * 0.5;
    }
  });

  const wallH = PIT_DEPTH;
  const wallT = 0.35;

  return (
    <group>
      {/* Surrounding terrain */}
      <mesh geometry={groundGeo} receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial
          vertexColors
          roughness={0.95}
          metalness={0.02}
          flatShading
        />
      </mesh>

      {/* Excavation volume */}
      <group ref={pitRef} position={[0, -PIT_DEPTH / 2, 0]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, -wallH / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[PIT_W - 0.1, PIT_D - 0.1]} />
          <meshStandardMaterial
            color="#2a221c"
            roughness={1}
            metalness={0}
          />
        </mesh>

        {/* Pit walls */}
        {(
          [
            [0, 0, PIT_D / 2, PIT_W, wallT],
            [0, 0, -PIT_D / 2, PIT_W, wallT],
            [PIT_W / 2, 0, 0, wallT, PIT_D],
            [-PIT_W / 2, 0, 0, wallT, PIT_D],
          ] as const
        ).map(([x, , z, w, d], i) => (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[x, 0, z]}
          >
            <boxGeometry args={[w, wallH, d]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#3a2e24" : "#322820"}
              roughness={0.92}
              metalness={0}
              flatShading
            />
          </mesh>
        ))}

        {/* Taludes / berms at rim */}
        {(
          [
            [0, wallH / 2 + 0.12, PIT_D / 2 + 0.55, PIT_W + 1.2, 0.35, 0.9],
            [0, wallH / 2 + 0.12, -PIT_D / 2 - 0.55, PIT_W + 1.2, 0.35, 0.9],
            [PIT_W / 2 + 0.55, wallH / 2 + 0.12, 0, 0.9, 0.35, PIT_D + 1.2],
            [-PIT_W / 2 - 0.55, wallH / 2 + 0.12, 0, 0.9, 0.35, PIT_D + 1.2],
          ] as const
        ).map(([x, y, z, w, h, d], i) => (
          <mesh key={`berm-${i}`} position={[x, y - wallH / 2, z]} castShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              color="#4a3a2c"
              roughness={0.9}
              metalness={0}
            />
          </mesh>
        ))}

        {/* Footprint chalk line (subtle BIM cue) */}
        <mesh position={[0, -wallH / 2 + 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.min(PIT_W, PIT_D) * 0.28, Math.min(PIT_W, PIT_D) * 0.29, 4]} />
          <meshBasicMaterial color="#f57c00" transparent opacity={0.22} />
        </mesh>
      </group>

      {/* Scattered stones */}
      <instancedMesh ref={stonesRef} args={[undefined, undefined, stoneData.length]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#3d342c" roughness={0.95} flatShading />
      </instancedMesh>
    </group>
  );
}
