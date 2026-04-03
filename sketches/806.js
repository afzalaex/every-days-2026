const BASE = 1000;
let s = 1;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(2);
  smooth();
  noLoop();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  drawSpiralField();

  pop();
}

function drawSpiralField() {
  strokeWeight(1);
  noFill();

  const layers = 120;
  const points = 500;
  const maxR = 250;
  const twist = 0.005;

  for (let i = 0; i < layers; i++) {

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    const offset = random(TWO_PI);

    beginShape();
    for (let j = 0; j < points; j++) {
      const t = j / (points - 1);
      const r = t * maxR;
      const a = t * TWO_PI * (2 + i * twist) + offset;

      const x = r * cos(a);
      const y = r * sin(a);

      vertex(x, y);
    }
    endShape();
  }
}

function mousePressed() {
  generate();
  redraw();
}