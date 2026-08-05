const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 100;
const CELL = ART / CELLS;

let viewScale;

let owner;
let palette;
let frontier = [];

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  scale(viewScale);

  background(0);

  owner = Array.from({ length: CELLS }, () => Array(CELLS).fill(-1));
  palette = [];
  frontier = [];

  const BLOOMS = 220;

  for (let i = 0; i < BLOOMS; i++) {
    let x, y;

    do {
      x = floor(random(CELLS));
      y = floor(random(CELLS));
    } while (owner[y][x] != -1);

    owner[y][x] = i;

    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));

    frontier.push({
      x,
      y,
      id: i,
    });
  }

  while (frontier.length > 0) {
    let index = floor(random(frontier.length));
    let cell = frontier[index];

    frontier[index] = frontier[frontier.length - 1];
    frontier.pop();

    let dirs = shuffle([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]);

    let grew = false;

    for (let d of dirs) {
      let nx = cell.x + d[0];
      let ny = cell.y + d[1];

      if (
        nx >= 0 &&
        nx < CELLS &&
        ny >= 0 &&
        ny < CELLS &&
        owner[ny][nx] == -1
      ) {
        owner[ny][nx] = cell.id;

        frontier.push({
          x: nx,
          y: ny,
          id: cell.id,
        });

        if (random() < 0.25) {
          frontier.push({
            x: cell.x,
            y: cell.y,
            id: cell.id,
          });
        }

        grew = true;
        break;
      }
    }

    if (grew && random() < 0.7) {
      frontier.push(cell);
    }
  }

  noStroke();

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      fill(palette[owner[y][x]]);
      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL, CELL);
    }
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  redraw();
}
