const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const STEP = 25;
const COLS = ART / STEP;
const ROWS = ART / STEP;

const PALETTE_SIZE = 128;

let viewScale = 1;
let seedState = [];
let palette = [];

function setup() {
  computeCanvas();
  noLoop();
  initSeed();
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function initSeed() {
  seedState = [];
  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ));
  }

  for (let y = 0; y < ROWS; y++) {
    seedState[y] = [];
    for (let x = 0; x < COLS; x++) {
      seedState[y][x] = random() < 0.5 ? 0 : 1;
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2 - HALF, BASE / 2 - HALF);
  noStroke();

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      drawDerivedCell(x, y);
    }
  }

  pop();
}

function derivedState(x, y) {
  let px = (x + y) % COLS;
  let py = (y + ROWS - 1) % ROWS;
  return seedState[py][px] ^ ((x + y) % 2);
}

function drawDerivedCell(xi, yi) {
  let x = xi * STEP;
  let y = yi * STEP;
  let s = derivedState(xi, yi);

  let ci = (xi * 31 + yi * 47) % palette.length;
  fill(palette[ci]);

  if (s === 0) {
    rect(x + STEP * 0.4, y, STEP * 0.2, STEP);
  } else {
    rect(x, y + STEP * 0.4, STEP, STEP * 0.2);
  }
}

function mousePressed() {
  let mx = mouseX / viewScale - (BASE / 2 - HALF);
  let my = mouseY / viewScale - (BASE / 2 - HALF);

  let cx = floor(mx / STEP);
  let cy = floor(my / STEP);

  if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return;
  
  let px = (cx + cy) % COLS;
  let py = (cy + ROWS - 1) % ROWS;

  seedState[py][px] ^= 1;
  redraw();
}
