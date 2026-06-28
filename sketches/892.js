const BASE = 1000;

let s;
let angle = 0;
let circleRadius = 125;
let numCircles = 8;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  background(0);
}

function draw() {
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);
  rotate(angle);

  stroke(
    random(155, 255),
    random(155, 255),
    random(155, 255)
  );
  strokeWeight(5);
  noFill();

  for (let i = 0; i < numCircles; i++) {
    let x = circleRadius * cos(TWO_PI * i / numCircles);
    let y = circleRadius * sin(TWO_PI * i / numCircles);
    ellipse(x, y, circleRadius * 2);
  }

  pop();

  angle += 0.01;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}