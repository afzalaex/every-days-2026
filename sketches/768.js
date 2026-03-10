const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

const TOTAL_FRAMES = 240;

let columns = 32;
let segments = 100;

let phaseA, phaseB, phaseC;
let columnColorOffsets = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  resizeCanvas(BASE * viewScale, BASE * viewScale);
}

function setup() {
  createCanvas(BASE, BASE);
  computeScale();
  frameRate(60);
  generate();
}

function windowResized() {
  computeScale();
}

function generate() {

  phaseA = random(TWO_PI);
  phaseB = random(TWO_PI);
  phaseC = random(TWO_PI);

  columnColorOffsets = [];

  for (let i = 0; i < columns; i++) {
    columnColorOffsets.push(random(TWO_PI));
  }
}

function draw() {
  background(0);

  let loopProgress = frameCount % TOTAL_FRAMES;
  let t = TWO_PI * loopProgress / TOTAL_FRAMES;

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  rectMode(CENTER);
  noStroke();

  let colWidth = ART / columns;
  let segHeight = ART / segments;

  for (let i = 0; i < columns; i++) {

    let baseX = -HALF + i * colWidth + colWidth / 2;
    let colPhase = columnColorOffsets[i];

    for (let j = 0; j < segments; j++) {

      let baseY = -HALF + j * segHeight + segHeight / 2;

      let offset = sin(t + j * 0.25) * colWidth * 0.6;

      let r = 205 + 50 * sin(t + colPhase + j * 0.05 + phaseA);
      let g = 205 + 50 * sin(t + colPhase + j * 0.07 + phaseB);
      let b = 205 + 50 * sin(t + colPhase + j * 0.09 + phaseC);

      fill(
        constrain(r,155,255),
        constrain(g,155,255),
        constrain(b,155,255)
      );

      rect(baseX + offset, baseY, colWidth * 0.9, segHeight * 0.9);
    }
  }

  pop();
}

function mousePressed() {

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  if (mx > -HALF && mx < HALF && my > -HALF && my < HALF) {
    generate();
  }
}