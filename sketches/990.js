const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 100;

let palette = [];
let columns = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();

  noLoop();
}

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  const colW = ART / COLS;

  for (let x = 0; x < COLS; x++) {
    let y = 0;

    for (let segment of columns[x]) {
      fill(segment.color);

      rect(x * colW, y, colW + 0.5, segment.height);

      y += segment.height;
    }
  }

  pop();
}

function generate() {
  palette = [];
  columns = [];

  for (let i = 0; i < 100; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  for (let x = 0; x < COLS; x++) {
    let segments = [];

    let y = 0;

    while (y < ART) {
      let remaining = ART - y;

      let h;

      if (remaining < 10) {
        h = remaining;
      } else {
        h = random(50, 150);
        h = min(h, remaining);
      }

      segments.push({
        height: h,
        color: random(palette),
      });

      y += h;
    }

    columns.push(segments);
  }
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
