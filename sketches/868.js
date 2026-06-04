const BASE = 1000;
const ART  = 500;
const HALF = ART / 2;

let s;
let blocks = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generateComposition();
}

function generateComposition() {
  blocks = [];
  splitRect(-HALF, -HALF, ART, ART, 6);
  blocks.sort((a, b) => a.w * a.h - b.w * b.h);
  for (let b of blocks) {
    b.col = color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );
  }
}

function splitRect(x, y, w, h, depth) {
  if (depth <= 0 || w < 35 || h < 35 || random() < 0.22) {
    blocks.push({ x, y, w, h });
    return;
  }

  if (w > h) {
    let cut = random(0.3, 0.7);
    let w1  = w * cut;
    let w2  = w - w1;
    splitRect(x,       y, w1, h,  depth - 1);
    splitRect(x + w1,  y, w2, h,  depth - 1);
  } else {
    let cut = random(0.3, 0.7);
    let h1  = h * cut;
    let h2  = h - h1;
    splitRect(x, y,       w, h1, depth - 1);
    splitRect(x, y + h1,  w, h2, depth - 1);
  }
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  scale(s);
  noStroke();

  for (let b of blocks) {
    fill(b.col);
    rect(b.x + 2, b.y + 2, b.w - 4, b.h - 4);

    let inset = min(b.w, b.h) * 0.18;
    fill(0, 40);
    rect(b.x + inset, b.y + inset, b.w - inset * 2, b.h - inset * 2);
  }

  stroke(255, 30);
  strokeWeight(1);
  noFill();
  rect(-HALF, -HALF, ART, ART);
  pop();
}

function mousePressed() {
  generateComposition();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}