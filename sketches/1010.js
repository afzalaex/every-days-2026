const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 2;
const MIN_COLOR = 155;
const MAX_COLOR = 255;
const STROKE_WEIGHT = 2;

let palette = [];
let modules = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  strokeCap(SQUARE);
  noLoop();
  generate();
}

function generate() {
  background(0);
  palette = [];
  modules = [];

  generatePalette();
  generateGrid();
  drawArtwork();
}

function generatePalette() {
  const count = int(random(4, 12));

  for (let i = 0; i < count; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }
}

function generateGrid() {
  const cols = GRID_SIZE;
  const rows = GRID_SIZE;
  const cell = ART / GRID_SIZE;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = OFFSET + col * cell;
      const y = OFFSET + row * cell;

      if (random() < 0.45) {
        const splitVertical = random() < 0.5;
        const split = random(0.35, 0.65);

        if (splitVertical) {
          addModule(x, y, cell * split, cell);
          addModule(x + cell * split, y, cell * (1 - split), cell);
        } else {
          addModule(x, y, cell, cell * split);
          addModule(x, y + cell * split, cell, cell * (1 - split));
        }
      } else {
        addModule(x, y, cell, cell);
      }
    }
  }
}

function addModule(x, y, w, h) {
  const inset = random(10, 22);

  modules.push({
    x,
    y,
    w,
    h,
    inset,
    col: random(palette),
  });
}

function drawArtwork() {
  background(0);

  push();
  scale(viewScale);

  noFill();
  strokeWeight(STROKE_WEIGHT);

  for (const m of modules) {
    stroke(m.col);

    rect(m.x, m.y, m.w, m.h);

    const inset = min(m.inset, m.w * 0.2, m.h * 0.2);

    rect(m.x + inset, m.y + inset, m.w - inset * 2, m.h - inset * 2);
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  generate();
}

function keyPressed() {
  if (key === " ") {
    generate();
  }
}
