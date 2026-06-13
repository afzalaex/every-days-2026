const BASE = 1000;
const MID = BASE / 2;
const ART_SIZE = 500;
const CIRCLE_R = ART_SIZE / 2;
const SYMBOLS = 1000;

let s;
let placed = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  rectMode(CENTER);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function mousePressed() {
  redraw();
}

function draw() {
  background(0);
  placed = [];

  push();
  scale(s);
  translate(MID, MID);

  let attempts = 0;

  while (placed.length < SYMBOLS && attempts < SYMBOLS * 20) {
    attempts++;

    const angle = random(TWO_PI);
    const dist = sqrt(random()) * CIRCLE_R;

    const x = cos(angle) * dist;
    const y = sin(angle) * dist;

    const size = random(12, 22);
    const r = size * 0.6;

    let ok = true;

    for (let p of placed) {
      if (distSq(x, y, p.x, p.y) < sq(r + p.r)) {
        ok = false;
        break;
      }
    }

    if (ok) {
      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      noStroke();

      push();
      translate(x, y);
      rotate(random(TWO_PI));

      if (random() < 0.5) {
        rect(0, 0, size * 0.2, size);
        rect(0, 0, size, size * 0.2);
      } else {
        rect(0, 0, size, size * 0.2);
      }

      pop();

      placed.push({ x, y, r });
    }
  }

  pop();
}

function distSq(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
}