const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let branches = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
}

function generate() {
  branches = [];
  for (let i = 0; i < 140; i++) {
    grow(random(-HALF, HALF), random(-HALF, HALF), random(TWO_PI), 0);
  }
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);

  for (let seg of branches) {
    stroke(seg.r, seg.g, seg.b);
    strokeWeight(seg.w);
    line(seg.x1, seg.y1, seg.x2, seg.y2);

    if (seg.mark) {
      push();
      translate(seg.x2, seg.y2);
      rotate(seg.rot);
      line(-seg.mw, 0, seg.mw, 0);
      if (seg.cross) {
        line(0, -seg.mw * 0.5, 0, seg.mw * 0.5);
      }
      pop();
    }
  }
}

function grow(x, y, a, depth) {
  if (depth > 10) return;

  const segments = floor(random(8, 35));
  let px = x;
  let py = y;
  const r = random(155, 255);
  const g = random(155, 255);
  const b = random(155, 255);

  for (let i = 0; i < segments; i++) {
    const step = random(4, 10);
    const choice = random();

    if (choice < 0.15) {
      a += random(-PI / 2, PI / 2);
    } else if (choice < 0.7) {
      a += random(-0.25, 0.25);
    }

    const nx = px + cos(a) * step;
    const ny = py + sin(a) * step;

    if (nx < -HALF || nx > HALF || ny < -HALF || ny > HALF) return;

    const obj = {
      x1: px, y1: py,
      x2: nx, y2: ny,
      r, g, b,
      w: random(0.2, 0.8),
      mark: false,
    };

    if (random() < 0.12) {
      obj.mark = true;
      obj.rot = a;
      obj.mw = random(2, 8);
      obj.cross = random() < 0.5;
    }

    branches.push(obj);

    if (random() < 0.06) grow(nx, ny, a + random(-1, 1), depth + 1);
    if (random() < 0.02) return;

    px = nx;
    py = ny;
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}