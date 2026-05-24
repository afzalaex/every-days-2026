const BASE = 1000;
const ART = 500;

let s;
let layers = 5;
let petals = 56;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
}

function generate() {
  randomSeed(millis());
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  const maxRadius = 250;

  for (let l = 0; l < layers; l++) {
    const radius    = map(l, 0, layers - 1,  1,  maxRadius);
    const colorAlpha = map(l, 0, layers - 1,  255, 50);
    const shapeSize  = map(l, 0, layers - 10, 40, 10);

    for (let p = 0; p < petals; p++) {
      const angle = map(p, 0, petals, 0, TWO_PI);
      const x = radius * cos(angle);
      const y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(angle);
      drawFractalShape(shapeSize, colorAlpha);
      pop();
    }
  }

  pop();
}

function drawFractalShape(size, alpha) {
  const levels = 3;
  const col = color(
    random(155, 255),
    random(155, 255),
    random(155, 255),
    alpha
  );

  stroke(col);
  noFill();
  recursivePolygon(0, 0, size, 5, levels);
}

function recursivePolygon(x, y, radius, sides, depth) {
  if (depth === 0) return;

  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / sides) {
    vertex(x + cos(i) * radius, y + sin(i) * radius);
  }
  endShape(CLOSE);

  const nextRadius = radius * 0.5;
  const nextDepth  = depth - 1;

  for (let i = 0; i < TWO_PI; i += TWO_PI / sides) {
    recursivePolygon(
      x + cos(i) * nextRadius,
      y + sin(i) * nextRadius,
      nextRadius,
      sides,
      nextDepth
    );
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}