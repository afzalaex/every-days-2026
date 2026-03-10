const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;
let shapes = [];
let palette = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  resizeCanvas(BASE * viewScale, BASE * viewScale);
}

function setup() {
  createCanvas(BASE, BASE);
  noLoop();
  computeScale();
  generate();
}

function windowResized() {
  computeScale();
  redraw();
}

function mousePressed() {

  let mx = mouseX / viewScale;
  let my = mouseY / viewScale;

  let cx = mx - BASE / 2;
  let cy = my - BASE / 2;

  if (cx >= -HALF && cx <= HALF &&
      cy >= -HALF && cy <= HALF) {
    generate();
  }
}

function generate() {
  shapes = [];
  palette = [];

  generatePalette();

  shapes.push([
    createVector(-HALF, -HALF),
    createVector(HALF, -HALF),
    createVector(HALF, HALF),
    createVector(-HALF, HALF)
  ]);

  let slices = floor(random(6, 14));

  for (let i = 0; i < slices; i++) {
    sliceShapes(random(-PI/2, PI/2));
  }

  redraw();
}

function generatePalette() {
  for (let i = 0; i < 6; i++) {
    palette.push(color(
      random(155,255),
      random(155,255),
      random(155,255)
    ));
  }
}

function sliceShapes(angle) {

  let offset = random(-HALF, HALF);
  let normal = createVector(cos(angle), sin(angle));
  let newShapes = [];

  for (let poly of shapes) {

    let front = [];
    let back = [];

    for (let i = 0; i < poly.length; i++) {

      let a = poly[i];
      let b = poly[(i+1) % poly.length];

      let da = p5.Vector.dot(a, normal) - offset;
      let db = p5.Vector.dot(b, normal) - offset;

      if (da >= 0) front.push(a.copy());
      if (da <= 0) back.push(a.copy());

      if (da * db < 0) {
        let t = da / (da - db);
        let intersect = p5.Vector.lerp(a, b, t);
        front.push(intersect.copy());
        back.push(intersect.copy());
      }
    }

    if (front.length > 2) newShapes.push(front);
    if (back.length > 2) newShapes.push(back);
  }

  shapes = newShapes;
}

function draw() {

  background(0);

  push();
  scale(viewScale);
  translate(BASE/2, BASE/2);

  stroke(255);
  strokeWeight(2.5 * viewScale);

  for (let poly of shapes) {

    if (random() < 0.5) {
      fill(random(palette));
    } else {
      noFill();
    }

    beginShape();
    for (let v of poly) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  pop();
}