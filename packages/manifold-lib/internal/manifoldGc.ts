import { Manifold } from './bindings.ts';

const deleteManifoldRegistry = new FinalizationRegistry<Manifold>((manifold) => {
	manifold.delete();
});

const manifoldStorage = new WeakMap<ManifoldGc, Manifold>();

export class ManifoldGc {
	public constructor(internal: Manifold) {
		manifoldStorage.set(this, internal);
		deleteManifoldRegistry.register(this, internal);
	}

	public get internal() {
		return manifoldStorage.get(this)!;
	}
}
