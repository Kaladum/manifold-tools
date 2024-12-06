import Module from 'manifold-3d'

import type * as EncapsulatedTypes from 'manifold-3d/manifold-encapsulated-types'

type Manifold = EncapsulatedTypes.Manifold

export let globalManifold: typeof EncapsulatedTypes.Manifold

const deleteManifoldRegistry = new FinalizationRegistry<Manifold>((manifold) => {
    manifold.delete()
    console.log("Manifold has been deleted automatically")
});

const manifoldStorage = new WeakMap<Object3D, Manifold>()

export class Object3D {
    public constructor(internal: Manifold) {
        manifoldStorage.set(this, internal)
        deleteManifoldRegistry.register(this, internal)
    }

    public get internal() {
        return manifoldStorage.get(this)!
    }
}

export const setup = async () => {
    const wasm = await Module()
    wasm.setup()
    globalManifold = wasm.Manifold
};

export function toMesh(obj3d: Object3D) {
    const manifoldMesh = obj3d.internal.getMesh()
    return { type: 'mesh', vertices: manifoldMesh.vertProperties, indices: manifoldMesh.triVerts }
}