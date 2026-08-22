const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 12;
const ROWS = 12;
const CELL = ART / COLS;

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

  const grid = [];

  for (let i = 0; i < COLS * ROWS; i++) {
    grid.push(false);
  }

  for (let n = 0; n < 140; n++) {
    const w = floor(random(1, 4));
    const h = floor(random(1, 4));

    const x = floor(random(0, COLS - w + 1));
    const y = floor(random(0, ROWS - h + 1));

    let free = true;

    for (let j = 0; j < w * h; j++) {
      const gx = x + (j % w);
      const gy = y + floor(j / w);

      if (grid[gy * COLS + gx]) {
        free = false;
      }
    }

    if (free) {
      fill(random(155, 255), random(155, 255), random(155, 255));

      stroke(0);

      rect(OFFSET + x * CELL, OFFSET + y * CELL, w * CELL, h * CELL);

      for (let j = 0; j < w * h; j++) {
        const gx = x + (j % w);
        const gy = y + floor(j / w);

        grid[gy * COLS + gx] = true;
      }
    }
  }

  pop();
}

function mousePressed() {
  generate();
}
