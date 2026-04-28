const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

let spans = [];

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
  redraw();
}

function mousePressed() {
  generate();
  redraw();
}

function generate() {
  spans = [];

  randomSeed(floor(random(100000)));

  let y = -HALF;

  while (y < HALF) {

    let h = random(10);
    if (h < 1) h = 1;

    if (y + h > HALF) h = HALF - y;

    let x = -HALF;

    while (x < HALF) {

      let w = random(20);
      if (w < 1) w = 1;

      if (x + w > HALF) w = HALF - x;

      spans.push({
        x: x,
        y: y,
        w: w,
        h: h
      });

      x += w;
    }

    y += h;
  }
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  noStroke();

  for (let s of spans) {
    fill(random(155,255), random(155,255), random(155,255));
    rect(s.x, s.y, s.w, s.h);
  }
}