const BASE = 1000;
const ART = 500;

let s;

let lines = 440;

function setup() {
  computeScale();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function windowResized() {
  computeScale();
  redraw();
}

function draw() {
  background(0);

  scale(s / BASE);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2);
  noFill();

  let mx = (mouseX / s) * BASE - BASE / 2;
  mx = constrain(mx, -ART/2, ART/2);

  // normalize → 0 to 1
  let focus = map(mx, -ART/2, ART/2, 0, 1);

  for (let i = 0; i < lines; i++) {

    let t = i / lines;

    let x = -ART/2 + t * ART;

    let d = abs(t - focus);

    let density = pow(1 - constrain(d * 2, 0, 1), 2);

    let skip = floor(1 + (1 - density) * 6);

    if (i % skip !== 0) continue;

    let r = 155 + (i * 7 % 100);
    let g = 155 + (i * 13 % 100);
    let b = 155 + (i * 23 % 100);

    stroke(r, g, b, 220);

    line(x, -ART/2, x, ART/2);
  }
}

function mouseMoved() {
  redraw();
}