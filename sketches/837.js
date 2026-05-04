const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

let RES = 25;
let cells = [];
let waves = [];

let spawnInterval = 30;
let frameCounter = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
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
  cells = [];

  let step = ART / RES;

  for (let i = 0; i < RES; i++) {
    for (let j = 0; j < RES; j++) {

      let x = -HALF + i * step + step/2;
      let y = -HALF + j * step + step/2;

      cells.push({
        x, y,
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }
  }
}

function draw() {
  background(0);

  scale(s);
  translate(BASE/2, BASE/2);

  let step = ART / RES;

  strokeWeight(4);

  frameCounter++;
  if (frameCounter % spawnInterval === 0) {
    waves.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      r: 0
    });
  }

  if (waves.length > 10) {
    waves.shift();
  }

  for (let c of cells) {

    let flipped = false;

    for (let w of waves) {
      let d = dist(c.x, c.y, w.x, w.y);

      if (d < w.r) {
        flipped = !flipped;
      }
    }

    let state = flipped ? 1 : 0;

    stroke(c.r, c.g, c.b);

    if (state === 0) {
      line(c.x, c.y - step/3, c.x, c.y + step/3);
    } else {
      line(c.x - step/3, c.y, c.x + step/3, c.y);
    }
  }

  for (let w of waves) {
    w.r += 2;
  }
}