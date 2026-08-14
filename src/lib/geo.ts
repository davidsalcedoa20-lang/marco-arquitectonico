import * as THREE from "three";

const edgesCache = new Map<string, THREE.EdgesGeometry>();

function cacheKey(w: number, h: number, d: number) {
  return `${w.toFixed(5)}_${h.toFixed(5)}_${d.toFixed(5)}`;
}

/**
 * Shared EdgesGeometry cache — calling boxEdges in render must NOT
 * allocate a new GPU buffer every React commit (root cause of Context Lost).
 */
export function boxEdges(w: number, h: number, d: number) {
  const key = cacheKey(w, h, d);
  let edges = edgesCache.get(key);
  if (!edges) {
    const box = new THREE.BoxGeometry(w, h, d);
    edges = new THREE.EdgesGeometry(box);
    box.dispose();
    edgesCache.set(key, edges);
  }
  return edges;
}

export function lineGeo(points: THREE.Vector3[]) {
  return new THREE.BufferGeometry().setFromPoints(points);
}

export function setMatOpacity(
  obj: THREE.Object3D,
  factor: number,
  visibleThreshold = 0.01,
) {
  obj.visible = factor > visibleThreshold;
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    const mat = mesh.material as THREE.Material & {
      opacity?: number;
      userData?: { baseOpacity?: number };
    };
    if (
      mat &&
      typeof mat.opacity === "number" &&
      mat.userData?.baseOpacity != null
    ) {
      mat.opacity = mat.userData.baseOpacity * factor;
      mat.transparent = true;
      if ("needsUpdate" in mat) mat.needsUpdate = true;
    }
  });
}
