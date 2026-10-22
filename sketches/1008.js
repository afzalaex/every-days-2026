const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const STRIPE_WIDTH = 50;
const PALETTE_SIZE = 12;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
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

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const cx = OFFSET + ART / 2;
  const cy = OFFSET + ART / 2;

  push();
  scale(viewScale);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(OFFSET, OFFSET, ART, ART);
  drawingContext.clip();

  noStroke();

  for (let r = ART; r >= 0; r -= STRIPE_WIDTH) {
    const bandIndex = floor((ART - r) / STRIPE_WIDTH);

    fill(palette[bandIndex % PALETTE_SIZE]);

    beginShape();
    vertex(cx, cy - r);
    vertex(cx + r, cy);
    vertex(cx, cy + r);
    vertex(cx - r, cy);
    endShape(CLOSE);
  }

  drawingContext.restore();
  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  generate();
}
