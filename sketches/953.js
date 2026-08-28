const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const FORMS = 90;

const MIN_SIZE = 20;
const MAX_SIZE = 180;

const MIN_W = 4;
const MAX_W = 28;

let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function draw() {}

function generate() {
  background(0);

  push();
  scale(viewScale);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(OFFSET, OFFSET, ART, ART);
  drawingContext.clip();

  noFill();

  for (let i = 0; i < FORMS; i++) {
    const x = random(OFFSET, OFFSET + ART);
    const y = random(OFFSET, OFFSET + ART);

    const size = random(MIN_SIZE, MAX_SIZE);
    const band = random(MIN_W, MAX_W);

    const c = color(random(155, 255), random(155, 255), random(155, 255));

    stroke(c);
    strokeWeight(band);
    strokeCap(SQUARE);

    const rotation = random(TWO_PI);

    for (let j = 0; j < 4; j++) {
      const radius = size + random(-band * 1.5, band * 1.5);

      const start = rotation + j * HALF_PI + random(-0.18, 0.18);

      const end = start + HALF_PI * random(0.55, 0.95);

      arc(x, y, radius, radius, start, end);
    }
  }

  drawingContext.restore();

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
