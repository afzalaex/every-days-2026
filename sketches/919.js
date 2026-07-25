const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const LAYOUT = 50;
const CELL = ART / LAYOUT;

let s;
let owner = [];
let dominos = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * s, SIZE * s);
  noLoop();
  generate();
}

function draw() {
  scale(s);
  background(0);

  for (let d of dominos) {
    fill(d.c);
    stroke(0);
    strokeWeight(4);

    if (d.dir == 0) {
      rect(OFFSET + d.x * CELL, OFFSET + d.y * CELL, CELL * 2, CELL);
    } else {
      rect(OFFSET + d.x * CELL, OFFSET + d.y * CELL, CELL, CELL * 2);
    }
  }
}

function generate() {
  owner = Array.from({ length: LAYOUT }, () => Array(LAYOUT).fill(-1));
  dominos = [];

  let id = 0;

  for (let y = 0; y < LAYOUT; y++) {
    for (let x = 0; x < LAYOUT; x += 2) {
      let c = color(random(155, 255), random(155, 255), random(155, 255));

      dominos[id] = {
        x,
        y,
        dir: 0,
        c,
      };

      owner[y][x] = id;
      owner[y][x + 1] = id;
      id++;
    }
  }

  for (let i = 0; i < 1200; i++) {
    flipRandom();
  }

  redraw();
}

function flipRandom() {
  let x = floor(random(LAYOUT - 1));
  let y = floor(random(LAYOUT - 1));

  let a = owner[y][x];
  let b = owner[y][x + 1];
  let c = owner[y + 1][x];
  let d = owner[y + 1][x + 1];

  if (a == b && c == d && a != c) {
    dominos[a].dir = 1;
    dominos[a].x = x;
    dominos[a].y = y;

    dominos[c].dir = 1;
    dominos[c].x = x + 1;
    dominos[c].y = y;

    owner[y][x] = a;
    owner[y + 1][x] = a;

    owner[y][x + 1] = c;
    owner[y + 1][x + 1] = c;
  } else if (a == c && b == d && a != b) {
    dominos[a].dir = 0;
    dominos[a].x = x;
    dominos[a].y = y;

    dominos[b].dir = 0;
    dominos[b].x = x;
    dominos[b].y = y + 1;

    owner[y][x] = a;
    owner[y][x + 1] = a;

    owner[y + 1][x] = b;
    owner[y + 1][x + 1] = b;
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * s, SIZE * s);
  redraw();
}