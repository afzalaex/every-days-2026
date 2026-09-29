const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 10;
const ROWS = 10;

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

  drawArt();
}

function generatePalette() {
  palette = [];

  for (let i = 0; i < 10; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function drawArt() {
  generatePalette();

  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  let modules = [];

  for (let y = 0; y < ROWS / 2; y++) {
    modules[y] = [];

    for (let x = 0; x < COLS / 2; x++) {
      modules[y][x] = floor(random(4));
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let mx = x < COLS / 2 ? x : COLS - 1 - x;

      let my = y < ROWS / 2 ? y : ROWS - 1 - y;

      let type = modules[my][mx];

      let px = x * CELL;
      let py = y * CELL;

      fill(palette[(mx + my + type) % palette.length]);

      if (type === 0) {
        rect(px, py, CELL, CELL);
      } else if (type === 1) {
        triangle(px, py, px + CELL, py, px, py + CELL);
      } else if (type === 2) {
        triangle(px + CELL, py, px + CELL, py + CELL, px, py + CELL);
      } else {
        rect(px + CELL * 0.25, py + CELL * 0.25, CELL * 0.5, CELL * 0.5);
      }
    }
  }

  pop();
}

function mousePressed() {
  drawArt();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  drawArt();
}
