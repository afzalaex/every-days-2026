const CANVAS = 1000;
let s = 1;

const MID = CANVAS / 2;
const ART_SIZE = 500;
const MAX_R = ART_SIZE / 2;

const VEINS = 5000;
const SEGMENTS = 100;

function setup() {
  computeScale();
  createCanvas(CANVAS * s, CANVAS * s);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / CANVAS;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(CANVAS * s, CANVAS * s);
  redraw();
}

function draw() {
  background(0);
  scale(s);
  drawArtwork();
}

function drawArtwork() {
  push();
  translate(MID, MID);

  let mx = mouseX / s;
  let my = mouseY / s;

  let angleDrift = map(mx, 0, CANVAS, 0.05, 0.6);
  let stepMin = map(my, 0, CANVAS, 3, 8);
  let stepMax = map(my, 0, CANVAS, 8, 18);

  for (let v = 0; v < VEINS; v++) {
    let angle = random(TWO_PI);
    let x = 0;
    let y = 0;

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    strokeWeight(2);
    noFill();

    beginShape();

    for (let i = 0; i < SEGMENTS; i++) {
      vertex(x, y);

      x += cos(angle) * random(stepMin, stepMax);
      y += sin(angle) * random(stepMin, stepMax);

      angle += random(-angleDrift, angleDrift);

      if (dist(0, 0, x, y) > MAX_R) break;
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  redraw();
}