const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 2;
const ROWS = 2;

let palette = [];
let modules = [];

let frameIndex = 0;
const totalFrames = 240;
const holdFrames = 12;

function setup() {
  createCanvas(SIZE, SIZE);

  frameRate(24);
  generate();
}

function draw() {
  background(0);

  push();
  translate(OFFSET, OFFSET);

  drawArtwork();

  pop();

  frameIndex++;

  if (frameIndex % holdFrames === 0) {
    generate();
  }

  if (frameIndex >= totalFrames) {
    noLoop();
  }
}

function generate() {
  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  modules = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      modules.push({
        r1: floor(random(4)),
        r2: floor(random(4)),
        c1: floor(random(palette.length)),
        c2: floor(random(palette.length)),
      });
    }
  }
}

function drawArtwork() {
  const cell = ART / COLS;

  noFill();
  strokeWeight(10);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const module = modules[y * COLS + x];

      const xPos = x * cell;
      const yPos = y * cell;

      stroke(palette[module.c1]);
      drawQuarter(xPos, yPos, cell, module.r1);

      stroke(palette[module.c2]);
      drawQuarter(xPos, yPos, cell, module.r2);
    }
  }
}

function drawQuarter(x, y, size, rotation) {
  const diameter = size * 2;

  if (rotation === 0) {
    arc(x, y, diameter, diameter, 0, HALF_PI, PIE);
  }

  if (rotation === 1) {
    arc(x + size, y, diameter, diameter, HALF_PI, PI, PIE);
  }

  if (rotation === 2) {
    arc(x + size, y + size, diameter, diameter, PI, PI + HALF_PI, PIE);
  }

  if (rotation === 3) {
    arc(x, y + size, diameter, diameter, PI + HALF_PI, TWO_PI, PIE);
  }
}

function mousePressed() {
  frameIndex = 0;

  loop();
  generate();
}

function keyPressed() {
  if (key === "S" || key === "s") {
    saveGif("arcture", totalFrames / 24);
  }
}
