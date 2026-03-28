const BASE = 1000;
let s = 1;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  rectMode(CENTER);
  noStroke();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);

  let gridSize = 7;
  let glyphSize = 60;
  let spacing = 80;
  let cols = 7;
  let rows = 7;

  let startX = BASE / 2 - (cols - 1) * spacing / 2;
  let startY = BASE / 2 - (rows - 1) * spacing / 2;

  for (let gx = 0; gx < cols; gx++) {
    for (let gy = 0; gy < rows; gy++) {
      drawGlyph(
        startX + gx * spacing,
        startY + gy * spacing,
        glyphSize,
        gridSize
      );
    }
  }

  pop();
}

function drawGlyph(x, y, size, grid) {
  let cellSize = size / grid;

  push();
  translate(x, y);

  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {

      if (random() < 0.45) {

        fill(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        );

        rect(
          (i - grid / 2 + 0.5) * cellSize,
          (j - grid / 2 + 0.5) * cellSize,
          cellSize * 0.8,
          cellSize * 0.8
        );
      }
    }
  }

  pop();
}


function mousePressed() {
  redraw();
}