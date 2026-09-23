const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 5;
const GAP = 12;

let palette = [];
let blocks = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
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
  blocks = [];

  for (let i = 0; i < 8; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const cellSize = ART / GRID_SIZE;

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (random() < 0.16) {
        continue;
      }

      const posX = OFFSET + col * cellSize;
      const posY = OFFSET + row * cellSize;

      let blockW = cellSize * random(0.75, 1.25);
      let blockH = cellSize * random(0.75, 1.25);

      blockW = min(blockW, OFFSET + ART - GAP - posX);

      blockH = min(blockH, OFFSET + ART - GAP - posY);

      blocks.push({
        posX: posX + GAP / 2,
        posY: posY + GAP / 2,
        blockW: blockW - GAP,
        blockH: blockH - GAP,
        blockColor: random(palette),
      });
    }
  }

  push();

  scale(viewScale);

  noStroke();

  for (let block of blocks) {
    fill(block.blockColor);

    rect(block.posX, block.posY, block.blockW, block.blockH);
  }

  fill(0);

  const verticalCount = floor(random(1, 4));

  for (let i = 0; i < verticalCount; i++) {
    const cutX = OFFSET + random(0.15, 0.85) * ART;
    const cutW = random(7, 16);

    rect(cutX, OFFSET, cutW, ART);
  }

  const horizontalCount = floor(random(1, 4));

  for (let i = 0; i < horizontalCount; i++) {
    const cutY = OFFSET + random(0.15, 0.85) * ART;
    const cutH = random(7, 16);

    rect(OFFSET, cutY, ART, cutH);
  }

  if (random() < 0.7) {
    fill(random(palette));

    if (random() < 0.5) {
      rect(
        OFFSET + random(20, 360),
        OFFSET + random(20, 460),
        random(40, 130),
        random(8, 18)
      );
    } else {
      rect(
        OFFSET + random(20, 460),
        OFFSET + random(20, 360),
        random(8, 18),
        random(40, 130)
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
