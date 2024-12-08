import { m3d } from "../internal/bindings.ts";
import { Object3D } from "./object3d.ts";
import { AnyVec3, asSimpleVec3 } from "./vec3.ts";

export const cube = (size?: AnyVec3, center?: boolean) => Object3D.fromManifold(m3d.Manifold.cube(size !== undefined ? asSimpleVec3(size) : undefined, center));
export const sphere = (radius: number, circularSegments?: number) => Object3D.fromManifold(m3d.Manifold.sphere(radius, circularSegments));
export const tetrahedron = () => Object3D.fromManifold(m3d.Manifold.tetrahedron());