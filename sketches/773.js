const BASE = 1000;
const ART = 450;
const HALF = ART / 2;

let s;
let phase = 0;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
}

function draw() {
  scale(s);
  background(0);
  translate(BASE / 2, BASE / 2);

  generatePhaseLattice();

  phase += 0.01;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}
function generatePhaseLattice() {

  let cols = 50;
  let rows = 50;
  let spacing = ART / cols;

  noFill();

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {

      let px = -HALF + x * spacing;
      let py = -HALF + y * spacing;

      let nx = x / cols - 0.5;
      let ny = y / rows - 0.5;

      let depth =
        sin(nx * 4 + phase) * 40 +
        cos(ny * 4 - phase) * 40;

      let scaleFactor = 1 + depth / 300;

      let fx = px * scaleFactor;
      let fy = py * scaleFactor;

      let radial = dist(0, 0, px, py) / HALF;

      let depthNorm = map(depth, -80, 80, 0, 1);

      let breath = (sin(phase) + 1) * 0.5;

      let weight =
        0.5 +
        depthNorm * 4 +
        (1 - radial) * 2 +
        breath * 1.5;

      strokeWeight(weight);

      let r = 155 + 100 * abs(sin(nx * 3 + phase));
      let g = 155 + 100 * abs(cos(ny * 3 - phase));
      let b = 155 + 100 * abs(sin((nx + ny) * 2));

      stroke(r, g, b);

      point(fx, fy);
    }
  }
}