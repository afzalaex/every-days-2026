const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let gridCount = 30;
let baseLength = 6;

let clickX = 0;
let clickY = 0;

let targetX = 0;
let targetY = 0;

let cells = [];

function setup() {
  computeCanvas();
  strokeWeight(2.5);
  noFill();
  generateGrid();
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
}

function generateGrid() {
  let step = ART / gridCount;

  for (let x = -HALF; x <= HALF; x += step) {
    for (let y = -HALF; y <= HALF; y += step) {

      cells.push({
        x: x,
        y: y,
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }
  }
}

function draw() {
  background(0);
  
  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  if (mx >= -HALF && mx <= HALF && my >= -HALF && my <= HALF) {
    targetX = mx;
    targetY = my;
  }

  clickX = lerp(clickX, targetX, 0.08);
  clickY = lerp(clickY, targetY, 0.08);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  for (let c of cells) {

    let dx = clickX - c.x;
    let dy = clickY - c.y;

    let angle = atan2(dy, dx);
    let d = dist(c.x, c.y, clickX, clickY);

    let influence = map(d, 0, HALF, 2.0, 0.2);
    let len = baseLength + influence * 20;

    stroke(c.r, c.g, c.b);

    push();
    translate(c.x, c.y);
    rotate(angle);

    line(0, 0, len, 0);

    pop();
  }

  pop();
}