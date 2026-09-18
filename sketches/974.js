const SIZE = 1000;
const ART = 500;

const STEP = 5;

let fieldA;
let fieldB;
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noStroke();

  generateArt();
}

function generateArt() {
  fieldA = {
    freqX: random(0.025, 0.09),
    freqY: random(0.01, 0.06),
    phase: random(TWO_PI),
    strength: random(0.7, 1.4),
  };

  fieldB = {
    freqX: random(0.01, 0.07),
    freqY: random(0.025, 0.09),
    phase: random(TWO_PI),
    strength: random(0.7, 1.4),
  };

  drawArt();
}

function drawArt() {
  background(0);

  push();

  scale(viewScale);

  translate((SIZE - ART) / 2, (SIZE - ART) / 2);

  for (let x = 0; x < ART; x += STEP) {
    for (let y = 0; y < ART; y += STEP) {
      let a = sin(x * fieldA.freqX + y * fieldA.freqY + fieldA.phase);

      let b = sin(x * fieldB.freqX - y * fieldB.freqY + fieldB.phase);

      let interference = abs(a * fieldA.strength) * abs(b * fieldB.strength);

      if (interference > 0.35) {
        let markLength = map(interference, 0.35, 1.4, 2, 16);

        let thickness = map(interference, 0.35, 1.4, 1, 4);

        let angle =
          map(a, -1, 1, -PI / 2, PI / 2) + map(b, -1, 1, -PI / 4, PI / 4);

        push();

        translate(x, y);
        rotate(angle);

        fill(random(155, 255), random(155, 255), random(155, 255));

        rect(-markLength / 2, -thickness / 2, markLength, thickness);

        pop();
      }
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

  drawArt();
}
