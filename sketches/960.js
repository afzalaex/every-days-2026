const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const STEP = 15;
const COLS = ART / STEP;
const ROWS = ART / STEP;

const LINE_WEIGHT = 2;

let s;
let segments = [];
let palette = [];

function computeScale() {
  s = min(min(windowWidth, windowHeight), BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);

  strokeCap(SQUARE);
  strokeJoin(MITER);
  noLoop();
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

  render();

  pop();
}

function buildPalette() {
  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function generate() {
  segments = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (x < COLS - 1 && random() < 0.42) {
        segments.push({
          x1: x,
          y1: y,
          x2: x + 1,
          y2: y,
        });
      }

      if (y < ROWS - 1 && random() < 0.42) {
        segments.push({
          x1: x,
          y1: y,
          x2: x,
          y2: y + 1,
        });
      }

      if (random() < 0.055 && x < COLS - 1 && y < ROWS - 1) {
        if (random() < 0.5) {
          segments.push({
            x1: x,
            y1: y,
            x2: x + 1,
            y2: y + 1,
          });
        } else {
          segments.push({
            x1: x + 1,
            y1: y,
            x2: x,
            y2: y + 1,
          });
        }
      }
    }
  }
}

function render() {
  strokeWeight(LINE_WEIGHT);

  for (let seg of segments) {
    if (random() < 0.13) {
      continue;
    }

    stroke(random(palette));

    line(seg.x1 * STEP, seg.y1 * STEP, seg.x2 * STEP, seg.y2 * STEP);
  }
}

function mousePressed() {
  redraw();
}
