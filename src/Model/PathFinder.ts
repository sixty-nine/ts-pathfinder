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

    public findPath = (start: Point, visit: Visitor = nullVisitor) => {
        const visited: Point[] = [];
        const queue = new Queue([{
            dist: this.dist(start, this.goal),
            point: start,
        }]);
        const alreadyVisited = (p: Point): boolean => -1 <
            visited
                .map((item: Point) => `${item.x},${item.y}`)
                .indexOf(`${p.x},${p.y}`)
        ;

        let iteration = 0;

        console.groupCollapsed('Find path');
        console.log('--- Recalculate');

        while (!queue.isEmpty()) {
            const next = queue.dequeue();

            if (!next) {
                console.groupEnd();
                throw new Error('No next cell to try');
            }

            if (iteration > this.maxIterations) {
                console.groupEnd();
                throw new Error('Too many iterations');
            }


            console.log('Trying', [next.point.x, next.point.y], iteration);

            if (alreadyVisited(next.point)) {
                console.log('Skipping - already visited');
                continue;
            }

            visited.push(next.point);

            const isNextAccessible = visit(iteration, next.point);
            if (!isNextAccessible) {
                console.log('Skipping - rejected by visitor');
                continue;
            }
            iteration++;

            if (next.point.eq(this.goal)) {
                console.log('Target found!');
                // TODO
                console.groupEnd();
                return 'Found';
            }

            next.point.neighbours().forEach(p => {
                if (!alreadyVisited(p)) {
                    queue.enqueue({
                        dist: this.dist(p, this.goal),
                        point: p,
                    });
                }
            });
        }
    };
}

export default PathFinder;
