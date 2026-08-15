const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 16;
const ROWS = 16;

let cells = [];
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

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let cell of cells) {
    fill(cell.color[0], cell.color[1], cell.color[2]);

    stroke(0);
    strokeWeight(2);
    strokeJoin(MITER);
    strokeCap(SQUARE);

    beginShape();

    for (let p of cell.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function generate() {
  cells = [];

  randomSeed(floor(random(999999)));

  let points = [];

  let attractors = [
    {
      x: random(50, 450),
      y: random(50, 450),
      strength: random(0.12, 0.22),
    },
    {
      x: random(50, 450),
      y: random(50, 450),
      strength: random(0.08, 0.18),
    },
    {
      x: random(50, 450),
      y: random(50, 450),
      strength: random(0.06, 0.14),
    },
  ];

  let w = ART / COLS;
  let h = ART / ROWS;

  for (let y = 0; y <= ROWS; y++) {
    points[y] = [];

    for (let x = 0; x <= COLS; x++) {
      let px = x * w;
      let py = y * h;

      if (x !== 0 && x !== COLS && y !== 0 && y !== ROWS) {
        for (let a of attractors) {
          let dx = a.x - px;
          let dy = a.y - py;

          let d = sqrt(dx * dx + dy * dy);

          if (d > 1) {
            let influence = a.strength * max(0, 1 - d / 400);

            px += dx * influence;
            py += dy * influence;
          }
        }
      }

      points[y][x] = createVector(px, py);
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let a = points[y][x];
      let b = points[y][x + 1];
      let c = points[y + 1][x + 1];
      let d = points[y + 1][x];

      cells.push({
        points: [a, b, c, d],
        color: palette(),
      });
    }
  }
}

function palette() {
  return [random(155, 255), random(155, 255), random(155, 255)];
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
