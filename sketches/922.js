const SIZE = 1000;
const ART = 400;
const OFFSET = (SIZE - ART) / 2;

const STEPS = 2500;

let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  background(0);

  scale(viewScale);

  rectMode(CENTER);
  noStroke();

  let r = {
    x: OFFSET + ART / 2,
    y: OFFSET + ART / 2,
    w: 180,
    h: 180,
    a: 0,
  };

  for (let i = 0; i < STEPS; i++) {
    fill(random(155, 255), random(155, 255), random(155, 255), 14);

    push();
    translate(r.x, r.y);
    rotate(r.a);
    rect(0, 0, r.w, r.h);
    pop();

    r.x += random(-25, 25);
    r.y += random(-25, 25);

    r.x = constrain(r.x, OFFSET, OFFSET + ART);
    r.y = constrain(r.y, OFFSET, OFFSET + ART);

    if (random() < 0.25) r.a += HALF_PI;

    if (random() < 0.5) r.w *= random(0.88, 1.12);

    if (random() < 0.5) r.h *= random(0.88, 1.12);

    r.w = constrain(r.w, 10, 220);
    r.h = constrain(r.h, 10, 220);
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
