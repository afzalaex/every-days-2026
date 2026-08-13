const CANVAS_SIZE = 1000;
const ART_SIZE = 500;
const ART_OFFSET = (CANVAS_SIZE - ART_SIZE) / 2;

let viewScale;
let pressureBands = [];
let pressureAnchors = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), CANVAS_SIZE) / CANVAS_SIZE;
}

function setup() {
  computeScale();

  createCanvas(CANVAS_SIZE * viewScale, CANVAS_SIZE * viewScale);

  noLoop();
  generateArtwork();
}

function draw() {
  background(0);

  push();

  scale(viewScale);

  translate(ART_OFFSET, ART_OFFSET);

  noStroke();

  for (let currentBand of pressureBands) {
    fill(currentBand.redValue, currentBand.greenValue, currentBand.blueValue);

    beginShape();

    for (let currentVertex of currentBand.vertices) {
      vertex(currentVertex.vertexX, currentVertex.vertexY);
    }

    endShape(CLOSE);
  }

  pop();
}

function generateArtwork() {
  pressureBands = [];
  pressureAnchors = [];

  for (let anchorIndex = 0; anchorIndex < 5; anchorIndex++) {
    pressureAnchors.push({
      anchorX: random(-100, ART_SIZE + 100),
      anchorY: random(-100, ART_SIZE + 100),
      anchorStrength: random(0, 4),
    });
  }

  let totalBands = floor(random(10, 25));
  let verticalSpacing = ART_SIZE / totalBands;

  for (let bandIndex = 0; bandIndex < totalBands; bandIndex++) {
    let startingY = bandIndex * verticalSpacing;

    let bandThickness = random(verticalSpacing * 0.35, verticalSpacing * 0.58);

    let bandVertices = [];

    let horizontalSegments = 25;
    let horizontalSpacing = ART_SIZE / horizontalSegments;

    for (
      let segmentIndex = 0;
      segmentIndex <= horizontalSegments;
      segmentIndex++
    ) {
      let vertexX = segmentIndex * horizontalSpacing;

      let vertexY = startingY + calculatePressure(vertexX, startingY);

      bandVertices.push({
        vertexX: vertexX,
        vertexY: vertexY,
      });
    }

    for (
      let segmentIndex = horizontalSegments;
      segmentIndex >= 0;
      segmentIndex--
    ) {
      let vertexX = segmentIndex * horizontalSpacing;

      let vertexY =
        startingY +
        bandThickness +
        calculatePressure(vertexX, startingY + bandThickness);

      bandVertices.push({
        vertexX: vertexX,
        vertexY: vertexY,
      });
    }

    pressureBands.push({
      vertices: bandVertices,

      redValue: random(155, 255),
      greenValue: random(155, 255),
      blueValue: random(155, 255),
    });
  }

  for (let fractureIndex = 0; fractureIndex < 9; fractureIndex++) {
    let fractureX = random(30, ART_SIZE - 30);

    let fractureWidth = random(2, 20);

    for (let currentBand of pressureBands) {
      for (let currentVertex of currentBand.vertices) {
        if (abs(currentVertex.vertexX - fractureX) < fractureWidth) {
          currentVertex.vertexX += random(-12, 12);
        }
      }
    }
  }

  pressureBands.sort(function (firstBand, secondBand) {
    let firstBrightness =
      firstBand.redValue + firstBand.greenValue + firstBand.blueValue;

    let secondBrightness =
      secondBand.redValue + secondBand.greenValue + secondBand.blueValue;

    return firstBrightness - secondBrightness;
  });
}

function calculatePressure(targetX, targetY) {
  let accumulatedPressure = 0;

  for (let currentAnchor of pressureAnchors) {
    let horizontalDistance = targetX - currentAnchor.anchorX;

    let verticalDistance = targetY - currentAnchor.anchorY;

    let radialDistance = sqrt(
      horizontalDistance * horizontalDistance +
        verticalDistance * verticalDistance
    );

    if (radialDistance < 1) {
      continue;
    }

    let pressureInfluence = 1 / (1 + radialDistance * 0.035);

    let pressureDirection = horizontalDistance > 0 ? 1 : -1;

    accumulatedPressure +=
      pressureDirection *
      pressureInfluence *
      currentAnchor.anchorStrength *
      18 *
      sin(radialDistance * 0.025);
  }

  return constrain(accumulatedPressure, -7, 7);
}

function mousePressed() {
  generateArtwork();
  redraw();
}
