const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 5;
const ROWS = 5;
const CELL = ART / COLS;

const FORMS = 120;

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

  const points = [];

  for (let y = 0; y <= ROWS; y++) {
    points[y] = [];

    for (let x = 0; x <= COLS; x++) {
      const edge = x === 0 || x === COLS || y === 0 || y === ROWS;

      points[y][x] = {
        x: OFFSET + x * CELL + (edge ? 0 : random(-CELL * 0.25, CELL * 0.25)),

        y: OFFSET + y * CELL + (edge ? 0 : random(-CELL * 0.25, CELL * 0.25)),
      };
    }
  }

  for (let i = 0; i < FORMS; i++) {
    const x = floor(random(COLS));
    const y = floor(random(ROWS));

    const w = floor(random(1, 4));
    const h = floor(random(1, 4));

    if (x + w > COLS || y + h > ROWS) continue;

    const a = points[y][x];
    const b = points[y][x + w];
    const c = points[y + h][x + w];
    const d = points[y + h][x];

    fill(random(155, 255), random(155, 255), random(155, 255));

    stroke(0);
    strokeWeight(2);

    beginShape();
    vertex(a.x, a.y);
    vertex(b.x, b.y);
    vertex(c.x, c.y);
    vertex(d.x, d.y);
    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generate();
}
