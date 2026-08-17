const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 80;
const ROWS = 80;

let pattern = [];
let viewScale;

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

  noStroke();

  for (let p of pattern) {
    fill(p.c);
    circle(p.x, p.y, p.s);
  }

  pop();
}

function generate() {
  pattern = [];

  let phase = random(TWO_PI);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let u = col / (COLS - 1);
      let v = row / (ROWS - 1);

      let x = u * ART;
      let y = v * ART;

      let waveA = sin(v * TWO_PI * 1.5 + phase);

      let waveB = sin(u * TWO_PI * 2.0 - v * TWO_PI * 1.15 + phase * 0.7);

      let waveC = sin(u * TWO_PI * 3.0 + v * TWO_PI * 0.8);

      x += waveA * 48;
      x += waveB * 22;

      y += waveC * 18;

      let compression = 0.58 + 0.42 * abs(sin(u * TWO_PI * 1.45 + waveA * 1.8));

      y = ART * 0.5 + (y - ART * 0.5) * compression;

      let angle = QUARTER_PI;

      angle += cos(v * TWO_PI * 1.5 + phase) * 0.5;

      angle += sin(u * TWO_PI * 2.2 + v * TWO_PI) * 0.3;

      let density =
        0.55 + 0.45 * abs(sin(u * TWO_PI * 1.7 + v * TWO_PI * 2.1 + phase));

      if (random() > density) {
        continue;
      }

      let size = random(3.2, 6.2);

      x += cos(angle) * random(-2, 2);
      y += sin(angle) * random(-2, 2);

      let c;

      let palette = random();

      if (palette < 0.18) {
        c = color(random(155, 255), random(155, 255), random(155, 255));
      } else if (palette < 0.36) {
        c = color(random(155, 255), random(155, 255), random(155, 255));
      } else if (palette < 0.54) {
        c = color(random(155, 255), random(155, 255), random(155, 255));
      } else if (palette < 0.72) {
        c = color(random(155, 255), random(155, 255), random(155, 255));
      } else {
        c = color(random(155, 255), random(155, 255), random(155, 255));
      }

      pattern.push({
        x: x,
        y: y,
        s: size,
        c: c,
      });
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
