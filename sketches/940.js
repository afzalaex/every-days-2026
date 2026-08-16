const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 80;
const ROWS = 80;

let seeds = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  noStroke();

  generate();
}

function draw() {}

function generate() {
  background(0);

  push();
  scale(viewScale);

  seeds = [];

  for (let i = 0; i < 9; i++) {
    seeds.push({
      x: random(ART),
      y: random(ART),

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),

      weight: random(0.7, 1.5),
    });
  }

  const cellW = ART / COLS;
  const cellH = ART / ROWS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let px = x * cellW;
      let py = y * cellH;

      let closest = seeds[0];
      let best = Infinity;

      for (let i = 0; i < seeds.length; i++) {
        let s = seeds[i];

        let dx = px - s.x;
        let dy = py - s.y;

        let d = dx * dx + dy * dy;
        d /= s.weight;

        if (d < best) {
          best = d;
          closest = s;
        }
      }

      let variation = random(0.85, 1.1);

      fill(closest.r * variation, closest.g * variation, closest.b * variation);

      rect(OFFSET + px, OFFSET + py, cellW + 0.5, cellH + 0.5);
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
