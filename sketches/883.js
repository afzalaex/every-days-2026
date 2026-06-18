const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let pts = [];
let cols = [];

let gridSize;
let numFaults;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  strokeCap(SQUARE);
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generatePalette() {
  let palette = [];
  let count = floor(random(12, 30));

  for (let i = 0; i < count; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }
  return palette;
}

function generate() {
  pts = [];

  gridSize = floor(random(15, 46));
  numFaults = floor(random(3, 31));
  cols = generatePalette();

  let step = ART / (gridSize - 1);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      pts.push({
        x: x * step - HALF,
        y: y * step - HALF
      });
    }
  }

  for (let i = 0; i < numFaults; i++) {
    applyFault();
  }

  redraw();
}

function applyFault() {
  let angle = random(TWO_PI);
  let nx = cos(angle);
  let ny = sin(angle);

  let ox = random(-HALF, HALF);
  let oy = random(-HALF, HALF);
  let shift = random(2, 10);

  for (let p of pts) {
    let side = (p.x - ox) * nx + (p.y - oy) * ny;

    if (side > 0) {
      p.x += -ny * shift;
      p.y += nx * shift;
    } else {
      p.x += ny * shift;
      p.y += -nx * shift;
    }
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);

  strokeWeight(1);
  noFill();

  for (let y = 0; y < gridSize; y++) {
    stroke(cols[y % cols.length]);

    beginShape();
    for (let x = 0; x < gridSize; x++) {
      let p = pts[y * gridSize + x];
      vertex(p.x * s, p.y * s);
    }
    endShape();
  }

  for (let x = 0; x < gridSize; x++) {
    stroke(cols[(x + 7) % cols.length]);

    beginShape();
    for (let y = 0; y < gridSize; y++) {
      let p = pts[y * gridSize + x];
      vertex(p.x * s, p.y * s);
    }
    endShape();
  }

  pop();
}

function mousePressed() {
  generate();
}