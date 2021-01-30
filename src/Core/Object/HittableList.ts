import {Hittable} from "./Hittable";
import {Ray} from "../Ray";
import * as assert from "assert";
import {HitRecord} from "./HitRecord";

export class HittableList {
    private objectList: Array<Hittable> = []

    constructor(object?: Hittable) {
        if (object) {
            this.add(object)
        }
    }

    clear() {
        this.objectList = []
    }

    add(object: Hittable) {
        this.objectList.push(object)
    }

    //使用传入的一束光线对所有的物体进行碰撞检测，如果会发生碰撞，则将碰撞进行记录
    hitPerObject(ray: Ray, tMin: number, tMax: number, hitRecord: HitRecord): boolean {
        let tempHitRecord = new HitRecord();
        let hasHit = false;
        let hitDistance = tMax//击中的距离由远及近
        //从前遍历所有的object
        for (let i = 0; i < this.objectList.length; i++) {
            const object = this.objectList[i]
            if (object.hit(ray, tMin, hitDistance, tempHitRecord)) {
                //尝试用光线与object进行hit，如果成功，则返回true，且将hit的结果保存到tempHitRecord中
                hasHit = true
                assert(tempHitRecord.t != null)
                hitDistance = tempHitRecord.t
                hitRecord.clone(tempHitRecord)//hitRecord只保存最后一个与光线hit的hit记录，也就是在眼睛最前面的物体
            }
        }
        return hasHit;
    }
}