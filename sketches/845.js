const BASE = 1000;
const ART = 500;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  angleMode(DEGREES);

  noLoop();

  generate();
}

function generate() {

  background(0);

  push();

  scale(s);

  drawMandala(BASE / 2, BASE / 2, 250, 6, 100);

  pop();
}

function drawMandala(x, y, radius, layers, numPoints) {

  let halfRange = ART / 2;

  for (let i = 0; i < layers; i++) {

    let color1 = color(random(200, 255));
    let color2 = color(random(200, 255));

    let startAngle = random(180);
    let endAngle = startAngle + random(90, 180);

    drawLayer(
      x,
      y,
      radius - i * 20,
      startAngle,
      endAngle,
      numPoints,
      color1,
      color2,
      halfRange
    );
  }
}

function drawLayer(
  x,
  y,
  radius,
  startAngle,
  endAngle,
  numPoints,
  color1,
  color2,
  halfRange
) {

  let angleStep = 40 / numPoints;

  for (
    let angle = startAngle;
    angle < endAngle;
    angle += angleStep
  ) {

    let x1 = x + cos(angle) * radius;
    let y1 = y + sin(angle) * radius;

    let x2 = x + cos(angle + angleStep) * radius;
    let y2 = y + sin(angle + angleStep) * radius;

    if (
      x1 >= x - halfRange &&
      x1 <= x + halfRange &&
      y1 >= y - halfRange &&
      y1 <= y + halfRange &&
      x2 >= x - halfRange &&
      x2 <= x + halfRange &&
      y2 >= y - halfRange &&
      y2 <= y + halfRange
    ) {

      let interpColor = lerpColor(
        color1,
        color2,
        (angle - startAngle) /
        (endAngle - startAngle)
      );

      stroke(interpColor);

      strokeWeight(0.5);

      line(x, y, x1, y1);
      line(x, y, x2, y2);
    }
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(BASE * s, BASE * s);

  generate();
}