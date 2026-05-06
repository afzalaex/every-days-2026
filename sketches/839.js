const BASE = 1000;
const ART = 500;

let s;

const CELLS = 20;

let blocks = [];

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  rectMode(CENTER);
  noStroke();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generate() {

  blocks = [];

  let step = ART / CELLS;

  for (let x = 0; x < CELLS; x++) {
    for (let y = 0; y < CELLS; y++) {

      let px =
        x * step - ART / 2 + step / 2;

      let py =
        y * step - ART / 2 + step / 2;

      blocks.push({
        x: px,
        y: py,
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }
  }
}

function draw() {

  background(0);

  translate(width / 2, height / 2);
  scale(s);

  let step = ART / CELLS;

  for (let b of blocks) {

    let d =
      dist(b.x, b.y, 0, 0);

    let wave =
      sin(d * 0.03 - frameCount * 0.03);

    let sizeVal =
      map(wave, -1, 1, 6, step * 0.9);

    let rot =
      wave +
      cos(d * 0.02 + frameCount * 0.02);

    push();

    translate(b.x, b.y);
    rotate(rot);

    fill(b.r, b.g, b.b);

    rect(0, 0, sizeVal, sizeVal, 4);

    pop();
  }
}