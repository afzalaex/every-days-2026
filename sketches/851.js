const BASE = 1000;
const ART = 380;
let s;
let angle = 0;
let shapes = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noFill();
  generateShapes();
}

function generateShapes() {
  shapes = [];
  let step = 50;

  for (let x = -ART / 2; x <= ART / 2; x += step) {
    for (let y = -ART / 2; y <= ART / 2; y += step) {
      shapes.push({
        x: x,
        y: y,
        col: color(random(155, 255), random(155, 255), random(155, 255)),
      });
    }
  }
}

function draw() {
  background(0);
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);
  strokeWeight(3);

  for (let shape of shapes) {
    drawShape(shape.x, shape.y, angle, shape.col);
  }

  pop();
  angle += 0.0065;
}

function drawShape(x, y, a, c) {
  let diameter = 20 + 200 * sin(a);
  stroke(c);
  ellipse(x, y, diameter, diameter);
}

function mousePressed() {
  generateShapes();
}

function touchStarted() {
  mousePressed();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}
