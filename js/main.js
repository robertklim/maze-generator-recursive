let cols, rows;
let w = 60;
let grid = [];
let current;

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; // top, right, bottm, left
        this.visited = false;
    }

    show() {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);
        // draw walls
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            fill(127, 0, 0);
            rect(x, y, w, w);
        }
    }

}

function setup() {
    createCanvas(601, 601);
    cols = Math.floor(width/w);
    rows = Math.floor(height/w);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];

}

function draw() {
    background(0);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;

}