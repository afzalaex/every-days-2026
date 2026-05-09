const BASE = 1000;

let s;

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  noFill();
  angleMode(DEGREES);
  rectMode(CENTER);

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);

  generate();
}

function mousePressed() {
  generate();
}

function generate() {
  background(0);

  push();

  scale(s);

  let spacing = 12;

  for (let x = 250; x < 750; x += spacing) {
    for (let y = 250; y < 750; y += spacing) {
      if (random() < 0.3) {
        push();

        translate(x, y);
        rotate(random([0, 45, 90, 135, 180]));

        let r = random(155, 255);
        let g = random(155, 255);
        let b = random(155, 255);

        stroke(r, g, b);

        drawComplexRects(int(random(5, 15)));

        pop();
      }
    }
  }

  pop();
}

function drawComplexRects(count) {
  let w = random(4, 20);
  let h = random(4, 20);

  let offsetX = 0;
  let offsetY = 0;

  let stepW = random(1.5, 3);
  let stepH = random(1.5, 3);

  for (let i = 0; i < count; i++) {
    strokeWeight(map(i, 0, count, 0.1, 1));

    offsetX += random(-1, 1);
    offsetY += random(-1, 1);

    rect(offsetX, offsetY, w, h);

    w *= 1.15;
    h *= 1.15;
  }
}