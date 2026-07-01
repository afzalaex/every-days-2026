const BASE = 1000;
const ART = 500;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noLoop();
}

function draw() {
  push();
  scale(s / BASE);

  background(0);
  translate((BASE - ART) / 2, (BASE - ART) / 2);

  let cols = 180;
  let am = random(1, 100);
  let frq = random(1.5, 4);

  strokeWeight(2);
  noFill();

  for (let i = 0; i <= cols; i++) {
    let x = map(i, 0, cols, 0, ART);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    beginShape();

    for (let y = 0; y <= ART; y += 3) {
      let nx = x +
        sin(y * 0.02 * frq) *
        am *
        sin(TWO_PI * x / ART);

      vertex(nx, y);
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}