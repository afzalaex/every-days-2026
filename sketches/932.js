const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 100;
const CELL = ART / CELLS;

const MIRRORS = 100;

let viewScale;
let mirrors = [];

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
  mirrors = [];

  for (let i = 0; i < MIRRORS; i++) {
    const angle = random(TWO_PI);

    mirrors.push({
      x: random(0.2, 0.8),
      y: random(0.2, 0.8),
      nx: cos(angle),
      ny: sin(angle),
    });
  }
}

function draw() {
  background(0);
  noStroke();

  for (let gy = 0; gy < CELLS; gy++) {
    for (let gx = 0; gx < CELLS; gx++) {
      let px = gx / (CELLS - 1);
      let py = gy / (CELLS - 1);

      for (const m of mirrors) {
        const dx = px - m.x;
        const dy = py - m.y;

        const d = dx * m.nx + dy * m.ny;

        if (d > 0) {
          px -= 2 * d * m.nx;
          py -= 2 * d * m.ny;
        }
      }

      const r = 155 + 100 * abs(sin(px * 14 + py * 5));
      const g = 155 + 100 * abs(sin(py * 16 - px * 8));
      const b = 155 + 100 * abs(sin((px + py) * 18));

      fill(r, g, b);

      rect(
        (OFFSET + gx * CELL) * viewScale,
        (OFFSET + gy * CELL) * viewScale,
        CELL * viewScale,
        CELL * viewScale
      );
    }
  }
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
