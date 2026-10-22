const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 5;
const CELL = ART / GRID_SIZE;
const PALETTE_SIZE = 7;

let viewScale;
let palette = [];
let modules = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE, SIZE);
  noLoop();

  applyScale();
  generate();
}

function applyScale() {
  const canvas = document.querySelector("canvas");

  if (canvas) {
    canvas.style.width = `${SIZE * viewScale}px`;
    canvas.style.height = `${SIZE * viewScale}px`;
    canvas.style.display = "block";
  }
}

function generate() {
  background(0);
  stroke(0);

  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  modules = [];

  let occupied = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(false)
  );

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (occupied[row][col]) continue;

      let options = [
        [1, 1],
        [2, 1],
        [1, 2],
        [2, 2],
        [3, 1],
        [1, 3],
      ];

      shuffle(options, true);

      let chosen = [1, 1];

      for (let option of options) {
        let w = option[0];
        let h = option[1];

        if ((w > 1 || h > 1) && random() > 0.65) {
          continue;
        }

        if (col + w > GRID_SIZE || row + h > GRID_SIZE) {
          continue;
        }

        let fits = true;

        for (let y = row; y < row + h; y++) {
          for (let x = col; x < col + w; x++) {
            if (occupied[y][x]) {
              fits = false;
            }
          }
        }

        if (fits) {
          chosen = option;
          break;
        }
      }

      let w = chosen[0];
      let h = chosen[1];

      for (let y = row; y < row + h; y++) {
        for (let x = col; x < col + w; x++) {
          occupied[y][x] = true;
        }
      }

      modules.push({
        x: col,
        y: row,
        w: w,
        h: h,
        shade: floor(random(PALETTE_SIZE)),
      });
    }
  }

  for (let m of modules) {
    let x = OFFSET + m.x * CELL;
    let y = OFFSET + m.y * CELL;

    fill(palette[m.shade]);
    rect(x, y, m.w * CELL, m.h * CELL);
  }
}

function windowResized() {
  computeScale();
  applyScale();
}

function mousePressed() {
  generate();
}
