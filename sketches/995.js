const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const CELLS = 10;
const CELL = ART / CELLS;

const ARMS = 10;
let viewScale;
let grid = [];
let palette = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  grid = [];
  palette = [];

  const symmetry = random([4, 6, 8]);
  const layers = floor(random(4, 8));
  const frequency = random(0.7, 1.8);
  const seed = random(1000);

  for (let i = 0; i < 10; i++) {
    palette.push([random(155, 255), random(155, 255), random(155, 255)]);
  }

  for (let y = 0; y < CELLS; y++) {
    grid[y] = [];

    for (let x = 0; x < CELLS; x++) {
      let dx = x - (CELLS - 1) / 2;
      let dy = y - (CELLS - 1) / 2;

      let r = sqrt(dx * dx + dy * dy);
      let a = atan2(dy, dx);

      a = ((a % (TWO_PI / symmetry)) + TWO_PI / symmetry) % (TWO_PI / symmetry);

      let ring = r + sin(a * symmetry) * r * 0.12;
      let wave =
        sin(ring * frequency + seed) +
        cos(r * 0.55 - a * symmetry) * 0.7 +
        sin(a * symmetry * 2 + r * 0.25) * 0.5;

      let threshold = sin(r * 0.35 + seed * 0.01);

      let on = wave > threshold * 0.45;

      if (r < 2) on = true;

      let colorIndex = floor(abs(sin(r * 0.22 + wave + seed)) * palette.length);

      grid[y][x] = on ? colorIndex + 1 : 0;
    }
  }

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      let dx = x - (CELLS - 1) / 2;
      let dy = y - (CELLS - 1) / 2;

      let r = sqrt(dx * dx + dy * dy);
      let a = atan2(dy, dx);

      let sector = TWO_PI / symmetry;
      let folded = ((a % sector) + sector) % sector;

      let sx = round((CELLS - 1) / 2 + r * cos(folded));

      let sy = round((CELLS - 1) / 2 + r * sin(folded));

      sx = constrain(sx, 0, CELLS - 1);
      sy = constrain(sy, 0, CELLS - 1);

      grid[y][x] = grid[sy][sx];
    }
  }

  redraw();
}

function draw() {
  background(0);
  noStroke();

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      let value = grid[y][x];

      if (value === 0) continue;

      let dx = x - (CELLS - 1) / 2;
      let dy = y - (CELLS - 1) / 2;

      let r = sqrt(dx * dx + dy * dy);
      let colorIndex = floor(abs(sin(r * 0.18 + value)) * palette.length);

      let c = palette[colorIndex];

      fill(c[0], c[1], c[2]);

      rect(
        (OFFSET + x * CELL) * viewScale,
        (OFFSET + y * CELL) * viewScale,
        CELL * viewScale + 0.5,
        CELL * viewScale + 0.5
      );
    }
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
