const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 20;
const ROWS = 20;

const CELL = ART / COLS;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generatePalette();

  noLoop();
  noStroke();

  generate();
}

function generatePalette() {
  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function generate() {
  background(0);

  push();
  scale(viewScale);

  translate(OFFSET, OFFSET);

  let frequency = random(0.35, 0.8);
  let thickness = random(0.12, 0.22);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let cx = x * CELL + CELL / 2;
      let cy = y * CELL + CELL / 2;

      let angle = sin(x * frequency) + cos(y * frequency);

      angle *= QUARTER_PI;

      let dx = x - (COLS - 1) / 2;
      let dy = y - (ROWS - 1) / 2;

      let distFromCenter = sqrt(dx * dx + dy * dy);

      let size = map(distFromCenter, 0, 5, CELL * 0.82, CELL * 0.52);

      drawTile(cx, cy, size, angle, thickness, (x + y) % palette.length);
    }
  }

  pop();
}

function drawTile(cx, cy, size, angle, thickness, colorIndex) {
  push();

  translate(cx, cy);
  rotate(angle);

  let outer = size / 2;
  let inner = outer * (1 - thickness);

  fill(palette[colorIndex]);

  beginShape();

  vertex(-outer, -outer);
  vertex(outer, -outer);
  vertex(outer, outer);
  vertex(-outer, outer);

  beginContour();

  vertex(-inner, -inner);
  vertex(-inner, inner);
  vertex(inner, inner);
  vertex(inner, -inner);

  endContour();

  endShape(CLOSE);

  fill(0);

  let cut = outer * 0.35;

  beginShape();

  vertex(-outer, -outer);
  vertex(-outer + cut, -outer);
  vertex(outer, outer - cut);
  vertex(outer, outer);

  endShape(CLOSE);

  pop();
}

function mousePressed() {
  generatePalette();
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
