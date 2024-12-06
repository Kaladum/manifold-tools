import { Object3D } from "../base.ts"
import { AnyVec3, asSimpleVec3 } from "./vec3.ts"

export const translate3d = (offset: AnyVec3) => (current: Object3D) => {
    return new Object3D(current.internal.translate(asSimpleVec3(offset)))
}

export const rotate3d = (rotation: AnyVec3) => (current: Object3D) => {
    return new Object3D(current.internal.rotate(asSimpleVec3(rotation)))
}

export const mirror3d = (normal: AnyVec3) => (current: Object3D) => {
    return new Object3D(current.internal.mirror(asSimpleVec3(normal)))
}

export const scale3d = (size: number | AnyVec3) => (current: Object3D) => {
    return new Object3D(current.internal.scale(typeof size === "number" ? size : asSimpleVec3(size)))
}

//todo transform