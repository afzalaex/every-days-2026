const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const BLOCKS = 500;

let rects = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  rects = [];

  for (let i = 0; i < BLOCKS; i++) {

    let w = random(2, 200);
    let h = random(2, 200);

    let x = random(-HALF, HALF - w);
    let y = random(-HALF, HALF - h);

    rects.push({ x, y, w, h });
  }
}

function draw() {
  scale(s);
  background(0);
  translate(BASE / 2, BASE / 2);

  for (let r of rects) {
    fill(random(155,255), random(155,255), random(155,255));
    stroke(0);
    rect(r.x, r.y, r.w, r.h);
  }
}

function mousePressed() {
  generate();
  redraw();
}