import { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, AccumulativeShadows, RandomizedLight, SoftShadows, useGLTF } from '@react-three/drei';
import GLTFModel from './GLTFModel';
import * as THREE from 'three';

/* ═══════════════════════════════════════
   3D FURNITURE MODELS
   PBR materials with proper metalness/roughness
   ═══════════════════════════════════════ */

function DiningChair({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  const darker = c.clone().multiplyScalar(0.65);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.42, 0]} castShadow><boxGeometry args={[0.42, 0.04, 0.42]} /><meshPhysicalMaterial color={color} roughness={0.45} clearcoat={0.2} clearcoatRoughness={0.4} /></mesh>
      <mesh position={[0, 0.7, -0.19]} castShadow><boxGeometry args={[0.38, 0.52, 0.03]} /><meshPhysicalMaterial color={color} roughness={0.45} clearcoat={0.2} /></mesh>
      {[-0.1, 0.1].map((x, i) => (<mesh key={i} position={[x, 0.6, -0.19]} castShadow><cylinderGeometry args={[0.012, 0.012, 0.32, 8]} /><meshPhysicalMaterial color={darker} roughness={0.3} /></mesh>))}
      {[[-0.17, 0, -0.17], [0.17, 0, -0.17], [-0.17, 0, 0.17], [0.17, 0, 0.17]].map((pos, i) => (<mesh key={i} position={[pos[0], 0.21, pos[2]]} castShadow><cylinderGeometry args={[0.018, 0.015, 0.42, 8]} /><meshPhysicalMaterial color={darker} roughness={0.3} /></mesh>))}
    </group>
  );
}

function Armchair({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  const cushion = c.clone().lerp(new THREE.Color('#ffffff'), 0.15);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.2, 0]} castShadow><boxGeometry args={[0.78, 0.15, 0.78]} /><meshPhysicalMaterial color={color} roughness={0.7} /></mesh>
      <mesh position={[0, 0.35, 0.03]} castShadow><boxGeometry args={[0.64, 0.12, 0.6]} /><meshPhysicalMaterial color={cushion} roughness={0.9} /></mesh>
      <mesh position={[0, 0.58, -0.32]} castShadow><boxGeometry args={[0.72, 0.46, 0.12]} /><meshPhysicalMaterial color={color} roughness={0.8} /></mesh>
      {[-0.34, 0.34].map((x, i) => (<mesh key={i} position={[x, 0.42, 0]} castShadow><boxGeometry args={[0.1, 0.22, 0.65]} /><meshPhysicalMaterial color={color} roughness={0.7} /></mesh>))}
      {[[-0.32, 0, -0.32], [0.32, 0, -0.32], [-0.32, 0, 0.32], [0.32, 0, 0.32]].map((p, i) => (<mesh key={i} position={[p[0], 0.05, p[2]]} castShadow><sphereGeometry args={[0.04, 12, 12]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.15} metalness={0.8} /></mesh>))}
    </group>
  );
}

function OfficeChair({ color, scale = [1, 1, 1] }) {
  return (
    <group scale={scale}>
      {[0, 72, 144, 216, 288].map((a, i) => (<mesh key={i} position={[Math.cos(a*Math.PI/180)*0.2, 0.03, Math.sin(a*Math.PI/180)*0.2]} castShadow><boxGeometry args={[0.04, 0.03, 0.22]} /><meshPhysicalMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} /></mesh>))}
      <mesh position={[0, 0.25, 0]} castShadow><cylinderGeometry args={[0.025, 0.03, 0.45, 12]} /><meshPhysicalMaterial color="#333" metalness={0.8} roughness={0.15} /></mesh>
      <mesh position={[0, 0.48, 0]} castShadow><cylinderGeometry args={[0.25, 0.25, 0.08, 24]} /><meshPhysicalMaterial color={color} roughness={0.8} /></mesh>
      <mesh position={[0, 0.75, -0.18]} castShadow><boxGeometry args={[0.42, 0.5, 0.06]} /><meshPhysicalMaterial color={color} roughness={0.8} /></mesh>
    </group>
  );
}

