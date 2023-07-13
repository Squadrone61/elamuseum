import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Camera, Vector3 } from "three";
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { ControlState, usePlayerControls } from "./usePlayerControls";

const STEPS_PER_FRAME = 5
const SPEED_MULTIPLIER = 150

function getForwardVector(camera: Camera, playerDirection: Vector3) {
  camera.getWorldDirection(playerDirection)
  playerDirection.y = 0
  playerDirection.normalize()
  return playerDirection
}

function getSideVector(camera: Camera, playerDirection: Vector3) {
  camera.getWorldDirection(playerDirection)
  playerDirection.y = 0
  playerDirection.normalize()
  playerDirection.cross(camera.up)
  return playerDirection
}

function controls(
  camera: Camera,
  delta: number,
  playerVelocity: Vector3,
  playerDirection: Vector3,
  { forward, backward, left, right }: ControlState,
  external: ControlState,
) {
  const speedDelta = delta * SPEED_MULTIPLIER;
  (left || external.left) &&
    playerVelocity.add(
      getSideVector(camera, playerDirection).multiplyScalar(-speedDelta)
    );
  (right || external.right) &&
    playerVelocity.add(
      getSideVector(camera, playerDirection).multiplyScalar(speedDelta)
    );
  (forward || external.forward) &&
    playerVelocity.add(
      getForwardVector(camera, playerDirection).multiplyScalar(speedDelta)
    );
  (backward || external.backward) &&
    playerVelocity.add(
      getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta)
    )
}

function updatePlayer(
  camera: Camera,
  delta: number,
  capsule: any,
  playerVelocity: Vector3,
) {
  let damping = Math.exp(-4 * delta) - 1
  playerVelocity.addScaledVector(playerVelocity, damping)
  const deltaPosition = playerVelocity.clone().multiplyScalar(delta)
  capsule.translate(deltaPosition)
  camera.position.copy(capsule.end)
}

function PlayerControls({ externalControls }: { externalControls: ControlState }) {
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const capsule = useMemo(
    () => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 10, 0), 0.5),
    []
  )
  const kboard = usePlayerControls();

  useFrame(({ camera }, delta) => {
    controls(
      camera,
      delta,
      playerVelocity,
      playerDirection,
      kboard,
      externalControls
    )
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      updatePlayer(
        camera,
        deltaSteps,
        capsule,
        playerVelocity
      )
    }
  })

  return (<></>)

}

export default PlayerControls