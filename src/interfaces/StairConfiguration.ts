import { Direction, Position3D } from "./Position.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";

export interface StairConfiguration {
    material?: FloorMaterial;
    position: Position3D;
    length: number;
    direction: Direction;
}
