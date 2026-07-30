const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COUNT = 11;
const CELL = ART / COUNT;

let palette = [];
let pattern;
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noStroke();
  noLoop();
  generate();
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  for (let y = 0; y < COUNT; y++) {
    for (let x = 0; x < COUNT; x++) {
      fill(palette[patternIndex(x, y)]);

      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL + 1, CELL + 1);
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
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function generate() {
  palette = [];

  for (let i = 0; i < COUNT; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  pattern = floor(random(11));
}

function patternIndex(x, y) {
  switch (pattern) {
    case 0:
      return x;

    case 1:
      return y;

    case 2:
      return (x - y + COUNT) % COUNT;

    case 3:
      return (x + y) % COUNT;

    case 4:
      return (x + 2 * y) % COUNT;

    case 5:
      return (2 * x + y) % COUNT;

    case 6:
      return (2 * x + 3 * y) % COUNT;

    case 7:
      return (3 * x + y) % COUNT;

    case 8:
      return y % 2 === 0 ? x : COUNT - 1 - x;

    case 9:
      return x % 2 === 0 ? y : COUNT - 1 - y;

    case 10:
      return (3 * x + 5 * y) % COUNT;
  }

  return 0;
}
