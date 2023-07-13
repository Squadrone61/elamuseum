import { Euler, Vector3 } from "three";

export type Piece = { key: number, name: string, url: string, pos: Vector3, rot: Euler, pieceRot?: Euler, scale?: number, nameYpos?: number };

export const pieceData: Array<Piece> = [
    { key: 0, name: 'Ağaç', url: 'ağaç.gltf', pos: new Vector3(-7.5, 10, 5), scale: 0.5, rot: new Euler(0, Math.PI, 0), nameYpos: 8 },
    { key: 1, name: 'Deneme', url: 'deneme.gltf', pos: new Vector3(-19, 12, -14), scale: 2, rot: new Euler(0, Math.PI / 2, 0) },
    { key: 2, name: 'Kırmızılı Siyahlı', url: 'kirsiy.gltf', pos: new Vector3(-19, 12, -51), scale: 0.5, rot: new Euler(0, Math.PI / 2, 0), pieceRot: new Euler(0, 0, 0) },
    { key: 3, name: 'Tost Makinesi', url: 'tostmak.gltf', pos: new Vector3(-19, 9, -84), scale: 0.4, rot: new Euler(0, Math.PI / 2, 0), pieceRot: new Euler(0, Math.PI, 0), nameYpos: 8 }
]