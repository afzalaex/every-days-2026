const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_COUNT = 5;
const TILE = ART / GRID_COUNT;
const MODULES = 7;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function generatePattern() {
  const pattern = Array.from({ length: MODULES }, () => Array(MODULES).fill(0));

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const value = random() < 0.48 ? 1 : 0;

      pattern[y][x] = value;
      pattern[y][MODULES - 1 - x] = value;
      pattern[MODULES - 1 - y][x] = value;
      pattern[MODULES - 1 - y][MODULES - 1 - x] = value;
    }
  }

  return pattern;
}

function drawGlyph(pattern, cx, cy, col) {
  const unit = 5;
  const total = MODULES * unit;

  noStroke();
  fill(col);

  for (let y = 0; y < MODULES; y++) {
    for (let x = 0; x < MODULES; x++) {
      if (pattern[y][x]) {
        rect(cx - total / 2 + x * unit, cy - total / 2 + y * unit, unit, unit);
      }
    }
  }
}

function generateArt() {
  background(0);

  const palette = Array.from({ length: GRID_COUNT * GRID_COUNT }, () =>
    randomColor()
  );

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let row = 0; row < GRID_COUNT; row++) {
    for (let col = 0; col < GRID_COUNT; col++) {
      const cx = col * TILE + TILE / 2;
      const cy = row * TILE + TILE / 2;
      const index = row * GRID_COUNT + col;

      drawGlyph(generatePattern(), cx, cy, palette[index]);
    }
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}

function mousePressed() {
  generateArt();
}
