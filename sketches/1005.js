const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 4;
const CELL = ART / GRID_SIZE;

let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE, SIZE);
  noLoop();

  applyScale();
  generate();
}

function applyScale() {
  const canvas = document.querySelector("canvas");

  if (canvas) {
    canvas.style.width = `${SIZE * viewScale}px`;
    canvas.style.height = `${SIZE * viewScale}px`;
    canvas.style.display = "block";
  }
}

function generate() {
  background(0);
  noStroke();

  let patterns = [
    [2, 1, 1],
    [1, 2, 1],
    [1, 1, 2]
  ];

  let y = OFFSET;

  for (let row = 0; row < GRID_SIZE; row++) {
    let pattern = random(patterns);
    let x = OFFSET;

    for (let i = 0; i < pattern.length; i++) {
      let w = pattern[i] * CELL;

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      rect(x, y, w, CELL);

      x += w;
    }

    y += CELL;
  }
}

function windowResized() {
  computeScale();
  applyScale();
}

function mousePressed() {
  generate();
}
