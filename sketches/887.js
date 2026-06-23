const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let segs = [];

let cx, cy;

let f1, f2, f3;
let w1, w2, w3, w4;
let p1, p2;
let lenMin, lenMax;

function setup() {
  createCanvas(BASE, BASE);
  strokeCap(SQUARE);

  generate();
  noLoop();
}

function generate() {
  segs = [];

  cx = random(-150, 150);
  cy = random(-150, 150);

  f1 = random(0.005, 0.08);
  f2 = random(0.005, 0.08);
  f3 = random(0.005, 0.08);

  p1 = random(TWO_PI);
  p2 = random(TWO_PI);

  w1 = random(-3, 3);
  w2 = random(-3, 3);
  w3 = random(-2, 2);
  w4 = random(-3, 3);

  lenMin = random(4, 10);
  lenMax = random(12, 24);

  const count = 5000;

  for (let i = 0; i < count; i++) {
    const x = random(-HALF, HALF);
    const y = random(-HALF, HALF);

    const dx = x - cx;
    const dy = y - cy;
    const d = sqrt(dx * dx + dy * dy);

    let a = 0;
    a += sin(x * f1 + p1) * w1;
    a += cos(y * f2 + p2) * w2;
    a += atan2(dy, dx) * w3;
    a += sin(d * f3) * w4;

    const len = map(
      sin(d * f3 + p1),
      -1, 1,
      lenMin, lenMax
    );

    segs.push({
      x,
      y,
      a,
      len,
      col: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }

  redraw();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let s of segs) {
    stroke(s.col[0], s.col[1], s.col[2]);
    strokeWeight(1.5);

    const x1 = s.x - cos(s.a) * s.len * 0.5;
    const y1 = s.y - sin(s.a) * s.len * 0.5;
    const x2 = s.x + cos(s.a) * s.len * 0.5;
    const y2 = s.y + sin(s.a) * s.len * 0.5;

    line(x1, y1, x2, y2);
  }
}

function mousePressed() {
  generate();
}