function DiningTable({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color); const lc = c.clone().multiplyScalar(0.55);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow><boxGeometry args={[1.56, 0.05, 0.86]} /><meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.4} clearcoatRoughness={0.2} /></mesh>
      <mesh position={[0, 0.68, 0]} castShadow><boxGeometry args={[1.42, 0.06, 0.74]} /><meshPhysicalMaterial color={color} roughness={0.35} /></mesh>
      {[[-0.68, 0, -0.35], [0.68, 0, -0.35], [-0.68, 0, 0.35], [0.68, 0, 0.35]].map((p, i) => (<mesh key={i} position={[p[0], 0.34, p[2]]} castShadow><boxGeometry args={[0.06, 0.68, 0.06]} /><meshPhysicalMaterial color={lc} roughness={0.3} /></mesh>))}
    </group>
  );
}

function CoffeeTable({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color); const lc = c.clone().multiplyScalar(0.45);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow><boxGeometry args={[0.96, 0.04, 0.56]} /><meshPhysicalMaterial color={color} roughness={0.2} clearcoat={0.5} clearcoatRoughness={0.15} /></mesh>
      <mesh position={[0, 0.15, 0]} castShadow><boxGeometry args={[0.82, 0.025, 0.42]} /><meshPhysicalMaterial color={color} roughness={0.35} transparent opacity={0.8} /></mesh>
      {[[-0.42, 0, -0.22], [0.42, 0, -0.22], [-0.42, 0, 0.22], [0.42, 0, 0.22]].map((p, i) => (<mesh key={i} position={[p[0], 0.22, p[2]]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.42, 12]} /><meshPhysicalMaterial color={lc} roughness={0.15} metalness={0.6} /></mesh>))}
    </group>
  );
}

function SideTable({ color, scale = [1, 1, 1] }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.52, 0]} castShadow><cylinderGeometry args={[0.24, 0.24, 0.03, 32]} /><meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.3} /></mesh>
      <mesh position={[0, 0.26, 0]} castShadow><cylinderGeometry args={[0.025, 0.03, 0.52, 16]} /><meshPhysicalMaterial color={new THREE.Color(color).multiplyScalar(0.4)} metalness={0.6} roughness={0.2} /></mesh>
      <mesh position={[0, 0.01, 0]} castShadow><cylinderGeometry args={[0.18, 0.18, 0.02, 32]} /><meshPhysicalMaterial color={new THREE.Color(color).multiplyScalar(0.5)} roughness={0.3} /></mesh>
    </group>
  );
}

function Desk({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow><boxGeometry args={[1.36, 0.04, 0.66]} /><meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.35} /></mesh>
      {[-0.64, 0.64].map((x, i) => (<mesh key={i} position={[x, 0.37, 0]} castShadow><boxGeometry args={[0.04, 0.72, 0.6]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.8)} roughness={0.4} /></mesh>))}
      <mesh position={[0.3, 0.6, 0.02]} castShadow><boxGeometry args={[0.58, 0.12, 0.56]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.9)} roughness={0.5} /></mesh>
      <mesh position={[0.3, 0.6, 0.31]} castShadow><boxGeometry args={[0.1, 0.02, 0.02]} /><meshPhysicalMaterial color="#aaa" metalness={0.8} roughness={0.1} /></mesh>
    </group>
  );
}

