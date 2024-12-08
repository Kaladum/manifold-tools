import Module from 'manifold-3d';

import type * as EncapsulatedTypes from 'manifold-3d/manifold-encapsulated-types';

export type Manifold = EncapsulatedTypes.Manifold;
export type Mesh = EncapsulatedTypes.Mesh;

export const setup = async () => {
	await m3d.setup();
};

// It looks like there is a bug that in the name resolution. The result is, that there are multiple instances of the m3d static properties. Some have been initialized and some not...
const workaroundKey = 'manifoldTopLevelUglyWorkaround';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class m3d {
	public static get Manifold(): typeof EncapsulatedTypes.Manifold {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((globalThis as any)[workaroundKey] !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (globalThis as any)[workaroundKey].Manifold;
		}
		else {
			throw new Error('You must complete the setup function first');
		}
	}

	public static get Mesh(): typeof EncapsulatedTypes.Mesh {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((globalThis as any)[workaroundKey] !== undefined) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return (globalThis as any)[workaroundKey].Mesh;
		}
		else {
			throw new Error('You must complete the setup function first');
		}
	}

	public static setup = async () => {
		const wasm = await Module();
		wasm.setup();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(globalThis as any)[workaroundKey] = wasm;
	};
}
