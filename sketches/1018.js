const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const GRID_COUNT = 10;
const CELL = ART / GRID_COUNT;
const GAP = 2;

let viewScale = 1;
let palette = [];
let shapes = [];

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
  shapes = [];

  for (let i = 0; i < 25; i++) {
    palette.push([
      random(MIN_COLOR, MAX_COLOR),
      random(MIN_COLOR, MAX_COLOR),
      random(MIN_COLOR, MAX_COLOR),
    ]);
  }

  let occupied = Array.from({ length: GRID_COUNT }, () =>
    Array(GRID_COUNT).fill(false)
  );

  let attempts = 0;

  while (attempts < 200) {
    attempts++;

    let x = floor(random(GRID_COUNT));
    let y = floor(random(GRID_COUNT));

    let w = random() < 0.22 ? floor(random(4, 8)) : floor(random(1, 4));

    let h = random() < 0.22 ? floor(random(4, 8)) : floor(random(1, 4));

    w = min(w, GRID_COUNT - x);
    h = min(h, GRID_COUNT - y);

    if (!isFree(occupied, x, y, w, h)) {
      continue;
    }

    if (random() < 0.16 && w * h < 5) {
      continue;
    }

    for (let j = y; j < y + h; j++) {
      for (let i = x; i < x + w; i++) {
        occupied[j][i] = true;
      }
    }

    shapes.push({
      x,
      y,
      w,
      h,
      color: floor(random(palette.length)),
      inset: random() < 0.35,
    });
  }

  push();
  scale(viewScale);
  noStroke();

  for (let s of shapes) {
    const x = OFFSET + s.x * CELL;
    const y = OFFSET + s.y * CELL;
    const w = s.w * CELL;
    const h = s.h * CELL;

    fill(...palette[s.color]);
    rect(x + GAP, y + GAP, w - GAP * 2, h - GAP * 2);

    if (s.inset && w > 30 && h > 30) {
      fill(0);
      rect(x + w * 0.25, y + h * 0.25, w * 0.5, h * 0.5);

      if (random() < 0.6) {
        fill(...palette[floor(random(palette.length))]);

        rect(x + w * 0.375, y + h * 0.375, w * 0.25, h * 0.25);
      }
    }
  }

  pop();
}

function isFree(occupied, x, y, w, h) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      if (occupied[j][i]) {
        return false;
      }
    }
  }

  return true;
}

function mousePressed() {
  generate();
}

function keyPressed() {
  if (key === " ") {
    generate();
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
