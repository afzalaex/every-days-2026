const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 32;
const CELL = ART / GRID_SIZE;
const PIXELS = 1000;

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
  noStroke();

  let cells = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      cells.push({ col, row });
    }
  }

  cells.splice(PIXELS);

  cells.sort((a, b) => {
    const diagonalA = a.col + a.row;
    const diagonalB = b.col + b.row;

    if (diagonalA !== diagonalB) {
      return diagonalA - diagonalB;
    }

    return a.col - b.col;
  });

  let colors = [];
  let usedColors = new Set();

  while (colors.length < PIXELS) {
    const r = floor(random(155, 256));
    const g = floor(random(155, 256));
    const b = floor(random(155, 256));

    const colorID = `${r},${g},${b}`;

    if (!usedColors.has(colorID)) {
      usedColors.add(colorID);
      colors.push(color(r, g, b));
    }
  }

  push();
  scale(viewScale);

  for (let i = 0; i < PIXELS; i++) {
    const cell = cells[i];

    fill(colors[i]);

    rect(
      OFFSET + cell.col * CELL,
      OFFSET + cell.row * CELL,
      CELL + 0.5,
      CELL + 0.5
    );
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale, true);
  generate();
}
