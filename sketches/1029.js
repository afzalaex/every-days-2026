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

  const c1 = randomColor();
  const c2 = randomColor();
  const c3 = randomColor();

  const xTop = random(0.25, 0.75) * ART;
  const xBottom = random(0.25, 0.75) * ART;

  const t = random(0.25, 0.75);
  const px = lerp(xTop, xBottom, t);
  const py = t * ART;
  const qy = random(0.2, 0.8) * ART;

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);
  noStroke();

  fill(c1);
  beginShape();
  vertex(0, 0);
  vertex(xTop, 0);
  vertex(xBottom, ART);
  vertex(0, ART);
  endShape(CLOSE);

  fill(c2);
  beginShape();
  vertex(xTop, 0);
  vertex(ART, 0);
  vertex(ART, qy);
  vertex(px, py);
  endShape(CLOSE);

  fill(c3);
  beginShape();
  vertex(px, py);
  vertex(ART, qy);
  vertex(ART, ART);
  vertex(xBottom, ART);
  endShape(CLOSE);

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
