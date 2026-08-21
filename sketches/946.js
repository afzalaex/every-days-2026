const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 6;
const ROWS = 6;
const CELL = ART / COLS;

const GAP = 2;

let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  noStroke();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let x = OFFSET + c * CELL + GAP;
      let y = OFFSET + r * CELL + GAP;

      let w = CELL - GAP * 2;
      let h = CELL - GAP * 2;

      let type = floor(random(5));

      fill(random(155, 255), random(155, 255), random(155, 255));

      if (type === 0) {
        rect(x + w * 0.18, y + h * 0.18, w * 0.64, h * 0.64);
      }

      if (type === 1) {
        rect(x, y + h * 0.32, w, h * 0.36);
      }

      if (type === 2) {
        rect(x + w * 0.32, y, w * 0.36, h);
      }

      if (type === 3) {
        let corner = floor(random(4));

        if (corner === 0) {
          rect(x, y, w * 0.7, h * 0.7);
        }

        if (corner === 1) {
          rect(x + w * 0.3, y, w * 0.7, h * 0.7);
        }

        if (corner === 2) {
          rect(x, y + h * 0.3, w * 0.7, h * 0.7);
        }

        if (corner === 3) {
          rect(x + w * 0.3, y + h * 0.3, w * 0.7, h * 0.7);
        }
      }
    }
  }

  pop();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
