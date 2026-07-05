const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const RAYS = 500;
const SEGMENTS = 125;

let s;
let palette = [];
let seed;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noFill();
  noLoop();

  regenerate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0);

  push();
  scale(s / BASE);

  noiseSeed(seed);
  randomSeed(seed);

  translate(BASE / 2, BASE / 2);

  noiseDetail(5, 0.55);

  for (let i = 0; i < RAYS; i++) {
    let a = random(TAU);

    stroke(random(palette));
    strokeWeight(2);

    beginShape();

    for (let j = 0; j <= SEGMENTS; j++) {
      let r = map(j, 0, SEGMENTS, 0, HALF);

      let n = noise(cos(a) * 2 + j * 0.05, sin(a) * 2 + j * 0.05);

      let aa = a + map(n, 0, 1, -0.45, 0.45);

      vertex(cos(aa) * r, sin(aa) * r);
    }

    endShape();
  }

  pop();
}

function regenerate() {
  seed = random(100000);

  palette = [];
  for (let i = 0; i < 10; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  redraw();
}

function mousePressed() {
  regenerate();
}