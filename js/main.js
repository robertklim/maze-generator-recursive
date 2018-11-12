let cols, rows;
let w = 60;
let grid = [];
let current;

function getIndex(i, j) {
    //edges
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    
    let x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
        console.log(a);
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    let y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

}

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
            noStroke();
            fill(127, 0, 0, 50);
            rect(x, y, w, w);
        }
    }

    checkNeighbors() {
        let neighbors = [];

        let top = grid[getIndex(this.i, this.j - 1)];
        let right = grid[getIndex(this.i + 1, this.j)];
        let bottom = grid[getIndex(this.i, this.j + 1)];
        let left = grid[getIndex(this.i - 1, this.j)];

        // build an array of not visited cells
        if (top && !top.visited) {
            neighbors.push(top);
        }

        if (right && !right.visited) {
            neighbors.push(right);
        }

        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }

        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let r = Math.floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }

    }

    highlight() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(255, 0, 0, 100);
        rect(x, y, w, w);
    }

}

function setup() {
    createCanvas(601, 601);
    cols = Math.floor(width/w);
    rows = Math.floor(height/w);
    frameRate(5)

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
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
    current.highlight();
    
    // step 1
    let next = current.checkNeighbors();
    
    if (next) {
        next.visited = true;

        // step 3
        removeWalls(current, next);

        // step 4
        current = next;
    }

}