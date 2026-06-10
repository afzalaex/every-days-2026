const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let pts = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
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
  pts = [];

  for (let i = 0; i < 28; i++) {
    pts.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      col: color(random(155, 255), random(155, 255), random(155, 255))
    });
  }

  // point relaxation
  for (let k = 0; k < 80; k++) {
    for (let i = 0; i < pts.length; i++) {
      let fx = 0;
      let fy = 0;

      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;

        let dx = pts[i].x - pts[j].x;
        let dy = pts[i].y - pts[j].y;
        let d = sqrt(dx * dx + dy * dy);

        if (d < 80 && d > 0.01) {
          let f = (80 - d) * 0.04;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        }
      }

      pts[i].x += fx;
      pts[i].y += fy;

      pts[i].x = constrain(pts[i].x, -HALF, HALF);
      pts[i].y = constrain(pts[i].y, -HALF, HALF);
    }
  }
}

function clipPolygon(poly, mx, my, nx, ny) {
  let out = [];

  for (let i = 0; i < poly.length; i++) {
    let a = poly[i];
    let b = poly[(i + 1) % poly.length];

    let da = (a.x - mx) * nx + (a.y - my) * ny;
    let db = (b.x - mx) * nx + (b.y - my) * ny;

    if (da <= 0) {
      out.push(a);
    }

    if (da * db < 0) {
      let t = da / (da - db);
      out.push({
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t)
      });
    }
  }
  return out;
}

function buildCell(i) {
  let poly = [
    { x: -HALF, y: -HALF },
    { x:  HALF, y: -HALF },
    { x:  HALF, y:  HALF },
    { x: -HALF, y:  HALF }
  ];

  let p = pts[i];

  for (let j = 0; j < pts.length; j++) {
    if (i === j) continue;

    let q = pts[j];
    let mx = (p.x + q.x) * 0.5;
    let my = (p.y + q.y) * 0.5;
    let nx = q.x - p.x;
    let ny = q.y - p.y;

    poly = clipPolygon(poly, mx, my, nx, ny);

    if (poly.length === 0) break;
  }

  return poly;
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);

  noStroke();
  for (let i = 0; i < pts.length; i++) {
    let poly = buildCell(i);
    fill(pts[i].col);
    beginShape();
    for (let v of poly) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(18);
  strokeJoin(BEVEL);
  noFill();
  for (let i = 0; i < pts.length; i++) {
    let poly = buildCell(i);
    beginShape();
    for (let v of poly) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}