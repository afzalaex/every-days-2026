const BASE = 1000;

let s = 1;
let colors;
let numShapes = 120;
let animationSpeed = 0.01;

let sideCount = 1;
const CIRCLE_THRESHOLD = 24;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  colors = generateRandomColors(numShapes);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  let radius = 160;
  let angleIncrement = TWO_PI / numShapes;

  for (let i = 0; i < numShapes; i++) {
    let angle = angleIncrement * i;
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let strokeColor = colors[i];

    drawPolygon(x, y, strokeColor, frameCount * animationSpeed);
  }
}

function drawPolygon(x, y, strokeColor, offset) {
  stroke(strokeColor);
  strokeWeight(4  * s);
  noFill();
  beginShape();

  for (let i = 0; i < sideCount; i++) {
    let angle = (TWO_PI / sideCount) * i + offset;
    let shapeRadius = 120;
    let xPos = shapeRadius * cos(angle) + x;
    let yPos = shapeRadius * sin(angle) + y;
    vertex(xPos, yPos);
  }

  endShape(CLOSE);
}

function generateRandomColors(num) {
  let generatedColors = [];
  for (let i = 0; i < num; i++) {
    generatedColors.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }
  return generatedColors;
}

function mousePressed() {
  sideCount++;
  if (sideCount > CIRCLE_THRESHOLD) {
    sideCount = 1;
  }
}