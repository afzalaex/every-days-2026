const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 8;
const ROWS = 8;
const CELL = ART / COLS;

const MARGIN = 5;
const STEPS = 5;

let seed;
let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();

  regenerate();
}

function draw() {}

function mousePressed() {
  regenerate();
}

function regenerate() {
  generate();
}

function generate() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noFill();

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      drawCell(x * CELL, y * CELL);
    }
  }

  pop();
}

function drawCell(x, y) {
  const mode = floor(random(4));

  stroke(random(155, 255), random(155, 255), random(155, 255));

  strokeWeight(2);

  for (let i = 0; i < STEPS; i++) {
    const inset = MARGIN + i * 7;

    let rx = x + inset;
    let ry = y + inset;
    let rw = CELL - inset * 2;
    let rh = CELL - inset * 2;

    const shift = i * 3;

    if (mode === 0) {
      rx += shift;
      rw -= shift;
    }

    if (mode === 1) {
      ry += shift;
      rh -= shift;
    }

    if (mode === 2) {
      rw -= shift;
      rh -= shift;
    }

    if (mode === 3) {
      rx += shift;
      ry += shift;
      rw -= shift;
      rh -= shift;
    }

    if (rw > 0 && rh > 0) {
      rect(rx, ry, rw, rh);
    }
  }
}