function Sofa2Seat({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color); const cc = c.clone().lerp(new THREE.Color('#ffffff'), 0.12);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.18, 0]} castShadow><boxGeometry args={[1.56, 0.18, 0.82]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.75)} roughness={0.8} /></mesh>
      {[-0.38, 0.38].map((x, i) => (<mesh key={i} position={[x, 0.34, 0.04]} castShadow><boxGeometry args={[0.7, 0.14, 0.65]} /><meshPhysicalMaterial color={cc} roughness={0.92} /></mesh>))}
      <mesh position={[0, 0.52, -0.32]} castShadow><boxGeometry args={[1.48, 0.36, 0.16]} /><meshPhysicalMaterial color={color} roughness={0.85} /></mesh>
      {[-0.72, 0.72].map((x, i) => (<mesh key={i} position={[x, 0.38, 0]} castShadow><boxGeometry args={[0.12, 0.28, 0.7]} /><meshPhysicalMaterial color={color} roughness={0.8} /></mesh>))}
    </group>
  );
}

function Sofa3Seat({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color); const cc = c.clone().lerp(new THREE.Color('#ffffff'), 0.12);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.18, 0]} castShadow><boxGeometry args={[2.16, 0.18, 0.86]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.75)} roughness={0.8} /></mesh>
      {[-0.7, 0, 0.7].map((x, i) => (<mesh key={i} position={[x, 0.34, 0.04]} castShadow><boxGeometry args={[0.64, 0.14, 0.68]} /><meshPhysicalMaterial color={cc} roughness={0.92} /></mesh>))}
      <mesh position={[0, 0.54, -0.34]} castShadow><boxGeometry args={[2.08, 0.4, 0.16]} /><meshPhysicalMaterial color={color} roughness={0.85} /></mesh>
      {[-1.0, 1.0].map((x, i) => (<mesh key={i} position={[x, 0.38, 0]} castShadow><boxGeometry args={[0.14, 0.28, 0.74]} /><meshPhysicalMaterial color={color} roughness={0.8} /></mesh>))}
    </group>
  );
}

function SofaLShape({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color); const cc = c.clone().lerp(new THREE.Color('#ffffff'), 0.12);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.18, -0.35]} castShadow><boxGeometry args={[2.4, 0.18, 0.82]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.75)} roughness={0.8} /></mesh>
      <mesh position={[1.0, 0.18, 0.3]} castShadow><boxGeometry args={[0.8, 0.18, 1.1]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.75)} roughness={0.8} /></mesh>
      <mesh position={[-0.2, 0.34, -0.32]} castShadow><boxGeometry args={[1.8, 0.14, 0.65]} /><meshPhysicalMaterial color={cc} roughness={0.92} /></mesh>
      <mesh position={[1.0, 0.34, 0.3]} castShadow><boxGeometry args={[0.64, 0.14, 0.9]} /><meshPhysicalMaterial color={cc} roughness={0.92} /></mesh>
      <mesh position={[0, 0.54, -0.7]} castShadow><boxGeometry args={[2.3, 0.4, 0.14]} /><meshPhysicalMaterial color={color} roughness={0.85} /></mesh>
      <mesh position={[1.32, 0.54, 0.1]} castShadow><boxGeometry args={[0.14, 0.4, 1.4]} /><meshPhysicalMaterial color={color} roughness={0.85} /></mesh>
    </group>
  );
}

function Bookshelf({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      {[-0.42, 0.42].map((x, i) => (<mesh key={i} position={[x, 0.9, 0]} castShadow><boxGeometry args={[0.03, 1.78, 0.32]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.8)} roughness={0.4} /></mesh>))}
      {[0, 0.35, 0.7, 1.05, 1.4, 1.78].map((y, i) => (<mesh key={i} position={[0, y+0.01, 0]} castShadow><boxGeometry args={[0.86, 0.03, 0.32]} /><meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.15} /></mesh>))}
      <mesh position={[0, 0.9, -0.15]} castShadow><boxGeometry args={[0.84, 1.76, 0.02]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.65)} roughness={0.5} /></mesh>
    </group>
  );
}

