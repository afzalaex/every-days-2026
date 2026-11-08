const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const MIN_COLOR = 155;
const MAX_COLOR = 255;
const BAND_COUNT = 10;

let viewScale = 1;
let cuts = [];
let palette = [];

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
  cuts = [0];

  for (let i = 1; i < BAND_COUNT; i++) {
    cuts.push(i / BAND_COUNT + random(-0.025, 0.025));
  }

  cuts.push(1);
  cuts.sort((a, b) => a - b);

  palette = [];

  for (let i = 0; i < BAND_COUNT * 2; i++) {
    palette.push(randomColor());
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  noStroke();

  const x = OFFSET;
  const y = OFFSET;
  const s = ART;

  for (let i = 0; i < BAND_COUNT; i++) {
    fill(palette[i]);

    triangle(x, y + cuts[i] * s, x, y + cuts[i + 1] * s, x + s, y);
  }

  for (let i = 0; i < BAND_COUNT; i++) {
    fill(palette[BAND_COUNT + i]);

    triangle(
      x + s,
      y + (1 - cuts[i]) * s,
      x + s,
      y + (1 - cuts[i + 1]) * s,
      x,
      y + s
    );
  }

  pop();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generateArt();
    return false;
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
