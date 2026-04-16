const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

let field = [];
let seed = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
  noLoop();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  field = [];

  for (let y = 0; y < ART; y++) {
    field[y] = [];
    for (let x = 0; x < ART; x++) {

      let v =
        ((x * x + y * y + seed) % 97) ^
        ((x * y + seed) % 193) ^
        ((x + y * 3 + seed) % 89);

      field[y][x] = v & 1;
    }
  }

  let next = [];

  for (let y = 0; y < ART; y++) {
    next[y] = [];
    for (let x = 0; x < ART; x++) {

      let count = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {

          let nx = x + dx;
          let ny = y + dy;

          if (nx >= 0 && nx < ART && ny >= 0 && ny < ART) {
            count += field[ny][nx];
          }
        }
      }

      next[y][x] = count >= 6 ? 1 : 0;
    }
  }

  field = next;
}

function draw() {
  background(0);
  scale(s);

  loadPixels();

  for (let y = 0; y < ART; y++) {
    for (let x = 0; x < ART; x++) {

      let px = MID - HALF + x;
      let py = MID - HALF + y;

      let v = field[y][x];

      let idx = 4 * (floor(py * s) * width + floor(px * s));

      let r = v ? 155 + (x * 3) % 100 : 0;
      let g = v ? 155 + (y * 5) % 100 : 0;
      let b = v ? 155 + ((x + y) * 7) % 100 : 0;

      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = 255;
    }
  }

  updatePixels();
}

function mousePressed() {
  seed += 137;
  generate();
  redraw();
}