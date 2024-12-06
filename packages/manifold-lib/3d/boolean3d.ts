import { globalManifold, Object3D } from "../base.ts"

export const difference3d = (...others: ReadonlyArray<Object3D>) => (current: Object3D) => {
    return new Object3D(globalManifold.difference([current.internal, ...others.map(v => v.internal)]))
}

export const union3d = (...others: ReadonlyArray<Object3D>) => (current: Object3D) => {
    return new Object3D(globalManifold.union([current.internal, ...others.map(v => v.internal)]))
}

export const intersect3d = (...others: ReadonlyArray<Object3D>) => (current: Object3D) => {
    return new Object3D(globalManifold.intersection([current.internal, ...others.map(v => v.internal)]))
}

export const decompose = (current: Object3D): Object3D[] => {
    return current.internal.decompose().map(v => new Object3D(v))
}