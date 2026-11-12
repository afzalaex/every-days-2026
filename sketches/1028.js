const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const COLS = 4;
const ROWS = 4;
const CELL = ART / COLS;

let viewScale = 1;
let triangles = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    255
  );
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function generateArt() {
  triangles = [];

  const palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(randomColor());
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * CELL;
      const y = row * CELL;
      const w = CELL;
      const h = CELL;

      let triangleA;
      let triangleB;

      if (random() < 0.5) {
        triangleA = [
          [x, y],
          [x + w, y],
          [x + w, y + h],
        ];

        triangleB = [
          [x, y],
          [x + w, y + h],
          [x, y + h],
        ];
      } else {
        triangleA = [
          [x, y],
          [x + w, y],
          [x, y + h],
        ];

        triangleB = [
          [x + w, y],
          [x + w, y + h],
          [x, y + h],
        ];
      }

      triangles.push({
        points: triangleA,
        col: random(palette),
      });

      triangles.push({
        points: triangleB,
        col: random(palette),
      });
    }
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  for (const tri of triangles) {
    fill(tri.col);

    beginShape();
    for (const p of tri.points) {
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generateArt();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
