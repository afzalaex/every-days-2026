const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 50;
const ROWS = 50;

const BAR_W = 5;
const BAR_H = 20;

let seed;
let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();

  generate();
}

function draw() {
  background(0);

  randomSeed(seed);

  push();

  scale(viewScale);

  translate(OFFSET, OFFSET);

  rectMode(CENTER);
  noStroke();

  const cell = ART / COLS;

  const twist = random(0.15, 0.8);
  const wave = random(0.015, 0.045);
  const phase = random(TWO_PI);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const px = x * cell + cell / 2;
      const py = y * cell + cell / 2;

      const dx = px - ART / 2;
      const dy = py - ART / 2;

      const r = dist(px, py, ART / 2, ART / 2);

      const angle = atan2(dy, dx) + sin(r * wave + phase) * twist;

      push();

      translate(px, py);
      rotate(angle);

      fill(random(155, 255), random(155, 255), random(155, 255));

      rect(0, 0, BAR_W, BAR_H);

      pop();
    }
  }

  pop();
}

function generate() {
  seed = floor(random(1000000));
}

function mousePressed() {
  generate();
  redraw();
}
