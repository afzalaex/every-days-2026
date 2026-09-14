const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const RINGS = 25;
const POINT_COUNT = 100;

const MIN_RADIUS = 0;
const MAX_RADIUS = 250;

const LINE_WEIGHT = 2;

let viewScale;
let rings = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noFill();

  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}

function generate() {
  rings = [];

  let noiseOffset = random(1000);
  let globalWarp = random(0.7, 1.5);

  for (let ringIndex = 0; ringIndex < RINGS; ringIndex++) {
    let baseRadius = map(ringIndex, 0, RINGS - 1, MIN_RADIUS, MAX_RADIUS);

    let ringWarp = random(0.7, 1.3);
    let ringPhase = random(TWO_PI);

    let ringPoints = [];

    let ringColor = [random(155, 255), random(155, 255), random(155, 255)];

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex++) {
      let angle = (TWO_PI * pointIndex) / POINT_COUNT + ringPhase * 0.015;

      let noiseA = noise(
        cos(angle) * globalWarp + ringIndex * 0.075 + noiseOffset,
        sin(angle) * globalWarp + ringIndex * 0.075
      );

      let noiseB = noise(
        cos(angle * 2.0) * 0.6 + ringIndex * 0.12 + noiseOffset + 100,
        sin(angle * 2.0) * 0.6
      );

      let deformationStrength = map(baseRadius, 0, MAX_RADIUS, 0, 1);

      let radiusVariation =
        (map(noiseA, 0, 1, -18, 18) * ringWarp + map(noiseB, 0, 1, -8, 8)) *
        deformationStrength;

      let pointRadius = constrain(baseRadius + radiusVariation, 0, 250);

      ringPoints.push({
        x: cos(angle) * pointRadius,
        y: sin(angle) * pointRadius,
      });
    }

    rings.push({
      points: ringPoints,
      color: ringColor,
    });
  }
}

function draw() {
  background(0);

  push();

  translate((OFFSET + ART / 2) * viewScale, (OFFSET + ART / 2) * viewScale);

  strokeWeight(LINE_WEIGHT * viewScale);
  noFill();

  for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
    let currentRing = rings[ringIndex];

    stroke(currentRing.color[0], currentRing.color[1], currentRing.color[2]);

    beginShape();

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex++) {
      let currentPoint = currentRing.points[pointIndex];

      vertex(currentPoint.x * viewScale, currentPoint.y * viewScale);
    }

    endShape(CLOSE);
  }

  for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex++) {
    let outerRing = rings[ringIndex];
    let innerRing = rings[ringIndex + 1];

    let colorMix = ringIndex / (rings.length - 1);

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex += 2) {
      let outerPoint = outerRing.points[pointIndex];

      let innerPoint = innerRing.points[pointIndex];

      let mixedRed = lerp(outerRing.color[0], innerRing.color[0], colorMix);

      let mixedGreen = lerp(outerRing.color[1], innerRing.color[1], colorMix);

      let mixedBlue = lerp(outerRing.color[2], innerRing.color[2], colorMix);

      stroke(mixedRed, mixedGreen, mixedBlue);

      line(
        outerPoint.x * viewScale,
        outerPoint.y * viewScale,
        innerPoint.x * viewScale,
        innerPoint.y * viewScale
      );
    }
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}
