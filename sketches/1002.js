const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 4;
const COLORS = 30;

const OUTER_FRAME = 20;
const INNER_FRAME = 20;

let viewScale;
let palette = [];

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
  noStroke();

  palette = [];

  for (let i = 0; i < COLORS; i++) {
    palette.push(color(random(155, 256), random(155, 256), random(155, 256)));
  }

  push();
  scale(viewScale);

  fill(random(palette));
  rect(OFFSET, OFFSET, ART, ART);

  const mosaicX = OFFSET + OUTER_FRAME;
  const mosaicY = OFFSET + OUTER_FRAME;
  const mosaicSize = ART - OUTER_FRAME * 2;
  const cell = mosaicSize / GRID_SIZE;

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      fill(random(palette));

      rect(mosaicX + col * cell, mosaicY + row * cell, cell, cell);
    }
  }

  const centerX = mosaicX + cell;
  const centerY = mosaicY + cell;
  const centerSize = cell * 2;

  fill(random(palette));
  rect(centerX, centerY, centerSize, centerSize);

  const innerX = centerX + INNER_FRAME;
  const innerY = centerY + INNER_FRAME;
  const innerSize = centerSize - INNER_FRAME * 2;
  const innerCell = innerSize / 2;

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      fill(random(palette));

      rect(
        innerX + col * innerCell,
        innerY + row * innerCell,
        innerCell,
        innerCell
      );
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
