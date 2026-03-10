const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

const coreRadius = 250;

const OFFSETS = [
  0.0, 25.0, 60.0, 100.0, 140.0,
  175.0, 205.0, 230.0
];

const BASE_ANGLES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180];

const ROTATION_TARGET_DEG = 90;
const ROTATION_DURATION_S = 16;

let palette1 = [];
let palette2 = [];

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
}

function setup() {
  computeCanvas();
  frameRate(60);
  noFill();
  strokeCap(PROJECT);
  strokeJoin(MITER);

  buildPalettes();
}

function buildPalettes() {
  palette1 = [];
  palette2 = [];

  for (let a = 0; a < BASE_ANGLES.length; a++) {

    let family1 = [];
    let family2 = [];

    for (let o = 0; o < OFFSETS.length; o++) {
      family1.push(generateColor());
      family2.push(generateColor());
    }

    palette1.push(family1);
    palette2.push(family2);
  }
}

function generateColor() {
  return [
    random(155,255),
    random(155,255),
    random(155,255)
  ];
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  scale(viewScale);

  let baseStroke = 1.5;
  strokeWeight(baseStroke / viewScale);

  drawConceptLayer(0, palette1);

  const t = (millis() / 1000) % ROTATION_DURATION_S;
  const rotDeg = map(t, 0, ROTATION_DURATION_S, 0, ROTATION_TARGET_DEG);

  drawConceptLayer(rotDeg, palette2);
}

function drawConceptLayer(rotationDeg, palette) {
  push();
  rotate(radians(rotationDeg));

  stroke(220, 220, 220);
  circle(0, 0, coreRadius * 2);

  for (let i = 0; i < BASE_ANGLES.length; i++) {

    push();
    rotate(radians(BASE_ANGLES[i]));

    drawChordFamily(palette[i]);

    pop();
  }

  pop();
}

function drawChordFamily(colorFamily) {

  for (let i = 0; i < OFFSETS.length; i++) {

    let c = colorFamily[i];
    stroke(c[0], c[1], c[2]);

    const d = OFFSETS[i];

    drawChordAtOffset(d);

    if (d !== 0) {
      drawChordAtOffset(-d);
    }
  }
}

function drawChordAtOffset(d) {
  const rr = coreRadius * coreRadius - d * d;
  if (rr <= 0) return;

  const half = sqrt(rr);
  line(-half, d, half, d);
}




