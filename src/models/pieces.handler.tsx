import { Args, Gltf, Html } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { Object3D } from "three";
import { Piece, pieceData } from "./piece.data";

const spotLightArgs: Args<any> = [undefined, undefined, 150, 0.4, 1]

const pieces = pieceData

function Model({ piece }: { piece: Piece }) {
    const ref = useRef() as RefObject<Object3D>;
    let active = false;
    useFrame(({ clock }) => {
        if (ref?.current && active) {
            ref.current.rotation.y = clock.getElapsedTime();
            ref.current.position.y = Math.sin(clock.getElapsedTime()) * 1.5 + piece.pos.y
        }
    })
    const onClickCb: ((event: ThreeEvent<MouseEvent>) => void) = (e) => {
        active = !active;
        if (!active) {
            ref.current?.position.copy(piece.pos)
            ref.current?.rotation.copy(piece.pieceRot || piece.rot)
        }
    }
    return <Gltf ref={ref} src={piece.url} position={piece.pos} scale={piece.scale} rotation={piece.pieceRot || piece.rot} castShadow onClick={onClickCb} />
}

function PiecesHandler(args: any) {
    const { scene } = useThree()
    return <>
        {pieces.map((piece) => {
            const target = new Object3D()
            target.position.copy(piece.pos)
            scene.add(target)
            return <group key={piece.key}>
                <spotLight args={spotLightArgs} position={piece.pos.clone().setY(piece.pos.y + 40)} target={target} castShadow />
                <Html occlude center transform distanceFactor={15} rotation={piece.rot} position={piece.pos.clone().setY(piece.pos.y + (piece.nameYpos || 5))}>
                    <div className="content">{piece.name}</div>
                </Html>
                <Model piece={piece} />
            </group>
        })}

    </>
}

export default PiecesHandler
