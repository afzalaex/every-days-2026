const BASE = 1000;
let s;

let rects = [];
let maxDepth = 6;

function setup() {
  computeScale();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function windowResized() {
  computeScale();
  redraw();
}

function generate() {
  rects = [];
  splitRect(-250, -250, 500, 500, 0);
}

function splitRect(x, y, w, h, depth) {
  if (depth >= maxDepth) {
    rects.push({ x, y, w, h });
    return;
  }

  let bias = random();

  if (bias > 0.5) {
    let cut = w * random(0.3, 0.7);
    splitRect(x, y, cut, h, depth + 1);
    splitRect(x + cut, y, w - cut, h, depth + 1);
  } else {
    // horizontal split
    let cut = h * random(0.3, 0.7);
    splitRect(x, y, w, cut, depth + 1);
    splitRect(x, y + cut, w, h - cut, depth + 1);
  }
}

function draw() {
  background(0);

  push();
  scale(s / BASE);
  translate(BASE / 2, BASE / 2);

  stroke(255);
  strokeWeight(2);
  noFill();

  for (let r of rects) {
    rect(r.x, r.y, r.w, r.h);
  }

  pop();
}

function mousePressed() {
  generate();
}