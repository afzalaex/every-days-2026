const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const COLS = 4;
const ROWS = 4;
const GAP = 8;

let viewScale = 1;
let palette = [];
let modules = [];

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
  palette = [];
  modules = [];

  for (let i = 0; i < 25; i++) {
    palette.push(randomColor());
  }

  const cellW = ART / COLS;
  const cellH = ART / ROWS;

  const focusX = random(0.25, 0.75);
  const focusY = random(0.25, 0.75);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const nx = (x + 0.5) / COLS;
      const ny = (y + 0.5) / ROWS;

      const distFromFocus = dist(nx, ny, focusX, focusY);

      const density = constrain(1 - distFromFocus * 1.2, 0, 1);

      const splitChance = 0.25 + density * 0.6;

      const px = OFFSET + x * cellW;
      const py = OFFSET + y * cellH;

      const w = cellW - GAP;
      const h = cellH - GAP;

      if (random() < splitChance) {
        const verticalSplit = random() < 0.5;

        if (verticalSplit) {
          const ratio = random(0.25, 0.75);
          const firstW = w * ratio;
          const secondW = w - firstW - GAP;

          modules.push({
            x: px,
            y: py,
            w: firstW,
            h,
            c: floor(random(palette.length)),
          });

          modules.push({
            x: px + firstW + GAP,
            y: py,
            w: secondW,
            h,
            c: floor(random(palette.length)),
          });
        } else {
          const ratio = random(0.25, 0.75);
          const firstH = h * ratio;
          const secondH = h - firstH - GAP;

          modules.push({
            x: px,
            y: py,
            w,
            h: firstH,
            c: floor(random(palette.length)),
          });

          modules.push({
            x: px,
            y: py + firstH + GAP,
            w,
            h: secondH,
            c: floor(random(palette.length)),
          });
        }
      } else {
        modules.push({
          x: px,
          y: py,
          w,
          h,
          c: floor(random(palette.length)),
        });
      }
    }
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  noStroke();

  for (const m of modules) {
    if (m.w <= 0 || m.h <= 0) continue;

    fill(palette[m.c]);
    rect(m.x, m.y, m.w, m.h);
  }

  pop();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generateArt();
    return false;
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
