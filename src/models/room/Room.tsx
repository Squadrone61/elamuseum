import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube006: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function Room(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/room.gltf") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials["Material.003"]}
        position={[-37.087, 10.913, -452.537]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={5146.735}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.010"]}
        position={[-11.63, 32.765, -573.269]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[30.374, 27.281, 32.628]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.002"]}
        position={[-11.63, 32.765, -573.269]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[30.374, 27.281, 32.628]}
      />
    </group>
  );
}

useGLTF.preload("/models/room.gltf");