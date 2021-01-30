import {Vector3D} from "./Vector3D";
import {Ray} from "./Ray";
import {degreesToRadians} from "../Utils";

export class Camera {
    private renderStartVec: Vector3D
    private horizontal: Vector3D
    private vertical: Vector3D
    private readonly origin: Vector3D
    private u: Vector3D
    private v: Vector3D
    private w: Vector3D
    lensRadius: number

    constructor(lookFrom: Vector3D, lookAt: Vector3D, vup: Vector3D,
                verticalView: number, aspect: number, aperture: number, focusDist: number) {

        let theta = degreesToRadians(verticalView)//角度转弧度
        let halfHeight = Math.tan(theta / 2) //注：该宽与高是比值
        let halfWidth = halfHeight * aspect

        this.lensRadius = aperture / 2
        this.w = lookFrom.sub(lookAt).unitVector()
        this.u = vup.cross(this.w).unitVector()
        this.v = this.w.cross(this.u).unitVector()

        this.origin = lookFrom

        this.renderStartVec = lookFrom.sub(this.u.mul(halfWidth * focusDist))
            .sub(this.v.mul(halfHeight * focusDist))
            .sub(this.w.mul(focusDist)) //起点：左下角
        this.horizontal = this.u.mul(halfWidth * 2 * focusDist)//屏幕水平宽度
        this.vertical = this.v.mul(halfHeight * 2 * focusDist)//屏幕垂直高度
    }

    getRay(u: number, v: number): Ray {
        let randomVec = Vector3D.randomInUnitDisk().mul(this.lensRadius)
        let offSet = this.u.mul(randomVec.x).add(this.v.mul(randomVec.y))
        let xVec = this.horizontal.mul(u)//x轴移动长度
        let yVec = this.vertical.mul(v)//y轴移动长度
        let sightVec = this.renderStartVec.add(xVec).add(yVec).sub(this.origin).sub(offSet)//视线向量

        return new Ray(this.origin.add(offSet), sightVec)//光线的方向，从眼睛到屏幕
    }
}