const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 25;
const CELL = ART / GRID_SIZE;
const PALETTE_SIZE = 50;

let viewScale;
let palette = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE, SIZE);
  noLoop();

  applyScale();
  generate();
}

function applyScale() {
  const canvas = document.querySelector("canvas");

  if (canvas) {
    canvas.style.width = `${SIZE * viewScale}px`;
    canvas.style.height = `${SIZE * viewScale}px`;
    canvas.style.display = "block";
  }
}

function generate() {
  background(0);
  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const BAND_WIDTH = 5;
  const DIAGONAL_SHIFT = 5;

  noStroke();

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const diagonal = floor((x + y * DIAGONAL_SHIFT) / BAND_WIDTH);

      const band = diagonal % PALETTE_SIZE;

      fill(palette[band]);

      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL, CELL);
    }
  }
}

function windowResized() {
  computeScale();
  applyScale();
}

function mousePressed() {
  generate();
}
