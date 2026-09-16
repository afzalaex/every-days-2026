const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

let COLS;
let ROWS;

let CELL_W;
let CELL_H;

let viewScale;
let artSeed;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function generateGrid() {
  COLS = floor(random(25, 100));
  ROWS = floor(random(25, 100));

  CELL_W = ART / COLS;
  CELL_H = ART / ROWS;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noStroke();
  noLoop();

  artSeed = random(100000);

  generateGrid();
}

function draw() {
  background(0);

  push();

  translate((width - ART * viewScale) / 2, (height - ART * viewScale) / 2);

  scale(viewScale);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let band = floor((x + y) / 4);

      randomSeed(artSeed + band * 1000);

      let r = random(155, 255);
      let g = random(155, 255);
      let b = random(155, 255);

      fill(r, g, b);

      rect(x * CELL_W, y * CELL_H, CELL_W + 0.5, CELL_H + 0.5);
    }
  }

  pop();
}

function mousePressed() {
  artSeed = random(100000);

  generateGrid();

  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
