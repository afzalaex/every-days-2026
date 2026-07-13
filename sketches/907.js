const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const STEP = 10;
const COLS = ART / STEP;
const ROWS = ART / STEP;

const LINE_WEIGHT = 4;

let s;

let h = [];
let v = [];
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);

  strokeCap(SQUARE);
  strokeJoin(MITER);
  noLoop();

  buildPalette();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0);

  buildPalette();
  generate();

  push();
  scale(s / BASE);
  translate(OFFSET, OFFSET);

  drawHorizontal();
  drawVertical();

  pop();
}

function buildPalette() {
  palette = [];

  for (let i = 0; i < 8; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function generate() {
  h = [];
  v = [];

  for (let y = 0; y <= ROWS; y++) {
    h[y] = [];

    let state = random() < 0.5;

    for (let x = 0; x < COLS; x++) {
      if (random() < 0.08) state = !state;

      h[y][x] = state;
    }
  }

  for (let x = 0; x <= COLS; x++) {
    v[x] = [];

    let state = random() < 0.5;

    for (let y = 0; y < ROWS; y++) {
      if (random() < 0.08) state = !state;

      v[x][y] = state;
    }
  }
}

function drawHorizontal() {
  strokeWeight(LINE_WEIGHT);

  for (let y = 0; y <= ROWS; y++) {
    let run = false;
    let start = 0;
    let ink = random(palette);

    for (let x = 0; x <= COLS; x++) {
      let on = x < COLS ? h[y][x] : false;

      if (on && !run) {
        run = true;
        start = x;
        ink = random(palette);
      }

      if ((!on || x === COLS) && run) {
        stroke(ink);

        line(start * STEP, y * STEP, x * STEP, y * STEP);

        run = false;
      }
    }
  }
}

function drawVertical() {
  strokeWeight(LINE_WEIGHT);

  for (let x = 0; x <= COLS; x++) {
    let run = false;
    let start = 0;
    let ink = random(palette);

    for (let y = 0; y <= ROWS; y++) {
      let on = y < ROWS ? v[x][y] : false;

      if (on && !run) {
        run = true;
        start = y;
        ink = random(palette);
      }

      if ((!on || y === ROWS) && run) {
        stroke(ink);

        line(x * STEP, start * STEP, x * STEP, y * STEP);

        run = false;
      }
    }
  }
}

function mousePressed() {
  redraw();
}