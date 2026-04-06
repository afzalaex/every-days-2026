const BASE = 1000;
let s = 1;

let f1, f2, f3;
let phase1, phase2;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noFill();
  strokeWeight(2);

  randomize();
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

function randomize() {
  f1 = random(0.004, 0.02);
  f2 = random(0.004, 0.02);
  f3 = random(0.002, 0.015);

  phase1 = random(TWO_PI);
  phase2 = random(TWO_PI);
}

function draw() {
  background(0);
  scale(s);

  let offset = (BASE - 500) / 2;

  let mx = constrain(mouseX / (BASE * s), 0, 1);
  let my = constrain(mouseY / (BASE * s), 0, 1);

  let levels = floor(map(mx, 0, 1, 10, 40));
  let stepSize = map(my, 0, 1, 8, 3);

  push();
  translate(offset, offset);

  for (let y = 0; y < 500; y += stepSize) {
    for (let x = 0; x < 500; x += stepSize) {

      let v = field(x, y);
      let vRight = field(x + stepSize, y);
      let vDown = field(x, y + stepSize);

      let band = floor(v * levels);

      let r = 155 + (band * 7 + x * 0.05) % 100;
      let g = 155 + (band * 11 + y * 0.05) % 100;
      let b = 155 + (band * 17 + (x + y) * 0.03) % 100;

      stroke(r, g, b);

      if (floor(vRight * levels) != band) {
        line(x, y, x + stepSize, y);
      }

      if (floor(vDown * levels) != band) {
        line(x, y, x, y + stepSize);
      }
    }
  }

  pop();
}

function field(x, y) {
  let dx = x - 250;
  let dy = y - 250;
  let d = sqrt(dx * dx + dy * dy);

  return (
    sin(x * f1 + phase1) +
    cos(y * f2 + phase2) +
    sin((x + y) * f3) +
    cos(d * f3 * 1.5)
  ) * 0.25 + 0.5;
}

function mousePressed() {
  randomize();
  redraw();
}