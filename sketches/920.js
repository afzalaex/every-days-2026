const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const LAYOUT = 100;
const CELL = ART / LAYOUT;

let s;
let cols = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * s, SIZE * s);
  noLoop();
  generate();
}

function generate() {
  background(0);

  cols = Array.from({ length: LAYOUT }, () => Array(LAYOUT));

  for (let x = 0; x < LAYOUT; x++) {
    cols[0][x] = color(random(155, 255), random(155, 255), random(155, 255));
  }

  for (let y = 1; y < LAYOUT; y++) {
    for (let x = 0; x < LAYOUT; x++) {
      let parent =
        cols[y - 1][constrain(x + floor(random(-1, 2)), 0, LAYOUT - 1)];

      cols[y][x] = color(
        constrain(red(parent) + random(-12, 12), 155, 255),
        constrain(green(parent) + random(-12, 12), 155, 255),
        constrain(blue(parent) + random(-12, 12), 155, 255)
      );
    }
  }

  noStroke();

  push();
  scale(s);

  let slip = 0;

  for (let y = 0; y < LAYOUT; y++) {
    slip += floor(random(-1, 2));

    for (let x = 0; x < LAYOUT; x++) {
      let xx = (x + slip + LAYOUT * 10) % LAYOUT;

      fill(cols[y][x]);
      rect(OFFSET + xx * CELL, OFFSET + y * CELL, CELL, CELL);
    }
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * s, SIZE * s);
  redraw();
}