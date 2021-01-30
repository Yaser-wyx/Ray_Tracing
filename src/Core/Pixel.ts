import {Vector3D} from "./Vector3D";
import {clamp} from "../Utils";
import assert = require("assert");

export class Pixel {
    private _vector: Vector3D | undefined //向量用来表示rgb各分量上的长度
    private _r: number
    private _g: number
    private _b: number
    private _alpha: number //透明度

    constructor(vector?: Vector3D, rgb: number[] = [255, 255, 255], alpha: number = 255) {
        this._vector = vector;
        this._r = rgb[0];
        this._g = rgb[1];
        this._b = rgb[2];
        this._alpha = alpha
    }


    set vector(value: Vector3D) {
        this._vector = value;
    }

    private setRGBByScale(samplePerPixel: number) {
        let scale = 1 / samplePerPixel
        assert(this._vector !== undefined)
        this._r = Math.sqrt(scale * this._vector.x)
        this._g = Math.sqrt(scale * this._vector.y)
        this._b = Math.sqrt(scale * this._vector.z)

    }

    writePixel(data: Array<number>, samplePerPixel: number, index: number) {
        this.setRGBByScale(samplePerPixel)
        data[index++] = 256 * clamp(this._r, 0, 0.999)
        data[index++] = 256 * clamp(this._g, 0, 0.999)
        data[index++] = 256 * clamp(this._b, 0, 0.999)
        data[index++] = this._alpha
    }
}