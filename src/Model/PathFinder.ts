import Point from "./Point";
import { Queue } from "./VisitQueue";
import { Distance, manhattanDistance } from "./Distance";

export type Visitor = (iteration: number, p: Point) => boolean;

export const nullVisitor = (i: number, p: Point) => true;

class PathFinder {

    private readonly goal: Point;
    private readonly dist: Distance;
    private readonly maxIterations: number;

    constructor(goal: Point, dist: Distance = manhattanDistance, maxIterations = 1000) {
        this.goal = goal;
        this.dist = dist;
        this.maxIterations = maxIterations;
    }

    public findPath = (
        start: Point,
        visit: Visitor = nullVisitor,
        onNeighbour: (p: Point) => void,
        diagAllowed: boolean,
    ): Point[] | boolean => {
        const cameFrom: { [key: string]: Point | null } = {};
        const visited: string[] = [];
        const queue = new Queue([{
            dist: this.dist(start, this.goal),
            point: start,
        }]);
        const alreadyVisited = (p: Point): boolean =>
            -1 < visited.indexOf(p.toString())
        ;
        const reconstructPath = (): Point[] => {
            let cur: any = this.goal;
            const path = [];
            while (cur && cameFrom[cur.toString()]) {
                path.push(cur);
                cur = cameFrom[cur.toString()];
            }
            return path;
        };

        let iteration = 0;
        let previous: Point | null = null;

        console.groupCollapsed('Find path');
        console.log('--- Recalculate');

        while (!queue.isEmpty()) {
            const next = queue.dequeue();

            if (!next) {
                console.error('No next cell to try');
                console.groupEnd();
                return false;
            }

            cameFrom[next.point.toString()] = previous;
            previous = next.point;

            if (iteration > this.maxIterations) {
                console.error('Too many iterations');
                console.groupEnd();
                return false;
            }


            console.log('Trying', [next.point.x, next.point.y], iteration);

            if (alreadyVisited(next.point)) {
                console.log('Skipping - already visited');
                continue;
            }

            visited.push(next.point.toString());

            const isNextAccessible = visit(iteration, next.point);
            if (!isNextAccessible) {
                console.log('Skipping - rejected by visitor');
                continue;
            }
            iteration++;

            if (next.point.eq(this.goal)) {
                console.log('Target found!');
                console.groupEnd();

                return reconstructPath();
            }

            next.point.neighbours(diagAllowed).forEach(p => {
                if (!alreadyVisited(p)) {
                    onNeighbour(p);
                    queue.enqueue({
                        dist: this.dist(p, this.goal),
                        point: p,
                    });
                }
            });
        }

        return false;
    };
}

export default PathFinder;
