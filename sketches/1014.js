const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let viewScale = 1;

const GRID_COUNT = 5;
const GAP = 10;
const MIN_COLOR = 155;
const MAX_COLOR = 255;

const BAR_LENGTHS = [2, 3, 4, 5];
const HORIZONTAL_CHANCE = 0.5;
const PLACEMENT_ATTEMPTS = 700;
const PALETTE_SIZE = 25;

let palette = [];

function computeScale() {
  viewScale = min(windowWidth / SIZE, windowHeight / SIZE, 1);
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  const cellSize = (ART - GAP * (GRID_COUNT - 1)) / GRID_COUNT;

  const cellStride = cellSize + GAP;

  const occupied = Array.from({ length: GRID_COUNT }, () =>
    Array(GRID_COUNT).fill(false)
  );

  const modules = [];

  for (let attempt = 0; attempt < PLACEMENT_ATTEMPTS; attempt++) {
    const horizontal = random() < HORIZONTAL_CHANCE;
    const barLength = random(BAR_LENGTHS);

    const row = floor(random(GRID_COUNT));
    const col = floor(random(GRID_COUNT));

    const cols = horizontal ? barLength : 1;
    const rows = horizontal ? 1 : barLength;

    if (row + rows > GRID_COUNT || col + cols > GRID_COUNT) continue;

    let valid = true;

    for (let yy = row; yy < row + rows; yy++) {
      for (let xx = col; xx < col + cols; xx++) {
        if (occupied[yy][xx]) {
          valid = false;
          break;
        }
      }
      if (!valid) break;
    }

    if (!valid) continue;

    for (let yy = row; yy < row + rows; yy++) {
      for (let xx = col; xx < col + cols; xx++) {
        occupied[yy][xx] = true;
      }
    }

    modules.push({
      row,
      col,
      rows,
      cols,
      shade: floor(random(palette.length)),
    });
  }

  background(0);
  noStroke();

  push();
  scale(viewScale);

  for (const m of modules) {
    const x = OFFSET + m.col * cellStride;
    const y = OFFSET + m.row * cellStride;

    const w = m.cols * cellSize + (m.cols - 1) * GAP;

    const h = m.rows * cellSize + (m.rows - 1) * GAP;

    fill(palette[m.shade]);
    rect(x, y, w, h);
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}

function mousePressed() {
  generate();
}
