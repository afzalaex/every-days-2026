const BASE = 1000;
const ART = 500;
const HALF = ART / 2;
const CELLS = 40;

let faultCount;
let s;
let pts = [];
let faults = [];

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
  faultCount = floor(random(2, 9));

  pts = [];
  faults = [];

  for (let i = 0; i < faultCount; i++) {
    faults.push({
      x1: random(-HALF, HALF),
      y1: random(-HALF, HALF),
      x2: random(-HALF, HALF),
      y2: random(-HALF, HALF),
      angle: random(-PI / 2, PI / 2) * 0.35,
      col: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }

  const step = ART / (CELLS - 1);
  let regions = Array.from({ length: faultCount }, () => []);

  for (let y = 0; y < CELLS; y++) {
    pts[y] = [];
    for (let x = 0; x < CELLS; x++) {
      let px = -HALF + x * step;
      let py = -HALF + y * step;

      let best = Infinity;
      let region = 0;

      for (let i = 0; i < faultCount; i++) {
        let d = pointLineDistance(px, py, faults[i].x1, faults[i].y1, faults[i].x2, faults[i].y2);
        if (d < best) {
          best = d;
          region = i;
        }
      }

      let p = { ox: px, oy: py, x: px, y: py, region };
      pts[y][x] = p;
      regions[region].push(p);
    }
  }

  for (let r = 0; r < faultCount; r++) {
    let regionPts = regions[r];
    if (regionPts.length === 0) continue;

    let cx = 0;
    let cy = 0;
    for (let p of regionPts) {
      cx += p.ox;
      cy += p.oy;
    }
    cx /= regionPts.length;
    cy /= regionPts.length;

    let a = faults[r].angle;

    for (let p of regionPts) {
      let dx = p.ox - cx;
      let dy = p.oy - cy;

      let d = pointLineDistance(p.ox, p.oy, faults[r].x1, faults[r].y1, faults[r].x2, faults[r].y2);
      let influence = 1 - constrain(d / 150, 0, 1);
      let ang = a * influence;

      p.x = cx + dx * cos(ang) - dy * sin(ang);
      p.y = cy + dx * sin(ang) + dy * cos(ang);
    }
  }

  let maxExtent = 0;
  for (let row of pts) {
    for (let p of row) {
      maxExtent = max(maxExtent, abs(p.x), abs(p.y));
    }
  }

  if (maxExtent > HALF) {
    let k = HALF / maxExtent;
    for (let row of pts) {
      for (let p of row) {
        p.x *= k;
        p.y *= k;
      }
    }
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);

  strokeWeight(2);
  noFill();

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS - 1; x++) {
      let a = pts[y][x];
      let b = pts[y][x + 1];
      let f = faults[a.region];
      stroke(f.col[0], f.col[1], f.col[2]);
      line(a.x, a.y, b.x, b.y);
    }
  }

  for (let x = 0; x < CELLS; x++) {
    for (let y = 0; y < CELLS - 1; y++) {
      let a = pts[y][x];
      let b = pts[y + 1][x];
      let f = faults[a.region];
      stroke(f.col[0], f.col[1], f.col[2]);
      line(a.x, a.y, b.x, b.y);
    }
  }

  pop();
}

function pointLineDistance(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let lenSq = C * C + D * D;

  let t = lenSq > 0 ? dot / lenSq : 0;
  t = constrain(t, 0, 1);

  let ex = x1 + t * C;
  let ey = y1 + t * D;

  return dist(px, py, ex, ey);
}