const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 7;
const ROWS = 9;
const GAP = 7;

let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function draw() {}

function generate() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  const cellW = (ART - GAP * (COLS - 1)) / COLS;
  const cellH = (ART - GAP * (ROWS - 1)) / ROWS;

  let used = [];

  for (let y = 0; y < ROWS; y++) {
    used[y] = [];

    for (let x = 0; x < COLS; x++) {
      used[y][x] = false;
    }
  }

  if (random() < 0.5) {
    const cutX = floor(random(COLS));

    for (let y = 0; y < ROWS; y++) {
      if (random() < 0.72) {
        used[y][cutX] = true;
      }
    }
  } else {
    const cutY = floor(random(ROWS));

    for (let x = 0; x < COLS; x++) {
      if (random() < 0.72) {
        used[cutY][x] = true;
      }
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (used[y][x]) continue;

      const dx = abs(x - (COLS - 1) / 2);
      const dy = abs(y - (ROWS - 1) / 2);

      const d = (dx / (COLS / 2) + dy / (ROWS / 2)) / 2;

      const emptyChance = map(d, 0, 1, 0.06, 0.26);

      if (random() < emptyChance) {
        used[y][x] = true;
        continue;
      }

      let w = 1;
      let h = 1;

      const type = random();

      if (type < 0.38) {
        while (w < 3 && x + w < COLS && !used[y][x + w] && random() < 0.72) {
          w++;
        }
      } else if (type < 0.7) {
        while (h < 3 && y + h < ROWS && !used[y + h][x] && random() < 0.72) {
          h++;
        }
      } else if (
        type < 0.84 &&
        x + 1 < COLS &&
        y + 1 < ROWS &&
        !used[y][x + 1] &&
        !used[y + 1][x] &&
        !used[y + 1][x + 1]
      ) {
        w = 2;
        h = 2;
      }

      for (let yy = 0; yy < h; yy++) {
        for (let xx = 0; xx < w; xx++) {
          used[y + yy][x + xx] = true;
        }
      }

      const px = x * (cellW + GAP);
      const py = y * (cellH + GAP);

      const rw = cellW * w + GAP * (w - 1);

      const rh = cellH * h + GAP * (h - 1);

      fill(random(155, 255), random(155, 255), random(155, 255));

      rect(px, py, rw, rh);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}
