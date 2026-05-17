const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const SHAPES = 5000;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  noLoop();

  generate();
}

function generate() {

  background(0);

  push();

  scale(s);
  translate(BASE / 2, BASE / 2);

  noStroke();

  for (let i = 0; i < SHAPES; i++) {

    let a = random(TWO_PI);

    let radiusFactor = pow(random(), 0.75);
    let r = radiusFactor * HALF;

    let x = cos(a) * r;
    let y = sin(a) * r;

    let branchAngle =
      a +
      sin(r * 0.025) * 0.8 +
      random(-0.4, 0.4);

    let lengthVal = random(5, 35);

    let x2 =
      x +
      cos(branchAngle) *
      lengthVal;

    let y2 =
      y +
      sin(branchAngle) *
      lengthVal;

    let x3 =
      x2 +
      cos(branchAngle + random(-1,1)) *
      random(2,15);

    let y3 =
      y2 +
      sin(branchAngle + random(-1,1)) *
      random(2,15);

    fill(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    beginShape();

    vertex(x,y);
    vertex(x2,y2);
    vertex(x3,y3);

    endShape(CLOSE);
  }

  pop();
}

function draw() {}

function mousePressed() {
  generate();
}

function touchStarted() {
  mousePressed();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}