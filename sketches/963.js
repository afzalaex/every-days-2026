const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COUNT = 36;

const UNIT = 36;
const GAP = 10;

const MIN_ARM = 1;
const MAX_ARM = 8;

let viewScale;
let forms = [];

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  for (let f of forms) {
    fill(f.r, f.g, f.b);

    push();

    translate(f.x, f.y);
    rotate(f.rotation);

    rect(0, 0, f.arm * UNIT, UNIT);

    rect(0, 0, UNIT, f.arm * UNIT);

    pop();
  }

  pop();
}

function generate() {
  forms = [];

  let candidates = [];

  for (let y = 0; y < ART; y += UNIT + GAP) {
    for (let x = 0; x < ART; x += UNIT + GAP) {
      candidates.push({
        x: x,
        y: y,
      });
    }
  }

  shuffle(candidates, true);

  for (let c of candidates) {
    if (forms.length >= COUNT) {
      break;
    }

    let arm = floor(random(MIN_ARM, MAX_ARM + 1));

    let shapeSize = arm * UNIT;

    let rotation = floor(random(4)) * HALF_PI;

    let minX = c.x;
    let minY = c.y;
    let maxX = c.x + shapeSize;
    let maxY = c.y + shapeSize;

    if (rotation === HALF_PI) {
      minX = c.x - shapeSize;
      maxX = c.x;

      minY = c.y;
      maxY = c.y + shapeSize;
    }

    if (rotation === PI) {
      minX = c.x - shapeSize;
      maxX = c.x;

      minY = c.y - shapeSize;
      maxY = c.y;
    }

    if (rotation === PI + HALF_PI) {
      minX = c.x;
      maxX = c.x + shapeSize;

      minY = c.y - shapeSize;
      maxY = c.y;
    }

    if (minX < 0 || minY < 0 || maxX > ART || maxY > ART) {
      continue;
    }

    let neighbors = 0;

    for (let f of forms) {
      let d = dist(c.x, c.y, f.x, f.y);

      if (d < UNIT * 6) {
        neighbors++;
      }
    }

    if (forms.length > 3 && neighbors === 0) {
      continue;
    }

    forms.push({
      x: c.x,
      y: c.y,

      arm: arm,

      rotation: rotation,

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
    });
  }
}

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}

function mousePressed() {
  generate();
}
