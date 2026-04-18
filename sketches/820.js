const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

const CELL = 10;
const COLS = ART / CELL;
const ROWS = ART / CELL;

let ax, ay, bx, by;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  initParams();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function initParams() {
  ax = int(random(1, 5));
  ay = int(random(1, 5));
  bx = int(random(1, 5));
  by = int(random(1, 5));
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(MID - HALF, MID - HALF);

  drawLinks();

  pop();
}

function drawLinks() {
  strokeWeight(1);

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {

      let x1 = x * CELL + CELL / 2;
      let y1 = y * CELL + CELL / 2;

      let tx = (x * ax + y * ay) % COLS;
      let ty = (y * bx + x * by) % ROWS;

      let x2 = tx * CELL + CELL / 2;
      let y2 = ty * CELL + CELL / 2;

      if (tx > x || (tx === x && ty > y)) {
        stroke(random(155, 255), random(155, 255), random(155, 255));
        drawSegmentedLine(x1, y1, x2, y2);
      }
    }
  }
}

function drawSegmentedLine(x1, y1, x2, y2) {
  let steps = 12;

  for (let i = 0; i < steps; i++) {
    if (i % 3 === 1) continue;

    let t1 = i / steps;
    let t2 = (i + 1) / steps;

    let sx = lerp(x1, x2, t1);
    let sy = lerp(y1, y2, t1);

    let ex = lerp(x1, x2, t2);
    let ey = lerp(y1, y2, t2);

    line(sx, sy, ex, ey);
  }
}

function mousePressed() {
  initParams();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}