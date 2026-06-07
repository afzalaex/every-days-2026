const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let blocks = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function mousePressed() {
  generate();
}

function generate() {
  blocks = [];
  splitBlock(-HALF, -HALF, ART, ART, 5);
  redraw();
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  scale(s);

  strokeWeight(2);
  noFill();

  for (let b of blocks) {
    stroke(b.r, b.g, b.b);

    rect(b.x, b.y, b.w, b.h);

    let m = min(b.w, b.h) * b.margin;

    if (b.w > 30 && b.h > 30) {
      rect(b.x + m, b.y + m, b.w - m * 2, b.h - m * 2);
    }

    line(b.x, b.y + b.h * 0.5, b.x + b.w, b.y + b.h * 0.5);
    line(b.x + b.w * 0.5, b.y, b.x + b.w * 0.5, b.y + b.h);
  }

  pop();
}

function splitBlock(x, y, w, h, depth) {
  if (depth === 0 || w < 40 || h < 40) {
    blocks.push({
      x, y, w, h,
      margin: random(0.15, 0.35),
      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255)
    });
    return;
  }

  let vertical = random() < 0.5;
  if (w > h * 1.4) vertical = true;
  if (h > w * 1.4) vertical = false;

  let gap = random(4, 12);

  if (vertical) {
    let cut = random(0.3, 0.7);
    let w1 = w * cut - gap * 0.5;
    let w2 = w * (1 - cut) - gap * 0.5;
    splitBlock(x, y, w1, h, depth - 1);
    splitBlock(x + w1 + gap, y, w2, h, depth - 1);
  } else {
    let cut = random(0.3, 0.7);
    let h1 = h * cut - gap * 0.5;
    let h2 = h * (1 - cut) - gap * 0.5;
    splitBlock(x, y, w, h1, depth - 1);
    splitBlock(x, y + h1 + gap, w, h2, depth - 1);
  }
}