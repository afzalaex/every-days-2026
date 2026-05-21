const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let scrollOffset = 0;
let stripes = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generateStripes() {
  stripes = [];
  let y = -10000;
  while (y < 10000) {
    let h = random(1, 5);
    stripes.push({
      y: y,
      h: h,
      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
    });
    y += h;
  }
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generateStripes();
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(5);
  for (let stripe of stripes) {
    let yy = stripe.y + scrollOffset;
    if (yy < -HALF - 10 || yy > HALF + 10) continue;
    stroke(stripe.r, stripe.g, stripe.b);
    for (let i = 0; i < stripe.h; i++) {
      line(-HALF, yy + i, HALF, yy + i);
    }
  }

  // subtle texture layer
  strokeWeight(0.3);
  for (let i = 0; i < 300; i++) {
    stroke(random(155, 255), random(155, 255), random(155, 255), random(20, 60));
    let yy = random(-HALF, HALF);
    line(-HALF, yy, HALF, yy);
  }
}

function mouseWheel(event) {
  scrollOffset -= event.delta * 0.5;
  return false;
}

function mousePressed() {
  generateStripes();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}