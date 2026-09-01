const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 10;
const ROWS = 10;

const GAP = 8;
const MIN = 12;
const MAX = 42;

let viewScale;
let seed;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function draw() {}

function generate() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  const cw = (ART - GAP * (COLS - 1)) / COLS;
  const ch = (ART - GAP * (ROWS - 1)) / ROWS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const px = x * (cw + GAP);
      const py = y * (ch + GAP);

      drawForm(px, py, cw, ch, x, y);
    }
  }

  pop();
}

function drawForm(x, y, w, h, gx, gy) {
  const mode = floor(random(5));

  const margin = random(5, 12);

  let a = x + margin;
  let b = y + margin;
  let c = x + w - margin;
  let d = y + h - margin;

  stroke(random(155, 255), random(155, 255), random(155, 255));

  strokeWeight(2);
  noFill();

  for (let i = 0; i < 2; i++) {
    const t = i * random(5, 8);

    if (mode === 0) {
      line(a + t, b + t, c - t, b + t);
      line(a + t, b + t, a + t, d - t);
    }

    if (mode === 1) {
      line(c - t, b + t, a + t, b + t);
      line(c - t, b + t, c - t, d - t);
    }

    if (mode === 2) {
      line(a + t, d - t, a + t, b + t);
      line(a + t, d - t, c - t, d - t);
    }

    if (mode === 3) {
      line(c - t, d - t, c - t, b + t);
      line(c - t, d - t, a + t, d - t);
    }

    if (mode === 4) {
      line(a + t, b + t, c - t, d - t);
      line(c - t, b + t, a + t, d - t);
    }
  }
}

function mousePressed() {
  generate();
}
