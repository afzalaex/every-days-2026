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
  translate(OFFSET, OFFSET);
  noStroke();

  const colors = Array.from({ length: 4 }, () => randomColor());

  const points = [
    { x: random(ART * 0.2, ART * 0.8), y: 0 },
    { x: ART, y: random(ART * 0.2, ART * 0.8) },
    { x: random(ART * 0.2, ART * 0.8), y: ART },
    { x: 0, y: random(ART * 0.2, ART * 0.8) },
  ];

  const center = {
    x: random(ART * 0.3, ART * 0.7),
    y: random(ART * 0.3, ART * 0.7),
  };

  const slices = [
    [{ x: 0, y: 0 }, points[0], center, points[3]],
    [points[0], { x: ART, y: 0 }, points[1], center],
    [center, points[1], { x: ART, y: ART }, points[2]],
    [points[3], center, points[2], { x: 0, y: ART }],
  ];

  for (let i = 0; i < slices.length; i++) {
    fill(colors[i]);
    beginShape();

    for (const vertexPoint of slices[i]) {
      vertex(vertexPoint.x, vertexPoint.y);
    }

    endShape(CLOSE);
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
