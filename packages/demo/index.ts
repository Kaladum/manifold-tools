import { cube, pipe, rotate3d, setup, sphere, difference3d, toMesh, translate3d, union3d } from 'manifold-lib'

export async function main({// @jscad-params
    segments = 32,
    radius = 60, // {type:'slider', min:51, max:80, live:true}
}) {
    await setup()

    const testCube = pipe(
        cube([70, 70, 50], true),
        translate3d([0, 0, 25]),
    );

    const hollowBox = pipe(
        cube([100, 100, 100], true),
        difference3d(sphere(radius, segments)),
        rotate3d([0, 0, 45]),
        translate3d([0, 0, 100]),
    )

    const result = pipe(
        testCube,
        union3d(hollowBox),
    )

    return toMesh(result)
}