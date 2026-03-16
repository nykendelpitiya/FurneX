import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function ChairModel({ position }) {

  const { scene } = useGLTF("/models/1772283000-SheenChair.glb")

  return <primitive object={scene} position={position} scale={1} />
}

function TableModel({ position }) {

  const { scene } = useGLTF("/models/1772778879493-106173076.glb")

  return <primitive object={scene} position={position} scale={1} />
}

export default function Room3D() {

  return (

    <Canvas camera={{ position: [5,5,5], fov:50 }}>

      <ambientLight intensity={0.6}/>
      <directionalLight position={[5,5,5]}/>

      {/* floor */}
      <mesh rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[10,10]}/>
        <meshStandardMaterial color="#d6b37a"/>
      </mesh>

      {/* models */}
      <ChairModel position={[0,0,0]} />
      <TableModel position={[2,0,1]} />

      <OrbitControls/>

    </Canvas>
  )
}