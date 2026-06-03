const BASE = 1000;
const ART = 500;

let s;
let rooms = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
  noLoop();
}

function generate() {
  rooms = [];
  subdivide(-ART / 2, -ART / 2, ART, ART, 6);
}

function subdivide(x, y, w, h, depth) {
  if (depth <= 0 || w < 35 || h < 35) {
    if (random() < 0.25) return;
    rooms.push({
      x,
      y,
      w,
      h,
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });
    return;
  }

  let corridor = random(6, 16);

  if (w > h) {
    let cut = random(0.3, 0.7) * w;
    subdivide(x, y, cut - corridor / 2, h, depth - 1);
    subdivide(x + cut + corridor / 2, y, w - cut - corridor / 2, h, depth - 1);
  } else {
    let cut = random(0.3, 0.7) * h;
    subdivide(x, y, w, cut - corridor / 2, depth - 1);
    subdivide(x, y + cut + corridor / 2, w, h - cut - corridor / 2, depth - 1);
  }
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);
  noStroke();

  for (let r of rooms) {
    fill(r.c);
    rect(r.x + 2, r.y + 2, r.w - 4, r.h - 4);
  }
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}