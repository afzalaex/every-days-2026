const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const STRIPS = 25;
const GAP = 10;

let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();

  generate();
}

function draw() {}

function generate() {
  background(0);

  push();
  scale(viewScale);

  stroke(0);

  const stripSize = ART / STRIPS;
  const palette = [];

  for (let i = 0; i < STRIPS * 2; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  for (let i = 0; i < STRIPS; i++) {
    const y = OFFSET + i * stripSize + GAP / 2;
    const h = stripSize - GAP;

    fill(palette[i]);

    let x = OFFSET;

    while (x < OFFSET + ART) {
      const segmentLength = random(stripSize * 0.8, stripSize * 3);
      const actualLength = min(segmentLength, OFFSET + ART - x);

      rect(x, y, actualLength, h);

      x += actualLength + random(GAP, stripSize * 0.7);
    }
  }

  for (let i = 0; i < STRIPS; i++) {
    const x = OFFSET + i * stripSize + GAP / 2;
    const w = stripSize - GAP;

    fill(palette[STRIPS + i]);

    let y = OFFSET;

    while (y < OFFSET + ART) {
      const segmentLength = random(stripSize * 0.8, stripSize * 3);
      const actualLength = min(segmentLength, OFFSET + ART - y);

      rect(x, y, w, actualLength);

      y += actualLength + random(GAP, stripSize * 0.7);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}
