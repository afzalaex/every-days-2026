const BASE = 1000;
const ART = 500;

let s;

const CELLS = 28;
const LINES_PER_CELL = 6;

let seed;
let mode = 1;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  seed = floor(random(100000));
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);

  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(1.5);
  noFill();

  const cellSize = ART / CELLS;

  let t = frameCount * 0.05;

  for (let gx = -CELLS / 2; gx < CELLS / 2; gx++) {
    for (let gy = -CELLS / 2; gy < CELLS / 2; gy++) {

      let cx = gx * cellSize + cellSize / 2;
      let cy = gy * cellSize + cellSize / 2;

      let baseAngle;

      if (mode === 1) {
        baseAngle = atan2(cy, cx);
      } else if (mode === 2) {
        baseAngle = t * 0.5;
      } else if (mode === 3) {
        baseAngle = atan2(cy, 0) - atan2(0, cx);
      } else if (mode === 4) {
        let a = atan2(cy, cx);
        baseAngle = floor(a * 4) / 4;
      }

      let offset = noise(gx * 0.1, gy * 0.1) * PI;
      let angle = baseAngle + offset * 0.6;

      let d = dist(cx, cy, 0, 0);
      let pulse = mouseIsPressed
        ? sin(d * 0.05 - t * 3)
        : 0;

      let influence = map(pulse, -1, 1, 0.5, 1.5);

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      for (let i = 0; i < LINES_PER_CELL; i++) {

        let spread = map(i, 0, LINES_PER_CELL, -0.4, 0.4);

        let a = angle + spread * influence;

        let len = map(
          noise(gx * 0.2, gy * 0.2, i),
          0,
          1,
          4,
          cellSize * influence
        );

        let x2 = cx + cos(a) * len;
        let y2 = cy + sin(a) * len;

        line(cx, cy, x2, y2);
      }
    }
  }

  pop();
}