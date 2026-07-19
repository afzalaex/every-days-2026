const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 50;
const ROWS = 50;

let viewScale;

let cells = [];
let stack = [];
let order = [];

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = [true, true, true, true];
  }

  index(x, y) {
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return -1;
    return x + y * COLS;
  }

  neighbors() {
    let n = [];

    let t = cells[this.index(this.x, this.y - 1)];
    let r = cells[this.index(this.x + 1, this.y)];
    let b = cells[this.index(this.x, this.y + 1)];
    let l = cells[this.index(this.x - 1, this.y)];

    if (t && !t.visited) n.push(t);
    if (r && !r.visited) n.push(r);
    if (b && !b.visited) n.push(b);
    if (l && !l.visited) n.push(l);

    return n.length ? random(n) : null;
  }
}

function removeWalls(a, b) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;

  if (dx === 1) {
    a.walls[1] = false;
    b.walls[3] = false;
  } else if (dx === -1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }

  if (dy === 1) {
    a.walls[2] = false;
    b.walls[0] = false;
  } else if (dy === -1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
}

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(viewScale * SIZE, viewScale * SIZE);
  noLoop();
}

function draw() {
  scale(viewScale);

  background(0);

  cells = [];
  stack = [];
  order = [];

  let cell = ART / COLS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      cells.push(new Cell(x, y));
    }
  }

  let current = cells[0];
  current.visited = true;

  while (true) {
    order.push(current);

    let next = current.neighbors();

    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length) {
      current = stack.pop();
    } else {
      break;
    }
  }

  let palette = [];
  for (let i = 0; i < 12; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  strokeWeight(6);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  noFill();

  const SEGMENT = 40;

  for (let s = 0; s < order.length - 1; s += SEGMENT - 3) {
    stroke(palette[floor(s / (SEGMENT - 3)) % palette.length]);

    beginShape();

    let startIndex = max(0, s - 2);
    let endIndex = min(order.length - 1, s + SEGMENT);

    let first = order[startIndex];
    curveVertex(
      OFFSET + (first.x + 0.5) * cell,
      OFFSET + (first.y + 0.5) * cell
    );

    for (let i = startIndex; i <= endIndex; i++) {
      let c = order[i];
      curveVertex(
        OFFSET + (c.x + 0.5) * cell,
        OFFSET + (c.y + 0.5) * cell
      );
    }

    let last = order[endIndex];
    curveVertex(
      OFFSET + (last.x + 0.5) * cell,
      OFFSET + (last.y + 0.5) * cell
    );

    endShape();
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(viewScale * SIZE, viewScale * SIZE);
  redraw();
}