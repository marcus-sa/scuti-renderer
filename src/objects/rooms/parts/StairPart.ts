import { RoomPart } from "./RoomPart.ts";
import { Room } from "../Room.ts";
import {Container, FederatedPointerEvent, Graphics, Point, Polygon} from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";
import { StairConfiguration } from "../../../interfaces/StairConfiguration.ts";
import { Direction, Position2D, Position3D } from "../../../interfaces/Position.ts";
import { CubeFace } from "../../../interfaces/CubeFace.ts";
import { StairCorner } from "../../../interfaces/StairCorner.ts";
import { EventManager } from "../../events/EventManager.ts";

export class StairPart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();
    public eventManager: EventManager = new EventManager();

    constructor(
        public configuration: StairConfiguration
    ) {
        super();

        this._registerEvents();
    }

    private _registerEvents(): void {
        this.container.onpointerdown = (event: FederatedPointerEvent) => this.eventManager.handlePointerDown({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerup = (event: FederatedPointerEvent) => this.eventManager.handlePointerUp({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointermove = (event: FederatedPointerEvent) => this.eventManager.handlePointerMove({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerout = (event: FederatedPointerEvent) => this.eventManager.handlePointerOut({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerover = (event: FederatedPointerEvent) => this.eventManager.handlePointerOver({
            position: this.getGlobalTilePosition(event.global),
        });
    }

    public render(): void {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
            this.container.x = 32 * this.configuration.position.x - 32 * this.configuration.position.y;
            this.container.y = 16 * this.configuration.position.x + 16 * this.configuration.position.y - 32 * this.configuration.position.z;
        } else {
            this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.length);
            this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.length) - 32 * this.configuration.position.z;
        }

        switch (this.configuration.direction) {
            case Direction.NORTH:
                this.container.x -= 32;
                this.container.y += 16;
                this._renderStair({
                    x: 8,
                    y: -12
                });
                break;
            case Direction.WEST:
                this.container.y -= 24;
                this._renderStair({
                    x: 8,
                    y: 12
                });
                break;
            case Direction.SOUTH:
                this.container.x += 24;
                this.container.y -= 12;
                this._renderStair({
                    x: -8,
                    y: -4
                });
                break;
            case Direction.EAST:
                this.container.x += 24;
                this.container.y -= 12;
                this._renderStair({
                    x: -8,
                    y: 4
                });
                break;
        }

        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
            this.container.hitArea = new Polygon(
                new Point(0, 0),
                new Point(32 * 1, -16 * 1),
                new Point(32 * (this.configuration.length + 1) + 32 * (1 - 1), -16 * (1 - 1) + 16 * (this.configuration.length - 1)),
                new Point(32 * this.configuration.length, 16 * this.configuration.length),
                new Point(0, 0)
            );
        } else {
            this.container.hitArea = new Polygon(
                new Point(0, 32),
                new Point(32 * this.configuration.length, -16 * this.configuration.length + 32),
                new Point(64 + 32 * (this.configuration.length - 1), -16 * (this.configuration.length - 1) + 32),
                new Point(32, 48),
                new Point(0, 32)
            );
        }

        this.container.eventMode = "static";
    }

    private _renderStair(offsets: Position2D): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);

        for (let i: number = 0; i < 4; i++) {
            const size: Position3D = {
                x: this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH ? this.configuration.length : 8 / 32,
                y: this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST ? this.configuration.length : 8 / 32,
                z: this.configuration.thickness / 32
            }

            if (this.configuration.leftCorner == StairCorner.OUTER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.leftCorner == StairCorner.OUTER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * (3 - i);
            }

            if (this.configuration.rightCorner == StairCorner.OUTER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x -= (8 / 32) * i;
            } else if (this.configuration.rightCorner == StairCorner.OUTER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y += (8 / 32) * (i - 3);
            }

            if (this.configuration.leftCorner == StairCorner.INNER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x += (8 / 32) * (i - 3);
            } else if (this.configuration.leftCorner == StairCorner.INNER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * i;
            }

            if (this.configuration.rightCorner == StairCorner.INNER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                size.x += (8 / 32) * (i - 3);
            } else if (this.configuration.rightCorner == StairCorner.INNER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                size.y -= (8 / 32) * i;
            }

            const textureOffset: Position2D = {
                x: 0,
                y: 0
            }

            if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
                switch (this.configuration.leftCorner) {
                    case StairCorner.NONE:
                        textureOffset.x = 0;
                        textureOffset.y = 0;
                        break;
                    case StairCorner.OUTER:
                        textureOffset.x = -i * 8;
                        textureOffset.y = -i * 4;
                        break;
                    case StairCorner.INNER:
                        textureOffset.x = (i + 1) * 8;
                        textureOffset.y = (i + 1) * 4;
                        break;
                }
            } else {
                switch (this.configuration.leftCorner) {
                    case StairCorner.NONE:
                        textureOffset.x = 8;
                        textureOffset.y = 4;
                        break;
                    case StairCorner.OUTER:
                        textureOffset.x = (i + 2) * 8;
                        textureOffset.y = -i * 4;
                        break;
                    case StairCorner.INNER:
                        textureOffset.x = -i * 8;
                        textureOffset.y = (i + 2) * 4;
                        break;
                }
            }

            const cube: Cube = new Cube({
                material: material,
                size: size,
                offsets: {
                    [CubeFace.TOP]: textureOffset,
                    [CubeFace.LEFT]: textureOffset,
                    [CubeFace.RIGHT]: textureOffset
                }
            });

            cube.x = offsets.x * i;
            cube.y = offsets.y * i;

            if (this.configuration.leftCorner == StairCorner.OUTER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                cube.x += 8 * i;
                cube.y += 4 * i;
            } else if (this.configuration.leftCorner == StairCorner.OUTER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                cube.x += 8 * (3 - i);
                cube.y -= 4 * (3 - i);
            }

            if (this.configuration.leftCorner == StairCorner.INNER && (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)) {
                cube.x += 8 * (3 - i);
                cube.y += 4 * (3 - i);
            } else if (this.configuration.leftCorner == StairCorner.INNER && (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)) {
                cube.x += 8 * i;
                cube.y -= 4 * i;
            }

            if (this.configuration.direction === Direction.EAST) cube.zIndex = -i;

            this.container.addChild(cube);
        }
    }

    public getGlobalTilePosition(point: Point): Position3D {
        const localPosition: Point = this.container.toLocal(point);
        let localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
            localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64);
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
            localY += 1;
        } else {
            localY += this.configuration.length;
        }
        return {
            x: localX + this.configuration.position.x,
            y: localY + this.configuration.position.y,
            z: this.configuration.position.z
        }
    }
}
