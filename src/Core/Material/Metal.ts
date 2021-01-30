import {Material} from "./Material";
import {Vector3D} from "../Vector3D";
import {Ray} from "../Ray";
import {HitRecord} from "../Object/HitRecord";
import assert = require("assert");

export class Metal extends Material {
    private fuzz: number

    constructor(albedo: Vector3D, fuzz: number = 0) {
        super();
        this.albedo = albedo
        this.fuzz = Math.min(fuzz, 1)
    }

    scatter(rayIn: Ray, hitRecord: HitRecord, attenuationRate: Vector3D, scatteredRay: Ray): boolean {
        assert(hitRecord.normalUnitVec && hitRecord.hitPoint)
        let reflectDirect = this.reflect(rayIn.direct.unitVector(), hitRecord.normalUnitVec)//金属材质进行全反射
        reflectDirect = reflectDirect.add(hitRecord.randomInHemisphere().mul(this.fuzz))
        scatteredRay.clone(new Ray(hitRecord.hitPoint, reflectDirect))//散射光线就是反射光线
        assert(this.albedo)
        attenuationRate.clone(this.albedo)
        return reflectDirect.dot(hitRecord.normalUnitVec) > 0//小于0则表示光被吸收了
    }
}