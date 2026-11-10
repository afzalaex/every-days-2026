const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const GRID_COUNT = 2;
const UNIT = ART / GRID_COUNT;

let viewScale = 1;
let palette = [];
let tiles = [];

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

function generatePalette() {
  palette = [];

  for (let i = 0; i < 20; i++) {
    palette.push(randomColor());
  }
}

function generateArt() {
  generatePalette();
  tiles = [];

  for (let row = 0; row < GRID_COUNT; row++) {
    for (let col = 0; col < GRID_COUNT; col++) {
      tiles.push({
        row,
        col,
        direction: random() < 0.5 ? 0 : 1,
        fourWay: random() < 0.35,
        colors: [
          floor(random(palette.length)),
          floor(random(palette.length)),
          floor(random(palette.length)),
          floor(random(palette.length)),
        ],
      });
    }
  }

  redraw();
}

function drawTriangle(points, c) {
  fill(c);
  beginShape();

  for (const p of points) {
    vertex(OFFSET + p[0], OFFSET + p[1]);
  }

  endShape(CLOSE);
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  noStroke();

  for (const tile of tiles) {
    const x = tile.col * UNIT;
    const y = tile.row * UNIT;
    const s = UNIT;

    const tl = [x, y];
    const tr = [x + s, y];
    const br = [x + s, y + s];
    const bl = [x, y + s];
    const center = [x + s / 2, y + s / 2];

    const c = tile.colors.map((i) => palette[i]);

    if (tile.fourWay) {
      drawTriangle([tl, tr, center], c[0]);
      drawTriangle([tr, br, center], c[1]);
      drawTriangle([br, bl, center], c[2]);
      drawTriangle([bl, tl, center], c[3]);
    } else if (tile.direction === 0) {
      drawTriangle([tl, tr, br], c[0]);
      drawTriangle([tl, br, bl], c[1]);
    } else {
      drawTriangle([tl, tr, bl], c[0]);
      drawTriangle([tr, br, bl], c[1]);
    }
  }

  stroke(0);
  strokeWeight(5);
  strokeJoin(MITER);
  noFill();

  for (let i = 0; i <= GRID_COUNT; i++) {
    const pos = OFFSET + i * UNIT;

    line(OFFSET, pos, OFFSET + ART, pos);
    line(pos, OFFSET, pos, OFFSET + ART);
  }

  for (const tile of tiles) {
    const x = OFFSET + tile.col * UNIT;
    const y = OFFSET + tile.row * UNIT;
    const s = UNIT;

    if (tile.fourWay) {
      line(x, y, x + s, y + s);
      line(x + s, y, x, y + s);
    } else if (tile.direction === 0) {
      line(x, y, x + s, y + s);
    } else {
      line(x + s, y, x, y + s);
    }
  }

  stroke(0);
  strokeWeight(5);
  rect(OFFSET, OFFSET, ART, ART);

  pop();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    generateArt();
    return false;
  }
}

function keyPressed() {
  if (key === " ") {
    generateArt();
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
