const BASE = 1000;
const MID = BASE / 2;

const ART_SIZE = 500;
const MAX_R = ART_SIZE / 2;

const SHARDS = 500;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  noLoop();

  generate();
}

function generate() {

  background(0);

  push();

  scale(s);

  translate(MID, MID);

  strokeWeight(1);
  noFill();

  for (let i = 0; i < SHARDS; i++) {

    let a = random(TWO_PI);

    let r1 = random(MAX_R * 0.5, MAX_R * 0.5);

    let r2 = r1 + random(20, MAX_R * 0.5);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    beginShape();

    vertex(
      r1 * cos(a),
      r1 * sin(a)
    );

    vertex(
      r2 * cos(a - 0.02),
      r2 * sin(a - 0.02)
    );

    vertex(
      r2 * cos(a + 0.02),
      r2 * sin(a + 0.02)
    );

    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}