const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const LAYOUT = 100;
const CELL = ART / LAYOUT;

let s;

let owner = [];
let cols = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * s, SIZE * s);
  noLoop();
  generate();
}

function generate() {
  push();
  scale(s);

  background(0);

  owner = [];
  cols = [];

  for (let x = 0; x < LAYOUT; x++) {
    owner[x] = [];
    cols[x] = [];
    for (let y = 0; y < LAYOUT; y++) {
      owner[x][y] = -1;
    }
  }

  let patches = [];
  let id = 0;

  while (true) {
    let found = false;

    for (let y = 0; y < LAYOUT && !found; y++) {
      for (let x = 0; x < LAYOUT && !found; x++) {
        if (owner[x][y] == -1) {
          let w = floor(random(4, 16));
          let h = floor(random(4, 16));

          while (w > 1 || h > 1) {
            let ok = true;

            if (x + w > LAYOUT || y + h > LAYOUT) {
              ok = false;
            } else {
              for (let xx = x; xx < x + w && ok; xx++) {
                for (let yy = y; yy < y + h; yy++) {
                  if (owner[xx][yy] != -1) {
                    ok = false;
                    break;
                  }
                }
              }
            }

            if (ok) break;

            if (w >= h && w > 1) w--;
            else if (h > 1) h--;
            else break;
          }

          let c = color(random(155, 255), random(155, 255), random(155, 255));

          let type = floor(random(6));

          patches.push({
            x,
            y,
            w,
            h,
            c,
            type,
          });

          for (let xx = x; xx < x + w; xx++) {
            for (let yy = y; yy < y + h; yy++) {
              owner[xx][yy] = id;
              cols[xx][yy] = c;
            }
          }

          id++;
          found = true;
        }
      }
    }

    if (!found) break;
  }

  noStroke();

  for (let p of patches) {
    fill(p.c);

    for (let x = p.x; x < p.x + p.w; x++) {
      for (let y = p.y; y < p.y + p.h; y++) {
        let px = OFFSET + x * CELL;
        let py = OFFSET + y * CELL;

        switch (p.type) {
          case 0:
            rect(px, py, CELL, CELL);
            break;

          case 1:
            if ((y - p.y) % 2 == 0) rect(px, py, CELL, CELL);
            break;

          case 2:
            if ((x - p.x) % 2 == 0) rect(px, py, CELL, CELL);
            break;

          case 3:
            if ((x + y) % 2 == 0) rect(px, py, CELL, CELL);
            break;

          case 4:
            if ((x - p.x + y - p.y) % 2 == 0) rect(px, py, CELL, CELL);
            break;

          case 5:
            if ((x - p.x - (y - p.y) + 1000) % 2 == 0) rect(px, py, CELL, CELL);
            break;
        }
      }
    }
  }

  stroke(255);
  strokeWeight(2);
  noFill();

  for (let x = 0; x < LAYOUT; x++) {
    for (let y = 0; y < LAYOUT; y++) {
      let px = OFFSET + x * CELL;
      let py = OFFSET + y * CELL;

      if (x == LAYOUT - 1 || owner[x][y] != owner[x + 1][y]) {
        line(px + CELL, py, px + CELL, py + CELL);
      }

      if (y == LAYOUT - 1 || owner[x][y] != owner[x][y + 1]) {
        line(px, py + CELL, px + CELL, py + CELL);
      }
    }
  }

  rect(OFFSET, OFFSET, ART, ART);

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * s, SIZE * s);
  generate();
}
