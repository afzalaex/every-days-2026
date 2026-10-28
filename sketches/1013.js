const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const GAP = 8;
const GRID_SIZE = 8;
const CELL = ART / GRID_SIZE;

let palette = [];
let blocks = [];
let usedDesigns = new Set();
let viewScale;

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

  let designSignature;
  let attempts = 0;

  do {
    createPalette();
    createComposition();

    designSignature = getDesignSignature();
    attempts++;

    if (attempts > 1000) {
      usedDesigns.clear();
      attempts = 0;
    }
  } while (usedDesigns.has(designSignature));

  usedDesigns.add(designSignature);
  drawComposition();
}

function createPalette() {
  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }
}

function createComposition() {
  blocks = [];

  let occupied = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );

  const targetBlocks = int(random(7, 13));

  for (let i = 0; i < targetBlocks; i++) {
    let placed = false;

    for (let attempt = 0; attempt < 100 && !placed; attempt++) {
      const x = int(random(GRID_SIZE));
      const y = int(random(GRID_SIZE));

      const w = int(random(1, min(4, GRID_SIZE - x) + 1));
      const h = int(random(1, min(4, GRID_SIZE - y) + 1));

      if (!canPlace(occupied, x, y, w, h)) continue;

      markOccupied(occupied, x, y, w, h);

      blocks.push({
        x,
        y,
        w,
        h,
        col: random(palette),
      });

      placed = true;
    }
  }

  const anchors = [
    { x: 0, y: 0, w: 1, h: 2 },
    { x: GRID_SIZE - 1, y: 1, w: 1, h: 2 },
    { x: 2, y: 0, w: 2, h: 1 },
    { x: 4, y: GRID_SIZE - 1, w: 2, h: 1 },
  ];

  shuffle(anchors, true);

  for (const anchor of anchors) {
    if (!canPlace(occupied, anchor.x, anchor.y, anchor.w, anchor.h)) continue;

    markOccupied(occupied, anchor.x, anchor.y, anchor.w, anchor.h);

    blocks.push({
      ...anchor,
      col: random(palette),
    });
  }
}

function canPlace(occupied, x, y, w, h) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (occupied[yy][xx]) return false;
    }
  }

  return true;
}

function markOccupied(occupied, x, y, w, h) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      occupied[yy][xx] = true;
    }
  }
}

function getDesignSignature() {
  const signature = blocks.map((block) => [
    block.x,
    block.y,
    block.w,
    block.h,
    red(block.col),
    green(block.col),
    blue(block.col),
  ]);

  signature.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return JSON.stringify(signature);
}

function drawComposition() {
  push();

  scale(viewScale);

  translate(OFFSET, OFFSET);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, ART, ART);
  drawingContext.clip();

  noStroke();
  fill(0);
  rect(0, 0, ART, ART);

  for (const block of blocks) {
    fill(block.col);

    rect(
      block.x * CELL + GAP / 2,
      block.y * CELL + GAP / 2,
      block.w * CELL - GAP,
      block.h * CELL - GAP
    );
  }

  drawingContext.restore();
  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  generate();
}
