const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 4;
const CELL = ART / GRID_SIZE;
const GAP = 10;

let viewScale;
let palette = [];
let cells = [];

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
  cells = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let occupied = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (occupied[row][col]) continue;

      let options = [];

      if (col + 1 < GRID_SIZE && !occupied[row][col + 1] && random() < 0.28) {
        options.push([2, 1]);
      }

      if (row + 1 < GRID_SIZE && !occupied[row + 1][col] && random() < 0.25) {
        options.push([1, 2]);
      }

      if (
        row + 1 < GRID_SIZE &&
        col + 1 < GRID_SIZE &&
        !occupied[row][col + 1] &&
        !occupied[row + 1][col] &&
        !occupied[row + 1][col + 1] &&
        random() < 0.12
      ) {
        options.push([2, 2]);
      }

      let block =
        options.length > 0 && random() < 0.55 ? random(options) : [1, 1];

      let w = block[0];
      let h = block[1];

      for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) {
          occupied[row + dy][col + dx] = true;
        }
      }

      cells.push({
        row,
        col,
        w,
        h,
        type: floor(random(4)),
        colorA: floor(random(palette.length)),
        colorB: floor(random(palette.length)),
        split: random([0.33, 0.4, 0.5, 0.6, 0.67]),
      });
    }
  }

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  noStroke();
  fill(0);
  rect(0, 0, ART, ART);

  for (let c of cells) {
    let x = c.col * CELL + GAP / 2;
    let y = c.row * CELL + GAP / 2;
    let w = c.w * CELL - GAP;
    let h = c.h * CELL - GAP;

    fill(palette[c.colorA]);

    if (c.type === 0) {
      rect(x, y, w, h);
    } else if (c.type === 1) {
      let split = h * c.split;

      rect(x, y, w, split - GAP / 2);

      fill(palette[c.colorB]);
      rect(x, y + split + GAP / 2, w, h - split - GAP / 2);
    } else if (c.type === 2) {
      let split = w * c.split;

      rect(x, y, split - GAP / 2, h);

      fill(palette[c.colorB]);
      rect(x + split + GAP / 2, y, w - split - GAP / 2, h);
    } else {
      let halfW = w / 2;
      let halfH = h / 2;

      rect(x, y, halfW - GAP / 2, halfH - GAP / 2);

      fill(palette[c.colorB]);
      rect(
        x + halfW + GAP / 2,
        y + halfH + GAP / 2,
        halfW - GAP / 2,
        halfH - GAP / 2
      );
    }
  }

  pop();
}

function draw() {}

function mousePressed() {
  generate();
}
