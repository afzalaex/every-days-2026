const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

let CELL;
let COLS;
let ROWS;

let grid = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generate() {
  CELL = floor(random(1, 100));

  COLS = floor(ART / CELL);
  ROWS = floor(ART / CELL);

  buildGrid();
  redraw();
}

function buildGrid() {
  grid = [];

  for (let x = 0; x < COLS; x++) {
    grid[x] = [];
    for (let y = 0; y < ROWS; y++) {

      let v =
        (x * 73856093) ^
        (y * 19349663);

      v = (v >>> 0);

      grid[x][y] = v % 2;
    }
  }

  let sum = 0;

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      sum += grid[x][y];
    }
  }

  if (sum % 2 === 1) {
    grid[0][0] = 1 - grid[0][0];
  }
}

function draw() {
  background(0);
  scale(s);

  drawGrid();
}

function drawGrid() {
  push();
  translate(MID - HALF, MID - HALF);

  noStroke();

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {

      let px = x * CELL;
      let py = y * CELL;

      if (grid[x][y] === 1) {
        fill(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        );
      } else {
        fill(0);
      }

      rect(px, py, CELL, CELL);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}