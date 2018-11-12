let cols, rows;
let w = 60;
let grid = [];
let current;
let stack = [];

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

function setup() {
    createCanvas(601, 601);
    cols = Math.floor(width/w);
    rows = Math.floor(height/w);
    // frameRate(5)

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

        // step 2
        stack.push(current);

        // step 3
        removeWalls(current, next);

        // step 4
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

}