const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

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

  push();
  scale(viewScale);
  translate(OFFSET + ART / 2, OFFSET + ART / 2);

  noFill();
  strokeCap(ROUND);

  const maxR = ART / 2 - 8;
  const rings = floor(random(6, 14));

  for (let r = 0; r < rings; r++) {
    const radius = map(r, 0, rings - 1, maxR * 0.12, maxR);
    const thickness = random(3, 14);
    const arcCount = floor(random(3, 9));

    strokeWeight(thickness);

    for (let a = 0; a < arcCount; a++) {
      const start = random(TWO_PI);
      const sweep = random(PI * 0.25, PI * 1.4);
      const end = start + sweep;

      stroke(randomColor());
      arc(0, 0, radius * 2, radius * 2, start, end);
    }
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
