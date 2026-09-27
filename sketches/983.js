const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 100;
const ROWS = 100;

const CELL = ART / COLS;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();

  for (let i = 0; i < 50; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  generate();
}

function generate() {
  background(0);

  push();

  scale(viewScale);

  translate(OFFSET, OFFSET);

  noStroke();

  for (let x = 0; x < COLS; x++) {
    let columnLength = floor(random(8, ROWS * 0.9));
    let start = floor(random(0, ROWS - columnLength));

    for (let y = 0; y < columnLength; y++) {
      let progress = y / columnLength;
      let probability = sin(progress * PI);

      if (random() < probability) {
        fill(random(palette));

        rect(x * CELL, (start + y) * CELL, CELL + 0.5, CELL + 0.5);
      }
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}
