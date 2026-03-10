const BASE = 1000;
const ART = 500;

let gridSize = 25;
const STEP = 5;
const MAX_GRID = 250;
const MIN_GRID = 25;

let viewScale = 1;

function setup() {
  computeCanvas();
  noStroke();
  noLoop();
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function mousePressed() {
  const mx = mouseX / viewScale;
  const my = mouseY / viewScale;

  const half = ART / 2;
  const cx = BASE / 2;
  const cy = BASE / 2;

  if (
    mx < cx - half || mx > cx + half ||
    my < cy - half || my > cy + half
  ) return;

  gridSize += STEP;
  if (gridSize > MAX_GRID) gridSize = MIN_GRID;

  redraw();
}

function draw() {
  background(0);

  scale(viewScale);
  translate(BASE / 2 - ART / 2, BASE / 2 - ART / 2);

  const cell = ART / gridSize;
  const diagonals = gridSize * 2;

  let diagColors = [];
  for (let d = 0; d < diagonals; d++) {
    diagColors[d] = color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );
  }

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      fill(diagColors[x + y]);
      rect(x * cell, y * cell, cell, cell);
    }
  }
}



