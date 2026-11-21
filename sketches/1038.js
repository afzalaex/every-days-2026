const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function generateArt() {
  background(0);
  noiseSeed(floor(random(10000)));

  const palette = [];
  for (let i = 0; i < 100; i++) palette.push(randomColor());

  push();
  scale(viewScale);
  translate(OFFSET + ART / 2, OFFSET + ART / 2);

  stroke(0);
  strokeWeight(2);

  const maxR = ART / 2;
  const rings = floor(random(8, 25));
  let prevR = 0;

  for (let r = 0; r < rings; r++) {
    const outerR = ((r + 1) / rings) * maxR;
    const segments = floor(random(6, 14));

    for (let s = 0; s < segments; s++) {
      const a1 = (s / segments) * TWO_PI;
      const a2 = ((s + 1) / segments) * TWO_PI;

      fill(palette[floor(random(palette.length))]);

      beginShape();
      for (let i = 0; i <= 8; i++) {
        const a = lerp(a1, a2, i / 8);
        vertex(cos(a) * prevR, sin(a) * prevR);
      }
      for (let i = 8; i >= 0; i--) {
        const a = lerp(a1, a2, i / 8);
        vertex(cos(a) * outerR, sin(a) * outerR);
      }
      endShape(CLOSE);
    }

    prevR = outerR;
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}

function mousePressed() {
  generateArt();
}
