const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 50;
const ROWS = 50;
const SOURCES = 6;

let sources = [];
let palette = [];
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

function draw() {}

function generate() {
  sources = [];
  palette = [];

  for (let i = 0; i < 10; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  for (let i = 0; i < SOURCES; i++) {
    sources.push({
      x: random(-15, COLS + 15),
      y: random(-15, ROWS + 15),
      angle: random(TWO_PI),
      weight: random(0.8, 2.2),
      scale: random(8, 22),
    });
  }

  push();
  scale(viewScale);

  background(0);
  noStroke();

  const cellW = ART / COLS;
  const cellH = ART / ROWS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let total = 0;

      for (let s of sources) {
        let dx = x - s.x;
        let dy = y - s.y;

        let distValue = sqrt(dx * dx + dy * dy);

        let directional = dx * cos(s.angle) + dy * sin(s.angle);

        total +=
          sin(directional / s.scale) * cos(distValue / s.scale) * s.weight;
      }

      let value = sin(total * 2.4);

      let index = floor(map(value, -1, 1, 0, palette.length));

      index = constrain(index, 0, palette.length - 1);

      fill(palette[index]);

      rect(OFFSET + x * cellW, OFFSET + y * cellH, cellW + 0.5, cellH + 0.5);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
