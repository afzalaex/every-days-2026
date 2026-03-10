const BASE = 1000;
const ART = 500;

let viewScale;
let cells = [];

const STEP = 50;
const HALF = ART / 2;

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  strokeWeight(2);
  noFill();
  rectMode(CENTER);

  buildCells();
}

function windowResized() {
  computeCanvas();
}

function buildCells() {
  cells = [];

  for (let y = -HALF; y < HALF; y += STEP) {
    for (let x = -HALF; x < HALF; x += STEP) {

      cells.push({
        cx: x + STEP / 2,
        cy: y + STEP / 2,
        col: color(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        ),

        mode: floor(random(6)),

        mask: [
          random() > 0.3,
          random() > 0.3,
          random() > 0.3,
          random() > 0.3
        ]
      });
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;
  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  for (let c of cells) {
    let d = dist(c.cx, c.cy, mx, my);

    let t = map(d, 0, ART * 0.6, 1, 0);
    t = constrain(t, 0, 1);

    stroke(c.col);

    let depth = floor(lerp(0, 4, t));

    push();
    translate(c.cx, c.cy);
    divideSquare(0, 0, STEP * 0.8, depth, c);
    pop();
  }

  pop();
}

function divideSquare(x, y, s, depth, cell) {
  rect(x, y, s, s);

  if (depth <= 0 || s < 6) return;

  let h = s / 2;
  let q = s / 4;

  switch (cell.mode) {

    case 0:
      if (cell.mask[0]) divideSquare(x - q, y - q, h, depth - 1, cell);
      if (cell.mask[1]) divideSquare(x + q, y - q, h, depth - 1, cell);
      if (cell.mask[2]) divideSquare(x - q, y + q, h, depth - 1, cell);
      if (cell.mask[3]) divideSquare(x + q, y + q, h, depth - 1, cell);
      break;

    case 1:
      divideSquare(x, y - q, h, depth - 1, cell);
      if (cell.mask[2]) divideSquare(x, y + q, h, depth - 1, cell);
      break;

    case 2:
      divideSquare(x - q, y, h, depth - 1, cell);
      if (cell.mask[1]) divideSquare(x + q, y, h, depth - 1, cell);
      break;

    case 3:
      divideSquare(x - q, y - q, h, depth - 1, cell);
      if (cell.mask[1]) divideSquare(x + q, y - q, h, depth - 1, cell);
      if (cell.mask[2]) divideSquare(x - q, y + q, h, depth - 1, cell);
      break;

    case 4:
      if (cell.mask[0]) divideSquare(x - q, y - q, h, depth - 1, cell);
      if (cell.mask[3]) divideSquare(x + q, y + q, h, depth - 1, cell);
      break;
      
    case 5:
      divideSquare(x, y, h, depth - 1, cell);
      if (cell.mask[0]) divideSquare(x - q, y - q, h, depth - 1, cell);
      if (cell.mask[1]) divideSquare(x + q, y - q, h, depth - 1, cell);
      if (cell.mask[2]) divideSquare(x - q, y + q, h, depth - 1, cell);
      if (cell.mask[3]) divideSquare(x + q, y + q, h, depth - 1, cell);
      break;
  }
}







