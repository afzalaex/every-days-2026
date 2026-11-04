const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const CUTS = 6;
const INTERNAL_STROKE_WEIGHT = 10;

let regions = [];
let palette = [];
let viewScale = 1;

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
  regions = [];
  palette = [];

  for (let i = 0; i < CUTS + 1; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  regions.push([
    createVector(0, 0),
    createVector(ART, 0),
    createVector(ART, ART),
    createVector(0, ART),
  ]);

  for (let i = 0; i < CUTS; i++) {
    const target = largestRegion();
    const poly = regions.splice(target, 1)[0];
    const result = splitPolygon(poly);

    if (result !== null) {
      regions.push(result[0]);
      regions.push(result[1]);
    } else {
      regions.push(poly);
    }
  }

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  for (let i = 0; i < regions.length; i++) {
    fill(palette[i % palette.length]);

    if (INTERNAL_STROKE_WEIGHT > 0) {
      stroke(0);
      strokeWeight(INTERNAL_STROKE_WEIGHT);
      strokeJoin(MITER);
    } else {
      noStroke();
    }

    beginShape();
    for (const p of regions[i]) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }

  pop();
}

function largestRegion() {
  let best = 0;
  let maxArea = -1;

  for (let i = 0; i < regions.length; i++) {
    const area = polygonArea(regions[i]);

    if (area > maxArea) {
      maxArea = area;
      best = i;
    }
  }

  return best;
}

function polygonArea(poly) {
  let area = 0;

  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    area += a.x * b.y - b.x * a.y;
  }

  return abs(area) / 2;
}

function splitPolygon(poly) {
  const n = poly.length;
  if (n < 4) return null;

  const pairs = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (j !== i + 1 && !(i === 0 && j === n - 1)) {
        pairs.push([i, j]);
      }
    }
  }

  if (pairs.length === 0) return null;

  const pair = random(pairs);
  const edgeA = pair[0];
  const edgeB = pair[1];

  const a = pointOnEdge(poly, edgeA, random(0.2, 0.8));
  const b = pointOnEdge(poly, edgeB, random(0.2, 0.8));

  const firstPoly = [a];
  let index = (edgeA + 1) % n;

  while (index !== (edgeB + 1) % n) {
    firstPoly.push(poly[index]);
    index = (index + 1) % n;
  }
  firstPoly.push(b);

  const secondPoly = [b];
  index = (edgeB + 1) % n;

  while (index !== (edgeA + 1) % n) {
    secondPoly.push(poly[index]);
    index = (index + 1) % n;
  }
  secondPoly.push(a);

  if (firstPoly.length < 3 || secondPoly.length < 3) {
    return null;
  }

  return [firstPoly, secondPoly];
}

function pointOnEdge(poly, edge, t) {
  const a = poly[edge];
  const b = poly[(edge + 1) % poly.length];

  return createVector(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}
