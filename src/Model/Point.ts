class Point {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public eq = (p: Point): boolean =>
        this.x === p.x && this.y === p.y
    ;

    public neighbours = (allowDiag: boolean = false): Point[] => {
        const res: Point[] = [];

        if (allowDiag) {
            res.push(new Point(this.x - 1, this.y - 1));
            res.push(new Point(this.x - 1, this.y + 1));
            res.push(new Point(this.x + 1, this.y - 1));
            res.push(new Point(this.x + 1, this.y + 1));
        }

        res.push(new Point(this.x - 1, this.y));
        res.push(new Point(this.x + 1, this.y));
        res.push(new Point(this.x, this.y - 1));
        res.push(new Point(this.x, this.y + 1));
        return res;
    };

    public toString = (): string => `[${this.x},${this.y}]`;
}

export default Point;
