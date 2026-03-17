import React from 'react';
import ModelLoader from './ModelLoader';

export default function Furniture({ item, roomWidth, roomLength }) {
  const PPM = 80;

  const x = item.x / PPM - roomWidth / 2;
  const z = item.y / PPM - roomLength / 2;

  const rotation = -(item.rotation || 0) * Math.PI / 180;

  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <ModelLoader model={item.model || item.modelType} />
    </group>
  );
}