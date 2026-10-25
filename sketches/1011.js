const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

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

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  let grid = 20;
  let cell = ART / grid;

  let palette = [];

  for (let i = 0; i < 50; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  let occupied = Array.from({ length: grid }, () => Array(grid).fill(false));

  noFill();
  strokeWeight(3);
  strokeCap(SQUARE);

  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      if (occupied[row][col]) continue;

      let w = random() < 0.4 ? 2 : 1;
      let h = random() < 0.4 ? 2 : 1;

      w = min(w, grid - col);
      h = min(h, grid - row);

      while (true) {
        let valid = true;

        for (let y = row; y < row + h; y++) {
          for (let x = col; x < col + w; x++) {
            if (occupied[y][x]) valid = false;
          }
        }

        if (valid) break;

        if (w > 1 && random() < 0.5) {
          w--;
        } else if (h > 1) {
          h--;
        } else {
          break;
        }
      }

      for (let y = row; y < row + h; y++) {
        for (let x = col; x < col + w; x++) {
          occupied[y][x] = true;
        }
      }

      stroke(random(palette));

      rect(col * cell, row * cell, w * cell, h * cell);
    }
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
