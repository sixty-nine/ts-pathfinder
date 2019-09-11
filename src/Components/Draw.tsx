import React from 'react';
import PathFinder from "../Model/PathFinder";
import Point from "../Model/Point";
import * as Distance from "../Model/Distance";
import Grid from "../Model/Grid";

require('two.js');
declare const Two: any;

type DrawProps = {};
type DrawState = {
    showLegend: boolean;
};

class Draw extends React.Component<DrawProps, DrawState> {
    readonly state: DrawState = { showLegend: true };
    readonly myRef: React.RefObject<HTMLDivElement>;
    readonly gridSize = 25;

    // Wrapper for the Two.js library
    private two: any;
    private gridDimensions: {width: number, height: number};
    private grid: Grid;

    constructor(props: DrawProps) {
        super(props);
        this.myRef = React.createRef();
        this.two = new Two({
            fullscreen: true,
            autostart: true,
        });
        this.gridDimensions = this.getGridDimensions();
        this.grid = new Grid(this.gridDimensions.width, this.gridDimensions.height);
    };

    private clearScreen = () => {
        const screen = this.two.makeRectangle(0, 0, this.two.width * 2, this.two.height * 2);
        screen.fill = 'white';
        screen.stroke = 'white';
    };

    private drawGrid = (showLegend = true) => {

        const halfGridSize = this.gridSize / 2;
        const height = this.two.height;
        const width = this.two.width;

        this.clearScreen();

        for (let i = 0; i < height; i += this.gridSize) {
            this.two.makeLine(0, i, width, i);
            showLegend && i > 0 &&
                this.two.makeText((i / this.gridSize).toString(), halfGridSize, i + halfGridSize);
        }

        for (let i = 0; i < width; i += this.gridSize) {
            this.two.makeLine(i, 0, i, height);
            showLegend && i > 0 &&
                this.two.makeText((i / this.gridSize).toString(), i + halfGridSize, halfGridSize);
        }
    };

    private getGridDimensions = () => ({
        width: Math.floor(this.two.width / this.gridSize),
        height: Math.floor(this.two.height / this.gridSize),
    });

    private drawBlock = (x: number, y: number, color: string, nr: number = -1) => {
        const gs = this.gridSize;
        const hgs = this.gridSize / 2;
        const rect = this.two.makeRectangle(hgs + x * gs, hgs + y * gs, gs - 2, gs - 2);
        rect.fill = color;
        rect.stroke = null;
        if (nr >= 0) {
            const t = this.two.makeText(nr, hgs + x * gs, hgs + y * gs);
            t.stroke = 'black';
        }
    };

    private drawBlocks = (blocks: number[][]) => {
        blocks.map((row, i) =>
            row.map((n, j) =>
                (n < 0) && this.drawBlock(i, j, 'black')
            )
        );
    };

    componentDidMount(): void {

        this.two.appendTo(this.myRef.current as HTMLElement);

        this.grid.setCell(new Point(11, 10), -1);

        this.grid.setCell(new Point(12, 11), -1);
        this.grid.setCell(new Point(13, 11), -1);
        this.grid.setCell(new Point(14, 11), -1);
        this.grid.setCell(new Point(10, 11), -1);

        this.drawGrid(this.state.showLegend);
        this.drawBlocks(this.grid.grid);
    };

    componentDidUpdate(): void {
        this.drawGrid(this.state.showLegend);
    }

    private calcPath = () => {
        const S: Point = new Point(10, 9);
        const T: Point = new Point(15, 15);
        const pf = new PathFinder(T, Distance.euclideanDistance);
        pf.findPath(S, (iteration: number, p: Point): boolean => {
            const isAccessible = p.x > 0 && p.y > 0 && this.grid.getCell(p) >= 0;
            const color = isAccessible ? 'green' : 'red';
            if (isAccessible) {
                this.drawBlock(p.x, p.y, color, iteration);
            }
            return isAccessible;
        });
    };

    private onClick = (e: any) => {
        const [x, y] = [
            Math.floor(e.clientX / this.gridSize),
            Math.floor(e.clientY / this.gridSize)
        ];

        if (x === 0 && y === 0) {
            console.log('--- Recalculate');
            this.drawGrid(this.state.showLegend);
            this.drawBlocks(this.grid.grid);
            this.calcPath();
            return;
        }

        if (x < 1 || y < 1) {
            return;
        }

        const p = new Point(x, y);
        const isSet = this.grid.getCell(p) >= 0;
        const color = isSet ? 'black' : 'white';
        const newValue = isSet ? -1 : 0;
        this.drawBlock(x, y, color);
        this.grid.setCell(p, newValue);
    };

    render() {
        return (
            <div ref={this.myRef} onClick={this.onClick}>
            </div>
        )
    }
}

export default Draw;
