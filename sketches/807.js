const BASE = 1000;
let s = 1;

let seed = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noFill();
  strokeWeight(8);
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

function draw() {
  background(0);

  randomSeed(seed);
  noiseSeed(seed);

  scale(s);
  translate(BASE / 2, BASE / 2);

  generate();
}

function generate() {
  const layers = 180;
  const points = 720;
  const maxRadius = 225;

  for (let i = 0; i < layers; i++) {
    const t = i / layers;
    const radius = maxRadius * sqrt(t);
    const rotation = sin(t * PI * 2) * PI * 0.25;

    push();
    rotate(rotation);

    beginShape();
    for (let j = 0; j < points; j++) {

      const angle = map(j, 0, points, 0, TWO_PI);

      const warp = sin(angle * 15 + t * PI * 0.01) * 60;
      const noiseFactor = noise(i * 0.03, j * 0.01) * 22;

      const r = radius + warp + noiseFactor;

      const x = cos(angle) * r;
      const y = sin(angle) * r;

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function mousePressed() {
  seed++;
  redraw();
}