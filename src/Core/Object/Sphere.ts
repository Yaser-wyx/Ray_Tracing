import {Hittable} from "./Hittable";
import {Ray} from "../Ray";
import {Vector3D} from "../Vector3D";
import {rangeIn} from "../../Utils";
import {HitRecord} from "./HitRecord";
import {Material} from "../Material/Material";
import {Lambertian} from "../Material/Lambertian";

export class Sphere implements Hittable {
    center: Vector3D;
    radius: number;
    material: Material;

    constructor(center: Vector3D, radius: number, material: Material = new Lambertian()) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    }

    hit(ray: Ray, tMin: number, tMax: number, hitRecord: HitRecord): boolean {
        let originCenterVec = ray.origin.sub(this.center)
        let a = ray.direct.lengthSquared()
        let halfB = Vector3D.dot(ray.direct, originCenterVec)
        let c = originCenterVec.lengthSquared() - this.radius * this.radius
        let delta = halfB * halfB - a * c
        const sqrtDelta = Math.sqrt(delta)
        let root = (-halfB - sqrtDelta) / a//先判断近的根

        if (!rangeIn(root, tMin, tMax)) {
            //如果第一个根不在这个范围里，那么继续判断另一个根
            root = (-halfB + sqrtDelta) / a
            if (!rangeIn(root, tMin, tMax)) {
                //两个根都不在范围里
                return false
            }
        }

        hitRecord.t = root//将计算出来的参数值赋值给该点的撞击记录
        hitRecord.hitPoint = ray.at(root)//计算光线撞击点坐标
        const outsideNormal = hitRecord.hitPoint.sub(this.center).div(this.radius)// 计算外表面法线单位向量
        hitRecord.setNormal(ray, outsideNormal)
        hitRecord.material = this.material
        return true
    }

}