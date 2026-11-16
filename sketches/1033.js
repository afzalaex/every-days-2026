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
  noStroke();

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  const gap = 5;
  const unit = 25;
  const cols = ART / unit;
  const rows = ART / unit;

  const palette = [];
  for (let i = 0; i < 20; i++) {
    palette.push(randomColor());
  }

  for (let col = 0; col < cols; col++) {
    let row = 0;

    while (row < rows) {
      const wave = sin(col * 0.55 + row * 0.28);
      const probability = constrain(
        0.5 + wave * 0.2 + sin(col * 0.65 + row * 0.4) * 0.15,
        0.15,
        0.85
      );

      const heightUnits = random() < probability ? floor(random(1, 4)) : 1;

      const h = min(heightUnits, rows - row) * unit;
      const x = col * unit;
      const y = row * unit;

      const colorIndex = floor(
        abs(sin(col * 0.37 + row * 0.61)) * palette.length
      );

      fill(palette[colorIndex]);
      rect(x + gap / 2, y + gap / 2, unit - gap, h - gap);

      row += h / unit;
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
