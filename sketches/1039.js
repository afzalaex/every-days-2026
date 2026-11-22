const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;
let blades = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function generateArt() {
  blades = [];
  const count = 500;
  const maxR = ART / 2;

  for (let i = 0; i < count; i++) {
    const angle = random(TWO_PI);
    const innerR = random(maxR * 0.08, maxR * 0.35);
    const outerR = random(innerR + maxR * 0.2, maxR * 0.98);
    const spread = random(0.06, 0.22);

    blades.push({
      angle,
      innerR,
      outerR,
      spread,
      c: randomColor(),
    });
  }

  blades.sort((a, b) => b.outerR - a.outerR);
  redraw();
}

function draw() {
  background(0);
  push();
  scale(viewScale);
  translate(OFFSET + ART / 2, OFFSET + ART / 2);
  stroke(0);
  strokeWeight(1);

  for (const b of blades) {
    fill(b.c);
    beginShape();
    
    vertex(
      cos(b.angle - b.spread / 2) * b.innerR,
      sin(b.angle - b.spread / 2) * b.innerR
    );
    vertex(
      cos(b.angle + b.spread / 2) * b.innerR,
      sin(b.angle + b.spread / 2) * b.innerR
    );

    vertex(
      cos(b.angle + b.spread / 2) * b.outerR,
      sin(b.angle + b.spread / 2) * b.outerR
    );
    vertex(
      cos(b.angle - b.spread / 2) * b.outerR,
      sin(b.angle - b.spread / 2) * b.outerR
    );
    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generateArt();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
