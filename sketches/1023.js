const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const GRID_COUNT = 8;
const UNIT = ART / GRID_COUNT;

let viewScale = 1;
let palette = [];
let corners = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  palette = [];

  for (let i = 0; i < 8; i++) {
    palette.push(randomColor());
  }

  corners = [];

  for (let i = 0; i < 4; i++) {
    const stepA = floor(random(2, 4));
    const stepB = floor(random(1, stepA));

    corners.push({
      a: stepA,
      b: stepB,
      c: floor(random(1, 4)),
      color: floor(random(palette.length)),
    });
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  for (let i = 0; i < 4; i++) {
    push();

    if (i === 1) {
      translate(ART, 0);
      rotate(HALF_PI);
    } else if (i === 2) {
      translate(ART, ART);
      rotate(PI);
    } else if (i === 3) {
      translate(0, ART);
      rotate(-HALF_PI);
    }

    drawCorner(corners[i]);
    pop();
  }

  // Center intentionally left empty.

  pop();
}

function drawCorner(data) {
  const a = data.a;
  const b = data.b;
  const c = data.c;

  fill(palette[data.color]);

  beginShape();
  vertex(0, 0);
  vertex(4 * UNIT, 0);
  vertex(4 * UNIT, c * UNIT);
  vertex(a * UNIT, c * UNIT);
  vertex(a * UNIT, 2 * UNIT);
  vertex(b * UNIT, 2 * UNIT);
  vertex(b * UNIT, 4 * UNIT);
  vertex(0, 4 * UNIT);
  endShape(CLOSE);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generate();
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
