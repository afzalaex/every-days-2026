const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 40;
const ROWS = 40;
const SCALE = ART / COLS;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;
let zoff = 0;

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
  noiseSeed(floor(random(10000)));
  zoff = random(1000);

  const palette = [];
  for (let i = 0; i < 10; i++) palette.push(randomColor());

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  const cols = 22;
  const rows = 22;

  const colWidths = [];
  const rowHeights = [];
  let totalW = 0;
  let totalH = 0;

  for (let i = 0; i < cols; i++) {
    const w = map(noise(i * 0.35, zoff), 0, 1, 0.4, 2.2);
    colWidths.push(w);
    totalW += w;
  }
  for (let i = 0; i < rows; i++) {
    const h = map(noise(i * 0.35 + 50, zoff), 0, 1, 0.4, 2.2);
    rowHeights.push(h);
    totalH += h;
  }

  for (let i = 0; i < cols; i++) colWidths[i] = (colWidths[i] / totalW) * ART;
  for (let i = 0; i < rows; i++) rowHeights[i] = (rowHeights[i] / totalH) * ART;

  stroke(0);
  strokeWeight(2);

  let y = 0;
  for (let r = 0; r < rows; r++) {
    let x = 0;
    for (let c = 0; c < cols; c++) {
      const n2 = noise(c * 0.18, r * 0.18, zoff * 0.4);
      const colIndex = floor(n2 * palette.length) % palette.length;
      fill(palette[colIndex]);

      rect(x, y, colWidths[c], rowHeights[r]);

      x += colWidths[c];
    }
    y += rowHeights[r];
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
