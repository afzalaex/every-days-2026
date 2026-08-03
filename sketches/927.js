const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 50;
const CELL = ART / CELLS;

let viewScale;
let filled = [];
let blocks = [];

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  noStroke();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  generate();
  redraw();
}

function generate() {
  filled = Array.from({ length: CELLS }, () => Array(CELLS).fill(false));
  blocks = [];

  while (true) {
    let start = findEmpty();
    if (!start) break;

    let sx = start.x;
    let sy = start.y;

    let maxW = floor(pow(random(), 2.2) * 20) + 1;
    let maxH = floor(pow(random(), 2.2) * 20) + 1;

    maxW = constrain(maxW, 1, CELLS - sx);
    maxH = constrain(maxH, 1, CELLS - sy);

    let w = 1;
    while (w < maxW && canExpandWidth(sx, sy, w + 1, 1)) w++;

    let h = 1;
    while (h < maxH && canExpandHeight(sx, sy, w, h + 1)) h++;

    let changed = true;
    while (changed) {
      changed = false;

      if (w < maxW && canExpandWidth(sx, sy, w + 1, h)) {
        w++;
        changed = true;
      }

      if (h < maxH && canExpandHeight(sx, sy, w, h + 1)) {
        h++;
        changed = true;
      }
    }

    for (let y = sy; y < sy + h; y++) {
      for (let x = sx; x < sx + w; x++) {
        filled[y][x] = true;
      }
    }

    blocks.push({
      x: sx,
      y: sy,
      w,
      h,
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let b of blocks) {
    fill(b.c);
    rect(b.x * CELL, b.y * CELL, b.w * CELL, b.h * CELL);
  }

  pop();
}

function findEmpty() {
  let empty = [];

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      if (!filled[y][x]) {
        empty.push({ x, y });
      }
    }
  }

  if (empty.length === 0) return null;

  return random(empty);
}

function canExpandWidth(sx, sy, w, h) {
  if (sx + w > CELLS) return false;

  for (let y = sy; y < sy + h; y++) {
    if (filled[y][sx + w - 1]) return false;
  }

  return true;
}

function canExpandHeight(sx, sy, w, h) {
  if (sy + h > CELLS) return false;

  for (let x = sx; x < sx + w; x++) {
    if (filled[sy + h - 1][x]) return false;
  }

  return true;
}
