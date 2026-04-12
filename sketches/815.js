const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

let RES;
const STATES = 40;

let grid = [];
let palette = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
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
  grid = [];
  palette = [];

  RES = floor(random(20, 100));

  for (let i = 0; i < STATES; i++) {
    palette.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }

  for (let x = 0; x < RES; x++) {
    grid[x] = [];
    for (let y = 0; y < RES; y++) {

      let v =
        sin(x * 0.31) +
        cos(y * 0.27) +
        sin((x + y) * 0.19);

      let n = map(v, -3, 3, 0, 1);

      let idx = floor(n * STATES);
      idx = constrain(idx, 0, STATES - 1);

      grid[x][y] = idx;
    }
  }
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(MID - HALF, MID - HALF);

  noStroke();

  let cell = ART / RES;

  for (let x = 0; x < RES; x++) {
    for (let y = 0; y < RES; y++) {

      let c = palette[grid[x][y]];
      fill(c[0], c[1], c[2]);

      rect(x * cell, y * cell, cell, cell);
    }
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}

function keyPressed() {
  if (key === ' ') {
    for (let x = 0; x < RES; x++) {
      for (let y = 0; y < RES; y++) {

        let v =
          sin(x * random(0.2, 0.6)) +
          cos(y * random(0.2, 0.6)) +
          sin((x + y) * random(0.1, 0.4));

        let n = map(v, -3, 3, 0, 1);
        let idx = floor(n * STATES);
        idx = constrain(idx, 0, STATES - 1);

        grid[x][y] = idx;
      }
    }
    redraw();
  }
}