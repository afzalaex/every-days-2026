const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 100;
const PIXEL = ART / GRID_SIZE;

const COLORS = 25;

let palette = [];
let cells = [];
let visited = [];
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

function draw() {}

function generate() {
  background(0);
  palette = [];

  for (let i = 0; i < COLORS; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const N = 25;
  const STEP = GRID_SIZE / N;

  cells = [];
  visited = [];

  for (let y = 0; y < N; y++) {
    cells[y] = [];
    visited[y] = [];

    for (let x = 0; x < N; x++) {
      cells[y][x] = {
        walls: [true, true, true, true],
        visited: false,
      };

      visited[y][x] = false;
    }
  }

  let stack = [];
  let current = {
    x: floor(random(N)),
    y: floor(random(N)),
  };

  cells[current.y][current.x].visited = true;
  stack.push(current);

  const directions = [
    { dx: 0, dy: -1, wall: 0, opposite: 2 },
    { dx: 1, dy: 0, wall: 1, opposite: 3 },
    { dx: 0, dy: 1, wall: 2, opposite: 0 },
    { dx: -1, dy: 0, wall: 3, opposite: 1 },
  ];

  while (stack.length > 0) {
    current = stack[stack.length - 1];

    let options = [];

    for (let d of directions) {
      let nx = current.x + d.dx;
      let ny = current.y + d.dy;

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && !cells[ny][nx].visited) {
        options.push({ nx, ny, d });
      }
    }

    if (options.length === 0) {
      stack.pop();
      continue;
    }

    let choice = random(options);
    let next = cells[choice.ny][choice.nx];

    cells[current.y][current.x].walls[choice.d.wall] = false;
    next.walls[choice.d.opposite] = false;
    next.visited = true;

    stack.push({
      x: choice.nx,
      y: choice.ny,
    });
  }

  push();
  scale(viewScale);

  background(0);
  translate(OFFSET, OFFSET);
  noStroke();

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let cell = cells[y][x];

      let px = x * STEP * PIXEL;
      let py = y * STEP * PIXEL;
      let size = STEP * PIXEL;

      fill(0);
      rect(px, py, size, size);

      fill(random(palette));

      if (cell.walls[0] && y !== 0) {
        rect(px, py, size, size * 0.25);
      }

      if (cell.walls[1] && x !== N - 1) {
        rect(px + size * 0.75, py, size * 0.25, size);
      }

      if (cell.walls[2] && y !== N - 1) {
        rect(px, py + size * 0.75, size, size * 0.25);
      }

      if (cell.walls[3] && x !== 0) {
        rect(px, py, size * 0.25, size);
      }
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
