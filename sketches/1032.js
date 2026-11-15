const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;
let palette = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function generateArt() {
  randomSeed(floor(random(1000000)));
  background(0);

  palette = [];
  for (let i = 0; i < 10; i++) {
    palette.push(randomColor());
  }

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  background(0);

  const cx = ART / 2;
  const cy = ART / 2;

  const count = floor(random(7, 11));
  const maxW = ART;
  const maxH = ART;

  const angle = random([-1, 1]) * random(0.08, 0.22);
  const compression = random(0.48, 0.68);

  rectMode(CENTER);
  noStroke();

  for (let i = count; i >= 1; i--) {
    const t = i / count;

    const w = lerp(48, maxW, t);
    const h = lerp(48, maxH, t);

    const sx = lerp(compression, 1, t);
    const sy = lerp(1, compression, t);

    const offset = (count - i) * 2.5;
    const px = cx + offset * cos(angle);
    const py = cy + offset * sin(angle);

    push();
    translate(px - cx, py - cy);
    rotate(angle * (1 - t));

    fill(palette[i % palette.length]);
    rect(cx, cy, w * sx, h * sy);

    pop();
  }

  rectMode(CORNER);
  pop();
}

function draw() {}

function mousePressed() {
  generateArt();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}
