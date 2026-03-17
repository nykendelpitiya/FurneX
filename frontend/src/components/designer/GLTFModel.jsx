import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Full mapping of modelType -> filename under /public/models
const MODEL_MAP = {
  'accent-chair': '/models/accent chair.glb',
  'arm-chair': '/models/arm chair.glb',
  'dining-chair': '/models/dining chair.glb',
  'lounge-chair': '/models/lounge chair.glb',
  'office-chair': '/models/office chair.glb',
  'coffee-table': '/models/coffee table.glb',
  'console-table': '/models/console table.glb',
  'desk': '/models/desk.glb',
  'dining-table': '/models/dining table.glb',
  'side-table': '/models/side table.glb',
  'round-chair': '/models/round chair.glb',
  'single-sofa': '/models/single sofa.glb',
  'sofa-2seat': '/models/2 seater sofa.glb',
  '2-seater-sofa': '/models/2 seater sofa.glb',
  '3-seater-sofa': '/models/3 seater sofa.glb',
  'l-shape-sofa': '/models/l shape sofa.glb',
  'l-shape-sofa-alt': '/models/l shape sofa.glb',
  'recliner-sofa': '/models/recliner sofa.glb',
  'single-bed': '/models/single bed.glb',
  'double-bed': '/models/double bed.glb',
  'queen-bed': '/models/queen bed.glb',
  'king-bed': '/models/king bed.glb',
  'bunk-bed': '/models/bunk bed.glb',
  'bookshelf': '/models/bookshelf.glb',
  'cabinet': '/models/cabinet.glb',
  'display-shelf': '/models/display shelf.glb',
  'side-cabinet': '/models/side cabinet.glb',
  'tv-stand': '/models/tv stand.glb',
};

function pathFor(type = '') {
  const key = (type || '').toString().toLowerCase();
  if (MODEL_MAP[key]) return MODEL_MAP[key];
  // fallback: try replacing dashes with spaces
  return `/models/${encodeURI(key.replace(/-/g, ' '))}.glb`;
}

export default function GLTFModel({ type = 'dining-chair', model, scale = 0.8 }) {
  const path = model ? `/models/${encodeURI(model)}` : pathFor(type);
  let result;
  try {
    result = useGLTF(path);
  } catch (e) {
    console.warn('GLTFModel failed to load', path, e);
    return null;
  }

  const scene = result?.scene;
  const cloned = useMemo(() => {
    if (!scene) return null;
    const s = scene.clone();
    // compute bounding box to align base to y=0
    try {
      const box = new THREE.Box3().setFromObject(s);
      const minY = box.min.y || 0;
      // lift so the lowest point sits at y=0.01
      s.position.y = -minY + 0.01;
    } catch (err) {
      // ignore bbox errors
    }
    return s;
  }, [scene]);

  if (!cloned) return null;
  return <primitive object={cloned} scale={[scale, scale, scale]} />;
}

// Preload common models (best-effort)
try { useGLTF.preload && Object.values(MODEL_MAP).forEach(p => useGLTF.preload(p)); } catch (e) {}