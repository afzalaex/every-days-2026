const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const SPLITS = 10;

let palette = [];
let pieces = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
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

  drawDesign();

  pop();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}

function generate() {
  generatePalette();
  generateGeometry();
}

function generatePalette() {
  palette = [];

  for (let i = 0; i < 40; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function generateGeometry() {
  pieces = [];

  pieces.push([
    { x: 0, y: 0 },
    { x: ART, y: 0 },
    { x: ART, y: ART },
  ]);

  pieces.push([
    { x: 0, y: 0 },
    { x: ART, y: ART },
    { x: 0, y: ART },
  ]);

  for (let i = 0; i < SPLITS; i++) {
    let index = floor(random(pieces.length));
    splitTriangle(index);
  }
}

function splitTriangle(index) {
  let tri = pieces[index];

  if (!tri || tri.length !== 3) return;

  let A = tri[0];
  let B = tri[1];
  let C = tri[2];

  let edge = floor(random(3));
  let t = random(0.25, 0.75);

  let P;

  if (edge === 0) {
    P = {
      x: lerp(A.x, B.x, t),
      y: lerp(A.y, B.y, t),
    };

    pieces[index] = [A, P, C];
    pieces.push([P, B, C]);
  } else if (edge === 1) {
    P = {
      x: lerp(B.x, C.x, t),
      y: lerp(B.y, C.y, t),
    };

    pieces[index] = [B, P, A];
    pieces.push([P, C, A]);
  } else {
    P = {
      x: lerp(C.x, A.x, t),
      y: lerp(C.y, A.y, t),
    };

    pieces[index] = [C, P, B];
    pieces.push([P, A, B]);
  }
}

function drawDesign() {
  noStroke();

  for (let i = 0; i < pieces.length; i++) {
    fill(palette[i % palette.length]);

    beginShape();

    for (let p of pieces[i]) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }
}

function mousePressed() {
  generate();
  redraw();
}
