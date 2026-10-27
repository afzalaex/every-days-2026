const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const TILE_COUNT = 5;
const CELL_SIZE = ART / TILE_COUNT;

const GAP = 8;
const MIN_COLOR = 155;
const MAX_COLOR = 255;

let palette = [];
let patterns = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  background(0);

  createPalette();
  createComposition();

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let i = 0; i < patterns.length; i++) {
    const col = i % TILE_COUNT;
    const row = floor(i / TILE_COUNT);

    drawTile(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, patterns[i]);
  }

  pop();
}

function createPalette() {
  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }
}

function createComposition() {
  patterns = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    0,
  ];

  for (let i = patterns.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));

    [patterns[i], patterns[j]] = [patterns[j], patterns[i]];
  }
}

function drawTile(x, y, size, type) {
  const px = x + GAP / 2;
  const py = y + GAP / 2;
  const s = size - GAP;

  const c1 = random(palette);
  const c2 = random(palette);
  const c3 = random(palette);
  const c4 = random(palette);

  noStroke();

  if (type === 0) {
    fill(c1);
    triangle(px, py, px + s, py, px, py + s);

    fill(c2);
    triangle(px + s, py, px + s, py + s, px, py + s);

    drawDiagonalGap(px, py, s, true);
  } else if (type === 1) {
    drawQuadrants(px, py, s, [c1, c2, c3, c4]);
  } else if (type === 2) {
    fill(c1);
    rect(px, py, s, s);

    fill(0);
    rect(px + s * 0.25, py + s * 0.25, s * 0.5, s * 0.5);
  } else if (type === 3) {
    drawHorizontalStripes(px, py, s, c1, c2, 4);
  } else if (type === 4) {
    drawVerticalStripes(px, py, s, c1, c2, 4);
  } else if (type === 5) {
    const half = (s - GAP) / 2;

    fill(c1);
    rect(px, py, s, half);

    fill(c2);
    rect(px, py + half + GAP, half, half);

    fill(c3);
    rect(px + half + GAP, py + half + GAP, half, half);
  } else if (type === 6) {
    const half = (s - GAP) / 2;

    fill(c1);
    rect(px, py, half, s);

    fill(c2);
    rect(px + half + GAP, py, half, half);

    fill(c3);
    rect(px + half + GAP, py + half + GAP, half, half);
  } else if (type === 7) {
    fill(c1);
    triangle(px, py, px + s, py, px + s, py + s);

    fill(c2);
    triangle(px, py, px, py + s, px + s, py + s);

    drawDiagonalGap(px, py, s, false);
  }
}

function drawQuadrants(x, y, s, colors) {
  const half = (s - GAP) / 2;

  fill(colors[0]);
  rect(x, y, half, half);

  fill(colors[1]);
  rect(x + half + GAP, y, half, half);

  fill(colors[2]);
  rect(x, y + half + GAP, half, half);

  fill(colors[3]);
  rect(x + half + GAP, y + half + GAP, half, half);
}

function drawHorizontalStripes(x, y, s, c1, c2, count) {
  const stripeHeight = (s - GAP * (count - 1)) / count;

  for (let i = 0; i < count; i++) {
    fill(i % 2 === 0 ? c1 : c2);
    rect(x, y + i * (stripeHeight + GAP), s, stripeHeight);
  }
}

function drawVerticalStripes(x, y, s, c1, c2, count) {
  const stripeWidth = (s - GAP * (count - 1)) / count;

  for (let i = 0; i < count; i++) {
    fill(i % 2 === 0 ? c1 : c2);
    rect(x + i * (stripeWidth + GAP), y, stripeWidth, s);
  }
}

function drawDiagonalGap(x, y, s, descending) {
  stroke(0);
  strokeWeight(GAP);

  if (descending) {
    line(x + s, y, x, y + s);
  } else {
    line(x, y, x + s, y + s);
  }

  noStroke();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function mousePressed() {
  generate();
}

function keyPressed() {
  if (key === " ") {
    generate();
  }
}
