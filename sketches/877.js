const BASE = 1000;
const MID = BASE / 2;
const ART = 500;

const N = 15;
const CELL = ART / N;

let s;
let grid = [];
let rects = [];

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

function touchStarted() {
  generate();
  redraw();
  return false;
}

function generate() {
  grid = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => random() > 0.4)
  );

  rects = [];

  let used = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!grid[y][x] || used[y][x]) continue;

      let w = 1;
      while (x + w < N && grid[y][x + w] && !used[y][x + w]) {
        w++;
      }

      let h = 1;
      let growing = true;
      while (growing && y + h < N) {
        for (let xx = x; xx < x + w; xx++) {
          if (!grid[y + h][xx] || used[y + h][xx]) {
            growing = false;
            break;
          }
        }
        if (growing) h++;
      }

      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          used[yy][xx] = true;
        }
      }

      rects.push({
        x,
        y,
        w,
        h,
        col: color(random(155, 255), random(155, 255), random(155, 255))
      });
    }
  }
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(MID - ART / 2, MID - ART / 2);

  noFill();
  strokeWeight(5);

  for (let r of rects) {
    stroke(r.col);
    rect(
      r.x * CELL,
      r.y * CELL,
      r.w * CELL,
      r.h * CELL
    );
  }

  pop();
}