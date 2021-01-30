import {Ray} from "../Ray";
import {Vector3D} from "../Vector3D";
import {HitRecord} from "../Object/HitRecord";

//材质
export abstract class Material {
    protected albedo: Vector3D | undefined

    /**
     * 进行反射
     * @param rayIn             射入的光线
     * @param hitRecord         光线碰撞记录
     * @param attenuationRate   光线衰减率
     * @param scatteredRay      漫反射光线
     */
    scatter(rayIn: Ray, hitRecord: HitRecord, attenuationRate: Vector3D, scatteredRay: Ray): boolean {
        return true
    }

    //反射
    reflect(inVec: Vector3D, normalVec: Vector3D): Vector3D {
        let projectionLen = Vector3D.dot(inVec, normalVec)//入射光线向量在法向量上投影的长度
        //全反射公式 V+2*V·N*N （V为入射光线，(2*V·N*N)：方向为法向量，长度为V在法向量上投影的2倍（V·N即为投影长度）
        // 注：因为V与N方向相反，所以V·N为负值，因此要加个负号
        return inVec.sub(normalVec.mul(2 * projectionLen))
    }

    /**
     * 折射
     * @param unitRayDirect             单位入射光线的方向向量
     * @param normalVec                 表面法向量
     * @param relativeRefraction        相对折射率两种介质折射率之比
     * @return Vector3D                 返回折射后的光线向量
     */
    refract(unitRayDirect: Vector3D, normalVec: Vector3D, relativeRefraction: number): Vector3D {
        let cosTheta = unitRayDirect.negative().dot(normalVec)
        let outParallel = unitRayDirect.add(normalVec.mul(cosTheta)).mul(relativeRefraction)
        let outPerp = normalVec.mul(Math.sqrt(1 - outParallel.lengthSquared())).negative()
        return outParallel.add(outPerp)
    }

    //计算反射系数
    schlick(cosine: number, refractiveIdx: number) {
        let r0 = (1 - refractiveIdx) / (1 + refractiveIdx)
        r0 *= r0
        return r0 + (1 - r0) * Math.pow(1 - cosine, 5)
    }

}