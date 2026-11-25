const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 25;
const ROWS = 25;

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

function generateArt() {
  background(0);

  randomSeed(floor(random(1000000)));
  noiseSeed(floor(random(1000000)));

  const palette = [];
  for (let i = 0; i < 9; i++) {
    palette.push(randomColor());
  }

  const phaseA = random(TWO_PI);
  const phaseB = random(TWO_PI);
  const phaseC = random(TWO_PI);

  const warpA = random(0.12, 0.3);
  const warpB = random(0.12, 0.3);

  const zoff = random(1000);

  const colWidths = [];
  const rowHeights = [];

  let totalW = 0;
  let totalH = 0;

  for (let c = 0; c < COLS; c++) {
    const weight = map(noise(c * 0.23, zoff), 0, 1, 0.45, 1.8);

    colWidths.push(weight);
    totalW += weight;
  }

  for (let r = 0; r < ROWS; r++) {
    const weight = map(noise(50 + r * 0.23, zoff), 0, 1, 0.45, 1.8);

    rowHeights.push(weight);
    totalH += weight;
  }

  for (let c = 0; c < COLS; c++) {
    colWidths[c] = (colWidths[c] / totalW) * ART;
  }

  for (let r = 0; r < ROWS; r++) {
    rowHeights[r] = (rowHeights[r] / totalH) * ART;
  }

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  let y = 0;

  for (let r = 0; r < ROWS; r++) {
    let x = 0;

    for (let c = 0; c < COLS; c++) {
      const w = colWidths[c];
      const h = rowHeights[r];

      const u = (x + w * 0.5) / ART;
      const v = (y + h * 0.5) / ART;

      const a = TWO_PI * (u * 2.0 + warpA * sin(TWO_PI * v * 1.4 + phaseA));

      const b = TWO_PI * (v * 2.2 + warpB * sin(TWO_PI * u * 1.3 + phaseB));

      const diagonal =
        TWO_PI * ((u + v) * 1.35 + 0.12 * sin(TWO_PI * (u - v) + phaseC));

      const field =
        sin(a + phaseA) + cos(b + phaseB) + 0.55 * sin(diagonal + phaseC);

      const localVariation =
        (noise(c * 0.14, r * 0.14, zoff + 200) - 0.5) * 0.55;

      const value = constrain(field + localVariation, -2.55, 2.55);

      const band = floor(map(value, -2.55, 2.55, 0, palette.length));

      const colorIndex = constrain(band, 0, palette.length - 1);

      fill(palette[colorIndex]);

      stroke(0);
      strokeWeight(8);

      rect(x, y, w + 0.4, h + 0.4);

      x += w;
    }

    y += rowHeights[r];
  }

  pop();
}

function mousePressed() {
  generateArt();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}
