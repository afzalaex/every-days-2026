const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const LAYOUT = 100;
const CELL = ART / LAYOUT;

let s;
let seedCount;
let variation;

let owner = [];
let frontier = [];
let cols = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}

function mousePressed() {
  generate();
}

function generate() {
  seedCount = floor(random(10, 100));

  owner = Array.from({ length: LAYOUT }, () => Array(LAYOUT).fill(-1));
  frontier = [];
  cols = [];

  for (let i = 0; i < seedCount; i++) {
    let x, y;
    do {
      x = floor(random(LAYOUT));
      y = floor(random(LAYOUT));
    } while (owner[x][y] !== -1);

    owner[x][y] = i;
    frontier.push({ x, y, id: i });

    cols.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  while (frontier.length) {
    let index;

    switch (variation) {
      case 0:
        index = floor(random(frontier.length));
        break;

      case 1:
        index = frontier.length - 1;
        break;

      case 2:
        index = 0;
        break;

      case 3:
        index =
          random() < 0.7 ? floor(random(frontier.length)) : frontier.length - 1;
        break;
    }

    let cell = frontier.splice(index, 1)[0];

    let dirs = shuffle([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);

    for (let d of dirs) {
      let nx = cell.x + d[0];
      let ny = cell.y + d[1];

      if (
        nx >= 0 &&
        nx < LAYOUT &&
        ny >= 0 &&
        ny < LAYOUT &&
        owner[nx][ny] === -1
      ) {
        let crack = variation === 1 ? 0.07 : variation === 2 ? 0.015 : 0.035;

        if (random() < crack) continue;

        owner[nx][ny] = cell.id;
        frontier.push({ x: nx, y: ny, id: cell.id });
      }
    }
  }

  drawGrid();
}

function drawGrid() {
  background(0);

  push();
  scale(s);

  for (let x = 0; x < LAYOUT; x++) {
    for (let y = 0; y < LAYOUT; y++) {
      let id = owner[x][y];
      if (id === -1) continue;

      let c = cols[id];

      let jitter = variation === 2 ? 8 : variation === 1 ? 25 : 18;

      fill(
        constrain(red(c) + random(-jitter, jitter), 0, 255),
        constrain(green(c) + random(-jitter, jitter), 0, 255),
        constrain(blue(c) + random(-jitter, jitter), 0, 255)
      );

      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL, CELL);
    }
  }

  pop();
}