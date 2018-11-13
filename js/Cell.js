class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; // top, right, bottm, left
        this.visited = false;
        this.onStack = false;
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
            if (!this.onStack) {
                fill(0, 127, 0, 50);
            } else {
                fill(127, 0, 0, 50);
            }
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