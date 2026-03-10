const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let gridCount = 30;
let baseLength = 15;

let bloom = false;
let progress = 0;
let target = 0;

let clickX = 0;
let clickY = 0;

let cells = [];

function setup() {
  computeCanvas();
  strokeWeight(4);
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

  progress = lerp(progress, target, 0.08);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  for (let c of cells) {

    let dx = c.x - clickX;
    let dy = c.y - clickY;

    let angleToClick = atan2(dy, dx);
    let radialDist = dist(c.x, c.y, clickX, clickY);

    let radialInfluence = map(radialDist, 0, HALF, 1.5, 0.3);

    let rotationAmount = progress * radialInfluence * PI;

    stroke(c.r, c.g, c.b);

    push();
    translate(c.x, c.y);
    rotate(rotationAmount * angleToClick);

    line(-baseLength / 2, 0, baseLength / 2, 0);
    line(0, -baseLength / 2, 0, baseLength / 2);

    pop();
  }

  pop();
}

function mousePressed() {

  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  if (mx >= -HALF && mx <= HALF && my >= -HALF && my <= HALF) {

    if (!bloom) {
      clickX = mx;
      clickY = my;
      bloom = true;
      target = 1;
    } else {
      bloom = false;
      target = 0;
    }
  }
}




