const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const LEVELS = 90;
const STEP = 6;

let ox;
let oy;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  noFill();
  noLoop();

  generate();
}

function generate() {
  background(0);

  ox = random(1000);
  oy = random(1000);

  push();

  translate(width / 2, height / 2);
  scale(s);

  for (let k = 0; k < LEVELS; k++) {

    let threshold = map(k, 0, LEVELS, 0.15, 0.85);

    strokeWeight(map(k, 0, LEVELS, 2, 0.15));

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255),
      140
    );

    let drawing = false;

    for (let x = -HALF; x <= HALF; x += STEP) {
      for (let y = -HALF; y <= HALF; y += STEP) {

        let nx = x * 0.008;
        let ny = y * 0.008;

        let field =
          sin((nx + ox) * 3) +
          cos((ny + oy) * 3) +
          noise(nx + ox, ny + oy) * 2;

        let v = map(field, -2, 4, 0, 1);

        if (abs(v - threshold) < 0.025) {

          if (!drawing) {
            beginShape();
            drawing = true;
          }

          curveVertex(x, y);

        } else if (drawing) {

          endShape();
          drawing = false;
        }
      }

      if (drawing) {
        endShape();
        drawing = false;
      }
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function touchStarted() {
  generate();
  return false;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}