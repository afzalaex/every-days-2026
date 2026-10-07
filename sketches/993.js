const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const NUM_CELLS = 32;
const LINE_WEIGHT = 4;

let points = [];
let palette = [];
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

function draw() {}

function generate() {
  background(0);

  createPalette();
  createPoints();

  push();

  scale(viewScale);

  drawArtwork();

  pop();
}

function drawArtwork() {
  let cells = [];

  for (let i = 0; i < points.length; i++) {
    let cell = makeCell(i);

    if (cell.length > 2) {
      cells.push(cell);
    }
  }

  noStroke();

  for (let i = 0; i < cells.length; i++) {
    fill(palette[i % palette.length]);

    beginShape();

    for (let p of cells[i]) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(LINE_WEIGHT);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();

  for (let cell of cells) {
    beginShape();

    for (let p of cell) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(LINE_WEIGHT);

  rect(OFFSET, OFFSET, ART, ART);
}

function createPalette() {
  palette = [];

  for (let i = 0; i < 9; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function createPoints() {
  points = [];

  for (let i = 0; i < NUM_CELLS; i++) {
    points.push({
      x: random(OFFSET, OFFSET + ART),

      y: random(OFFSET, OFFSET + ART),
    });
  }
}

function makeCell(index) {
  const site = points[index];

  let polygon = [
    {
      x: OFFSET,
      y: OFFSET,
    },

    {
      x: OFFSET + ART,
      y: OFFSET,
    },

    {
      x: OFFSET + ART,
      y: OFFSET + ART,
    },

    {
      x: OFFSET,
      y: OFFSET + ART,
    },
  ];

  for (let j = 0; j < points.length; j++) {
    if (j === index) {
      continue;
    }

    const other = points[j];

    const midX = (site.x + other.x) / 2;

    const midY = (site.y + other.y) / 2;

    const dx = other.x - site.x;

    const dy = other.y - site.y;

    const A = dx;
    const B = dy;

    const C = -(A * midX + B * midY);

    polygon = clipPolygon(polygon, A, B, C);

    if (polygon.length === 0) {
      break;
    }
  }

  return polygon;
}

function clipPolygon(polygon, A, B, C) {
  let result = [];

  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];

    const next = polygon[(i + 1) % polygon.length];

    const currentValue = A * current.x + B * current.y + C;

    const nextValue = A * next.x + B * next.y + C;

    const currentInside = currentValue <= 0;

    const nextInside = nextValue <= 0;

    if (currentInside && nextInside) {
      result.push(next);
    } else if (currentInside && !nextInside) {
      const intersection = findIntersection(current, next, A, B, C);

      if (intersection) {
        result.push(intersection);
      }
    } else if (!currentInside && nextInside) {
      const intersection = findIntersection(current, next, A, B, C);

      if (intersection) {
        result.push(intersection);
      }

      result.push(next);
    }
  }

  return result;
}

function findIntersection(p1, p2, A, B, C) {
  const dx = p2.x - p1.x;

  const dy = p2.y - p1.y;

  const denominator = A * dx + B * dy;

  if (abs(denominator) < 0.00001) {
    return null;
  }

  const t = -(A * p1.x + B * p1.y + C) / denominator;

  return {
    x: p1.x + dx * t,
    y: p1.y + dy * t,
  };
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
