const BASE = 1000;
const ART = 500;

const COLS = 30;
const ROWS = 30;

let s;
let palette = [];
let field = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function generate() {
  palette = [];
  for (let i = 0; i < 12; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  field = [];

  for (let y = 0; y <= ROWS; y++) {
    field[y] = [];

    for (let x = 0; x <= COLS; x++) {
      field[y][x] = random(TWO_PI);
    }
  }

  for (let k = 0; k < 10; k++) {
    let next = [];

    for (let y = 0; y <= ROWS; y++) {
      next[y] = [];

      for (let x = 0; x <= COLS; x++) {
        let sx = 0;
        let sy = 0;
        let n = 0;

        for (let yy = -1; yy <= 1; yy++) {
          for (let xx = -1; xx <= 1; xx++) {
            let nx = x + xx;
            let ny = y + yy;

            if (nx >= 0 && nx <= COLS && ny >= 0 && ny <= ROWS) {
              sx += cos(field[ny][nx]);
              sy += sin(field[ny][nx]);
              n++;
            }
          }
        }

        next[y][x] = atan2(sy / n, sx / n);
      }
    }

    field = next;
  }

  redraw();
}

function draw() {
  background(0);

  scale(s / BASE);

  const ox = (BASE - ART) / 2;
  const oy = (BASE - ART) / 2;
  const cell = ART / COLS;

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(ox, oy, ART, ART);
  drawingContext.clip();

  noStroke();

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let a =
        (field[y][x] +
          field[y][x + 1] +
          field[y + 1][x] +
          field[y + 1][x + 1]) *
        0.25;

      push();

      translate(ox + x * cell + cell / 2, oy + y * cell + cell / 2);

      rotate(a);

      let c = random(palette);

      fill(
        constrain(red(c) + random(-35, 35), 155, 255),
        constrain(green(c) + random(-35, 35), 155, 255),
        constrain(blue(c) + random(-35, 35), 155, 255)
      );

      beginShape();
      vertex(-cell * 0.48, 0);
      vertex(0, -cell * random(0.15, 0.28));
      vertex(cell * 0.48, 0);
      vertex(0, cell * random(0.15, 0.28));
      endShape(CLOSE);

      pop();
    }
  }

  drawingContext.restore();

  noFill();
  stroke(255, 25);
  rect(ox, oy, ART, ART);
}

function mousePressed() {
  generate();
}