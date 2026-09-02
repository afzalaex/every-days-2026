const BASE = 1000;
const ART = 500;

let canvasSize;

const GRID_SIZE = 50;
const PATH_COUNT = 100;
const MIN_STEPS = 5;
const MAX_STEPS = 50;

const LINE_WEIGHT = 3;

let colorPalette = [];

function computeCanvasSize() {
  canvasSize = min(min(windowWidth, windowHeight), BASE);
}

function setup() {
  computeCanvasSize();
  createCanvas(canvasSize, canvasSize);

  strokeCap(SQUARE);
  strokeJoin(MITER);

  noLoop();
}

function windowResized() {
  computeCanvasSize();
  resizeCanvas(canvasSize, canvasSize);
  redraw();
}

function draw() {
  background(0);

  const scaleFactor = canvasSize / BASE;
  const artworkSize = ART * scaleFactor;

  const artworkX = (canvasSize - artworkSize) / 2;
  const artworkY = (canvasSize - artworkSize) / 2;

  const cellSizePx = artworkSize / GRID_SIZE;

  colorPalette = [];

  for (let i = 0; i < 25; i++) {
    colorPalette.push(
      color(random(155, 255), random(155, 255), random(155, 255))
    );
  }

  let occupancy = [];

  for (let x = 0; x < GRID_SIZE; x++) {
    occupancy[x] = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      occupancy[x][y] = 0;
    }
  }

  strokeWeight(LINE_WEIGHT * scaleFactor);
  noFill();

  for (let pathIndex = 0; pathIndex < PATH_COUNT; pathIndex++) {
    let gridX = floor(random(GRID_SIZE));
    let gridY = floor(random(GRID_SIZE));

    let direction = floor(random(4));

    let pathLength = floor(random(MIN_STEPS, MAX_STEPS + 1));

    stroke(random(colorPalette));

    beginShape();

    for (let pathPoint = 0; pathPoint < pathLength; pathPoint++) {
      if (gridX < 0 || gridX >= GRID_SIZE || gridY < 0 || gridY >= GRID_SIZE) {
        break;
      }

      const pointX = artworkX + gridX * cellSizePx + cellSizePx / 2;

      const pointY = artworkY + gridY * cellSizePx + cellSizePx / 2;

      vertex(pointX, pointY);

      occupancy[gridX][gridY]++;

      const turnChance = random();

      if (turnChance < 0.62) {
      } else if (turnChance < 0.91) {
        direction = (direction + random([-1, 1]) + 4) % 4;
      } else {
        direction = (direction + 2) % 4;
      }

      if (direction === 0) gridX++;
      if (direction === 1) gridY++;
      if (direction === 2) gridX--;
      if (direction === 3) gridY--;

      if (
        gridX >= 0 &&
        gridX < GRID_SIZE &&
        gridY >= 0 &&
        gridY < GRID_SIZE &&
        occupancy[gridX][gridY] > 2 &&
        pathPoint > 4 &&
        random() < 0.25
      ) {
        break;
      }
    }

    endShape();
  }

  for (let gridX = 1; gridX < GRID_SIZE - 1; gridX++) {
    for (let gridY = 1; gridY < GRID_SIZE - 1; gridY++) {
      if (occupancy[gridX][gridY] < 2) continue;
      if (random() > 0.28) continue;

      const pointX = artworkX + gridX * cellSizePx + cellSizePx / 2;

      const pointY = artworkY + gridY * cellSizePx + cellSizePx / 2;

      const radius = cellSizePx * random(0.18, 0.42);

      stroke(random(colorPalette));

      const formType = floor(random(4));

      if (formType === 0) {
        line(pointX - radius, pointY, pointX + radius, pointY);

        line(pointX, pointY - radius, pointX, pointY + radius);
      } else if (formType === 1) {
        beginShape();

        vertex(pointX, pointY - radius);
        vertex(pointX + radius, pointY);
        vertex(pointX, pointY + radius);
        vertex(pointX - radius, pointY);

        endShape(CLOSE);
      } else if (formType === 2) {
        arc(
          pointX - radius,
          pointY - radius,
          radius * 2,
          radius * 2,
          0,
          HALF_PI
        );
      } else {
        line(
          pointX - radius,
          pointY - radius,
          pointX + radius,
          pointY + radius
        );

        line(
          pointX + radius,
          pointY - radius,
          pointX - radius,
          pointY + radius
        );
      }
    }
  }

  for (let diamondIndex = 0; diamondIndex < 14; diamondIndex++) {
    const pointX = artworkX + random(artworkSize);

    const pointY = artworkY + random(artworkSize);

    const diamondSize = random(12, 30) * scaleFactor;

    stroke(random(colorPalette));

    beginShape();

    vertex(pointX - diamondSize, pointY);
    vertex(pointX, pointY - diamondSize);
    vertex(pointX + diamondSize, pointY);
    vertex(pointX, pointY + diamondSize);

    endShape(CLOSE);
  }
}

function mousePressed() {
  redraw();
}
