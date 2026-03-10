const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let points = [];
let colors = [];

const baseStroke = 2;

let axisAngle = 0;

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
}

function setup() {
  computeCanvas();

  let count = 1500;
  let revolutions = 10;

  for (let i = 0; i < count; i++) {

    let t = i / count;
    let angle = t * TWO_PI * revolutions;
    let radius = HALF * t;

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    points.push({ x, y });

    colors.push({
      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255)
    });
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  strokeWeight(baseStroke / viewScale);
  translate(BASE / 2, BASE / 2);

  drawSystem();

  pop();
}

function drawSystem() {

  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  if (abs(mx) <= HALF && abs(my) <= HALF) {
    axisAngle = atan2(my, mx);
  }

  for (let i = 0; i < points.length; i++) {

    let px = points[i].x;
    let py = points[i].y;

    let len = 20;

    let x2 = px + cos(axisAngle) * len;
    let y2 = py + sin(axisAngle) * len;

    let c = colors[i];
    stroke(c.r, c.g, c.b);

    line(px, py, x2, y2);
  }
}










