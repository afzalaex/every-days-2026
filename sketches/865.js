const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let pts = [];
let links = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  for (let i = 0; i < 650; i++) {
    pts.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
    });
  }

  buildNetwork();
}

function buildNetwork() {
  for (let i = 0; i < pts.length; i++) {
    let neighbors = [];

    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue;
      let d = dist(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
      neighbors.push({ id: j, d });
    }

    neighbors.sort((a, b) => a.d - b.d);

    let count = floor(random(2, 6));
    for (let k = 0; k < count; k++) {
      let n = neighbors[k];
      if (i < n.id) links.push([i, n.id]);
    }
  }
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  scale(s);

  let mx = (mouseX - width / 2) / s;
  let my = (mouseY - width / 2) / s;

  // Draw links
  noFill();
  for (let link of links) {
    let a = pts[link[0]];
    let b = pts[link[1]];
    let cx = (a.x + b.x) * 0.5;
    let cy = (a.y + b.y) * 0.5;

    let dMouse = dist(mx, my, cx, cy);
    let influence = max(0, 1 - dMouse / 150);

    let nx = -(b.y - a.y) * (0.15 + influence * 0.45);
    let ny =  (b.x - a.x) * (0.15 + influence * 0.45);

    stroke(a.r, a.g, a.b, 50 + influence * 205);
    strokeWeight(0.4 + influence * 1.8);

    beginShape();
    vertex(a.x, a.y);
    quadraticVertex(cx + nx, cy + ny, b.x, b.y);
    endShape();
  }

  // Draw points
  noStroke();
  for (let p of pts) {
    let dMouse = dist(mx, my, p.x, p.y);
    let influence = max(0, 1 - dMouse / 120);

    let px = p.x;
    let py = p.y;

    if (influence > 0) {
      let ang = atan2(py - my, px - mx);
      px += cos(ang) * influence * 18;
      py += sin(ang) * influence * 18;
    }

    let sz = 2 + influence * 5;
    fill(p.r, p.g, p.b);

    push();
    translate(px, py);
    rotate(frameCount * 0.01 + influence);
    beginShape();
    vertex(-sz,   0);
    vertex(  0, -sz);
    vertex( sz,   0);
    vertex(  0,  sz);
    endShape(CLOSE);
    pop();
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}