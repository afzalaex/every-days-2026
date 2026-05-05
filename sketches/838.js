const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const RES = 12;
const CELL = ART / RES;

let phase = 0;

let cells = [];

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

  for (let i = 0; i < RES; i++) {
    for (let j = 0; j < RES; j++) {

      cells.push({
        i,
        j,
        r: random(155,255),
        g: random(155,255),
        b: random(155,255)
      });
    }
  }
}

function draw() {
  background(0);

  scale(s);
  translate(BASE/2, BASE/2);

  strokeWeight(2);
  strokeCap(SQUARE);

  phase += 0.05;

  for (let c of cells) {

    let i = c.i;
    let j = c.j;

    let x = -HALF + i * CELL + CELL/2;
    let y = -HALF + j * CELL + CELL/2;

    let v =
      sin(i * 0.35 + phase) +
      cos(j * 0.35 - phase) +
      sin((i + j) * 0.15);

    let t = (v + 3) / 6;

    let len = CELL * (0.15 + 0.7 * t);
    let offset = (t - 0.5) * CELL * 0.6;

    stroke(c.r, c.g, c.b);

    line(
      x + offset,
      y - len/2,
      x + offset,
      y + len/2
    );

    line(
      x - len/2,
      y - offset,
      x + len/2,
      y - offset
    );

    line(
      x - len/2 + offset,
      y - len/2 + offset,
      x + len/2 + offset,
      y + len/2 + offset
    );

    line(
      x - len/2 - offset,
      y + len/2 - offset,
      x + len/2 - offset,
      y - len/2 - offset
    );
  }
}