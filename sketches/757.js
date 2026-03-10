const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let beams = 120;
let beamColors = [];

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function windowResized() {
  resizeCanvas(1, 1);
  computeCanvas();
}

function setup() {
  computeCanvas();
  strokeWeight(6);
  noFill();

  for (let i = 0; i < beams; i++) {
    beamColors.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }
}

function draw() {
  background(0);

  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  push();
  translate(-HALF, -HALF);

  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  let curvature = map(my, -HALF, HALF, -200, 200);
  let converge = map(mx, -HALF, HALF, 0, ART);

  for (let i = 0; i < beams; i++) {

    let yStart = map(i, 0, beams - 1, 0, ART);

    let controlX = converge;
    let controlY = yStart + curvature;

    let c = beamColors[i];
    stroke(c[0], c[1], c[2]);

    bezier(
      0, yStart,
      controlX, controlY,
      ART - controlX, ART - controlY,
      ART, yStart
    );
  }

  pop();
}





