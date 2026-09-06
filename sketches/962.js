const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const LINE_WEIGHT = 1;

let viewScale;
let shapes = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}

function draw() {
  background(0);

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  noStroke();

  for (let s of shapes) {
    fill(s.r, s.g, s.b);

    beginShape();

    for (let p of s.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(LINE_WEIGHT);
  noFill();

  for (let s of shapes) {
    beginShape();

    for (let p of s.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function generate() {
  shapes = [];

  const TL = createVector(0, 0);
  const TR = createVector(ART, 0);
  const BR = createVector(ART, ART);
  const BL = createVector(0, ART);

  const A = createVector(random(110, 190), random(70, 140));

  const B = createVector(random(270, 360), random(100, 190));

  const C = createVector(random(260, 350), random(260, 350));

  const D = createVector(random(110, 190), random(340, 430));

  const E = createVector(random(30, 130), random(180, 280));

  const F = createVector(random(370, 470), random(230, 330));

  const T1 = createVector(random(60, 160), 0);

  const T2 = createVector(random(280, 420), 0);

  const R1 = createVector(ART, random(50, 140));

  const R2 = createVector(ART, random(180, 280));

  const R3 = createVector(ART, random(350, 450));

  const B1 = createVector(random(300, 420), ART);

  const B2 = createVector(random(80, 200), ART);

  const L1 = createVector(0, random(70, 170));

  const L2 = createVector(0, random(300, 420));

  addFace([TL, T1, A]);
  addFace([T1, T2, B, A]);
  addFace([T2, TR, R1, B]);

  addFace([TR, R1, R2, B]);
  addFace([R2, R3, F, C, B]);
  addFace([R3, BR, B1, F]);

  addFace([BR, B1, B2, D]);
  addFace([B1, F, C, D]);
  addFace([B2, BL, L2, D]);

  addFace([BL, L2, L1, E]);
  addFace([L2, D, C, E]);
  addFace([L1, TL, A, E]);

  addFace([A, B, C]);
  addFace([A, C, D]);
  addFace([A, D, E]);
  addFace([B, F, C]);
}

function addFace(points) {
  shapes.push({
    points: points,

    r: random(155, 255),
    g: random(155, 255),
    b: random(155, 255),
  });
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
