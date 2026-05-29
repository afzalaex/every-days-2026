const BASE = 1000;
const ART = 500;
const HALF = ART / 2;
let s;
let seed;
const EFFECT_RADIUS = 150;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  seed = floor(random(1000000));
  noLoop();
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  const cols = 24;
  const rows = 24;
  const cell = ART / cols;
  const a = random(0.2, 0.8);
  const b = random(0.2, 0.8);
  const c = random(0.2, 0.8);
  const mx = mouseX / s - BASE / 2;
  const my = mouseY / s - BASE / 2;

  noStroke();

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = -HALF + gx * cell + cell / 2;
      const y = -HALF + gy * cell + cell / 2;
      const n = sin(gx * a) + cos(gy * b) + sin((gx + gy) * c);

      let baseRot = floor(map(n, -3, 3, 0, 4)) * HALF_PI;
      const d = dist(x, y, mx, my);
      if (d < EFFECT_RADIUS) {
        baseRot += HALF_PI;
      }

      push();
      translate(x, y);
      rotate(baseRot);
      fill(random(155, 255), random(155, 255), random(155, 255));

      const sz = cell * 0.9;
      beginShape();
      vertex(-sz * 0.5,  -sz * 0.5);
      vertex( sz * 0.5,  -sz * 0.5);
      vertex( sz * 0.5,  -sz * 0.15);
      vertex(-sz * 0.15, -sz * 0.15);
      vertex(-sz * 0.15,  sz * 0.5);
      vertex(-sz * 0.5,   sz * 0.5);
      endShape(CLOSE);
      pop();
    }
  }

  stroke(0);
  strokeWeight(0.5);
  for (let i = -HALF; i <= HALF; i += cell) {
    line(i, -HALF, i,  HALF);
    line(-HALF, i,  HALF, i);
  }

  pop();
}

function mouseMoved()  { redraw(); }
function touchMoved()  { redraw(); return false; }

function mousePressed()  { seed = floor(random(1000000)); redraw(); }
function touchStarted()  { seed = floor(random(1000000)); redraw(); return false; }

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}