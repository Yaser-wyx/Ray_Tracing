import {Material} from "./Material";
import {Ray} from "../Ray";
import {HitRecord} from "../Object/HitRecord";
import {Vector3D} from "../Vector3D";
import assert = require("assert");

export class Dielectric extends Material {
    private refractiveIdx: number//折射率

    constructor(refractiveIdx: number = 1) {
        super();
        this.refractiveIdx = refractiveIdx;
    }

    scatter(rayIn: Ray, hitRecord: HitRecord, attenuationRate: Vector3D, scatteredRay: Ray): boolean {
        assert(hitRecord.normalUnitVec && hitRecord.hitPoint)
        attenuationRate.reset(1, 1, 1)
        let relativeRefractive = this.refractiveIdx
        if (hitRecord.isOutside) {
            //如果是在外表面，则折射率为1/refractiveIdx （默认物体外面是空气，空气折射率为1）
            relativeRefractive = 1 / relativeRefractive
        }
        let unitRayDirect = rayIn.direct.unitVector()

        let cosTheta = Math.min(unitRayDirect.negative().dot(hitRecord.normalUnitVec), 1)
        let sinTheta = Math.sqrt(1 - cosTheta * cosTheta)
        let reflectOrRefractedDirectVec: Vector3D//反射或折射光线方向
        let reflectProb = this.schlick(cosTheta, relativeRefractive)//计算反射系数近似

        if (relativeRefractive * sinTheta > 1 || Math.random() < reflectProb) {
            //如果大于1，则折射角度会出现无解，此时就是反射，或者产生随机数，如果随机出来的数比反射系数小就反射，否则就折射
            reflectOrRefractedDirectVec = this.reflect(unitRayDirect, hitRecord.normalUnitVec)
        } else {
            //折射
            reflectOrRefractedDirectVec = this.refract(unitRayDirect, hitRecord.normalUnitVec, relativeRefractive)
        }
        scatteredRay.reset(hitRecord.hitPoint, reflectOrRefractedDirectVec)
        return true;
    }
}
