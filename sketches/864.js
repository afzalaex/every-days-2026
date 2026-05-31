const BASE = 1000;
const ART  = 500;

let s;
let parcels = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  splitParcel(-220, -220, 440, 440, 5);

  parcels.sort((a, b) => (a.x + a.y) - (b.x + b.y));
}

function splitParcel(x, y, w, h, depth) {
  if (depth <= 0 || w < 35 || h < 35) {
    parcels.push({
      x, y, w, h,
      baseZ: random(15, 80),
      col: color(random(155, 255), random(155, 255), random(155, 255)),
    });
    return;
  }

  const cut = random(0.35, 0.65);

  if (w > h) {
    splitParcel(x,         y, w * cut,       h, depth - 1);
    splitParcel(x + w*cut, y, w * (1 - cut), h, depth - 1);
  } else {
    splitParcel(x, y,         w, h * cut,       depth - 1);
    splitParcel(x, y + h*cut, w, h * (1 - cut), depth - 1);
  }
}

function iso(x, y, z) {
  return {
    x: (x - y) * 0.9,
    y: (x + y) * 0.45 - z,
  };
}

function drawBlock(b, z) {
  const p1 = iso(b.x,       b.y,       z);
  const p2 = iso(b.x + b.w, b.y,       z);
  const p3 = iso(b.x + b.w, b.y + b.h, z);
  const p4 = iso(b.x,       b.y + b.h, z);
  const p5 = iso(b.x,       b.y,       0);
  const p6 = iso(b.x + b.w, b.y,       0);
  const p7 = iso(b.x + b.w, b.y + b.h, 0);
  const p8 = iso(b.x,       b.y + b.h, 0);

  stroke(0);
  strokeWeight(3);
  strokeJoin(ROUND);

  fill(b.col);
  beginShape();
    vertex(p1.x, p1.y);
    vertex(p2.x, p2.y);
    vertex(p3.x, p3.y);
    vertex(p4.x, p4.y);
  endShape(CLOSE);

  fill(red(b.col) * 0.8, green(b.col) * 0.8, blue(b.col) * 0.8);
  beginShape();
    vertex(p2.x, p2.y);
    vertex(p3.x, p3.y);
    vertex(p7.x, p7.y);
    vertex(p6.x, p6.y);
  endShape(CLOSE);

  fill(red(b.col) * 0.6, green(b.col) * 0.6, blue(b.col) * 0.6);
  beginShape();
    vertex(p3.x, p3.y);
    vertex(p4.x, p4.y);
    vertex(p8.x, p8.y);
    vertex(p7.x, p7.y);
  endShape(CLOSE);
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2 + 100);

  const mx = mouseX / s - BASE / 2;
  const my = mouseY / s - (BASE / 2 + 100);

  for (const b of parcels) {
    const cx = b.x + b.w * 0.5;
    const cy = b.y + b.h * 0.5;
    const sx = (cx - cy) * 0.9;
    const sy = (cx + cy) * 0.45;
    const d  = dist(mx, my, sx, sy);

    let rise    = 0;
    let stretch = 1;

    if (d < 120) {
      const t = 1 - d / 120;
      rise    = pow(t, 2) * 120;
      stretch = 1 + t * 0.8;
    }

    const z = b.baseZ * stretch + rise;
    drawBlock(b, z);
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}