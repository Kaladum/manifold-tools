import { m3d, Manifold } from '../internal/bindings.ts';
import { ManifoldGc } from '../internal/manifoldGc.ts';
import { Material } from '../material.ts';

export class Object3D {
	public readonly fullManifold: ManifoldGc;

	public constructor(
		public readonly manifoldsByMaterial: ReadonlyMap<Material, ManifoldGc>,
	) {
		if (this.manifoldsByMaterial.size === 1) {
			// Just keep the Manifold of the only element
			this.fullManifold = this.manifoldsByMaterial.values().next().value!;
		} else {
			this.fullManifold = new ManifoldGc(m3d.Manifold.union([...this.manifoldsByMaterial.values()].map(v => v.internal)));
		}
	}

	public static fromManifoldGc = (manifold: ManifoldGc, material: Material = Material.default) => new Object3D(new Map<Material, ManifoldGc>([[material, manifold]]));
	public static fromManifold = (manifold: Manifold, material?: Material) => Object3D.fromManifoldGc(new ManifoldGc(manifold), material);

	public applyOnEachManifold = (operation: (input: Manifold) => Manifold): Object3D => {
		const resultByMaterial = new Map<Material, ManifoldGc>();

		for (const [material, manifold] of this.manifoldsByMaterial) {
			resultByMaterial.set(
				material,
				new ManifoldGc(operation(manifold.internal)),
			);
		}

		return new Object3D(resultByMaterial);
	};
}

export function toMesh(obj3d: Object3D): ExportMesh[] {
	const result: ExportMesh[] = [];

	for (const [material, manifold] of obj3d.manifoldsByMaterial) {
		const mesh = manifold.internal.getMesh();

		result.push({
			type: 'mesh',
			vertices: mesh.vertProperties,
			indices: mesh.triVerts,
			color: material.color,
		});
	}

	return result;
}

export interface ExportMesh {
	readonly type: 'mesh',
	readonly vertices: Float32Array,
	readonly indices: Uint32Array,
	readonly color?: readonly [number, number, number, number],
}
