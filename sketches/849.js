const BASE  = 1000;
const ART   = 500;
const HALF  = ART / 2;
const PATHS = 800;
const STEPS = 400;

let s;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
}

function draw() {
  generate();
}

function generate() {
  background(0);

  push();
    scale(s);
    translate(BASE / 2, BASE / 2);
    noFill();
    strokeWeight(10);

    for (let i = 0; i < PATHS; i++) {
      let x = random(-120, 120);
      let y = random(-120, 120);
      let a = random(TWO_PI);

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      beginShape();

      for (let j = 0; j < STEPS; j++) {
        const n    = noise(x * 0.005, y * 0.005, j * 0.03);
        const step = map(j, 0, STEPS, 2, 8);

        a += map(n, 0, 1, -0.5, 0.5);
        x += cos(a) * step;
        y += sin(a) * step;

        if (dist(0, 0, x, y) > HALF) break;

        curveVertex(x, y);
      }

      endShape();
    }
  pop();

  grain();
}

function grain() {
  loadPixels();

  for (let i = 0; i < pixels.length; i += 4) {
    const n     = random(-10, 10);
    pixels[i]   += n;
    pixels[i + 1] += n;
    pixels[i + 2] += n;
  }

  updatePixels();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}