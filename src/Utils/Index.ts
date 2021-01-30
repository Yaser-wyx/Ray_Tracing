import * as fs from "fs";


export function rangeIn(origin: number, min: number, max: number) {
    return origin >= min && origin <= max
}

export const INFINITY = Number.MAX_SAFE_INTEGER

export const PI = Math.PI

export function degreesToRadians(degrees: number) {
    //角度转弧度
    return degrees * PI / 180
}

export function randomIn(min: number=0, max: number=1) {
    return min + Math.random() * (max - min)
}

export function clamp(x: number, min: number, max: number) {
    if (x < min) return min
    if (x > max) return max
    return x
}

export async function writeToFile(data: any, path: string) {
    data = JSON.stringify(data)
    fs.writeFileSync(path, data, 'utf8')
    console.log("data writing finish")
}


