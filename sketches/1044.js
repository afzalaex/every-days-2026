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
  randomSeed(floor(random(1000000)));

  const palette = [];
  for (let i = 0; i < 100; i++) {
    palette.push(randomColor());
  }

  push();
  scale(viewScale);
  translate(OFFSET + ART / 2, OFFSET + ART / 2);

  const maxR = ART / 2 - 6;
  const arms = floor(random(8, 16));
  const turns = random(1, 2);

  strokeWeight(1);
  stroke(0);

  for (let arm = 0; arm < arms; arm++) {
    const baseAngle = (arm / arms) * TWO_PI;
    const points = floor(random(80, 160));

    for (let i = 0; i < points; i++) {
      const t = i / points;
      const radius = pow(t, 0.85) * maxR;
      const angle =
        baseAngle + t * turns * TWO_PI + noise(arm * 0.4, t * 2.2) * 0.4;

      const size = map(noise(arm * 0.7, t * 3.5), 0, 1, 4, 18) * (1 - t * 0.6);
      const rot = angle + noise(t * 1.5, arm) * PI;

      const c = palette[floor(noise(arm * 0.3, t * 5) * palette.length)];

      push();
      translate(cos(angle) * radius, sin(angle) * radius);
      rotate(rot);
      fill(c);
      rectMode(CENTER);
      rect(0, 0, size, size * 2);
      pop();
    }
  }

  pop();
}

function mousePressed() {
  generateArt();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}
