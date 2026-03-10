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
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();

  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {

      let x1 = x * cell;
      let y1 = y * cell;
      let x2 = x1 + cell;
      let y2 = y1 + cell;

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      let decision = floor(random(2));

      if (decision === 0) {
        line(x1, y1, x2, y2);
      } else {
        line(x1, y2, x2, y1);
      }
    }
  }
}

function mousePressed() {

  let mx = mouseX / s;
  let my = mouseY / s;

  mx -= BASE / 2;
  my -= BASE / 2;

  if (
    mx >= -HALF &&
    mx <= HALF &&
    my >= -HALF &&
    my <= HALF
  ) {
    regenerate();
  }
}