const CANVAS_SIZE = 1000;
const ART_SIZE = 500;
const ART_OFFSET = 250;

const GRID_COLS = 80;
const GRID_ROWS = 80;

let colorPalette = [];
let canvasScale = 1;
let artSeed = 0;

function calculateScale() {
  canvasScale = min(min(windowWidth, windowHeight), CANVAS_SIZE) / CANVAS_SIZE;
}

function setup() {
  calculateScale();

  createCanvas(CANVAS_SIZE * canvasScale, CANVAS_SIZE * canvasScale);

  generateArtwork();
}

function draw() {}

function generateArtwork() {
  randomSeed(artSeed);

  generateColors();

  background(0);

  push();

  scale(canvasScale);
  translate(ART_OFFSET, ART_OFFSET);

  const gridCellSize = ART_SIZE / GRID_COLS;

  for (let rowIndex = 0; rowIndex < GRID_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < GRID_COLS; colIndex++) {
      const normalizedX = colIndex / (GRID_COLS - 1);

      const normalizedY = rowIndex / (GRID_ROWS - 1);

      const rotationAngle = (normalizedX - normalizedY) * HALF_PI;

      const centerDistance = dist(
        colIndex,
        rowIndex,
        (GRID_COLS - 1) / 2,
        (GRID_ROWS - 1) / 2
      );

      const barSize = map(
        centerDistance,
        0,
        GRID_COLS / 1.4,
        gridCellSize * 1.9,
        gridCellSize * 0.35
      );

      push();

      translate(
        colIndex * gridCellSize + gridCellSize / 2,
        rowIndex * gridCellSize + gridCellSize / 2
      );

      rotate(rotationAngle);

      if (random() < 0.38) {
        fill(random(colorPalette));
        noStroke();
        rectMode(CENTER);

        rect(0, 0, barSize, gridCellSize * 0.42);
      }

      pop();
    }
  }

  pop();
}

function generateColors() {
  colorPalette = [];

  for (let colorIndex = 0; colorIndex < 100; colorIndex++) {
    colorPalette.push(
      color(random(155, 255), random(155, 255), random(155, 255))
    );
  }
}

function mousePressed() {
  artSeed++;
  generateArtwork();
}

function touchStarted() {
  artSeed++;
  generateArtwork();

  return false;
}

function windowResized() {
  calculateScale();

  resizeCanvas(CANVAS_SIZE * canvasScale, CANVAS_SIZE * canvasScale);

  generateArtwork();
}
