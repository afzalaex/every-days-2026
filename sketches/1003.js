const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 80;
const CELL = ART / GRID_SIZE;

const COLORS = 10;

let viewScale;
let palette = [];

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

  palette = [];

  for (let i = 0; i < COLORS; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  const bandWidth = random(5, 13);
  const angle = random(0.45, 0.9);
  const phase = random(TWO_PI);

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const diagonal = x * angle + y;
      const wave = sin(diagonal * 0.12 + phase);

      const band = floor(
        (x + y * angle + wave * 3) / bandWidth
      );

      const colorIndex =
        ((band % COLORS) + COLORS) % COLORS;

      fill(palette[colorIndex]);

      rect(
        x * CELL,
        y * CELL,
        CELL + 0.2,
        CELL + 0.2
      );
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function touchStarted() {
  generate();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}
