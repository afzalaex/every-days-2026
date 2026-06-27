const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

let cols, rows;
let cellW, cellH;
let grid = [];

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

function generate() {
  cols = floor(random(12, 120));
  rows = floor(random(24, 240));

  cellW = ART / cols;
  cellH = ART / rows;

  grid = [];

  let current = [];
  for (let i = 0; i < cols; i++) {
    current[i] = random() < 0.5;
  }

  let mutationBase = floor(random(2, 6));
  let persistence = random(0.90, 0.98);

  for (let y = 0; y < rows; y++) {
    let next = current.slice();

    let mutations = floor(random(1, mutationBase + 1));

    for (let m = 0; m < mutations; m++) {
      let op = floor(random(6));
      let i = floor(random(cols));

      if (op === 0) {
        next[i] = !next[i];
      } else if (op === 1 && i < cols - 1) {
        next[i + 1] = next[i];
      } else if (op === 2 && i > 0) {
        next[i] = !next[i - 1];
      } else if (op === 3) {
        let len = floor(random(2, 8));
        let v = random() < 0.5;
        for (let k = 0; k < len; k++) {
          if (i + k < cols) next[i + k] = v;
        }
      } else if (op === 4) {
        let shift = random() < 0.5 ? -1 : 1;
        if (i + shift >= 0 && i + shift < cols) {
          next[i + shift] = next[i];
          next[i] = false;
        }
      } else {
        let len = floor(random(2, 10));
        for (let k = 0; k < len; k++) {
          if (i + k < cols) next[i + k] = false;
        }
      }
    }

    for (let i = 0; i < cols; i++) {
      if (random() > persistence) {
        next[i] = random() < 0.5;
      }
    }

    grid.push(next);
    current = next;
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  let ox = -HALF;
  let oy = -HALF;

  strokeWeight(cellW * 0.82);

  for (let y = 0; y < rows; y++) {
    let py = oy + y * cellH;

    for (let x = 0; x < cols; x++) {
      if (!grid[y][x]) continue;

      let px = ox + x * cellW + cellW * 0.5;

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      line(px, py, px, py + cellH);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}