"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BIM_STAGES,
  BUILD_D,
  BUILD_W,
  COL_X,
  COL_Z,
  FLOOR_H,
  FLOORS,
  PIT_DEPTH,
  revealFactors,
  stageWeight,
} from "@/lib/constructionConfig";
import { boxEdges } from "@/lib/geo";

type Props = {
  progress: React.MutableRefObject<number>;
};

const COL_S = 0.3;
const BEAM_S = 0.24;
const SLAB_H = 0.18;
const FOOT_S = 0.7;

const ORANGE = "#f57c00";
const CONCRETE = "#c5c0b8";
const STEEL = "#2c2c2e";
const GLASS = "#8a9aaa";

/**
 * Scroll-driven BIM building — stages interpolate with fade / lift / scale.
 */
export function ConstructionBuilding({ progress }: Props) {
  const root = useRef<THREE.Group>(null);
  const footingsRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Group>(null);
  const columnsRef = useRef<THREE.Group>(null);
  const beamsRef = useRef<THREE.Group>(null);
  const slabsRef = useRef<THREE.Group>(null);
  const wallsRef = useRef<THREE.Group>(null);
  const stairsRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Group>(null);
  const completeRef = useRef<THREE.Group>(null);

  const colMesh = useRef<THREE.InstancedMesh>(null);
  const footMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const totalH = FLOOR_H * FLOORS;
  const baseY = -PIT_DEPTH + 0.08;

  const edgeGeos = useMemo(
    () => ({
      col: boxEdges(COL_S, totalH, COL_S),
      foot: boxEdges(FOOT_S, 0.32, FOOT_S),
      grade: boxEdges(BUILD_W + 0.35, 0.28, BUILD_D + 0.35),
      slab: boxEdges(BUILD_W, SLAB_H, BUILD_D),
      beamX: boxEdges(BUILD_W - 0.4, BEAM_S, BEAM_S),
      beamZ: boxEdges(BEAM_S, BEAM_S, BUILD_D - 0.4),
      wall: boxEdges(BUILD_W * 0.96, FLOOR_H * 0.78, 0.12),
      stair: boxEdges(1.1, totalH * 0.92, 1.3),
      roof: boxEdges(BUILD_W + 0.25, 0.22, BUILD_D + 0.25),
      shell: boxEdges(BUILD_W * 1.02, totalH, BUILD_D * 1.02),
    }),
    [totalH],
  );

  const colCount = COL_X.length * COL_Z.length;

  useLayoutEffect(() => {
    const setBases = (
      ref: React.RefObject<THREE.Group | null>,
      y: number,
    ) => {
      if (ref.current) ref.current.userData.baseY = y;
    };
    setBases(footingsRef, 0);
    setBases(foundationRef, 0);
    setBases(columnsRef, 0);
    setBases(beamsRef, 0);
    setBases(slabsRef, 0);
    setBases(wallsRef, 0);
    setBases(stairsRef, 0);
    setBases(roofRef, 0);
    setBases(completeRef, 0);
    setBases(wireRef, 0);

    if (footMesh.current) {
      let i = 0;
      for (const x of COL_X) {
        for (const z of COL_Z) {
          dummy.position.set(x, 0.16, z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          footMesh.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      footMesh.current.instanceMatrix.needsUpdate = true;
    }

    if (colMesh.current) {
      let i = 0;
      for (const x of COL_X) {
        for (const z of COL_Z) {
          dummy.position.set(x, totalH / 2, z);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          colMesh.current.setMatrixAt(i++, dummy.matrix);
        }
      }
      colMesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, totalH]);

  useFrame(() => {
    const p = progress.current;
    const s = BIM_STAGES;

    const footings = stageWeight(p, ...s.footings);
    const foundation = stageWeight(p, ...s.foundation);
    const columns = stageWeight(p, ...s.columns);
    const beams = stageWeight(p, ...s.beams);
    const slabs = stageWeight(p, ...s.slabs);
    const walls = stageWeight(p, ...s.walls);
    const stairs = stageWeight(p, ...s.stairs);
    const roof = stageWeight(p, ...s.roof);
    const complete = stageWeight(p, ...s.complete);

    const wire =
      Math.max(columns, beams, slabs) *
      (1 - complete * 0.55) *
      (0.35 + 0.65 * Math.max(columns, walls));

    const setGroupOpacity = (group: THREE.Group | null, t: number) => {
      if (!group) return;
      const r = revealFactors(t);
      group.visible = r.visible;
      group.scale.setScalar(r.scale);
      const by = (group.userData.baseY as number) ?? 0;
      group.position.y = by + r.y;
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.Material & {
          opacity?: number;
          userData?: { base?: number };
          transparent?: boolean;
        };
        if (
          mat &&
          typeof mat.opacity === "number" &&
          mat.userData?.base != null
        ) {
          mat.opacity = mat.userData.base * r.opacity;
          mat.transparent = true;
        }
      });
    };

    setGroupOpacity(footingsRef.current, footings);
    setGroupOpacity(foundationRef.current, foundation);
    setGroupOpacity(columnsRef.current, columns);
    setGroupOpacity(beamsRef.current, beams);
    setGroupOpacity(slabsRef.current, slabs);
    setGroupOpacity(wallsRef.current, walls);
    setGroupOpacity(stairsRef.current, stairs);
    setGroupOpacity(roofRef.current, roof);
    setGroupOpacity(completeRef.current, complete);
    setGroupOpacity(wireRef.current, wire);
  });

  return (
    <group ref={root} position={[0, baseY, 0]}>
      {/* —— Zapatas —— */}
      <group ref={footingsRef} visible={false}>
        <instancedMesh
          ref={footMesh}
          args={[undefined, undefined, colCount]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[FOOT_S, 0.32, FOOT_S]} />
          <meshStandardMaterial
            color={CONCRETE}
            roughness={0.85}
            metalness={0.06}
            transparent
            opacity={0.9}
            onUpdate={(m) => {
              m.userData.base = 0.9;
            }}
          />
        </instancedMesh>
        {COL_X.flatMap((x) =>
          COL_Z.map((z) => (
            <lineSegments
              key={`fe-${x}-${z}`}
              geometry={edgeGeos.foot}
              position={[x, 0.16, z]}
            >
              <lineBasicMaterial
                color={ORANGE}
                transparent
                opacity={0.7}
                onUpdate={(m) => {
                  m.userData.base = 0.7;
                }}
              />
            </lineSegments>
          )),
        )}
      </group>

      {/* —— Cimentación —— */}
      <group ref={foundationRef} visible={false}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[BUILD_W + 0.35, 0.28, BUILD_D + 0.35]} />
          <meshStandardMaterial
            color="#b8b3ab"
            roughness={0.88}
            metalness={0.05}
            transparent
            opacity={0.88}
            onUpdate={(m) => {
              m.userData.base = 0.88;
            }}
          />
        </mesh>
        <lineSegments geometry={edgeGeos.grade} position={[0, 0.38, 0]}>
          <lineBasicMaterial
            color={ORANGE}
            transparent
            opacity={0.8}
            onUpdate={(m) => {
              m.userData.base = 0.8;
            }}
          />
        </lineSegments>
      </group>

      {/* —— Columnas —— */}
      <group ref={columnsRef} visible={false}>
        <instancedMesh
          ref={colMesh}
          args={[undefined, undefined, colCount]}
          castShadow
        >
          <boxGeometry args={[COL_S, totalH, COL_S]} />
          <meshStandardMaterial
            color={CONCRETE}
            roughness={0.8}
            metalness={0.1}
            transparent
            opacity={0.88}
            onUpdate={(m) => {
              m.userData.base = 0.88;
            }}
          />
        </instancedMesh>
        {COL_X.flatMap((x) =>
          COL_Z.map((z) => {
            const corner =
              (x === COL_X[0] || x === COL_X[COL_X.length - 1]) &&
              (z === COL_Z[0] || z === COL_Z[COL_Z.length - 1]);
            return (
              <lineSegments
                key={`ce-${x}-${z}`}
                geometry={edgeGeos.col}
                position={[x, totalH / 2, z]}
              >
                <lineBasicMaterial
                  color={corner ? ORANGE : "#ffffff"}
                  transparent
                  opacity={corner ? 0.85 : 0.4}
                  onUpdate={(m) => {
                    m.userData.base = corner ? 0.85 : 0.4;
                  }}
                />
              </lineSegments>
            );
          }),
        )}
      </group>

      {/* —— Vigas —— */}
      <group ref={beamsRef} visible={false}>
        {Array.from({ length: FLOORS }).map((_, fi) => (
          <group key={`b-${fi}`}>
            {COL_Z.map((z, zi) => (
              <group key={`bx-${z}`}>
                <mesh
                  castShadow
                  position={[0, fi * FLOOR_H + FLOOR_H - 0.14, z]}
                >
                  <boxGeometry args={[BUILD_W - 0.4, BEAM_S, BEAM_S]} />
                  <meshStandardMaterial
                    color={STEEL}
                    roughness={0.5}
                    metalness={0.7}
                    transparent
                    opacity={0.85}
                    onUpdate={(m) => {
                      m.userData.base = 0.85;
                    }}
                  />
                </mesh>
                <lineSegments
                  geometry={edgeGeos.beamX}
                  position={[0, fi * FLOOR_H + FLOOR_H - 0.14, z]}
                >
                  <lineBasicMaterial
                    color={zi === 0 || zi === COL_Z.length - 1 ? ORANGE : "#fff"}
                    transparent
                    opacity={zi === 0 || zi === COL_Z.length - 1 ? 0.75 : 0.35}
                    onUpdate={(m) => {
                      m.userData.base =
                        zi === 0 || zi === COL_Z.length - 1 ? 0.75 : 0.35;
                    }}
                  />
                </lineSegments>
              </group>
            ))}
            {COL_X.map((x) => (
              <group key={`bz-${x}`}>
                <mesh
                  castShadow
                  position={[x, fi * FLOOR_H + FLOOR_H - 0.14, 0]}
                >
                  <boxGeometry args={[BEAM_S, BEAM_S, BUILD_D - 0.4]} />
                  <meshStandardMaterial
                    color={STEEL}
                    roughness={0.5}
                    metalness={0.7}
                    transparent
                    opacity={0.8}
                    onUpdate={(m) => {
                      m.userData.base = 0.8;
                    }}
                  />
                </mesh>
                <lineSegments
                  geometry={edgeGeos.beamZ}
                  position={[x, fi * FLOOR_H + FLOOR_H - 0.14, 0]}
                >
                  <lineBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.32}
                    onUpdate={(m) => {
                      m.userData.base = 0.32;
                    }}
                  />
                </lineSegments>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* —— Placas / losas —— */}
      <group ref={slabsRef} visible={false}>
        {Array.from({ length: FLOORS + 1 }).map((_, i) => (
          <group key={`sl-${i}`} position={[0, i * FLOOR_H + 0.55, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[BUILD_W, SLAB_H, BUILD_D]} />
              <meshStandardMaterial
                color={i % 2 ? "#ccc8c0" : CONCRETE}
                roughness={0.86}
                metalness={0.06}
                transparent
                opacity={0.78}
                onUpdate={(m) => {
                  m.userData.base = 0.78;
                }}
              />
            </mesh>
            <lineSegments geometry={edgeGeos.slab}>
              <lineBasicMaterial
                color={i === 0 || i === FLOORS ? ORANGE : "#ffffff"}
                transparent
                opacity={i === 0 || i === FLOORS ? 0.7 : 0.38}
                onUpdate={(m) => {
                  m.userData.base = i === 0 || i === FLOORS ? 0.7 : 0.38;
                }}
              />
            </lineSegments>
          </group>
        ))}
      </group>

      {/* —— Muros / fachada —— */}
      <group ref={wallsRef} visible={false}>
        {[-1, 1].map((side) =>
          Array.from({ length: FLOORS }).map((_, fi) => (
            <group
              key={`w-${side}-${fi}`}
              position={[
                0,
                fi * FLOOR_H + FLOOR_H * 0.5 + 0.55,
                (side * BUILD_D) / 2,
              ]}
            >
              <mesh>
                <boxGeometry args={[BUILD_W * 0.94, FLOOR_H * 0.72, 0.1]} />
                <meshStandardMaterial
                  color="#d2cec6"
                  roughness={0.78}
                  metalness={0.08}
                  transparent
                  opacity={0.35}
                  onUpdate={(m) => {
                    m.userData.base = 0.35;
                  }}
                />
              </mesh>
              <mesh position={[0, 0, side * 0.06]}>
                <boxGeometry args={[BUILD_W * 0.88, FLOOR_H * 0.55, 0.04]} />
                <meshStandardMaterial
                  color={GLASS}
                  roughness={0.12}
                  metalness={0.4}
                  transparent
                  opacity={0.32}
                  depthWrite={false}
                  onUpdate={(m) => {
                    m.userData.base = 0.32;
                  }}
                />
              </mesh>
              <lineSegments geometry={edgeGeos.wall}>
                <lineBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.4}
                  onUpdate={(m) => {
                    m.userData.base = 0.4;
                  }}
                />
              </lineSegments>
              {/* Mullions */}
              {[-1.5, -0.5, 0.5, 1.5].map((mx) => (
                <mesh key={mx} position={[mx, 0, side * 0.05]}>
                  <boxGeometry args={[0.05, FLOOR_H * 0.7, 0.06]} />
                  <meshStandardMaterial
                    color={STEEL}
                    roughness={0.45}
                    metalness={0.75}
                    transparent
                    opacity={0.7}
                    onUpdate={(m) => {
                      m.userData.base = 0.7;
                    }}
                  />
                </mesh>
              ))}
            </group>
          )),
        )}
        {/* Side walls */}
        {[-1, 1].map((side) =>
          Array.from({ length: FLOORS }).map((_, fi) => (
            <group
              key={`sw-${side}-${fi}`}
              position={[
                (side * BUILD_W) / 2,
                fi * FLOOR_H + FLOOR_H * 0.5 + 0.55,
                0,
              ]}
            >
              <mesh>
                <boxGeometry args={[0.1, FLOOR_H * 0.72, BUILD_D * 0.92]} />
                <meshStandardMaterial
                  color="#c9c5bd"
                  roughness={0.8}
                  transparent
                  opacity={0.3}
                  onUpdate={(m) => {
                    m.userData.base = 0.3;
                  }}
                />
              </mesh>
            </group>
          )),
        )}
      </group>

      {/* —— Escaleras —— */}
      <group ref={stairsRef} visible={false}>
        <group position={[BUILD_W / 2 - 0.75, totalH / 2 + 0.4, BUILD_D / 2 - 0.55]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, totalH * 0.92, 1.3]} />
            <meshStandardMaterial
              color={CONCRETE}
              roughness={0.84}
              transparent
              opacity={0.55}
              onUpdate={(m) => {
                m.userData.base = 0.55;
              }}
            />
          </mesh>
          <lineSegments geometry={edgeGeos.stair}>
            <lineBasicMaterial
              color={ORANGE}
              transparent
              opacity={0.65}
              onUpdate={(m) => {
                m.userData.base = 0.65;
              }}
            />
          </lineSegments>
          {Array.from({ length: FLOORS * 4 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, -totalH * 0.4 + i * 0.28, 0.15]}
            >
              <boxGeometry args={[0.9, 0.06, 0.7]} />
              <meshStandardMaterial
                color="#a8a49c"
                transparent
                opacity={0.5}
                onUpdate={(m) => {
                  m.userData.base = 0.5;
                }}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* —— Cubierta —— */}
      <group ref={roofRef} visible={false}>
        <mesh
          castShadow
          position={[0, totalH + 0.55, 0]}
        >
          <boxGeometry args={[BUILD_W + 0.25, 0.22, BUILD_D + 0.25]} />
          <meshStandardMaterial
            color="#9a9690"
            roughness={0.75}
            metalness={0.2}
            transparent
            opacity={0.88}
            onUpdate={(m) => {
              m.userData.base = 0.88;
            }}
          />
        </mesh>
        <lineSegments
          geometry={edgeGeos.roof}
          position={[0, totalH + 0.55, 0]}
        >
          <lineBasicMaterial
            color={ORANGE}
            transparent
            opacity={0.8}
            onUpdate={(m) => {
              m.userData.base = 0.8;
            }}
          />
        </lineSegments>
      </group>

      {/* —— Wireframe técnico overlay —— */}
      <group ref={wireRef} visible={false}>
        <lineSegments
          geometry={edgeGeos.shell}
          position={[0, totalH / 2 + 0.55, 0]}
        >
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            onUpdate={(m) => {
              m.userData.base = 0.22;
            }}
          />
        </lineSegments>
        {Array.from({ length: FLOORS }).map((_, fi) => (
          <lineSegments
            key={`wl-${fi}`}
            geometry={edgeGeos.slab}
            position={[0, fi * FLOOR_H + 0.55, 0]}
          >
            <lineBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.18}
              onUpdate={(m) => {
                m.userData.base = 0.18;
              }}
            />
          </lineSegments>
        ))}
      </group>

      {/* —— Completo: acentos interiores —— */}
      <group ref={completeRef} visible={false}>
        {Array.from({ length: FLOORS }).map((_, fi) => (
          <mesh
            key={`glow-${fi}`}
            position={[0, fi * FLOOR_H + FLOOR_H * 0.5 + 0.55, 0]}
          >
            <boxGeometry
              args={[BUILD_W * 0.65, FLOOR_H * 0.45, BUILD_D * 0.65]}
            />
            <meshStandardMaterial
              color={ORANGE}
              emissive={ORANGE}
              emissiveIntensity={0.15}
              transparent
              opacity={0.07}
              depthWrite={false}
              onUpdate={(m) => {
                m.userData.base = 0.07;
              }}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
