const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const LINE_COUNT = 200;
const LINE_WEIGHT = 2;

let palette = [];
let points = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function generate() {
  background(0);

  push();

  scale(viewScale);

  palette = [];

  for (let i = 0; i < 50; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  points = [];

  const focalCount = floor(random(2, 5));

  for (let i = 0; i < focalCount; i++) {
    points.push({
      x: random(ART * 0.2, ART * 0.8),
      y: random(ART * 0.2, ART * 0.8),
    });
  }

  strokeCap(SQUARE);
  strokeWeight(LINE_WEIGHT);
  noFill();

  for (let i = 0; i < LINE_COUNT; i++) {
    let edge = floor(random(4));

    let sx;
    let sy;

    if (edge === 0) {
      sx = random(ART);
      sy = 0;
    } else if (edge === 1) {
      sx = ART;
      sy = random(ART);
    } else if (edge === 2) {
      sx = random(ART);
      sy = ART;
    } else {
      sx = 0;
      sy = random(ART);
    }

    let target = random(points);

    stroke(random(palette));

    line(OFFSET + sx, OFFSET + sy, OFFSET + target.x, OFFSET + target.y);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
