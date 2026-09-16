const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const ROWS = 12;
const COLS = 12;

const MAX_SHIFT = 28;

let viewScale;
let grid = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();

  generate();
}

function draw() {
  background(0);

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  for (let cell of grid) {
    drawCell(cell);
  }

  pop();
}

function generate() {
  grid = [];

  const cellW = ART / COLS;
  const cellH = ART / ROWS;

  let points = [];

  for (let y = 0; y <= ROWS; y++) {
    points[y] = [];

    for (let x = 0; x <= COLS; x++) {
      let px = x * cellW;
      let py = y * cellH;

      if (x !== 0 && x !== COLS) {
        px += random(-MAX_SHIFT, MAX_SHIFT);
      }

      if (y !== 0 && y !== ROWS) {
        py += random(-MAX_SHIFT, MAX_SHIFT);
      }

      points[y][x] = createVector(px, py);
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      grid.push({
        points: [
          points[y][x],
          points[y][x + 1],
          points[y + 1][x + 1],
          points[y + 1][x],
        ],
        color: randomColor(),
      });
    }
  }
}

function randomColor() {
  return color(random(155, 255), random(155, 255), random(155, 255));
}

function drawCell(cell) {
  noStroke();
  fill(cell.color);

  beginShape();

  for (let p of cell.points) {
    vertex(p.x, p.y);
  }

  endShape(CLOSE);
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
