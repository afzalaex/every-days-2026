const BASE = 1000;
const ART = 500;
const HALF = ART / 2;
const N = 800;

let viewScale;
let pieces = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * viewScale, BASE * viewScale);

  for (let i = 0; i < N; i++) {
    pieces.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      w: random(2, 12),
      h: random(2, 40),
      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255)
    });
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * viewScale, BASE * viewScale);
}

function draw() {
  background(0);

  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  noStroke();

  for (let p of pieces) {
    let d = dist(p.x, p.y, mx, my);

    let influence = map(constrain(d, 0, 400), 0, 400, 1, 0);

    let a = atan2(my - p.y, mx - p.x);

    push();
    translate(p.x, p.y);
    rotate(a);

    fill(p.r, p.g, p.b);
    rectMode(CENTER);
    rect(0, 0, p.w + influence * 50, p.h);

    pop();
  }
}