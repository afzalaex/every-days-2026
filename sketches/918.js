const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const SCALE = 25;

let cols, rows;
let zoff = 0;
let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  cols = floor(ART / SCALE);
  rows = floor(ART / SCALE);

  noLoop();
}

function draw() {
  scale(s);

  background(0);

  let yoff = 0;

  noStroke();

  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
      let n = noise(xoff, yoff, zoff);

      fill(
        map(n, 0, 1, 0, 255),
        map(n, 0, 1, 155, 255),
        map(n, 0, 1, 155, 255),
        150
      );

      rect(OFFSET + x * SCALE, OFFSET + y * SCALE, SCALE, SCALE);

      xoff += 0.1;
    }

    yoff += 0.1;
  }
}

function mousePressed() {
  zoff += 0.25;
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}