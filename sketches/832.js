const BASE = 1000;
const ART = 500;
const HALF = ART / 2;
const N = 60;

let viewScale = 1;
let seeds = [];
let dragging = null;

function setup() {
  computeCanvas();
  initSeeds();
}

function windowResized() {
  computeCanvas();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
  cursor(ARROW);
}

function initSeeds() {
  seeds = [];
  for (let i = 0; i < N; i++) {
    let ox = random(-HALF, HALF);
    let oy = random(-HALF, HALF);
    seeds.push({
      ox, oy, x: ox, y: oy,
      col: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }
}

function cellPolygon(idx, all, res = 26) {
  let pts = [];
  let sx = all[idx].x, sy = all[idx].y;
  for (let a = 0; a < TWO_PI; a += TWO_PI / res) {
    let cx = cos(a), cy = sin(a);
    let lo = 0, hi = HALF * 1.5;
    for (let iter = 0; iter < 16; iter++) {
      let mid = (lo + hi) / 2;
      let px = sx + cx * mid, py = sy + cy * mid;
      let myD = (px - sx) ** 2 + (py - sy) ** 2;
      let closer = false;
      for (let k = 0; k < all.length; k++) {
        if (k === idx) continue;
        let od = (px - all[k].x) ** 2 + (py - all[k].y) ** 2;
        if (od < myD) { closer = true; break; }
      }
      if (closer) hi = mid; else lo = mid;
    }
    let px = constrain(sx + cos(a) * lo, -HALF, HALF);
    let py = constrain(sy + sin(a) * lo, -HALF, HALF);
    pts.push([px, py]);
  }
  return pts;
}

function nearestSeed(mx, my) {
  let best = -1, bestD = Infinity;
  for (let i = 0; i < seeds.length; i++) {
    let dx = seeds[i].x - mx, dy = seeds[i].y - my;
    let d = dx * dx + dy * dy;
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

function mousePressed() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;
  if (mx < -HALF || mx > HALF || my < -HALF || my > HALF) return;
  let idx = nearestSeed(mx, my);
  if (idx === -1) return;
  dragging = idx;
  cursor('grabbing');
}

function mouseReleased() {
  if (dragging !== null) {
    seeds[dragging].ox = seeds[dragging].x;
    seeds[dragging].oy = seeds[dragging].y;
  }
  dragging = null;
  cursor(ARROW);
}

function draw() {
  background(0);
  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  if (dragging !== null) {
    seeds[dragging].x = mx;
    seeds[dragging].y = my;
  }

  for (let i = 0; i < seeds.length; i++) {
    let s = seeds[i];
    let poly = cellPolygon(i, seeds);
    fill(s.col[0], s.col[1], s.col[2]);
    stroke(0);
    strokeWeight(i === dragging ? 3 : 1.5);
    beginShape();
    for (let [px, py] of poly) vertex(px, py);
    endShape(CLOSE);
  }

  pop();
}