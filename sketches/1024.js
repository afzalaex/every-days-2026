const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let viewScale = 1;

const GRID_COUNT = 3;
const GAP = 8;

const MIN_COLOR = 155;
const MAX_COLOR = 255;
const PALETTE_SIZE = 8;

let palette = [];
let squares = [];
let missingCell = 4;

function computeScale() {
  viewScale = min(windowWidth / SIZE, windowHeight / SIZE, 1);
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function generate() {
  palette = [];
  squares = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(randomColor());
  }

  missingCell = floor(random(GRID_COUNT * GRID_COUNT));

  for (let i = 0; i < GRID_COUNT * GRID_COUNT; i++) {
    if (i === missingCell) continue;

    squares.push({
      row: floor(i / GRID_COUNT),
      col: i % GRID_COUNT,
      shade: floor(random(PALETTE_SIZE)),
    });
  }

  drawArt();
}

function drawArt() {
  background(0);
  noStroke();

  const cellSize = (ART - GAP * (GRID_COUNT - 1)) / GRID_COUNT;

  const stride = cellSize + GAP;

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (const s of squares) {
    const x = s.col * stride;
    const y = s.row * stride;

    fill(palette[s.shade]);
    rect(x, y, cellSize, cellSize);
  }

  pop();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  drawArt();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generate();
  }
}
