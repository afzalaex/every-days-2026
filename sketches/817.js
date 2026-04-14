const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

let seed;
let phase = 0;
let velocity = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  seed = floor(random(100000));
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function draw() {
  background(0);
  stroke(0);
  randomSeed(seed);

  translate(MID * s, MID * s);
  scale(s);

  phase += velocity;
  velocity *= 0.92;

  let spacing = 8;

  for (let x = -HALF; x <= HALF; x += spacing) {
    for (let y = -HALF; y <= HALF; y += spacing) {

      let dx = sin(y * 0.05 + phase) * 25;
      let dy = cos(x * 0.05 + phase) * 25;

      let px = x + dx;
      let py = y + dy;

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      circle(px, py, 20);
    }
  }
}

function mouseWheel(event) {
  velocity += event.delta * 0.0005;
  return false;
}