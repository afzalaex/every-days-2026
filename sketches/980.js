const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const RINGS = 9;

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

function generate() {
  background(0);

  palette = [];

  for (let i = 0; i < 8; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  push();

  scale(viewScale);

  let cx = OFFSET + ART / 2;
  let cy = OFFSET + ART / 2;

  noStroke();

  for (let i = RINGS; i >= 1; i--) {
    let t = i / RINGS;

    let diameter = ART * pow(t, 1.15) * random(0.94, 1.04);

    let offsetX = random(-8, 8) * (1 - t);

    let offsetY = random(-8, 8) * (1 - t);

    fill(random(palette));

    ellipse(cx + offsetX, cy + offsetY, diameter, diameter);
  }

  pop();
}

function mousePressed() {
  generate();
}
