const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const COUNT = 1200;
const STEPS = 60;
const STEP_SIZE = 2;

let freqX, freqY, phaseX, phaseY, twist;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();

  randomizeField();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function mousePressed() {
  randomizeField();
  redraw();
}

function randomizeField() {
  freqX = random(0.005, 0.02);
  freqY = random(0.005, 0.02);
  phaseX = random(TWO_PI);
  phaseY = random(TWO_PI);
  twist = random(0.5, 2.0);
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2);
  noFill();

  for (let i = 0; i < COUNT; i++) {

    let x = random(-HALF, HALF);
    let y = random(-HALF, HALF);

    stroke(random(155, 255), random(155, 255), random(155, 255));

    beginShape();

    for (let j = 0; j < STEPS; j++) {

      vertex(x, y);

      let angle =
        sin(x * freqX + phaseX) +
        cos(y * freqY + phaseY);

      angle *= twist;

      let dx = cos(angle) * STEP_SIZE;
      let dy = sin(angle) * STEP_SIZE;

      x += dx;
      y += dy;

      if (abs(x) > HALF || abs(y) > HALF) break;
    }

    endShape();
  }
}