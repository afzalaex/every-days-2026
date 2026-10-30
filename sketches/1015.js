const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 10;
const CELL = ART / GRID_SIZE;
const GAP = 25;

const MIN_COLOR = 155;
const MAX_COLOR = 255;
const PALETTE_SIZE = 25;

let palette = [];
let blocks = [];
let viewScale = 1;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function draw() {
  background(0);
  scale(viewScale);
  noStroke();

  for (const b of blocks) {
    fill(...palette[b.c]);

    rect(
      OFFSET + b.x * CELL + GAP / 2,
      OFFSET + b.y * CELL + GAP / 2,
      b.w * CELL - GAP,
      b.h * CELL - GAP
    );
  }
}

function generate() {
  palette = [];
  blocks = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push([
      random(MIN_COLOR, MAX_COLOR),
      random(MIN_COLOR, MAX_COLOR),
      random(MIN_COLOR, MAX_COLOR),
    ]);
  }

  const occupied = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );

  for (let area = 0; area < 3; area++) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const w = floor(random(2, 5));
      const h = floor(random(2, 5));
      const x = floor(random(GRID_SIZE - w + 1));
      const y = floor(random(GRID_SIZE - h + 1));

      if (fits(occupied, x, y, w, h)) {
        place(occupied, x, y, w, h);

        blocks.push({
          x,
          y,
          w,
          h,
          c: floor(random(palette.length)),
        });

        break;
      }
    }
  }

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (occupied[y][x]) continue;

      const options = [
        [1, 1],
        [2, 1],
        [1, 2],
        [2, 2],
        [3, 1],
        [1, 3],
      ];

      shuffle(options, true);

      for (const [w, h] of options) {
        if (x + w > GRID_SIZE || y + h > GRID_SIZE) {
          continue;
        }

        if (fits(occupied, x, y, w, h) && random() < 0.6) {
          place(occupied, x, y, w, h);

          blocks.push({
            x,
            y,
            w,
            h,
            c: floor(random(palette.length)),
          });

          break;
        }
      }

      if (!occupied[y][x]) {
        place(occupied, x, y, 1, 1);

        blocks.push({
          x,
          y,
          w: 1,
          h: 1,
          c: floor(random(palette.length)),
        });
      }
    }
  }

  redraw();
}

function fits(grid, x, y, w, h) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      if (grid[j][i]) return false;
    }
  }

  return true;
}

function place(grid, x, y, w, h) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      grid[j][i] = true;
    }
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generate();
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
