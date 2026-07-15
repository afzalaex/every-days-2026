const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

let s;
let seed = 0;

let numCircles;
let steps;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function mousePressed() {
  seed++;
  redraw();
}

function draw() {
  background(0);

  randomSeed(seed);

  numCircles = floor(random(50, 500));

  push();
  scale(s / BASE);
  noFill();

  for (let i = 0; i < numCircles; i++) {
    let x = random(OFFSET, OFFSET + ART);
    let y = random(OFFSET, OFFSET + ART);
    let d = random(10, 100);

    steps = floor(random(20, 80));

    let c1 = color(random(155, 255), random(155, 255), random(155, 255));

    let c2 = color(random(155, 255), random(155, 255), random(155, 255));

    drawCircle(x, y, d, c1, c2, steps);
  }

  pop();
}

function drawCircle(x, y, d, c1, c2, steps) {
  for (let i = 0; i < steps; i++) {
    let t = i / max(1, steps - 1);

    stroke(lerpColor(c1, c2, t));
    strokeWeight(2);

    let a = t * TWO_PI;

    let radius = d * 0.5 * random(0.85, 1.15);

    let ox = cos(a) * radius;
    let oy = sin(a) * radius;

    ellipse(x + ox, y + oy, d * random(0.12, 0.28), d * random(0.12, 0.28));
  }
}