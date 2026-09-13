const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COUNT = 25;

const MIN_SIZE = 28;
const MAX_SIZE = 470;

const LINE_WEIGHT = 2;

let viewScale;
let shapes = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

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

  for (let s of shapes) {
    fill(s.r, s.g, s.b);

    beginShape();

    for (let p of s.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(LINE_WEIGHT);
  noFill();

  for (let s of shapes) {
    beginShape();

    for (let p of s.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function generate() {
  shapes = [];

  let x = ART / 2;
  let y = ART / 2;

  let size = MAX_SIZE;

  let baseAngle = 0;

  if (random() < 0.2) {
    baseAngle = random(-0.12, 0.12);
  }

  let angle = baseAngle;

  let driftAngle = random(TWO_PI);

  for (let i = 0; i < COUNT; i++) {
    size *= random(0.925, 0.965);
    size = max(size, MIN_SIZE);

    const drift = map(size, MIN_SIZE, MAX_SIZE, 2, 11);

    x += cos(driftAngle) * random(0.2, 1) * drift;

    y += sin(driftAngle) * random(0.2, 1) * drift;

    driftAngle += random(-0.12, 0.12);

    angle += random(0.01, 0.035);

    const w = size * random(0.82, 1.08);
    const h = size * random(0.82, 1.08);

    const distortion = map(size, MIN_SIZE, MAX_SIZE, 2, 22);

    const points = createShape(x, y, w, h, angle, distortion);

    addShape(points);
  }
}

function createShape(x, y, w, h, angle, distortion) {
  const points = [];

  const corners = [
    [-w / 2, -h / 2],
    [w / 2, -h / 2],
    [w / 2, h / 2],
    [-w / 2, h / 2],
  ];

  for (let i = 0; i < corners.length; i++) {
    let px = corners[i][0];
    let py = corners[i][1];

    px += random(-distortion, distortion);
    py += random(-distortion, distortion);

    const rx = px * cos(angle) - py * sin(angle);

    const ry = px * sin(angle) + py * cos(angle);

    points.push(createVector(x + rx, y + ry));
  }

  return points;
}

function addShape(points) {
  const tone = random();

  let r, g, b;

  r = random(155, 255);
  g = random(155, 255);
  b = random(155, 255);

  shapes.push({
    points: points,
    r: r,
    g: g,
    b: b,
  });
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
