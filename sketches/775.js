const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s = 1;
let sides = 2;
let NODES = 24;
let baseStroke = 2;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function mousePressed() {
  sides += 2;
  if (sides > 24) sides = 2;
  redraw();
}

function draw() {

  background(0);
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(baseStroke / s);
  noFill();

  let pts = [];

  let CHORDS = 1000 + (sides - 2) * 1000;

  if (sides === 2) {
    for (let i = 0; i < NODES; i++) {
      let t = i / (NODES - 1);
      let x = lerp(-HALF, HALF, t);
      let y = 0;
      pts.push(createVector(x, y));
    }
  } 
  else {

    for (let i = 0; i < NODES; i++) {

      let angle = TWO_PI * i / NODES;

      let stepAngle = TWO_PI / sides;
      let sector = floor(angle / stepAngle);
      let localAngle = angle - sector * stepAngle;

      let a0 = sector * stepAngle;
      let a1 = a0 + stepAngle;

      let p0 = createVector(
        cos(a0) * HALF,
        sin(a0) * HALF
      );

      let p1 = createVector(
        cos(a1) * HALF,
        sin(a1) * HALF
      );

      let t = localAngle / stepAngle;

      let x = lerp(p0.x, p1.x, t);
      let y = lerp(p0.y, p1.y, t);

      pts.push(createVector(x, y));
    }
  }

  for (let i = 0; i < CHORDS; i++) {

    let a = random(pts);
    let b = random(pts);

    let mx = (a.x + b.x) * 0.5;
    let my = (a.y + b.y) * 0.5;

    let bend = random(-40, 40);

    let nx = mx + (b.y - a.y) * 0.002 * bend;
    let ny = my - (b.x - a.x) * 0.002 * bend;

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    beginShape();
    vertex(a.x, a.y);
    quadraticVertex(nx, ny, b.x, b.y);
    endShape();
  }

  pop();
}