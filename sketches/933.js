const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const NUM_LINES = 80;
const STEP = 2;
const CLEARANCE = 2;

let viewScale;
let segments = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  strokeCap(SQUARE);
  noLoop();
  generate();
}

function generate() {
  segments = [];

  for (let i = 0; i < NUM_LINES; i++) {
    growLine();
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  strokeWeight(2);
  noFill();

  for (let s of segments) {
    stroke(random(155, 255), random(155, 255), random(155, 255));

    line(s.x1, s.y1, s.x2, s.y2);
  }

  pop();
}

function growLine() {
  let cx = random(ART);
  let cy = random(ART);

  if (tooClose(cx, cy)) return;

  let angle = random([
    0,
    HALF_PI,
    PI,
    PI + HALF_PI,
    QUARTER_PI,
    3 * QUARTER_PI,
    5 * QUARTER_PI,
    7 * QUARTER_PI,
  ]);

  let ax = cx;
  let ay = cy;
  let bx = cx;
  let by = cy;

  let growA = true;
  let growB = true;

  while (growA || growB) {
    if (growA) {
      let nx = ax + cos(angle) * STEP;
      let ny = ay + sin(angle) * STEP;

      if (blocked(nx, ny)) {
        growA = false;
      } else {
        ax = nx;
        ay = ny;
      }
    }

    if (growB) {
      let nx = bx - cos(angle) * STEP;
      let ny = by - sin(angle) * STEP;

      if (blocked(nx, ny)) {
        growB = false;
      } else {
        bx = nx;
        by = ny;
      }
    }
  }

  if (dist(ax, ay, bx, by) > 12) {
    segments.push({
      x1: ax,
      y1: ay,
      x2: bx,
      y2: by,
    });
  }
}

function blocked(x, y) {
  if (x < 0 || x > ART || y < 0 || y > ART) return true;

  for (let s of segments) {
    if (distToSegment(x, y, s.x1, s.y1, s.x2, s.y2) < CLEARANCE) {
      return true;
    }
  }

  return false;
}

function tooClose(x, y) {
  for (let s of segments) {
    if (distToSegment(x, y, s.x1, s.y1, s.x2, s.y2) < 10) {
      return true;
    }
  }

  return false;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;

  let l2 = dx * dx + dy * dy;
  if (l2 === 0) return dist(px, py, x1, y1);

  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = constrain(t, 0, 1);

  let xx = x1 + t * dx;
  let yy = y1 + t * dy;

  return dist(px, py, xx, yy);
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
