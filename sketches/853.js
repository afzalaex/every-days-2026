const BASE = 1000;
let s;
let colors;
let numShapes = 100;
let animationSpeed = 0.01;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  colors = generateRandomColors(numShapes);
}

function draw() {
  background(0);
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  let radius = 160;
  let angleIncrement = TWO_PI / numShapes;

  for (let i = 0; i < numShapes; i++) {
    let angle = angleIncrement * i;
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let strokeColor = colors[i];
    drawRotatingStar(x, y, strokeColor, frameCount * animationSpeed);
  }
  pop();
}

function drawRotatingStar(x, y, strokeColor, offset) {
  stroke(strokeColor);
  strokeWeight(2);
  noFill();
  beginShape();

  for (let i = 0; i < 10; i++) {
    let angle = (TWO_PI / 5) * i + offset;
    let outerRadius = 120;
    let innerRadius = 60;
    let r = i % 2 === 0 ? outerRadius : innerRadius;
    vertex(r * cos(angle) + x, r * sin(angle) + y);
  }

  endShape(CLOSE);
}

function generateRandomColors(num) {
  let generatedColors = [];
  for (let i = 0; i < num; i++) {
    generatedColors.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
  return generatedColors;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}