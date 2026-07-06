const BASE = 1000;
const ART = 500;

let ROWS;
let BAR;
let GAP;

let s;
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noStroke();
  noLoop();

  regenerate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function mousePressed() {
  regenerate();
}

function regenerate() {
  ROWS = floor(random(25, 101));
  BAR = random(12, 48);
  GAP = random(2, 8);

  redraw();
}

function draw() {
  push();
  scale(s / BASE);

  background(0);

  translate((BASE - ART) / 2, (BASE - ART) / 2);

  palette = [];
  for (let i = 0; i < 6; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const rowH = ART / ROWS;
  const step = BAR + GAP;

  for (let r = 0; r < ROWS; r++) {
    const y = r * rowH;

    const offset = map(
      noise(r * 0.08, random(1000)),
      0,
      1,
      -step * 3,
      step * 3
    );

    fill(random(palette));

    const firstX = (((offset % step) + step) % step) - step;

    for (let x = firstX; x < ART; x += step) {
      rect(x, y, BAR, rowH * 0.8);
    }
  }

  pop();
}