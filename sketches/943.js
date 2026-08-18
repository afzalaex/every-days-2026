const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COLS = 50;
const ROWS = 50;
const SITES = 50;

let sites = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function generate() {

  sites = [];

  for (let i = 0; i < SITES; i++) {
    sites.push({
      x: random(COLS),
      y: random(ROWS),
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });
  }

  push();

  scale(viewScale);

  background(0);
  noStroke();

  const cellW = ART / COLS;
  const cellH = ART / ROWS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let closest = null;
      let closestDistance = Infinity;

      for (let site of sites) {
        let dx = x - site.x;
        let dy = y - site.y;
        let d = dx * dx + dy * dy;

        if (d < closestDistance) {
          closestDistance = d;
          closest = site;
        }
      }

      fill(closest.c);

      rect(OFFSET + x * cellW, OFFSET + y * cellH, cellW + 0.5, cellH + 0.5);
    }
  }

  stroke(0);
  strokeWeight(2);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let current = findSite(x, y);

      if (x < COLS - 1) {
        let right = findSite(x + 1, y);

        if (current !== right) {
          line(
            OFFSET + (x + 1) * cellW,
            OFFSET + y * cellH,
            OFFSET + (x + 1) * cellW,
            OFFSET + (y + 1) * cellH
          );
        }
      }

      if (y < ROWS - 1) {
        let below = findSite(x, y + 1);

        if (current !== below) {
          line(
            OFFSET + x * cellW,
            OFFSET + (y + 1) * cellH,
            OFFSET + (x + 1) * cellW,
            OFFSET + (y + 1) * cellH
          );
        }
      }
    }
  }

  pop();
}

function findSite(x, y) {
  let closest = null;
  let closestDistance = Infinity;

  for (let site of sites) {
    let dx = x - site.x;
    let dy = y - site.y;
    let d = dx * dx + dy * dy;

    if (d < closestDistance) {
      closestDistance = d;
      closest = site;
    }
  }

  return closest;
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
