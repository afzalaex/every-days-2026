const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const LAYERS = 25;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
  noLoop();
}

function draw() {}

function generate() {
  background(0);

  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  noStroke();

  push();

  scale(viewScale);

  let x = OFFSET;
  let y = OFFSET;
  let w = ART;
  let h = ART;

  for (let i = 0; i < LAYERS; i++) {
    fill(palette[i % palette.length]);

    let dx = random(-18, 18);
    let dy = random(-18, 18);

    rect(x + dx, y + dy, w, h);

    x += random(7, 16);
    y += random(7, 16);

    w -= random(14, 28);
    h -= random(14, 28);

    if (w <= 10 || h <= 10) {
      break;
    }
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
