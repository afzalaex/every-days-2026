const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const SQUARES = 4;

let palette = [];
let squares = [];
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
  squares = [];

  for (let i = 0; i < SQUARES; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  const anchors = [
    { x: 0.28, y: 0.28 },
    { x: 0.72, y: 0.28 },
    { x: 0.28, y: 0.72 },
    { x: 0.72, y: 0.72 }
  ];

  for (let i = 0; i < SQUARES; i++) {
    squares.push({
      x: anchors[i].x * ART + random(-35, 35),
      y: anchors[i].y * ART + random(-35, 35),
      size: random(90, 190),
      rotation: random([-1, 1]) * random(0, PI / 8),
      color: palette[i]
    });
  }

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  rectMode(CENTER);
  noStroke();

  for (const s of squares) {
    push();
    translate(s.x, s.y);
    rotate(s.rotation);

    fill(s.color);
    rect(0, 0, s.size, s.size);

    pop();
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}

function mousePressed() {
  generate();
}
