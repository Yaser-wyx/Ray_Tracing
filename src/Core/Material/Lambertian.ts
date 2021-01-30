import {Material} from "./Material";
import {Ray} from "../Ray";
import {HitRecord} from "../Object/HitRecord";
import {Vector3D} from "../Vector3D";
import assert = require("assert");

export class Lambertian extends Material {
    protected albedo: Vector3D; //反射率

    constructor(albedo: Vector3D = new Vector3D(0.5, 0.5, 0.5)) {
        super()
        this.albedo = albedo;

    }

    scatter(rayIn: Ray, hitRecord: HitRecord, attenuationRate: Vector3D, scatteredRay: Ray) {
        assert(hitRecord.hitPoint && hitRecord.normalUnitVec)
        let scatterDirect = hitRecord.normalUnitVec.add(hitRecord.randomInHemisphere())
        scatteredRay.clone(new Ray(hitRecord.hitPoint, scatterDirect))
        attenuationRate.clone(this.albedo)
        return true
    }
}