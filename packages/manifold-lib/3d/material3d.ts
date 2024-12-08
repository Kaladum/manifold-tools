import { Object3D } from "./object3d.ts";
import { Material } from "../material.ts";

export const setMaterial3d = (material: Material) => (obj: Object3D) => Object3D.fromManifoldGc(obj.fullManifold, material);