function Cabinet({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.42, 0]} castShadow><boxGeometry args={[0.96, 0.82, 0.42]} /><meshPhysicalMaterial color={color} roughness={0.4} /></mesh>
      {[-0.24, 0.24].map((x, i) => (<mesh key={i} position={[x, 0.42, 0.215]} castShadow><boxGeometry args={[0.46, 0.76, 0.02]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.92)} roughness={0.3} /></mesh>))}
      {[-0.06, 0.06].map((x, i) => (<mesh key={i} position={[x, 0.42, 0.24]} castShadow><cylinderGeometry args={[0.012, 0.012, 0.12, 12]} /><meshPhysicalMaterial color="#bbb" metalness={0.85} roughness={0.1} /></mesh>))}
    </group>
  );
}

function TVStand({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow><boxGeometry args={[1.46, 0.04, 0.38]} /><meshPhysicalMaterial color={color} roughness={0.2} clearcoat={0.4} /></mesh>
      <mesh position={[0, 0.24, 0]} castShadow><boxGeometry args={[1.36, 0.03, 0.34]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.88)} roughness={0.3} /></mesh>
      {[-0.7, 0.7].map((x, i) => (<mesh key={i} position={[x, 0.25, 0]} castShadow><boxGeometry args={[0.04, 0.48, 0.36]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.8)} roughness={0.4} /></mesh>))}
    </group>
  );
}

function SingleBed({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow><boxGeometry args={[0.95, 0.18, 1.95]} /><meshPhysicalMaterial color={color} roughness={0.9} /></mesh>
      <mesh position={[0, 0.18, 0]} castShadow><boxGeometry args={[1.0, 0.14, 2.0]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.55)} roughness={0.4} /></mesh>
      <mesh position={[0, 0.6, -0.96]} castShadow><boxGeometry args={[1.0, 0.6, 0.06]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.45)} roughness={0.4} /></mesh>
      <mesh position={[0, 0.48, -0.7]} castShadow><boxGeometry args={[0.55, 0.1, 0.35]} /><meshPhysicalMaterial color="#f0f0f0" roughness={0.95} /></mesh>
    </group>
  );
}

function DoubleBed({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow><boxGeometry args={[1.55, 0.2, 1.95]} /><meshPhysicalMaterial color={color} roughness={0.9} /></mesh>
      <mesh position={[0, 0.18, 0]} castShadow><boxGeometry args={[1.6, 0.14, 2.0]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.55)} roughness={0.4} /></mesh>
      <mesh position={[0, 0.65, -0.96]} castShadow><boxGeometry args={[1.6, 0.7, 0.06]} /><meshPhysicalMaterial color={c.clone().multiplyScalar(0.45)} roughness={0.4} /></mesh>
      {[-0.35, 0.35].map((x, i) => (<mesh key={i} position={[x, 0.5, -0.7]} castShadow><boxGeometry args={[0.5, 0.1, 0.35]} /><meshPhysicalMaterial color="#f4f4f4" roughness={0.95} /></mesh>))}
    </group>
  );
}

/* ═══ Custom Shape Models ═══ */
function CustomRect({ color, scale = [1, 1, 1] }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.5]} />
        <meshPhysicalMaterial color={color} roughness={0.5} clearcoat={0.15} />
      </mesh>
    </group>
  );
}

function CustomCircle({ color, scale = [1, 1, 1] }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.7, 32]} />
        <meshPhysicalMaterial color={color} roughness={0.5} clearcoat={0.15} />
      </mesh>
    </group>
  );
}

