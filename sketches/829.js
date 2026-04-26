const CANVAS = 1000;
const MID = CANVAS / 2;
const ART_SIZE = 500;
const MAX_R = ART_SIZE / 2;

const POLYS = 12;
const ROT_STEP = 12;

let layers = [];

let s;
let SIDES = 3;

function setup() {
  computeScale();
  createCanvas(CANVAS * s, CANVAS * s);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, CANVAS) / CANVAS;
}

function windowResized() {
  computeScale();
  resizeCanvas(CANVAS * s, CANVAS * s);
  redraw();
}

function mousePressed() {
  SIDES++;
  if (SIDES > 12) SIDES = 3;
  redraw();
}

function draw() {
  background(0);

  scale(s);
  translate(MID, MID);

  layers = [];
  noFill();

  for (let i = 0; i < POLYS; i++) {
    const r = map(i, 0, POLYS - 1, 0, MAX_R);
    const rot = radians(i * ROT_STEP);
    const verts = getPolygonVertices(0, 0, r, SIDES, rot);
    layers.push(verts);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );
    strokeWeight(2);

    beginShape();
    verts.forEach(v => vertex(v.x, v.y));
    endShape(CLOSE);
  }

  for (let i = 0; i < POLYS - 1; i++) {
    for (let j = i + 1; j < POLYS; j++) {

      stroke(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );
      strokeWeight(2);

      for (let k = 0; k < SIDES; k++) {
        const v1 = layers[i][k];
        const v2 = layers[j][k];
        line(v1.x, v1.y, v2.x, v2.y);
      }
    }
  }
}

function getPolygonVertices(x, y, radius, sides, rotation = 0) {
  let verts = [];
  for (let i = 0; i < sides; i++) {
    const angle = TWO_PI * i / sides + rotation;
    const vx = x + cos(angle) * radius;
    const vy = y + sin(angle) * radius;
    verts.push({ x: vx, y: vy });
  }
  return verts;
}