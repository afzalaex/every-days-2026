const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let layers = 150;
let points = 300;
let maxRadius = 250;

let offset1, offset2;
let distortionControl = 1;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * viewScale, BASE * viewScale);
  angleMode(DEGREES);
  noFill();
  generateOffsets();
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * viewScale, BASE * viewScale);
  redraw();
}

function generateOffsets() {
  offset1 = random(1000);
  offset2 = random(1000);
}

function draw() {
  background(0);

  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  for (let i = 0; i < layers; i++) {

    let radius = map(i, 0, layers, 0, maxRadius);
    let baseDistortion = map(i, 0, layers, 5, 50);
    let distortion = baseDistortion * distortionControl;

    let baseStroke = map(i, 0, layers, 10, 0.15);
    strokeWeight(baseStroke / viewScale);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255),
      100
    );

    beginShape();

    for (let j = 0; j <= points; j++) {

      let angle = map(j, 0, points, 0, 360);

      let wave1 =
        sin(angle * 7 + i * 10 + offset1) *
        distortion;

      let wave2 =
        cos(angle * 3 + i * 20 + offset2) *
        distortion * 0.3;

      let r = radius + wave1 + wave2;

      let x = r * cos(angle);
      let y = r * sin(angle);

      vertex(x, y);
    }

    endShape(CLOSE);
  }
}

function mouseWheel(event) {
  distortionControl += event.delta * -0.0002;
  distortionControl = constrain(distortionControl, 0.2, 2);
  redraw();
  return false;
}