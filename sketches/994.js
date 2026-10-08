const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const NUM_POINTS = 18;
const PALETTE_SIZE = 25;

let points = [];
let triangles = [];
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

  points = [];
  triangles = [];
  palette = [];

  createPalette();
  createPoints();

  triangles = delaunay(points);

  push();

  scale(viewScale);

  drawArtwork();

  pop();
}

function drawArtwork() {
  noStroke();

  shuffle(triangles, true);

  for (let i = 0; i < triangles.length; i++) {
    const t = triangles[i];

    fill(palette[i % PALETTE_SIZE]);

    beginShape();

    vertex(t.a.x, t.a.y);
    vertex(t.b.x, t.b.y);
    vertex(t.c.x, t.c.y);

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(6);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();

  rect(OFFSET, OFFSET, ART, ART);
}

function createPalette() {
  palette = [];

  for (let i = 0; i < PALETTE_SIZE; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function createPoints() {
  points = [];

  points.push({
    x: OFFSET,
    y: OFFSET,
  });

  points.push({
    x: OFFSET + ART,
    y: OFFSET,
  });

  points.push({
    x: OFFSET + ART,
    y: OFFSET + ART,
  });

  points.push({
    x: OFFSET,
    y: OFFSET + ART,
  });

  points.push({
    x: OFFSET + random(60, 200),
    y: OFFSET,
  });

  points.push({
    x: OFFSET + random(300, 440),
    y: OFFSET,
  });

  points.push({
    x: OFFSET + ART,
    y: OFFSET + random(60, 200),
  });

  points.push({
    x: OFFSET + ART,
    y: OFFSET + random(300, 440),
  });

  points.push({
    x: OFFSET + random(300, 440),
    y: OFFSET + ART,
  });

  points.push({
    x: OFFSET + random(60, 200),
    y: OFFSET + ART,
  });

  points.push({
    x: OFFSET,
    y: OFFSET + random(60, 200),
  });

  points.push({
    x: OFFSET,
    y: OFFSET + random(300, 440),
  });

  const anchors = [
    [0.3, 0.28],
    [0.68, 0.25],
    [0.48, 0.5],
    [0.78, 0.58],
    [0.28, 0.72],
    [0.62, 0.78],
  ];

  for (let a of anchors) {
    points.push({
      x: OFFSET + ART * a[0] + random(-25, 25),

      y: OFFSET + ART * a[1] + random(-25, 25),
    });
  }
}

function delaunay(input) {
  let pts = input.slice();

  const margin = 10000;

  const p1 = {
    x: -margin,
    y: -margin,
  };

  const p2 = {
    x: SIZE + margin,
    y: -margin,
  };

  const p3 = {
    x: SIZE / 2,
    y: SIZE + margin,
  };

  pts.push(p1);
  pts.push(p2);
  pts.push(p3);

  let tris = [
    {
      a: p1,
      b: p2,
      c: p3,
    },
  ];

  for (let p of input) {
    let bad = [];

    for (let t of tris) {
      if (inCircumcircle(p, t)) {
        bad.push(t);
      }
    }

    let edges = [];

    for (let t of bad) {
      addEdge(edges, t.a, t.b);
      addEdge(edges, t.b, t.c);
      addEdge(edges, t.c, t.a);
    }

    for (let t of bad) {
      const index = tris.indexOf(t);

      if (index !== -1) {
        tris.splice(index, 1);
      }
    }

    for (let e of edges) {
      tris.push({
        a: e.a,
        b: e.b,
        c: p,
      });
    }
  }

  tris = tris.filter(
    (t) =>
      t.a !== p1 &&
      t.a !== p2 &&
      t.a !== p3 &&
      t.b !== p1 &&
      t.b !== p2 &&
      t.b !== p3 &&
      t.c !== p1 &&
      t.c !== p2 &&
      t.c !== p3
  );

  return tris;
}

function addEdge(edges, a, b) {
  for (let i = edges.length - 1; i >= 0; i--) {
    const e = edges[i];

    if (samePoint(e.a, b) && samePoint(e.b, a)) {
      edges.splice(i, 1);
      return;
    }
  }

  edges.push({
    a: a,
    b: b,
  });
}

function samePoint(a, b) {
  return abs(a.x - b.x) < 0.001 && abs(a.y - b.y) < 0.001;
}

function inCircumcircle(p, t) {
  const ax = t.a.x;
  const ay = t.a.y;

  const bx = t.b.x;
  const by = t.b.y;

  const cx = t.c.x;
  const cy = t.c.y;

  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

  if (abs(d) < 0.00001) {
    return false;
  }

  const ux =
    ((ax * ax + ay * ay) * (by - cy) +
      (bx * bx + by * by) * (cy - ay) +
      (cx * cx + cy * cy) * (ay - by)) /
    d;

  const uy =
    ((ax * ax + ay * ay) * (cx - bx) +
      (bx * bx + by * by) * (ax - cx) +
      (cx * cx + cy * cy) * (bx - ax)) /
    d;

  const radiusSq = (ux - ax) * (ux - ax) + (uy - ay) * (uy - ay);

  const pointDistanceSq = (p.x - ux) * (p.x - ux) + (p.y - uy) * (p.y - uy);

  return pointDistanceSq <= radiusSq;
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
