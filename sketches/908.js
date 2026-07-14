const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const STEP = 12;
const ARM = 3.5;

let s;
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);

  strokeCap(SQUARE);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < 200; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
}

function draw() {
  background(0);

  let viewScale = s / BASE;

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  let t = frameCount * 0.01;
  let index = 0;

  for (let y = 0; y <= ART; y += STEP) {
    for (let x = 0; x <= ART; x += STEP) {
      let a = noise(x * 0.006, y * 0.006, t) * TWO_PI * 4;

      let d = noise(500 + x * 0.006, 500 + y * 0.006, t) * 12;

      let xx = x + cos(a) * d;
      let yy = y + sin(a) * d;

      stroke(palette[index % palette.length]);

      push();
      translate(xx, yy);

      if ((x / STEP + y / STEP) % 2 === 0) {
        line(-ARM, 0, ARM, 0);
        line(0, -ARM, 0, ARM);
      } else {
        line(-ARM, 0, ARM, 0);
      }

      pop();

      index++;
    }
  }

  pop();
}