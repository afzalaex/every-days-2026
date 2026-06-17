const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const PARTICLES = 3500;
const MAGNETS = 8;

let s;
let segs = [];
let magnets = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  strokeCap(SQUARE);
  generate();
  noLoop();
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
  segs = [];
  magnets = [];

  for (let i = 0; i < MAGNETS; i++) {
    magnets.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      c: color(random(155, 255), random(155, 255), random(155, 255))
    });
  }

  for (let i = 0; i < PARTICLES; i++) {
    let x = random(-HALF, HALF);
    let y = random(-HALF, HALF);

    let bestMagnet = null;
    let bestForce = -1;

    for (let m of magnets) {
      let d = dist(x, y, m.x, m.y);
      let force = 1 / (d + 1);

      if (force > bestForce) {
        bestForce = force;
        bestMagnet = m;
      }
    }

    let dx = bestMagnet.x - x;
    let dy = bestMagnet.y - y;
    let d = sqrt(dx * dx + dy * dy);

    let move = min(random(4, 16), d * random(0.2, 0.7));

    let nx = x + (dx / d) * move;
    let ny = y + (dy / d) * move;

    segs.push({
      x1: x,
      y1: y,
      x2: nx,
      y2: ny,
      c: bestMagnet.c,
      w: random(0.5, 2)
    });
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(s);

  for (let seg of segs) {
    stroke(seg.c);
    strokeWeight(seg.w);
    line(seg.x1, seg.y1, seg.x2, seg.y2);
  }
}