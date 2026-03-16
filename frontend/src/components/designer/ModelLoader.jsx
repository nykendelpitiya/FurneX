import React from "react";
import { useGLTF } from "@react-three/drei";

/*
  Map furniture type -> GLB model path
  These names match your existing .glb files
*/

const MODEL_MAP = {

  // CHAIRS
  "accent chair": "/models/accent chair.glb",
  "arm chair": "/models/arm chair.glb",
  "dining chair": "/models/dining chair.glb",
  "lounge chair": "/models/lounge chair.glb",
  "office chair": "/models/office chair.glb",

  // TABLES
  "coffee table": "/models/coffee table.glb",
  "console table": "/models/console table.glb",
  "desk": "/models/desk.glb",
  "dining table": "/models/dining table.glb",
  "side table": "/models/side table.glb",
  "round table": "/models/round chair.glb",

  // SOFAS
  "single sofa": "/models/single sofa.glb",
  "2 seater sofa": "/models/2 seater sofa.glb",
  "3 seater sofa": "/models/3 seater sofa.glb",
  "l shape sofa": "/models/l shape sofa.glb",
  "recliner sofa": "/models/recliner sofa.glb",

  // BEDS
  "single bed": "/models/single bed.glb",
  "double bed": "/models/double bed.glb",
  "queen bed": "/models/queen bed.glb",
  "king bed": "/models/king bed.glb",
  "bunk bed": "/models/bunk bed.glb",

  // STORAGE
  "bookshelf": "/models/bookshelf.glb",
  "cabinet": "/models/cabinet.glb",
  "display shelf": "/models/display shelf.glb",
  "side cabinet": "/models/side cabinet.glb",
  "tv stand": "/models/tv stand.glb"

};

export default function ModelLoader({ model, position=[0,0,0], scale=1 }) {

  if (!model) return null;

  const path = `/models/${encodeURI(model)}`;
  const { scene } = useGLTF(path);

  return (
    <primitive
      object={scene}
      position={position}
      scale={[scale, scale, scale]}
    />
  );
}