import {Ray} from "../Ray";
import {HitRecord} from "./HitRecord";
import {Material} from "../Material/Material";
import {Vector3D} from "../Vector3D";


export abstract class Hittable {
    material:Material|undefined


    hit(ray: Ray, tMin: number, tMax: number, hitRecord: HitRecord): boolean{
        return true
    }
}

