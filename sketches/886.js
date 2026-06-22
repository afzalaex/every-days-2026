const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

let arms;
let twist;
let dotSize;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  noStroke();

  generate();
  noLoop();
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  for (let arm = 0; arm < arms; arm++) {

    let baseAngle = arm * TWO_PI / arms;

    for (let r = 2; r < HALF; r += 5) {

      let a = baseAngle + r * twist;

      let x = cos(a) * r;
      let y = sin(a) * r;

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      circle(x, y, dotSize);
    }
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  arms = floor(random(2, 50));
  twist = random(0.08, 0.18);
  dotSize = random(3, 9);

  redraw();
}

function mousePressed() {
  generate();
}