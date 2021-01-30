import {PI, randomIn} from "../Utils";

type V = number | Vector3D

/** 向量类，用于向量操作
 *  所有对向量的操作都不影响原向量
 */
export class Vector3D {
    private _x: number
    private _y: number
    private _z: number


    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this._x = x
        this._y = y
        this._z = z
    }

    clone(vec: Vector3D) {
        this._x = vec._x
        this._y = vec._y
        this._z = vec._z
    }

    //从一个单位圆盘中随机选取光线
    static randomInUnitDisk() {
        let vec: Vector3D
        while (true) {
            vec = new Vector3D(randomIn(-1, 1), randomIn(-1, 1), 0)
            if (vec.lengthSquared() < 1) break
        }
        return vec
    }

    reset(x: number, y: number, z: number) {
        this._x = x
        this._y = y
        this._z = z
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    get z() {
        return this._z
    }

    //求得一条随机的单位向量
    static randomUnitVector() {
        let a = randomIn(0, 2 * PI)
        let z = randomIn(-1, 1)
        let r = Math.sqrt(1 - z * z)

        return new Vector3D(r * Math.cos(a), r * Math.sin(a), z)
    }

    static randomIn(min: number = 0, max: number = 1) {
        return new Vector3D(randomIn(min,max),randomIn(min,max),randomIn(min,max))
    }

    private static convert2Vector(vectorValue: V): Vector3D {
        return typeof vectorValue == "number" ? new Vector3D(vectorValue, vectorValue, vectorValue) : vectorValue
    }

    static add(Vec1: V, Vec2: V): Vector3D {

        let tempVec1 = this.convert2Vector(Vec1)
        let tempVec2 = this.convert2Vector(Vec2)

        return new Vector3D(tempVec1._x + tempVec2._x, tempVec1._y + tempVec2._y, tempVec1._z + tempVec2._z)
    }

    static sub(Vec1: V, Vec2: V): Vector3D {
        let tempVec1 = this.convert2Vector(Vec1)
        let tempVec2 = this.convert2Vector(Vec2)

        return new Vector3D(tempVec1._x - tempVec2._x, tempVec1._y - tempVec2._y, tempVec1._z - tempVec2._z)
    }


    static mul(Vec1: V, Vec2: V): Vector3D {
        let tempVec1 = this.convert2Vector(Vec1)
        let tempVec2 = this.convert2Vector(Vec2)

        return new Vector3D(tempVec1._x * tempVec2._x, tempVec1._y * tempVec2._y, tempVec1._z * tempVec2._z)
    }

    static div(Vec1: V, Vec2: V): Vector3D {
        let tempVec1 = Vector3D.convert2Vector(Vec1)
        let tempVec2 = Vector3D.convert2Vector(Vec2)

        return new Vector3D(tempVec1._x / tempVec2._x, tempVec1._y / tempVec2._y, tempVec1._z / tempVec2._z)
    }

    static dot(Vec1: Vector3D, Vec2: Vector3D): number {
        return Vec1._x * Vec2._x + Vec1._y * Vec2._y + Vec1._z * Vec2._z;
    }

    static cross(Vec1: Vector3D, Vec2: Vector3D): Vector3D {
        return new Vector3D(
            (Vec1._y * Vec2._z - Vec1._z * Vec2._y),
            (Vec1._z * Vec2._x - Vec1._x * Vec2._z),
            (Vec1._x * Vec2._y - Vec1._y * Vec2._x))
    }

    static negative(vec: Vector3D): Vector3D {
        return new Vector3D(-vec._x, -vec._y, -vec._z,)
    }

    add(vec: V): Vector3D {
        return Vector3D.add(this, vec)
    }

    sub(vec: V): Vector3D {
        return Vector3D.sub(this, vec)
    }

    cross(vec: Vector3D): Vector3D {
        return Vector3D.cross(this, vec)
    }

    mul(vec: V): Vector3D {
        return Vector3D.mul(this, vec)
    }

    div(vec: V): Vector3D {
        return Vector3D.div(this, vec)
    }

    unitVector(): Vector3D {
        return this.div(this.length())
    }

    length(): number {
        return Math.sqrt(this.lengthSquared())
    }

    negative(): Vector3D {
        return Vector3D.negative(this)
    }

    dot(vec: Vector3D) {
        return Vector3D.dot(this, vec)
    }

    lengthSquared(): number {
        return this._x * this._x + this._y * this._y + this._z * this._z
    }
}