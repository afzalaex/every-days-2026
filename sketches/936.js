const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let layers = [];
let viewScale;

function computeScale() {
  viewScale = Math.min(Math.min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  rectMode(CENTER);
  noStroke();

  for (let layer of layers) {
    fill(layer.c);

    rect(layer.x, layer.y, layer.size, layer.size);
  }

  pop();
}

function generate() {
  layers = [];

  let baseR = random(155, 255);
  let baseG = random(155, 255);
  let baseB = random(155, 255);

  let count = floor(random(4, 8));

  let outer = random(400, 500);

  let layerSpacing = outer / count;

  let centerX = ART / 2;
  let centerY = ART / 2;

  for (let i = 0; i < count; i++) {
    let size = outer - i * layerSpacing;

    let drift = map(i, 0, count - 1, random(-20, 20), random(-5, 5));

    let x = centerX + drift;
    let y = centerY + random(-8, 8);

    let r = constrain(baseR + random(-45, 45), 155, 255);

    let g = constrain(baseG + random(-45, 45), 155, 255);

    let b = constrain(baseB + random(-45, 45), 155, 255);

    layers.push({
      x: x,
      y: y,
      size: size,
      c: color(r, g, b),
    });
  }

  if (random() < 0.7) {
    let last = layers[layers.length - 1];

    layers.push({
      x: last.x + random(-8, 8),
      y: last.y + random(-8, 8),
      size: last.size * random(0.45, 0.7),
      c: randomColor(),
    });
  }
}

function randomColor() {
  return color(random(155, 255), random(155, 255), random(155, 255));
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
