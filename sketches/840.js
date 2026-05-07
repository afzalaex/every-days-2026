const BASE = 1000;
const ART = 500;

let scaleFactor;

const gridSize = 30;

let noiseSeedX;
let noiseSeedY;

function setup() {
  computeScale();

  createCanvas(BASE * scaleFactor, BASE * scaleFactor);

  noStroke();
  rectMode(CENTER);

  generate();
}

function generate() {
  noiseSeedX = random(1000);
  noiseSeedY = random(1000);

  redraw();
}

function computeScale() {
  scaleFactor =
    min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * scaleFactor, BASE * scaleFactor);
}

function mousePressed() {
  generate();
}

function draw() {
  background(0);

  scale(scaleFactor);

  translate(BASE / 2 - ART / 2, BASE / 2 - ART / 2);

  const spacing = ART / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      push();

      const nx = x / gridSize;
      const ny = y / gridSize;

      const angle =
        noise(
          noiseSeedX + nx * 1.5,
          noiseSeedY + ny * 1.5
        ) *
        TWO_PI *
        2;

      const distort = map(
        noise(
          noiseSeedX + x * 0.1,
          noiseSeedY + y * 0.1
        ),
        0,
        1,
        -5,
        5
      );

      const px = x * spacing + distort;
      const py = y * spacing + distort;

      translate(px, py);

      rotate(angle / 6);

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      const squareSize = map(
        sin(angle),
        -1,
        1,
        5,
        15
      );

      for (let i = 0; i < 3; i++) {
        rect(
          0,
          0,
          squareSize + i * 10,
          squareSize + i * 30
        );
      }

      pop();
    }
  }

  noLoop();
}