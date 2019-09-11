import Point from "./Point";
import TinyQueue from "tinyqueue";

export type QueueItem  = {
    dist: number;
    point: Point;
};

export class Queue {

    private queue: TinyQueue<QueueItem>;

    constructor(initialItems: QueueItem[] = []) {
        this.queue = new TinyQueue<QueueItem>(initialItems, this.comparator);
    }

    public enqueue = (item: QueueItem) => this.queue.push(item);

    public dequeue = (): QueueItem | undefined => this.queue.pop();

    public isEmpty = (): boolean => this.queue.length === 0;

    private comparator = (a: QueueItem, b: QueueItem) =>
        a.dist - b.dist
    ;
}
