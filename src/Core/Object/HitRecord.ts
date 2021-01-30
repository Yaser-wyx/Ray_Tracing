//撞击点信息
import {Vector3D} from "../Vector3D";
import {Ray} from "../Ray";
import assert = require("assert");
import {Material} from "../Material/Material";
import {randomIn} from "../../Utils";

export class HitRecord {
    private _hitPoint: Vector3D | undefined//相交点
    private _normalUnitVec: Vector3D | undefined//交点单位法向量，方向永远与入射光线相反
    private _t: number | undefined//交点对应的光线的参数t值
    private _isOutside: boolean | undefined//是否是外表面
    private _material: Material | undefined

    get material(): Material | undefined {
        return this._material;
    }

    set material(value: Material | undefined) {
        this._material = value;
    }

    set hitPoint(value: Vector3D | undefined) {
        this._hitPoint = value;
    }

    set normalUnitVec(value: Vector3D | undefined) {
        this._normalUnitVec = value;
    }

    set t(value: number | undefined) {
        this._t = value;
    }

    set isOutside(value: boolean | undefined) {
        this._isOutside = value;
    }

    get hitPoint(): Vector3D | undefined {
        return this._hitPoint;
    }

    get normalUnitVec(): Vector3D | undefined {
        return this._normalUnitVec;
    }

    get t(): number | undefined {
        return this._t;
    }

    get isOutside(): boolean | undefined {
        return this._isOutside;
    }

    constructor(hitPoint?: Vector3D | undefined, normalUnitVec?: Vector3D | undefined, t?: number | undefined, isOutside?: boolean | undefined) {
        this._hitPoint = hitPoint;
        this._normalUnitVec = normalUnitVec;
        this._t = t;
        this._isOutside = isOutside;
    }

    /**
     *
     * @param ray           入射光线
     * @param outwardNormal 指向物体外侧的单位向量
     */
    setNormal(ray: Ray, outwardNormal: Vector3D) {
        this._isOutside = Vector3D.dot(outwardNormal, ray.direct) < 0 //如果小于0，则表示在外表面，入射光线与外法向量相反
        //设置法向量
        this._normalUnitVec = this._isOutside ? outwardNormal : outwardNormal.negative()
    }

    randomInHemisphere(): Vector3D {
        let randomReflect = Vector3D.randomUnitVector()
        assert(this._normalUnitVec !== undefined)
        if (Vector3D.dot(this._normalUnitVec, randomReflect) > 0) {
            return randomReflect
        } else {
            return randomReflect.negative()
        }
    }



    clone(hitRecord: HitRecord) {
        this._hitPoint = hitRecord._hitPoint
        this._t = hitRecord._t
        this._normalUnitVec = hitRecord._normalUnitVec
        this._isOutside = hitRecord._isOutside
        this._material = hitRecord._material
    }
}