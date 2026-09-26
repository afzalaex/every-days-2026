const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const QUADRANTS = 4;
const LAYERS = 7;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function generate() {
  background(0);

  palette = [];

  for (let i = 0; i < 20; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  push();

  scale(viewScale);

  translate(OFFSET, OFFSET);

  noStroke();

  const half = ART / 2;

  drawHomage(0, 0, half);
  drawHomage(half, 0, half);
  drawHomage(0, half, half);
  drawHomage(half, half, half);

  pop();
}

function drawHomage(x, y, area) {
  push();

  translate(x + area / 2, y + area / 2);

  let outer = area;

  let innerA = random(0.72, 0.84);
  let innerB = random(0.55, 0.68);
  let innerC = random(0.35, 0.48);
  let innerD = random(0.16, 0.3);

  let sizes = [
    outer,
    outer * innerA,
    outer * innerB,
    outer * innerC,
    outer * innerD,
  ];

  for (let i = 0; i < sizes.length; i++) {
    let s = sizes[i];

    let ox = random(-area * 0.035, area * 0.035);
    let oy = random(-area * 0.035, area * 0.035);

    fill(random(palette));

    rect(-s / 2 + ox, -s / 2 + oy, s, s);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
