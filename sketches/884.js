const BASE = 1000;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  background(0);
  rectMode(CENTER);
  angleMode(DEGREES);

  scale(s);
  translate(BASE / 2, BASE / 2);

  let layers = 50;
  let shapesPerLayer = 100;
  let maxRadius = 250;

  for (let i = 0; i < layers; i++) {
    let radius = map(i, 0, layers, 0, maxRadius);
    let rectSize = map(i, 0, layers, 10, 60);
    let angleStep = 360 / shapesPerLayer;
    let offset = i * 2;

    for (let j = 0; j < shapesPerLayer; j++) {
      let angle = j * angleStep + offset;
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(angle + i);

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );
      stroke(0);

      rect(0, 0, rectSize, rectSize * 0.2);

      pop();
    }
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}