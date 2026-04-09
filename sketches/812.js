const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

const DIVS = 100;
let offset = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function draw() {
  background(0);

  scale(s);
  translate(MID - HALF, MID - HALF);

  let cellSize = ART / DIVS;

  noStroke();

  let index = offset;

  for (let y = 0; y < DIVS; y++) {
    for (let x = 0; x < DIVS; x++) {

      if (isPrime(index)) {
        fill(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        );
      } else {
        fill(0);
      }

      rect(x * cellSize, y * cellSize, cellSize, cellSize);

      index++;
    }
  }
}

function mousePressed() {
  offset += DIVS * DIVS;
  redraw();
}