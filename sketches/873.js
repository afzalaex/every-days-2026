const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let rooms = [];
let links = [];

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

function generate() {
  rooms = [];
  links = [];

  let attempts = 500;

  while (rooms.length < 45 && attempts--) {
    let w = random(20, 70);
    let h = random(20, 70);

    let x = random(-HALF + w / 2, HALF - w / 2);
    let y = random(-HALF + h / 2, HALF - h / 2);

    let valid = true;

    for (let r of rooms) {
      if (
        abs(x - r.x) < (w + r.w) / 2 + 8 &&
        abs(y - r.y) < (h + r.h) / 2 + 8
      ) {
        valid = false;
        break;
      }
    }

    if (valid) {
      rooms.push({
        x,
        y,
        w,
        h,
        col: color(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        )
      });
    }
  }

  if (rooms.length === 0) return;

  let connected = [rooms[0]];
  let remaining = rooms.slice(1);

  while (remaining.length > 0) {
    let bestD = Infinity;
    let bestA;
    let bestB;
    let bestIndex;

    for (let a of connected) {
      for (let i = 0; i < remaining.length; i++) {
        let b = remaining[i];
        let d = dist(a.x, a.y, b.x, b.y);

        if (d < bestD) {
          bestD = d;
          bestA = a;
          bestB = b;
          bestIndex = i;
        }
      }
    }

    links.push({
      a: bestA,
      b: bestB
    });

    connected.push(bestB);
    remaining.splice(bestIndex, 1);
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);

  stroke(255);
  strokeWeight(1);

  for (let l of links) {
    let ax = l.a.x;
    let ay = l.a.y;
    let bx = l.b.x;
    let by = l.b.y;

    let cx = bx;
    let cy = ay;

    line(ax, ay, cx, cy);
    line(cx, cy, bx, by);

    let d = 3;
    line(cx - d, cy - d, cx + d, cy + d);
    line(cx - d, cy + d, cx + d, cy - d);
  }

  rectMode(CENTER);
  noFill();

  for (let r of rooms) {
    stroke(r.col);
    strokeWeight(1);

    rect(r.x, r.y, r.w, r.h);

    let inset = min(r.w, r.h) * 0.35;
    rect(
      r.x,
      r.y,
      max(4, r.w - inset),
      max(4, r.h - inset)
    );
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}