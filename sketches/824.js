const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s = 1;
const STEP = 2;

let params = {};

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generate() {
  randomSeed(millis());

  params = {
    radialFreq: random(6, 14),
    angularAmp: random(0.4, 1.2),
    twistFreq: random(4, 10),
    twistAmp: random(0.1, 0.25),
    fieldFreq: random(8, 18)
  };

  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(1);

  for (let x = -HALF; x < HALF; x += STEP) {
    for (let y = -HALF; y < HALF; y += STEP) {

      let nx = x / HALF;
      let ny = y / HALF;

      let r = sqrt(nx * nx + ny * ny);
      let a = atan2(ny, nx);

      a += sin(r * params.radialFreq) * params.angularAmp;

      let tx = r * cos(a);
      let ty = r * sin(a);

      tx += sin(ty * params.twistFreq) * params.twistAmp;
      ty += cos(tx * params.twistFreq) * params.twistAmp;

      let v = sin((tx + ty) * params.fieldFreq) +
              cos((tx - ty) * params.fieldFreq);

      if (v > 0) {
        stroke(255);
      } else {
        stroke(0);
      }

      point(x, y);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}