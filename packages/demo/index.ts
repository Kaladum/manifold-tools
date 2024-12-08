import { cube, pipe, setup, sphere, toMesh, setMaterial3d, Material, difference3d, union3d, translate3d, rotate3d } from 'manifold-lib';

const red = new Material([1, 0, 0, 1]);

export async function main({ // @jscad-params
	segments = 32,
	radius = 60, // {type:'slider', min:51, max:80, live:true}
}) {
	await setup();

	const testCube = pipe(
		cube([70, 70, 50], true),
		translate3d([0, 0, 25]),
	);

	const hollowBox = pipe(
		cube([100, 100, 100], true),
		difference3d(sphere(radius, segments)),
		rotate3d([0, 0, 45]),
		translate3d([0, 0, 100]),
	);

	const result = pipe(
		testCube,
		setMaterial3d(red),
		union3d(hollowBox),
	);

	return toMesh(result);
}
