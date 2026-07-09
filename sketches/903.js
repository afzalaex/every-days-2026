const BASE = 1000;
const ART = 500;

const CELL = 5;
const COLS = ART / CELL;
const ROWS = ART / CELL;

let RIBBONS;
let MAX_STEPS;

let s;
let grid;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function generate() {
  RIBBONS = floor(random(125, 501));
  MAX_STEPS = floor(random(60, 201));
}

function draw() {
  background(0);

  push();

  scale(s / BASE);
  translate((BASE - ART) / 2, (BASE - ART) / 2);

  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  for (let i = 0; i < RIBBONS * 0.35; i++) {
    let st = borderStart();
    grow(st.x, st.y, st.dir);
  }

  for (let i = 0; i < RIBBONS * 0.65; i++) {
    let st = randomEmpty();
    if (st) {
      grow(st.x, st.y, floor(random(4)));
    }
  }

  pop();
}

function grow(x, y, dir) {
  strokeWeight(4);

  stroke(random(155, 255), random(155, 255), random(155, 255));

  for (let i = 0; i < MAX_STEPS; i++) {
    if (outside(x, y)) break;
    if (grid[y][x]) break;

    grid[y][x] = true;

    let nx = x;
    let ny = y;

    if (random() < 0.18) {
      dir = (dir + random([-1, 1]) + 4) % 4;
    }

    let mx = mouseX / (s / BASE) - (BASE - ART) / 2;
    let my = mouseY / (s / BASE) - (BASE - ART) / 2;

    let cx = x * CELL + CELL * 0.5;
    let cy = y * CELL + CELL * 0.5;

    if (dist(cx, cy, mx, my) < 80 && random() < 0.5) {
      if (abs(mx - cx) > abs(my - cy)) {
        dir = mx > cx ? 1 : 3;
      } else {
        dir = my > cy ? 2 : 0;
      }
    }

    if (dir == 0) ny--;
    if (dir == 1) nx++;
    if (dir == 2) ny++;
    if (dir == 3) nx--;

    if (outside(nx, ny) || grid[ny][nx]) {
      let options = [];

      for (let d = 0; d < 4; d++) {
        let tx = x;
        let ty = y;

        if (d == 0) ty--;
        if (d == 1) tx++;
        if (d == 2) ty++;
        if (d == 3) tx--;

        if (!outside(tx, ty) && !grid[ty][tx]) {
          options.push({
            x: tx,
            y: ty,
            dir: d,
          });
        }
      }

      if (options.length == 0) break;

      let pick = random(options);

      nx = pick.x;
      ny = pick.y;
      dir = pick.dir;
    }

    line(cx, cy, nx * CELL + CELL * 0.5, ny * CELL + CELL * 0.5);

    x = nx;
    y = ny;
  }
}

function borderStart() {
  let side = floor(random(4));

  if (side == 0) return { x: floor(random(COLS)), y: 0, dir: 2 };

  if (side == 1) return { x: COLS - 1, y: floor(random(ROWS)), dir: 3 };

  if (side == 2) return { x: floor(random(COLS)), y: ROWS - 1, dir: 0 };

  return { x: 0, y: floor(random(ROWS)), dir: 1 };
}

function randomEmpty() {
  for (let i = 0; i < 50; i++) {
    let x = floor(random(COLS));
    let y = floor(random(ROWS));

    if (!grid[y][x]) {
      return {
        x,
        y,
      };
    }
  }

  return null;
}

function outside(x, y) {
  return x < 0 || x >= COLS || y < 0 || y >= ROWS;
}

function mousePressed() {
  generate();
  redraw();
}

function keyPressed() {
  if (key === " ") {
    generate();
    redraw();
  }
}