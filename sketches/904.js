const BASE = 1000;
const ART = 500;

let s;

let CELL;

let cols, rows;
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0);

  CELL = floor(random(10, 50));

  const sc = s / BASE;

  const art = ART * sc;
  const cell = CELL * sc;

  const ox = (s - art) / 2;
  const oy = (s - art) / 2;

  cols = floor(ART / CELL);
  rows = floor(ART / CELL);

  palette = [];

  for (let i = 0; i < 6; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let field = [];

  for (let x = 0; x <= cols; x++) {
    field[x] = [];
    for (let y = 0; y <= rows; y++) {
      field[x][y] = floor(random(4));
    }
  }

  strokeWeight(3 * sc);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      push();

      translate(ox + x * cell + cell / 2, oy + y * cell + cell / 2);

      rotate(field[x][y] * HALF_PI);

      stroke(random(palette));

      if (random() < 0.82) {
        line(-cell / 2, 0, cell / 2, 0);
      } else {
        noFill();

        arc(-cell / 2, -cell / 2, cell, cell, 0, HALF_PI);
      }

      pop();
    }
  }
}

function mousePressed() {
  redraw();
}