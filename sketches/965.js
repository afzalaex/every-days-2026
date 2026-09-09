const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const CELLS = 80;
const CELL = ART / CELLS;

const FIELDS = 8;

let viewScale;
let fields = [];
let colors = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function generate() {
  fields = [];
  colors = new Array(CELLS * CELLS);

  for (let i = 0; i < FIELDS; i++) {
    fields.push({
      x: random(-0.2, 1.2),
      y: random(-0.2, 1.2),
      strength: random(0.8, 2.2),
      radius: random(0.12, 0.38),
      phase: random(TWO_PI),
      type: floor(random(3)),
    });
  }

  for (let gy = 0; gy < CELLS; gy++) {
    for (let gx = 0; gx < CELLS; gx++) {
      let x = gx / (CELLS - 1);
      let y = gy / (CELLS - 1);

      for (let fi = 0; fi < FIELDS; fi++) {
        let f = fields[fi];

        let dx = x - f.x;
        let dy = y - f.y;

        let dSquared = dx * dx + dy * dy;
        let dLength = sqrt(dSquared) + 0.0001;

        let influence = exp(-dSquared / (f.radius * f.radius));

        if (f.type === 0) {
          x += (dx / dLength) * influence * 0.075 * f.strength;

          y += (dy / dLength) * influence * 0.075 * f.strength;
        } else if (f.type === 1) {
          x += (-dy / dLength) * influence * 0.07 * f.strength;

          y += (dx / dLength) * influence * 0.07 * f.strength;
        } else {
          let angle = atan2(dy, dx) + f.phase;

          x += cos(angle) * influence * 0.06 * f.strength;

          y += sin(angle) * influence * 0.06 * f.strength;
        }
      }

      x = constrain(x, -2, 3);
      y = constrain(y, -2, 3);

      let bands =
        abs(sin(x * 17 + sin(y * 8))) +
        abs(sin(y * 19 - cos(x * 7))) +
        abs(sin((x - y) * 13));

      let r = 155 + 100 * abs(sin(bands * 1.7 + x * 4));

      let g = 155 + 100 * abs(sin(bands * 1.3 + y * 5 + 2));

      let b = 155 + 100 * abs(sin(bands * 1.9 + x * 3 - y * 4));

      let index = gy * CELLS + gx;

      colors[index] = [r, g, b];
    }
  }
}

function draw() {
  background(0);
  noStroke();

  for (let gy = 0; gy < CELLS; gy++) {
    for (let gx = 0; gx < CELLS; gx++) {
      let index = gy * CELLS + gx;
      let c = colors[index];

      if (!c) continue;

      fill(c[0], c[1], c[2]);

      rect(
        (OFFSET + gx * CELL) * viewScale,
        (OFFSET + gy * CELL) * viewScale,
        CELL * viewScale + 1,
        CELL * viewScale + 1
      );
    }
  }
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
