export class Material {
    public readonly color?: readonly [number, number, number, number]

    public constructor(color?: readonly [number, number, number, number]) {
        this.color = color
    }

    public static default = new Material()
}