function CustomLShape({ color, scale = [1, 1, 1] }) {
  const c = new THREE.Color(color);
  return (
    <group scale={scale}>
      <mesh position={[-0.1, 0.35, 0]} castShadow>
        <boxGeometry args={[0.3, 0.7, 0.5]} />
        <meshPhysicalMaterial color={color} roughness={0.5} clearcoat={0.15} />
      </mesh>
      <mesh position={[0.15, 0.35, 0.15]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshPhysicalMaterial color={c.clone().multiplyScalar(0.9)} roughness={0.5} clearcoat={0.15} />
      </mesh>
    </group>
  );
}

/* ═══ Model Map ═══ */
const MODEL_MAP = {
  'dining-chair': DiningChair, 'armchair': Armchair, 'office-chair': OfficeChair,
  'dining-table': DiningTable, 'coffee-table': CoffeeTable, 'side-table': SideTable, 'desk': Desk,
  'sofa-2seat': Sofa2Seat, 'sofa-3seat': Sofa3Seat, 'sofa-lshape': SofaLShape,
  'bookshelf': Bookshelf, 'cabinet': Cabinet, 'tv-stand': TVStand,
  'single-bed': SingleBed, 'double-bed': DoubleBed,
  'custom-rect': CustomRect, 'custom-circle': CustomCircle, 'custom-lshape': CustomLShape,
};

/* ═══ GLB Custom Model Loader ═══ */
function GLBModel({ url, scale = [1, 1, 1], color }) {
  // Ensure the URL points to our backend server
  const fullUrl = url.startsWith('/uploads') ? `http://localhost:3001${url}` : url;
  const { scene } = useGLTF(fullUrl);
  const cloned = useMemo(() => {
    const s = scene.clone();
    if (color) {
      const c = new THREE.Color(color);
      s.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(c);
        }
      });
    }
    return s;
  }, [scene, color]);
  return <primitive object={cloned} scale={scale} castShadow receiveShadow />;
}

/* ═══ Interactive 3D Furniture — Click + Drag on floor plane ═══ */
function InteractiveFurniture({ item, roomWidth, roomLength, isSelected, onSelect, onDragEnd, orbitRef }) {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ pointerX: 0, pointerY: 0, worldX: 0, worldZ: 0 });
  const { camera, gl, raycaster } = useThree();

  const PPM = 80;
  const posX = (item.x / PPM) - roomWidth / 2;
  const posZ = (item.y / PPM) - roomLength / 2;
  const rotY = -(item.rotation || 0) * Math.PI / 180;
  const sx = item.scaleX || 1;
  const sy = item.scaleY || 1;
  const sz = item.scaleZ || 1; // Real 3D models need uniform XYZ, but we can support Z if available

  const floorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  // Model components are loaded via GLTFModel for public /models/*.glb files
  

  // Bounce selected item
  useFrame((state) => {
    if (!groupRef.current) return;
    if (isSelected && !isDragging) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.5) * 0.015;
    } else if (!isDragging) {
      groupRef.current.position.y = 0;
    }
  });

  const getFloorPoint = useCallback((clientX, clientY) => {
    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const rc = new THREE.Raycaster();
    rc.setFromCamera(mouse, camera);
    const pt = new THREE.Vector3();
    rc.ray.intersectPlane(floorPlane, pt);
    return pt;
  }, [camera, gl, floorPlane]);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    if (!isSelected) { onSelect(item.id); return; }
    // Start drag
    setIsDragging(true);
    if (orbitRef?.current) orbitRef.current.enabled = false;
    const pt = getFloorPoint(e.clientX, e.clientY);
    dragStart.current = { pointerX: e.clientX, pointerY: e.clientY, worldX: posX, worldZ: posZ, offX: pt.x - posX, offZ: pt.z - posZ };
    gl.domElement.style.cursor = 'grabbing';
    gl.domElement.setPointerCapture(e.pointerId);
  }, [isSelected, item.id, posX, posZ, gl, onSelect, orbitRef, getFloorPoint]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging || !groupRef.current) return;
    const pt = getFloorPoint(e.clientX, e.clientY);
    const newX = pt.x - dragStart.current.offX;
    const newZ = pt.z - dragStart.current.offZ;
    groupRef.current.position.x = newX;
    groupRef.current.position.z = newZ;
  }, [isDragging, getFloorPoint]);

  const handlePointerUp = useCallback((e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (orbitRef?.current) orbitRef.current.enabled = true;
    gl.domElement.style.cursor = 'auto';
    gl.domElement.releasePointerCapture(e.pointerId);
    if (groupRef.current) {
      const finalX = (groupRef.current.position.x + roomWidth / 2) * PPM;
      const finalZ = (groupRef.current.position.z + roomLength / 2) * PPM;
      onDragEnd(item.id, finalX, finalZ);
    }
  }, [isDragging, gl, item.id, roomWidth, roomLength, orbitRef, onDragEnd]);

  // clamp initial position to room bounds so models don't appear outside
  const clampedX = Math.max(-roomWidth / 2 + 0.01, Math.min(roomWidth / 2 - 0.01, posX));
  const clampedZ = Math.max(-roomLength / 2 + 0.01, Math.min(roomLength / 2 - 0.01, posZ));

  return (
    <group
      position={[clampedX, 0.01, clampedZ]}
      rotation={[0, rotY, 0]}
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    >
      {isSelected && (
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[item.width * 1.3, (item.depth || item.width) * 1.3]} />
          <meshBasicMaterial color="#3b82f6" opacity={0.3} transparent depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      )}
      {item.customModelUrl ? (
        <Suspense fallback={
          <mesh position={[0, item.height / 2, 0]}>
            <boxGeometry args={[item.width, item.height, item.depth || item.width]} />
            <meshBasicMaterial color="#ccc" wireframe />
          </mesh>
        }>
          <group>
            {/* Invisible raycast target box for reliable dragging */}
            <mesh position={[0, item.height / 2, 0]}>
              <boxGeometry args={[item.width, item.height, item.depth || item.width]} />
              <meshBasicMaterial opacity={0} transparent depthWrite={false} color="#000" />
            </mesh>
            <GLBModel url={item.customModelUrl} scale={[sx, sy, sz]} color={item.color} />
          </group>
        </Suspense>
      ) : (
        <Suspense fallback={
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.5, 0.7, 0.5]} />
            <meshBasicMaterial color="#ddd" />
          </mesh>
        }>
          <GLTFModel model={item.model || item.modelType} scale={Math.max(sx, sy, sz) * 0.8} />
        </Suspense>
      )}
    </group>
  );
}

