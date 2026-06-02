const BASE = 1000;
const ART  = 500;
const HALF = ART / 2;

let s;
let cells = [];
let pts   = [];

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
  pts   = [];
  cells = [];

  for (let i = 0; i < 28; i++) {
    pts.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
    });
  }

  const step = 8;

  for (let x = -HALF; x < HALF; x += step) {
    for (let y = -HALF; y < HALF; y += step) {
      let nearest = 0;
      let best    = Infinity;

      for (let i = 0; i < pts.length; i++) {
        const d = dist(x, y, pts[i].x, pts[i].y);
        if (d < best) {
          best    = d;
          nearest = i;
        }
      }

      cells.push({ x, y, id: nearest });
    }
  }

  const palettes = pts.map(() => ({
    r:     random(155, 255),
    g:     random(155, 255),
    b:     random(155, 255),
    angle: random(TWO_PI),
  }));

  for (const c of cells) {
    c.data = palettes[c.id];
  }
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  scale(s);

  noStroke();
  for (const c of cells) {
    fill(c.data.r * 0.25, c.data.g * 0.25, c.data.b * 0.25);
    rect(c.x, c.y, 8, 8);
  }

  strokeWeight(2);
  for (const c of cells) {
    const { angle: a, r, g, b } = c.data;
    const len = 10;
    const cx  = c.x + 4;
    const cy  = c.y + 4;

    stroke(r, g, b, 220);
    line(cx - cos(a) * len, cy - sin(a) * len,
         cx + cos(a) * len, cy + sin(a) * len);
  }

  stroke(255, 40);
  strokeWeight(2);

  const step = 8;
  for (const c of cells) {
    const right = findCell(c.x + step, c.y);
    const down  = findCell(c.x, c.y + step);

    if (right && right.id !== c.id) {
      line(c.x + step, c.y, c.x + step, c.y + step);
    }
    if (down && down.id !== c.id) {
      line(c.x, c.y + step, c.x + step, c.y + step);
    }
  }

  pop();
}

function findCell(x, y) {
  const cols  = floor(ART / 8);
  const ix    = floor((x + HALF) / 8);
  const iy    = floor((y + HALF) / 8);
  const index = iy * cols + ix;

  if (index < 0 || index >= cells.length) return null;
  return cells[index];
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