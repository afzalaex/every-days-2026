const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

const CELL = 60;
const COLS = ART / CELL;
const ROWS = ART / CELL;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  colorMode(RGB);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function draw() {
  scale(s);
  background(0);

  push();
  translate(MID - HALF, MID - HALF);

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      let px = x * CELL;
      let py = y * CELL;

      let r = random(155, 255);
      let g = random(155, 255);
      let b = random(155, 255);

      noStroke();

      if (random() > 0.5) {
        fill(r, g, b);
        rect(px, py, CELL / 2, CELL);

        fill(0);
        rect(px + CELL / 2, py, CELL / 2, CELL);
      } else {
        fill(r, g, b);
        rect(px, py, CELL, CELL / 2);

        fill(0);
        rect(px, py + CELL / 2, CELL, CELL / 2);
      }
    }
  }

  pop();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}