/* ═══ Room with shape support ═══ */
function Room({ width, length, height, wallColor, floorColor, shape }) {
  const h = height || 2.8;
  const wc = new THREE.Color(wallColor || '#ffffff');
  const s = (shape || 'rectangle').toString().toLowerCase();
  const norm = s.replace(/[_\s]/g, '');

  if (norm === 'lshape' || norm === 'l-shaped' || norm === 'l-shape') {
    try {
      // L-shape: full width at back, bottom-right quadrant cut away
      const cutW = width * 0.5;  // right half removed from front
      const cutL = length * 0.4; // front 40% removed
      // Main (back) portion depth
      const mainL = length - cutL;
      // Key Z coordinates (back = -length/2, front = +length/2)
      const zBack = -length / 2;
      const zStep = zBack + mainL;  // where the step happens
      const zFront = length / 2;
      // Key X coordinates
      const xLeft = -width / 2;
      const xRight = width / 2;
      const xStep = xRight - cutW;  // inner corner X

      // Floor shape (in XY plane, Y will become -Z after rotation)
      const floorShape = new THREE.Shape();
      floorShape.moveTo(xLeft, length / 2);     // → world (xLeft, 0, -l/2) = back-left
      floorShape.lineTo(xRight, length / 2);    // → world (xRight, 0, -l/2) = back-right
      floorShape.lineTo(xRight, length / 2 - mainL);  // → world (xRight, 0, zStep)
      floorShape.lineTo(xStep, length / 2 - mainL);   // → world (xStep, 0, zStep)
      floorShape.lineTo(xStep, -length / 2);    // → world (xStep, 0, zFront)
      floorShape.lineTo(xLeft, -length / 2);    // → world (xLeft, 0, zFront) = front-left
      floorShape.closePath();

      return (
        <group>
          {/* L-shaped floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
            <shapeGeometry args={[floorShape]} />
            <meshPhysicalMaterial color={floorColor} roughness={0.6} clearcoat={0.1} clearcoatRoughness={0.8} />
          </mesh>

          {/* Back wall — full width, at zBack, facing +Z */}
          <mesh position={[0, h / 2, zBack]} receiveShadow>
            <planeGeometry args={[width, h]} />
            <meshPhysicalMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
          </mesh>

          {/* Left wall — full length, at xLeft, facing +X */}
          <mesh position={[xLeft, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
            <planeGeometry args={[length, h]} />
            <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.97)} roughness={0.95} side={THREE.DoubleSide} />
          </mesh>

          {/* Right wall (upper portion) — from zBack to zStep, at xRight */}
          <mesh position={[xRight, h / 2, (zBack + zStep) / 2]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[mainL, h]} />
            <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>

          {/* Inner ledge wall (horizontal) — from xRight to xStep, at zStep */}
          <mesh position={[(xRight + xStep) / 2, h / 2, zStep]}>
            <planeGeometry args={[cutW, h]} />
            <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.95)} roughness={0.95} side={THREE.DoubleSide} />
          </mesh>

          {/* Inner vertical wall — from zStep to zFront, at xStep */}
          <mesh position={[xStep, h / 2, (zStep + zFront) / 2]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[cutL, h]} />
            <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>

          {/* Front wall (left half only) — from xLeft to xStep, at zFront */}
          <mesh position={[(xLeft + xStep) / 2, h / 2, zFront]}>
            <planeGeometry args={[xStep - xLeft, h]} />
            <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>

          {/* Baseboards */}
          <mesh position={[0, 0.04, zBack + 0.01]}>
            <boxGeometry args={[width, 0.08, 0.02]} />
            <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
          </mesh>
          <mesh position={[xLeft + 0.01, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[length, 0.08, 0.02]} />
            <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
          </mesh>
        </group>
      );
    } catch (err) {
      console.error('L-shape build failed', err);
      return (
        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
            <planeGeometry args={[width, length]} />
            <meshPhysicalMaterial color={floorColor} roughness={0.6} />
          </mesh>
        </group>
      );
    }
  }

  if (shape === 'open-plan') {
    // Open-plan: same footprint but with a subtle divider
    return (
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
          <planeGeometry args={[width, length]} />
          <meshPhysicalMaterial color={floorColor} roughness={0.6} clearcoat={0.1} clearcoatRoughness={0.8} />
        </mesh>
        {/* Back wall */}
        <mesh position={[0, h / 2, -length / 2]} receiveShadow>
          <planeGeometry args={[width, h]} />
          <meshPhysicalMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
        {/* Left wall */}
        <mesh position={[-width / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[length, h]} />
          <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.97)} roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
        {/* Right wall (transparent) */}
        <mesh position={[width / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[length, h]} />
          <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
        {/* Front wall (transparent) */}
        <mesh position={[0, h / 2, length / 2]}>
          <planeGeometry args={[width, h]} />
          <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
        {/* Open-plan divider (subtle glass-like partition at 60% width) */}
        <mesh position={[width * 0.1, h * 0.35, 0]}>
          <boxGeometry args={[0.02, h * 0.7, length * 0.85]} />
          <meshPhysicalMaterial color="#a0c0d0" roughness={0.1} transparent opacity={0.12}
            transmission={0.5} thickness={0.02} />
        </mesh>
        {/* Baseboards */}
        <mesh position={[0, 0.04, -length / 2 + 0.01]}>
          <boxGeometry args={[width, 0.08, 0.02]} />
          <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
        </mesh>
        <mesh position={[-width / 2 + 0.01, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[length, 0.08, 0.02]} />
          <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
        </mesh>
      </group>
    );
  }

  // Default: rectangular
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshPhysicalMaterial color={floorColor} roughness={0.6} clearcoat={0.1} clearcoatRoughness={0.8} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, h / 2, -length / 2]} receiveShadow>
        <planeGeometry args={[width, h]} />
        <meshPhysicalMaterial color={wallColor} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-width / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[length, h]} />
        <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.97)} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* Right wall (transparent) */}
      <mesh position={[width / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, h]} />
        <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Front wall (transparent) */}
      <mesh position={[0, h / 2, length / 2]}>
        <planeGeometry args={[width, h]} />
        <meshPhysicalMaterial color={wallColor} roughness={0.95} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Baseboards */}
      <mesh position={[0, 0.04, -length / 2 + 0.01]}>
        <boxGeometry args={[width, 0.08, 0.02]} />
        <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
      </mesh>
      <mesh position={[-width / 2 + 0.01, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[length, 0.08, 0.02]} />
        <meshPhysicalMaterial color={wc.clone().multiplyScalar(0.92)} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ═══ Main 3D Viewer ═══ */
export default function Viewer3D({ room, furniture, selectedId, onSelectItem, onUpdateItem }) {
  const orbitRef = useRef();

  const cameraPosition = useMemo(() => {
    const maxDim = Math.max(room.width, room.length);
    return [maxDim * 0.8, maxDim * 0.65, maxDim * 0.8];
  }, [room.width, room.length]);

  const handleDragEnd = useCallback((id, newX, newY) => {
    if (!onUpdateItem) return;
    const item = furniture.find(f => f.id === id);
    if (item) onUpdateItem({ ...item, x: newX, y: newY });
  }, [furniture, onUpdateItem]);

  const handleSelect = useCallback((id) => {
    if (onSelectItem) onSelectItem(id);
  }, [onSelectItem]);

  return (
    <div className="viewer-3d-container" style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 100 }}
        style={{ background: 'linear-gradient(180deg, #e8ecf1 0%, #d4dbe4 100%)' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onPointerMissed={() => onSelectItem && onSelectItem(null)}
      >
        {/* Realistic Lighting Setup */}
        <ambientLight intensity={0.25} color="#f0f0ff" />
        <directionalLight
          castShadow position={[4, 8, 6]} intensity={1.2} color="#fff8f0"
          shadow-mapSize-width={2048} shadow-mapSize-height={2048}
          shadow-camera-far={30} shadow-camera-left={-8} shadow-camera-right={8}
          shadow-camera-top={8} shadow-camera-bottom={-8}
          shadow-bias={-0.001}
        />
        <directionalLight position={[-3, 5, -2]} intensity={0.3} color="#d0e0ff" />
        <hemisphereLight intensity={0.35} color="#b8d4ff" groundColor="#8b7355" />

        <Room width={room.width} length={room.length} height={room.height}
          wallColor={room.wall_color || '#F5F5F0'} floorColor={room.floor_color || '#D4A574'}
          shape={room.shape || 'rectangular'} />

        {furniture.map((item) => (
          <InteractiveFurniture
            key={item.id} item={item}
            roomWidth={room.width} roomLength={room.length}
            isSelected={selectedId === item.id}
            onSelect={handleSelect} onDragEnd={handleDragEnd}
            orbitRef={orbitRef}
          />
        ))}

        <ContactShadows position={[0, 0.001, 0]} opacity={0.35}
          scale={Math.max(room.width, room.length) * 1.5} blur={2.5} far={4} color="#1a1a2e" />

        <OrbitControls ref={orbitRef} makeDefault
          minPolarAngle={0.1} maxPolarAngle={Math.PI / 2.05}
          minDistance={1} maxDistance={25}
          target={[0, 0.3, 0]}
          enableDamping dampingFactor={0.08}
        />

        <Environment preset="apartment" environmentIntensity={0.6} />
      </Canvas>
    </div>
  );
}