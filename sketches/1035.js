const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;
const GAP = 5;

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

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
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

  const cols = 7;
  const rows = 7;
  const cellW = ART / cols;
  const cellH = ART / rows;

  const points = [];

  for (let y = 0; y <= rows; y++) {
    points[y] = [];

    for (let x = 0; x <= cols; x++) {
      let px = x * cellW;
      let py = y * cellH;

      if (x > 0 && x < cols) px += random(-15, 15);
      if (y > 0 && y < rows) py += random(-15, 15);

      points[y][x] = { x: px, y: py };
    }
  }

  noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const p1 = points[y][x];
      const p2 = points[y][x + 1];
      const p3 = points[y + 1][x + 1];
      const p4 = points[y + 1][x];

      const inset = GAP / 2;

      const a = { x: p1.x + inset, y: p1.y + inset };
      const b = { x: p2.x - inset, y: p2.y + inset };
      const c = { x: p3.x - inset, y: p3.y - inset };
      const d = { x: p4.x + inset, y: p4.y - inset };

      if (random() < 0.5) {
        fill(randomColor());
        triangle(a.x, a.y, b.x, b.y, c.x, c.y);

        fill(randomColor());
        triangle(a.x, a.y, c.x, c.y, d.x, d.y);
      } else {
        fill(randomColor());
        triangle(a.x, a.y, b.x, b.y, d.x, d.y);

        fill(randomColor());
        triangle(b.x, b.y, c.x, c.y, d.x, d.y);
      }
    }
  }

  pop();
}

function mousePressed() {
  generateArt();
}
