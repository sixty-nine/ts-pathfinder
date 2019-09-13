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

    public neighbours = (): Point[] => {
        const res: Point[] = [];
        res.push(new Point(this.x - 1, this.y));
        res.push(new Point(this.x + 1, this.y));
        res.push(new Point(this.x, this.y - 1));
        res.push(new Point(this.x, this.y + 1));
        return res;
    };
}

export default Point;
