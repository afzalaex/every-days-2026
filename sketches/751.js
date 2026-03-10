const BASE = 1000;
const ART = 500;
const N = 25;

let cell;
let viewScale = 1;

let bias = [];
let colors = [];

let phase = 0;

function setup() {
  computeCanvas();
  pixelDensity(1);
  noStroke();
  colorMode(RGB);
  noLoop();

  cell = ART / N;

  for (let y = 0; y < N; y++) {
    bias[y] = random([0, 1]);
  }

  let idx = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      colors[idx++] = color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );
    }
  }

  redraw();
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2 - ART / 2, BASE / 2 - ART / 2);

  let idx = 0;

  for (let y = 0; y < N; y++) {

    let rowBias =
      bias[(y + phase) % N] ^ (phase % 2);

    for (let x = 0; x < N; x++) {
      drawTriangleCell(x, y, idx, rowBias);
      idx++;
    }
  }

  pop();
}

function drawTriangleCell(x, y, idx, rowBias) {
  const px = x * cell;
  const py = y * cell;

  fill(colors[idx]);

  const mode = (x + y + rowBias) % 4;

  push();
  translate(px, py);

  beginShape();
  if (mode === 0) {
    vertex(0, 0);
    vertex(cell, 0);
    vertex(0, cell);
  } else if (mode === 1) {
    vertex(cell, 0);
    vertex(cell, cell);
    vertex(0, cell);
  } else if (mode === 2) {
    vertex(0, 0);
    vertex(cell, cell);
    vertex(0, cell);
  } else {
    vertex(0, 0);
    vertex(cell, 0);
    vertex(cell, cell);
  }
  endShape(CLOSE);

  pop();
}

function mousePressed() {
  phase = (phase + 1) % N;
  redraw();
}


