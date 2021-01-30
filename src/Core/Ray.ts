import {Vector3D} from "./Vector3D";
import {HittableList} from "./Object/HittableList";
import assert = require("assert");
import {HitRecord} from "./Object/HitRecord";

export class Ray {
    private _origin: Vector3D
    private _direct: Vector3D

    constructor(origin: Vector3D = new Vector3D(0, 0, 0), direct: Vector3D = new Vector3D(0, 0, 0)) {
        this._origin = origin;
        this._direct = direct;
    }

    clone(ray: Ray) {
        this._origin = ray.origin;
        this._direct = ray.direct;
    }

    reset(origin:Vector3D,direct:Vector3D){
        this._origin = origin;
        this._direct = direct;
    }
    set origin(value: Vector3D) {
        this._origin = value;
    }

    set direct(value: Vector3D) {
        this._direct = value;
    }

    get origin(): Vector3D {
        return this._origin;
    }

    get direct(): Vector3D {
        return this._direct;
    }

    at(t: number): Vector3D {
        return this.origin.add(this.direct.mul(t))
    }

    static getRayColor(ray: Ray, world: HittableList, stackDepth: number): Vector3D {
        if (stackDepth <= 0) {
            return new Vector3D(0, 0, 0)
        }
        let hitRecord = new HitRecord()
        if (world.hitPerObject(ray, 0.001, Infinity, hitRecord)) {
            assert(hitRecord.normalUnitVec && hitRecord.hitPoint && hitRecord.material)
            let scatteredRay: Ray = new Ray()
            let attenuationRate: Vector3D = new Vector3D()//光线衰减率
            if (hitRecord.material?.scatter(ray, hitRecord, attenuationRate, scatteredRay)) {
                return attenuationRate.mul(this.getRayColor(scatteredRay, world, stackDepth - 1))
            }
            return new Vector3D(0, 0, 0)
        }
        let unitDirection = ray.direct.unitVector()//光线的单位向量
        let t = (unitDirection.y + 1) * 0.5//将y轴分量映射到0~1之间
        //线性插值公式: (1-t) * start_value + t * end_value
        let startVal = new Vector3D(1, 1, 1)//开始颜色
        let endVal = new Vector3D(0.5, 0.7, 1)//结束颜色
        return startVal.mul(1 - t).add(endVal.mul(t))
    }

}