const BASE = 1000;
const ART = 500;
const HALF = ART / 2;
let s = 1;
let grid;
let baseStroke = 4;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  regenerate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function regenerate() {
  grid = floor(random(10, 30));
  redraw();
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);
  translate(-HALF, -HALF);
  generateField();
}

function generateField() {
  let cell = ART / grid;
  strokeWeight(baseStroke);
  strokeCap(ROUND);
  noFill();

  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      let x1 = x * cell;
      let y1 = y * cell;

      stroke(random(155, 255), random(155, 255), random(155, 255));

      let corner = floor(random(4));
      let cx, cy, startA, endA;

      if (corner === 0) {
        cx = x1;        cy = y1;
        startA = 0;             endA = HALF_PI;
      } else if (corner === 1) {
        cx = x1 + cell; cy = y1;
        startA = HALF_PI;       endA = PI;
      } else if (corner === 2) {
        cx = x1 + cell; cy = y1 + cell;
        startA = PI;            endA = PI + HALF_PI;
      } else {
        cx = x1;        cy = y1 + cell;
        startA = PI + HALF_PI;  endA = TWO_PI;
      }

      arc(cx, cy, cell * 2, cell * 2, startA, endA);
    }
  }
}

function mousePressed() {
  let mx = mouseX / s;
  let my = mouseY / s;
  mx -= BASE / 2;
  my -= BASE / 2;
  if (
    mx >= -HALF && mx <= HALF &&
    my >= -HALF && my <= HALF
  ) {
    regenerate();
  }
}