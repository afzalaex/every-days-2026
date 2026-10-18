const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 100;
const CELL = ART / GRID_SIZE;

const PALETTE_SIZE = 20;
const BAND_WIDTH = 8;
const OPPOSITE_STRIPES = 8;

let viewScale;
let palette = [];
let phase = 0;

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
  background(0);
  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  phase = floor(random(0, BAND_WIDTH));

  drawArtwork();
}

function drawArtwork() {
  background(0);
  noStroke();

  push();
  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {

      let diagonal = col - row;
      let band = floor(
        (diagonal + GRID_SIZE) / BAND_WIDTH
      );

      let colorIndex =
        ((band + phase) % PALETTE_SIZE + PALETTE_SIZE)
        % PALETTE_SIZE;

      let oppositeDiagonal = col + row;
      let oppositeBand = floor(
        oppositeDiagonal / OPPOSITE_STRIPES
      );

      if (oppositeBand % 2 === 1) {
        colorIndex = (colorIndex + 3) % PALETTE_SIZE;
      }

      fill(palette[colorIndex]);

      rect(
        col * CELL,
        row * CELL,
        CELL,
        CELL
      );
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function touchStarted() {
  generate();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
