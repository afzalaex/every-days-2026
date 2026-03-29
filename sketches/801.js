const BASE = 1000;
let s = 1;

let rings = 300;
let baseRadius = 230;

let colors = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s, WEBGL);
  pixelDensity(2);
  strokeWeight(1);
  noFill();

  generateColors();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generateColors() {
  colors = [];

  for (let i = 0; i < rings; i++) {
    colors.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }
}

// --- DRAW ---

function draw() {
  background(0);

  scale(s);

  // smooth automatic motion (no interaction)
  rotateX(frameCount * 0.004);
  rotateY(frameCount * 0.006);

  for (let i = 0; i < rings; i++) {

    let t = map(i, 0, rings, -1, 1);

    push();

    translate(0, 0, t * 220);

    rotateX(t * PI + frameCount * 0.01);
    rotateY(t * TWO_PI);

    let r = baseRadius * (1 - abs(t) * 0.5);

    let c = colors[i];
    stroke(c[0], c[1], c[2]);

    drawRing(r, t);

    pop();
  }
}

function drawRing(r, t) {
  beginShape();

  let detail = 120;

  for (let a = 0; a < TWO_PI; a += TWO_PI / detail) {

    let offset =
      sin(a * 6 + t * 10 + frameCount * 0.05) * 12 +
      cos(a * 3 - t * 6) * 8;

    let x = cos(a) * (r + offset);
    let y = sin(a) * (r + offset);

    vertex(x, y, 0);
  }

  endShape(CLOSE);
}