const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 5;
const ROWS = 5;

let palette = [];
let pieces = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
  noLoop();
}

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let piece of pieces) {
    fill(piece.col);
    stroke(0);
    strokeWeight(5);
    strokeCap(SQUARE);

    rect(piece.x, piece.y, piece.w, piece.h);
  }

  pop();
}

function generate() {
  palette = [];
  pieces = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let points = [];

  for (let row = 0; row <= ROWS; row++) {
    points[row] = [];

    for (let col = 0; col <= COLS; col++) {
      let x = col * (ART / COLS);
      let y = row * (ART / ROWS);

      if (col > 0 && col < COLS) {
        x += random(-35, 35);
      }

      if (row > 0 && row < ROWS) {
        y += random(-35, 35);
      }

      points[row][col] = {
        x: x,
        y: y,
      };
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let a = points[row][col];
      let b = points[row][col + 1];
      let d = points[row + 1][col];

      let x = a.x;
      let y = a.y;

      let w = b.x - a.x;
      let h = d.y - a.y;

      pieces.push({
        x: x,
        y: y,
        w: w,
        h: h,
        col: random(palette),
      });
    }
  }

  for (let i = 0; i < pieces.length; i++) {
    if (random() < 0.18) {
      pieces[i].col = random(palette);
    }
  }
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
