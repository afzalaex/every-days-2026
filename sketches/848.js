const BASE = 1000;

let s;
let seed;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {

  computeScale();

  createCanvas(BASE * s, BASE * s);

  noLoop();

  generate();
}

function generate() {

  randomSeed(seed);

  background(0);

  push();

  scale(s);

  let centerX = BASE / 2;
  let centerY = BASE / 2;

  for (let i = 0; i < 2000; i++) {

    let angle1 = random(TWO_PI);
    let angle2 = random(TWO_PI);

    let length1 = random(10, 250);
    let length2 = random(10, 250);

    let x1 = centerX + cos(angle1) * length1;
    let y1 = centerY + sin(angle1) * length1;
    let cx1 = centerX + cos(angle1 + PI / 3) * length1;

    let cy1 = centerY + sin(angle1 + PI / 3) * length1;
    let cx2 = centerX + cos(angle2 + PI / 3) * length2;
    let cy2 = centerY + sin(angle2 + PI / 3) * length2;

    let x2 = centerX + cos(angle2) * length2;
    let y2 = centerY + sin(angle2) * length2;

    let r = random(155, 255);
    let g = random(155, 255);
    let b = random(155, 255);

    stroke(r, g, b);
    strokeWeight(2);
    noFill();
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}