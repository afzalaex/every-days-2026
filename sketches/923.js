const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let SPLITS;
let pieces = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  strokeCap(SQUARE);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function draw() {
  scale(viewScale);

  background(0);

  SPLITS = floor(random(25, 251));

  pieces = [];

  pieces.push([
    createVector(OFFSET, OFFSET),
    createVector(OFFSET + ART, OFFSET),
    createVector(OFFSET + ART, OFFSET + ART),
    createVector(OFFSET, OFFSET + ART),
  ]);

  for (let i = 0; i < SPLITS; i++) {
    splitRandomPiece();
  }

  strokeWeight(1.2);

  for (let poly of pieces) {
    fill(random(155, 255), random(155, 255), random(155, 255));

    stroke(0);

    beginShape();
    for (let p of poly) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
}

function splitRandomPiece() {
  let valid = [];

  for (let i = 0; i < pieces.length; i++) {
    if (polygonArea(pieces[i]) > 120) valid.push(i);
  }

  if (valid.length === 0) return;

  let idx = random(valid) | 0;
  let poly = pieces[idx];

  let angle = random(TAU);

  let dir = createVector(cos(angle), sin(angle));
  let normal = createVector(-dir.y, dir.x);

  let c = centroid(poly);

  let offset = random(-25, 25);

  let point = p5.Vector.add(c, p5.Vector.mult(normal, offset));

  let left = [];
  let right = [];

  for (let i = 0; i < poly.length; i++) {
    let a = poly[i];
    let b = poly[(i + 1) % poly.length];

    let da = side(a, point, dir);
    let db = side(b, point, dir);

    if (da >= 0) left.push(a.copy());
    if (da <= 0) right.push(a.copy());

    if (da * db < 0) {
      let hit = intersectLine(a, b, point, dir);

      left.push(hit.copy());
      right.push(hit.copy());
    }
  }

  if (left.length >= 3 && right.length >= 3) {
    pieces.splice(idx, 1);
    pieces.push(left);
    pieces.push(right);
  }
}

function side(p, point, dir) {
  return (p.x - point.x) * dir.y - (p.y - point.y) * dir.x;
}

function intersectLine(a, b, point, dir) {
  let edge = p5.Vector.sub(b, a);

  let denom = edge.x * dir.y - edge.y * dir.x;

  if (abs(denom) < 0.0001) return a.copy();

  let t = ((point.x - a.x) * dir.y - (point.y - a.y) * dir.x) / denom;

  return p5.Vector.lerp(a, b, t);
}

function centroid(poly) {
  let x = 0;
  let y = 0;

  for (let p of poly) {
    x += p.x;
    y += p.y;
  }

  return createVector(x / poly.length, y / poly.length);
}

function polygonArea(poly) {
  let a = 0;

  for (let i = 0; i < poly.length; i++) {
    let p = poly[i];
    let q = poly[(i + 1) % poly.length];

    a += p.x * q.y - q.x * p.y;
  }

  return abs(a) * 0.5;
}

function mousePressed() {
  redraw();
}
