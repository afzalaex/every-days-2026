const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const BANDS = 10;
const MIN_W = 5;
const MAX_W = 55;

let seed;
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
  noStroke();

  const verticals = [];
  const horizontals = [];

  for (let i = 0; i < BANDS; i++) {
    verticals.push({
      pos: random(OFFSET, OFFSET + ART),
      w: random(MIN_W, MAX_W),
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });
  }

  for (let i = 0; i < BANDS; i++) {
    horizontals.push({
      pos: random(OFFSET, OFFSET + ART),
      w: random(MIN_W, MAX_W),
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });
  }

  push();

  scale(viewScale);

  for (let band of verticals) {
    fill(band.c);

    rect(band.pos - band.w / 2, OFFSET, band.w, ART);
  }

  for (let band of horizontals) {
    fill(band.c);

    rect(OFFSET, band.pos - band.w / 2, ART, band.w);
  }

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
