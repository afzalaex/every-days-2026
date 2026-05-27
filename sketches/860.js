const BASE = 1000;
const ART  = 400;
const HALF = ART / 2;

let s;
let blocks = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  generate();
}

function generate() {
  blocks = [];

  const clusters = 40;
  for (let i = 0; i < clusters; i++) {
    const cx     = random(-HALF, HALF);
    const cy     = random(-HALF, HALF);
    const pieces = random(20, 200);

    for (let j = 0; j < pieces; j++) {
      const a = random(TWO_PI);
      const r = pow(random(), 0.6) * 80;

      let x = cx + cos(a) * r;
      let y = cy + sin(a) * r;
      x = round(x / 6) * 6;
      y = round(y / 6) * 6;

      blocks.push({ x, y, s: random([1, 2, 3]) });
    }
  }
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);
  noStroke();

  for (const b of blocks) {
    fill(random(155, 255), random(155, 255), random(155, 255));
    rect(b.x, b.y, b.s, b.s);
  }
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}