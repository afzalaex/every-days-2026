const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

let bars = [];
const COUNT = 25;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
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

function generate() {
  bars = [];

  for (let i = 0; i < COUNT; i++) {
    bars.push({
      v: random(),
      col: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }

  // partial sort
  let levels = [0, 5, 10, 20, 40, 80];
  let passes = random(levels);

  for (let p = 0; p < passes; p++) {
    for (let i = 0; i < COUNT - 1; i++) {
      if (bars[i].v > bars[i + 1].v) {
        let t = bars[i];
        bars[i] = bars[i + 1];
        bars[i + 1] = t;
      }
    }
  }
}

function draw() {
  background(0);

  translate(MID * s, MID * s);
  scale(s);

  noStroke();

  let padding = 20;
  let inner = ART - padding * 2;
  let w = inner / COUNT;

  for (let i = 0; i < COUNT; i++) {
    let b = bars[i];
    let h = b.v * inner;

    fill(b.col[0], b.col[1], b.col[2]);

    rect(
      -HALF + padding + i * w,
      HALF - padding - h,
      w * 0.9,
      h
    );
  }
}