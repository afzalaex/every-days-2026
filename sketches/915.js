const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COLS = 30;
const ROWS = 30;
const CELL = ART / COLS;

let s;
let used = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * s, SIZE * s);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  scale(s);
  background(0);

  used = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  noStroke();

  let chains = 200;

  for (let n = 0; n < chains; n++) {
    let x = floor(random(COLS));
    let y = floor(random(ROWS));

    let dir = floor(random(4));

    for (let step = 0; step < 60; step++) {
      if (x < 0 || y < 0 || x >= COLS || y >= ROWS) break;
      if (used[y][x]) break;

      used[y][x] = true;

      push();
      translate(OFFSET + x * CELL + CELL / 2, OFFSET + y * CELL + CELL / 2);

      rotate(dir * HALF_PI);

      fill(random(155, 255), random(155, 255), random(155, 255));

      rect(0, 0, CELL * 0.85, CELL * 0.28, CELL * 0.08);

      pop();

      if (random() < 0.35) {
        dir += random() < 0.5 ? -1 : 1;
        dir = (dir + 4) % 4;
      }

      if (dir === 0) x++;
      else if (dir === 1) y++;
      else if (dir === 2) x--;
      else y--;
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (used[y][x]) continue;

      push();
      translate(OFFSET + x * CELL + CELL / 2, OFFSET + y * CELL + CELL / 2);

      rotate(floor(random(4)) * HALF_PI);

      fill(random(155, 255), random(155, 255), random(155, 255), 80);

      rect(0, 0, CELL * 0.85, CELL * 0.28, CELL * 0.08);

      pop();
    }
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * s, SIZE * s);
  redraw();
}