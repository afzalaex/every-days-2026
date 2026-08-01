const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let viewScale;

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  rectMode(CENTER);
  stroke(0);
  strokeWeight(3 * viewScale);

  noLoop();
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  let x = SIZE / 2;
  let y = SIZE / 2;
  let s = ART * 0.95;

  for (let i = 0; i < 60; i++) {
    fill(random(155, 255), random(155, 255), random(155, 255));

    rect(x, y, s, s);

    x += random(-12, 12);
    y += random(-12, 12);

    s *= random(0.93, 0.98);

    if (random() < 0.25) {
      push();
      translate(x, y);
      rotate(random(-PI / 40, PI / 40));

      fill(random(155, 255), random(155, 255), random(155, 255));

      rect(0, 0, s, s);

      pop();

      s *= 0.98;
    }
  }

  pop();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  strokeWeight(3 * viewScale);
  redraw();
}
