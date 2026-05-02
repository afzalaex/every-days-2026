const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const STEPS = 10000;

let points = [];

let a, b, k;
let seed;

let lastUpdate = 0;
const DELAY = 80;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  seed = int(random(100000));
  randomSeed(seed);

  a = int(random(2, 9));
  b = int(random(2, 9));
  k = int(random(2, 7));

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
  points = [];

  let mx = (mouseX / s) - BASE / 2;
  let my = (mouseY / s) - BASE / 2;

  let d = dist(0, 0, mx, my);

  if (d > HALF) {
    let angle = atan2(my, mx);
    mx = cos(angle) * HALF;
    my = sin(angle) * HALF;
    d = HALF;
  }

  let nx = (mx / HALF) * 0.5 + 0.5;
  let ny = (my / HALF) * 0.5 + 0.5;

  let kControl = map(nx, 0, 1, 1, 8);
  let curveControl = map(ny, 0, 1, 0.4, 1.2);

  let x = 0;
  let y = 0;

  for (let i = 1; i < STEPS; i++) {

    let angle = (i % 360) * (a * 0.01);

    let t = (i % 400) / 400;
    let r = pow(t, curveControl) * HALF;

    x = cos(angle * (k + kControl)) * r;
    y = sin(angle * (k + kControl)) * r;

    points.push({
      x,
      y,
      col: color(
        155 + (i % 100),
        155 + ((i * 2) % 100),
        155 + ((i * 3) % 100)
      )
    });
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  scale(s);

  strokeWeight(2);

  for (let p of points) {
    stroke(p.col);
    point(p.x, p.y);
  }
}

function mouseMoved() {
  let mx = (mouseX / s) - BASE / 2;
  let my = (mouseY / s) - BASE / 2;
  
  if (dist(0, 0, mx, my) > HALF) return;

  let now = millis();
  if (now - lastUpdate > DELAY) {
    generate();
    redraw();
    lastUpdate = now;
  }
}