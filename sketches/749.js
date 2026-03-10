const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const CELLS = 8;
const CUT = 2;       
const S = ART / CELLS;

const ANGLE_STEP = 2.8125;

let viewScale = 1;
let layers = 1;

let rects = [];
let squareColors = [];

function setup() {
  computeCanvas();
  noLoop();

  buildGrid();
  squareColors.push(makeColors());
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(viewScale);

  strokeWeight(1.5);
  noFill();

  for (let i = 0; i < layers; i++) {
    drawLayer(i);
  }
}

function buildGrid() {
  rects = [];

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {

      if (
        (x < CUT && y < CUT) ||
        (x >= CELLS - CUT && y < CUT) ||
        (x < CUT && y >= CELLS - CUT) ||
        (x >= CELLS - CUT && y >= CELLS - CUT)
      ) continue;

      rects.push([
        x * S - HALF,
        y * S - HALF
      ]);
    }
  }
}

function drawLayer(index) {
  push();
  rotate(radians(index * ANGLE_STEP));

  for (let i = 0; i < rects.length; i++) {
    stroke(squareColors[index][i]);
    rect(rects[i][0], rects[i][1], S, S);
  }

  pop();
}

function mousePressed() {
  layers++;
  squareColors.push(makeColors());
  redraw();
}

function makeColors() {
  return rects.map(() =>
    color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    )
  );
}

function computeCanvas() {
  const s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function windowResized() {
  computeCanvas();
  redraw();
}














