const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 50;
const ROWS = 50;
const CELL = ART / COLS;

const MAX_STEPS = 2500;

let s;
let seedCount;

let owner = [];
let active = [];
let crystals = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * s, SIZE * s);
  noLoop();
  strokeCap(SQUARE);
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * s, SIZE * s);
  redraw();
}

function mousePressed() {
  generate();
  redraw();
}

function generate() {
  seedCount = floor(random(50, 251));

  owner = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
  active = [];
  crystals = [];

  for (let i = 0; i < seedCount; i++) {
    let x, y;

    do {
      x = floor(random(COLS));
      y = floor(random(ROWS));
    } while (owner[y][x] !== -1);

    owner[y][x] = i;

    crystals.push({
      color: color(random(155, 255), random(155, 255), random(155, 255)),
    });

    active.push({
      ownerIndex: i,
      x,
      y,
      dir: random([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]),
    });
  }

  for (let step = 0; step < MAX_STEPS && active.length; step++) {
    let a = floor(random(active.length));
    let tip = active[a];

    if (random() < 0.12) {
      tip.dir = random([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
    }

    let nx = tip.x + tip.dir[0];
    let ny = tip.y + tip.dir[1];

    if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || owner[ny][nx] !== -1) {
      if (random() < 0.45) {
        active.splice(a, 1);
      } else {
        tip.dir = random([
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]);
      }
      continue;
    }

    owner[ny][nx] = tip.ownerIndex;

    if (random() < 0.22) {
      active.push({
        ownerIndex: tip.ownerIndex,
        x: nx,
        y: ny,
        dir: random([
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]),
      });
    }

    tip.x = nx;
    tip.y = ny;
  }
}

function draw() {
  scale(s);

  background(0);

  push();
  translate(OFFSET, OFFSET);

  noStroke();

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let ownerIndex = owner[y][x];

      if (ownerIndex === -1) continue;

      fill(crystals[ownerIndex].color);

      rect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    }
  }

  stroke(0);
  strokeWeight(2);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let ownerIndex = owner[y][x];

      if (x < COLS - 1 && owner[y][x + 1] !== ownerIndex) {
        line((x + 1) * CELL, y * CELL, (x + 1) * CELL, (y + 1) * CELL);
      }

      if (y < ROWS - 1 && owner[y + 1][x] !== ownerIndex) {
        line(x * CELL, (y + 1) * CELL, (x + 1) * CELL, (y + 1) * CELL);
      }
    }
  }

  pop();
}