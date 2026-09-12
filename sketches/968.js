const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noStroke();
}

function draw() {
  background(0);

  let t = millis() / 1000;

  push();
  scale(viewScale);

  for (let x = OFFSET; x < OFFSET + ART; x += 8) {
    for (let y = OFFSET; y < OFFSET + ART; y += 8) {

      let size = 2 + 4 * sin(
        TWO_PI * t +
        (x - OFFSET) * 10 +
        (y - OFFSET) * 10
      );

      let r = random(155, 255);
      let g = random(155, 255);
      let b = random(155, 255);

      fill(r, g, b);

      ellipse(x, y, size, size);
    }
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
