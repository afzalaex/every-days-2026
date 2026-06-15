const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let segs = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
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
  randomSeed(floor(random(1e9)));
  segs = [];

  let walkers = [];
  for (let i = 0; i < 8; i++) {
    walkers.push({
      x: 0,
      y: 0,
      dir: floor(random(4))
    });
  }

  for (let step = 0; step < 3000; step++) {
    let w = random(walkers);
    let len = random(6, 20);

    let dx = [1, 0, -1, 0][w.dir];
    let dy = [0, 1, 0, -1][w.dir];

    let nx = w.x + dx * len;
    let ny = w.y + dy * len;

    if (nx < -HALF || nx > HALF || ny < -HALF || ny > HALF) {
      w.dir = floor(random(4));
      continue;
    }

    segs.push({
      x1: w.x,
      y1: w.y,
      x2: nx,
      y2: ny,
      width: random(2, 8),
      col: color(random(155, 255), random(155, 255), random(155, 255))
    });

    w.x = nx;
    w.y = ny;

    if (random() < 0.35) {
      w.dir = (w.dir + (random() < 0.5 ? 1 : 3)) % 4;
    }

    if (random() < 0.03 && walkers.length < 40) {
      walkers.push({
        x: w.x,
        y: w.y,
        dir: floor(random(4))
      });
    }
  }
}

function drawBar(x1, y1, x2, y2, w) {
  let a = atan2(y2 - y1, x2 - x1);
  push();
  translate((x1 + x2) / 2, (y1 + y2) / 2);
  rotate(a);
  rectMode(CENTER);
  rect(0, 0, dist(x1, y1, x2, y2), w);
  pop();
}

function draw() {
  background(0);
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);
  noStroke();

  for (let seg of segs) {
    fill(seg.col);
    drawBar(seg.x1, seg.y1, seg.x2, seg.y2, seg.width);
  }
  pop();
}