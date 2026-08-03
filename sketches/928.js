const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 25;
const CELL = ART / CELLS;

let viewScale;

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  background(0);

  scale(viewScale);

  noStroke();

  const a = random(TWO_PI);
  const b = random(TWO_PI);
  const c = random(TWO_PI);
  const d = random(TWO_PI);
  const e = random(TWO_PI);
  const f = random(TWO_PI);

  const sx = random(0.08, 0.18);
  const sy = random(0.08, 0.18);

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      const r = 155 + 155 * abs(sin(x * sx + a) * cos(y * sy + b));

      const g = 155 + 155 * abs(sin((x + y) * 0.09 + c) * cos(x * 0.05 + d));

      const bcol = 155 + 155 * abs(cos((x - y) * 0.08 + e) * sin(y * 0.06 + f));

      fill(r, g, bcol);

      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL + 0.5, CELL + 0.5);
    }
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
