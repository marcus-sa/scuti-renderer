import { RoomPart } from "./RoomPart.ts";
import { ITileConfiguration } from "../../../interfaces/ITileConfiguration.ts";
import { Room } from "../Room.ts";
import { Container, FederatedPointerEvent, Point, Polygon } from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";
import { EventManager } from "../../events/EventManager.ts";
import { Vector3D } from "../../../types/Vector.ts";
import {CubeFace} from "../../../enums/CubeFace.ts";

export class TilePart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();
    public eventManager: EventManager = new EventManager();

    constructor(
        public configuration: ITileConfiguration
    ) {
        super();

        this._registerEvents();
    }

    private _registerEvents(): void {
        this.container.onpointerdown = (event: FederatedPointerEvent) => this.eventManager.handlePointerDown({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerup = (event: FederatedPointerEvent) => this.eventManager.handlePointerUp({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointermove = (event: FederatedPointerEvent) => this.eventManager.handlePointerMove({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerout = (event: FederatedPointerEvent) => this.eventManager.handlePointerOut({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
        this.container.onpointerover = (event: FederatedPointerEvent) => this.eventManager.handlePointerOver({
            position: this.getGlobalTilePosition(event.global),
            dragging: this.room.camera.hasDragged,
        });
    }

    public render(): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);
        const cube: Cube = new Cube({
            layer: this.room.renderer.layer,
            zOrders: {
                [CubeFace.TOP]: this.configuration.position.z * 10000,
                [CubeFace.LEFT]: -(this.room.heightMap.heightMap[0].length - this.configuration.size.y) + this.configuration.position.y + this.configuration.position.z,
                [CubeFace.RIGHT]: -(this.room.heightMap.heightMap.length - this.configuration.size.x) + this.configuration.position.x + this.configuration.position.z
            },
            material: material,
            size: {
                x: this.configuration.size.x,
                y: this.configuration.size.y,
                z: this.configuration.thickness / 32
            }
        });

        this.container.hitArea = new Polygon(
            new Point(0, 0),
            new Point(32 * this.configuration.size.y, -16 * this.configuration.size.y),
            new Point(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1)),
            new Point(32 * this.configuration.size.x, 16 * this.configuration.size.x),
            new Point(0, 0)
        );

        this.container.eventMode = "static";
        this.container.addChild(cube);
        this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.size.y - 1);
        this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.size.y - 1) - 32 * this.configuration.position.z;

        this.room.visualization.container.addChild(this.container);
    }

    public getGlobalTilePosition(point: Point): Vector3D {
        const localPosition: Point = this.container.toLocal(point);
        const localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
            localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64 - 0.01) + this.configuration.size.y;
        return {
            x: localX + this.configuration.position.x,
            y: localY + this.configuration.position.y,
            z: this.configuration.position.z
        }
    }
}
