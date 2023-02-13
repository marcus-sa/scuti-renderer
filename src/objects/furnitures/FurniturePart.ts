import {Assets, BLEND_MODES, Container, Spritesheet} from "pixi.js";
import {FloorFurniture} from "./FloorFurniture";
import {WallFurniture} from "./WallFurniture";
import {FurnitureLayer} from "./FurnitureLayer";
import {FurnitureFrameId, FurnitureLayerId, IFurnitureVisualization} from "../../interfaces/Furniture.interface";

export class FurniturePart extends Container {

    private _furniture: FloorFurniture | WallFurniture;

    private _layer: number;

    private _frame: number;

    constructor(
        furniture: FloorFurniture | WallFurniture,
        layer: number
    ) {
        super();

        this._furniture = furniture;
        this._layer = layer;

        this._draw();
    }

    private _draw(): void {
        this.removeChild(this.children[0]);

        const visualization: IFurnitureVisualization = this._furniture.visualization.property.visualization;
        const spritesheet: Spritesheet = this._furniture.visualization.spritesheet;

        let alpha: number = 1;
        let tint: number;
        let z: number;
        let blendMode: BLEND_MODES;
        let flip: boolean = false;
        let frame: number = 0;
        let ignoreMouse: boolean = false;
        let tag: string;

        if(visualization.directions.indexOf(this._furniture.direction) === -1) {
            this._furniture.direction = visualization.directions[0];
        }

        if (visualization.animation[this._furniture.state] !== undefined && visualization.animation[this._furniture.state][this._layer] !== undefined && visualization.animation[this._furniture.state][this._layer].frameSequence.length > 1) {
            frame = this._frame;
        }

        if (visualization.animation[this._furniture.state] !== undefined && visualization.animation[this._furniture.state][this._layer] !== undefined) {
            frame = visualization.animation[this._furniture.state][this._layer].frameSequence[frame] ?? 0;
        }

        if(this._furniture.data.color !== null && visualization.colors[this._furniture.data.color] !== undefined && visualization.colors[this._furniture.data.color][this._layer] !== undefined) {
            tint = Number('0x' + visualization.colors[this._furniture.data.color][this._layer]);
        }

        if(visualization.layers[this._layer] !== undefined) {
            if(visualization.layers[this._layer].z !== undefined) z = visualization.layers[this._layer].z;
            if(visualization.layers[this._layer].alpha !== undefined) alpha = visualization.layers[this._layer].alpha / 255;
            if(visualization.layers[this._layer].ink !== undefined) blendMode = BLEND_MODES.ADD;
            if(visualization.layers[this._layer].ignoreMouse !== undefined) ignoreMouse = visualization.layers[this._layer].ignoreMouse;
            if(visualization.layers[this._layer].tag !== undefined) tag = visualization.layers[this._layer].tag;
        }

        if(spritesheet.data.frames[this._furniture.data.baseName + '_' + this._furniture.data.baseName + '_64_' + String.fromCharCode(97 + Number(this._layer)) + '_' + this._furniture.direction + '_' + frame] !== undefined) {
            flip = spritesheet.data.frames[this._furniture.data.baseName + '_' + this._furniture.data.baseName + '_64_' + String.fromCharCode(97 + Number(this._layer)) + '_' + this._furniture.direction + '_' + frame]['flipH'];
        }

        this.addChild(new FurnitureLayer(this._furniture, {
            layer: String.fromCharCode(97 + Number(this._layer)),
            alpha: alpha,
            tint: tint,
            z: z,
            blendMode: blendMode,
            flip: flip,
            frame: frame,
            ignoreMouse: ignoreMouse,
            direction: this._furniture.direction,
            tag: tag
        }));
    }

    public nextFrame(): void {
        const visualization: IFurnitureVisualization = this._furniture.visualization.property.visualization;
        if(visualization.animation[String(this._furniture.state)] !== undefined && visualization.animation[String(this._furniture.state)][this._layer] !== undefined) {
            const frameSequence: number[] = visualization.animation[String(this._furniture.state)][this._layer].frameSequence;
            const currentFrame: number = this._frame;
            if(frameSequence.length > 1)  {
                if ((frameSequence.length - 1) > currentFrame) {
                    this._frame = currentFrame + 1;
                } else {
                    this._frame = 0;
                }
                this._draw();
            }
        }
    }

}
