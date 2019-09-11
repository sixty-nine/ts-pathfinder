import Point from "./Point";

class Grid {

    private readonly _width: number;
    private readonly _height: number;
    private readonly _grid: number[][];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        // Initialize an [width x height] matrix full of zeros.
        this._grid = new Array(width).fill(0)
            .map(() => new Array(height).fill(0))
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get grid(): number[][] {
        return this._grid;
    }

    public getCell = (p: Point): number =>
        this._grid[p.x][p.y]
    ;

    public setCell = (p: Point, value: number) =>
        this._grid[p.x][p.y] = value
    ;

}

export default Grid;
