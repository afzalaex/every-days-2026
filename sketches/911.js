const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

let LAYOUT;
let CELL;
let SEEDS;

let s;

let owner = [];
let frontier = [];
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noStroke();
  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function mousePressed() {
  generate();
}

function generate() {
  LAYOUT = floor(random(50, 101));
  CELL = ART / LAYOUT;
  SEEDS = floor(random(25, 101));

  owner = Array.from({ length: LAYOUT }, () => Array(LAYOUT).fill(-1));
  frontier = [];
  palette = [];

  for (let i = 0; i < SEEDS; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));

    let x, y;

    do {
      x = floor(random(LAYOUT));
      y = floor(random(LAYOUT));
    } while (owner[x][y] != -1);

    owner[x][y] = i;
    frontier.push({
      x,
      y,
      district: i,
    });
  }

  while (frontier.length > 0) {
    let index = floor(random(frontier.length));
    let f = frontier[index];

    let dirs = shuffle([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);

    let expanded = false;

    for (let d of dirs) {
      let nx = f.x + d[0];
      let ny = f.y + d[1];

      if (nx < 0 || ny < 0 || nx >= LAYOUT || ny >= LAYOUT) continue;
      if (owner[nx][ny] != -1) continue;

      owner[nx][ny] = f.district;

      frontier.push({
        x: nx,
        y: ny,
        district: f.district,
      });

      expanded = true;
      break;
    }

    if (!expanded) frontier.splice(index, 1);
  }

  redraw();
}

function draw() {
  background(0);

  push();
  translate((OFFSET * s) / BASE, (OFFSET * s) / BASE);
  scale(s / BASE);

  stroke(0);

  for (let x = 0; x < LAYOUT; x++) {
    for (let y = 0; y < LAYOUT; y++) {
      fill(palette[owner[x][y]]);
      rect(x * CELL, y * CELL, CELL + 0.2, CELL + 0.2);
    }
  }

  stroke(0);
  strokeCap(SQUARE);

  for (let x = 0; x < LAYOUT; x++) {
    for (let y = 0; y < LAYOUT; y++) {
      let district = owner[x][y];

      if (x < LAYOUT - 1 && owner[x + 1][y] != district) {
        line((x + 1) * CELL, y * CELL, (x + 1) * CELL, (y + 1) * CELL);
      }

      if (y < LAYOUT - 1 && owner[x][y + 1] != district) {
        line(x * CELL, (y + 1) * CELL, (x + 1) * CELL, (y + 1) * CELL);
      }
    }
  }
}