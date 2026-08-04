const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 100;
const CELL = ART / CELLS;

const MAX_LENGTH = 250;

let viewScale;
let grid;

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  background(0);

  const rivers = floor(random(100, 500));

  grid = [];
  for (let y = 0; y < CELLS; y++) {
    grid[y] = [];
    for (let x = 0; x < CELLS; x++) {
      grid[y][x] = null;
    }
  }

  for (let i = 0; i < rivers; i++) {
    let x = floor(random(CELLS));
    let y = floor(random(CELLS));

    if (grid[y][x]) continue;

    const col = color(random(155, 255), random(155, 255), random(155, 255));

    let dir = floor(random(4));

    for (let s = 0; s < MAX_LENGTH; s++) {
      if (x < 0 || x >= CELLS || y < 0 || y >= CELLS) break;

      if (grid[y][x]) break;

      grid[y][x] = col;

      if (random() < 0.22) {
        dir = floor(random(4));
      }

      let options = [dir, (dir + 1) % 4, (dir + 3) % 4];

      let moved = false;

      for (let t = 0; t < options.length; t++) {
        let d = options[t];

        let nx = x;
        let ny = y;

        if (d == 0) ny--;
        if (d == 1) nx++;
        if (d == 2) ny++;
        if (d == 3) nx--;

        if (nx >= 0 && ny >= 0 && nx < CELLS && ny < CELLS && !grid[ny][nx]) {
          x = nx;
          y = ny;
          dir = d;
          moved = true;
          break;
        }
      }

      if (!moved) break;
    }
  }

  noStroke();

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      fill(grid[y][x] || 0);

      rect(
        (OFFSET + x * CELL) * viewScale,
        (OFFSET + y * CELL) * viewScale,
        CELL * viewScale,
        CELL * viewScale
      );
    }
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
