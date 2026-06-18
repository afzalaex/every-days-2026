const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let segs = [];
let ruptures = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  strokeCap(SQUARE);
  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  segs = [];
  ruptures = [];

  let step = random([10, 12, 14, 16]);

  for (let y = -HALF; y <= HALF; y += step) {
    for (let x = -HALF; x < HALF; x += step * 2) {
      if (random() < 0.15) continue;

      segs.push({
        x1: x,
        y1: y,
        x2: x + step * random(1.5, 4),
        y2: y,
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }
  }

  for (let x = -HALF; x <= HALF; x += step) {
    for (let y = -HALF; y < HALF; y += step * 2) {
      if (random() < 0.15) continue;

      segs.push({
        x1: x,
        y1: y,
        x2: x,
        y2: y + step * random(1.5, 4),
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }
  }

  let ruptureCount = floor(random(6, 15));

  for (let i = 0; i < ruptureCount; i++) {
    ruptures.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      radius: random(60, 140),
      strength: random(-PI / 2, PI / 2)
    });
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2);

  for (let seg of segs) {
    let mx = (seg.x1 + seg.x2) * 0.5;
    let my = (seg.y1 + seg.y2) * 0.5;

    let x1 = seg.x1;
    let y1 = seg.y1;
    let x2 = seg.x2;
    let y2 = seg.y2;

    for (let r of ruptures) {
      let d = dist(mx, my, r.x, r.y);

      if (d < r.radius) {
        let t = 1 - d / r.radius;

        let dx = mx - r.x;
        let dy = my - r.y;

        let a = atan2(dy, dx);
        let rot = r.strength * t;

        let tx = cos(a) * t * 50;
        let ty = sin(a) * t * 50;

        let lx1 = x1 - mx;
        let ly1 = y1 - my;
        let lx2 = x2 - mx;
        let ly2 = y2 - my;

        let rx1 = lx1 * cos(rot) - ly1 * sin(rot);
        let ry1 = lx1 * sin(rot) + ly1 * cos(rot);

        let rx2 = lx2 * cos(rot) - ly2 * sin(rot);
        let ry2 = lx2 * sin(rot) + ly2 * cos(rot);

        x1 = rx1 + mx + tx;
        y1 = ry1 + my + ty;

        x2 = rx2 + mx + tx;
        y2 = ry2 + my + ty;
      }
    }

    stroke(seg.r, seg.g, seg.b);
    line(x1, y1, x2, y2);
  }

  pop();
}

function mousePressed() {
  generate();
}