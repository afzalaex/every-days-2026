const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const COLS = 4;
const ROWS = 8;
const GRID_COUNT = 3;
const LINE_WEIGHT = 5;

let viewScale = 1;
let palettes = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  palettes = [];

  for (let copyIndex = 0; copyIndex < COLS * ROWS; copyIndex++) {
    const copyPalette = [];

    for (let i = 0; i < GRID_COUNT * GRID_COUNT; i++) {
      copyPalette.push(
        color(
          random(MIN_COLOR, MAX_COLOR),
          random(MIN_COLOR, MAX_COLOR),
          random(MIN_COLOR, MAX_COLOR)
        )
      );
    }

    palettes.push(copyPalette);
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  const tileW = ART / COLS;
  const tileH = ART / ROWS;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col;

      drawIsoGrid(
        OFFSET + col * tileW,
        OFFSET + row * tileH,
        tileW,
        tileH,
        palettes[index]
      );
    }
  }

  pop();
}

function drawIsoGrid(x, y, w, h, copyPalette) {
  const cell = w / (GRID_COUNT * 2);
  const halfCellH = h / (GRID_COUNT * 2);

  push();
  translate(x, y);

  stroke(0);
  strokeWeight(LINE_WEIGHT);

  for (let i = 0; i < GRID_COUNT; i++) {
    for (let j = 0; j < GRID_COUNT; j++) {
      const px = (i - j) * cell + w / 2;
      const py = (i + j) * halfCellH;

      fill(copyPalette[i * GRID_COUNT + j]);

      beginShape();
      vertex(px, py);
      vertex(px + cell, py + halfCellH);
      vertex(px, py + halfCellH * 2);
      vertex(px - cell, py + halfCellH);
      endShape(CLOSE);
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
  redraw();
}
