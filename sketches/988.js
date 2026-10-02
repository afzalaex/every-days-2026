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
    noStroke();

    beginShape();

    for (let p of piece.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(5);
  strokeCap(SQUARE);

  for (let piece of pieces) {
    for (let i = 0; i < piece.points.length; i++) {
      let a = piece.points[i];
      let b = piece.points[(i + 1) % piece.points.length];

      line(a.x, a.y, b.x, b.y);
    }
  }

  pop();
}

function generate() {
  palette = [];
  pieces = [];

  for (let i = 0; i < 10; i++) {
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
      let c = points[row + 1][col + 1];
      let d = points[row + 1][col];

      if (random() < 0.5) {
        pieces.push({
          points: [a, b, c],
          col: random(palette),
        });

        pieces.push({
          points: [a, c, d],
          col: random(palette),
        });
      } else {
        pieces.push({
          points: [a, b, d],
          col: random(palette),
        });

        pieces.push({
          points: [b, c, d],
          col: random(palette),
        });
      }
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
