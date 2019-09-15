import Point from "./Point";

export type Distance = (a: Point, b: Point) => number;

export const manhattanDistance: Distance =
    (a: Point, b: Point): number =>
        Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
;

export const euclideanDistance: Distance =
    (a: Point, b: Point): number =>
        Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
;

export const chebyshevDistance: Distance =
    (a: Point, b: Point): number =>
        Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
;
