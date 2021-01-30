import {Vector3D} from "./Vector3D";
import {Pixel} from "./Pixel";
import {HittableList} from "./Object/HittableList";
import {Sphere} from "./Object/Sphere";
import {Camera} from "./Camera";
import {randomIn, writeToFile} from "../Utils";
import {ProgressBar} from "../Utils/ProgressBar";
import {Ray} from "./Ray";
import {Lambertian} from "./Material/Lambertian";
import {Metal} from "./Material/Metal";
import {Dielectric} from "./Material/Dielectric";

const CANVAS_WIDTH = 1980
const CANVAS_HEIGHT = 1080
const RENDER_PIXEL = CANVAS_WIDTH * CANVAS_HEIGHT * 4
const SAMPLE_PER_PIXEL = 150
const MAX_REFLECT_TIMES = 75


function randomSense(): HittableList {
    let world = new HittableList();
    world.add(new Sphere(new Vector3D(0, -1000, 0),
        1000, new Lambertian(new Vector3D(0.5, 0.5, 0.5))))

    for (let i = -11; i < 11; i++) {
        for (let j = -11; j < 11; j++) {
            let chooseMaterial = Math.random()
            let center = new Vector3D(i + 0.9 * Math.random(), 0.2, j + 0.9 * Math.random())
            if (center.sub(new Vector3D(4, 0.2, 0)).length() > 0.9) {
                if (chooseMaterial < 0.4) {
                    let albedo = Vector3D.randomIn().mul(Vector3D.randomIn())
                    world.add(new Sphere(center, 0.2, new Lambertian(albedo)))
                } else if (chooseMaterial < 0.7) {
                    let albedo = Vector3D.randomIn(0.5)
                    let fuzz = randomIn(0, 0.5)
                    world.add(new Sphere(center, 0.2, new Metal(albedo, fuzz)))
                } else {
                    world.add(new Sphere(center, 0.2, new Dielectric(1.5)))
                }
            }
        }
    }
    world.add(new Sphere(new Vector3D(0, 1, 0), 1, new Dielectric(1.5)))
    world.add(new Sphere(new Vector3D(-4, 1, 0), 1, new Lambertian(new Vector3D(0.4, 0.2, 0.1))))
    world.add(new Sphere(new Vector3D(4, 1, 0), 1, new Metal(new Vector3D(0.7, 0.6, 0.5))))

    return world
}

function test() {
    let world = new HittableList();
    world.add(new Sphere(new Vector3D(0, 0, -1),
        0.5, new Lambertian(new Vector3D(0.1, 0.2, 0.5))))

    world.add(new Sphere(new Vector3D(0, -101, -1),
        100, new Lambertian(new Vector3D(0.8, 0.8, 0))))

    world.add(new Sphere(new Vector3D(1, 0, -1),
        0.5, new Metal(new Vector3D(0.8, 0.6, 0.2), 0.1)))

    world.add(new Sphere(new Vector3D(-1, 0, -1), 0.5,
        new Dielectric(1.5)))
    return world
}

export function render(): void {
    let aspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT
    const lookFrom = new Vector3D(13, 2, 3)
    const lookAt = new Vector3D(0, 0, 0)
    const vup = new Vector3D(0, 1, 0)
    let focusDist = 10
    const vfov = 20//垂直广角角度
    const aperture = 0.1
    let camera = new Camera(lookFrom, lookAt, vup, vfov, aspectRatio, aperture, focusDist)

    let world = randomSense()

    let data = new Array(CANVAS_WIDTH * CANVAS_HEIGHT * 4)
    let index = 0
    let pixel: Pixel = new Pixel()
    let renderProgressBar = new ProgressBar(20)

    for (let y = CANVAS_HEIGHT - 1; y >= 0; y--) {
        for (let x = 0; x < CANVAS_WIDTH; x++) {
            let colorVec = new Vector3D(0, 0, 0)
            for (let k = 0; k < SAMPLE_PER_PIXEL; k++) {//在该位置进行SAMPLE_PER_PIXEL次采样
                let ray = camera.getRay((x + Math.random()) / CANVAS_WIDTH, (y + Math.random()) / CANVAS_HEIGHT)//获取该坐标的光线，加入随机化用于获取相邻像素的颜色，抗锯齿
                colorVec = colorVec.add(Ray.getRayColor(ray, world, MAX_REFLECT_TIMES))
            }
            pixel.vector = colorVec
            pixel.writePixel(data, SAMPLE_PER_PIXEL, index)
            index += 4
        }
        renderProgressBar.render((index / RENDER_PIXEL) * 100)
    }
    console.log("Rendering finished, starting write data to file...")

    writeToFile(data, "./out/data.json")

}


