import { globalManifold, Object3D } from "../base.ts";
import { AnyVec3, asSimpleVec3 } from "./vec3.ts";

export const cube = (size?: AnyVec3, center?: boolean) => new Object3D(globalManifold.cube(size !== undefined ? asSimpleVec3(size) : undefined, center));
export const sphere = (radius: number, circularSegments?: number) => new Object3D(globalManifold.sphere(radius, circularSegments));
export const tetrahedron = () => new Object3D(globalManifold.tetrahedron());