const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;
const baseStroke = 2;

let particles;
let symmetry;
let maxRadius;
let freqX;
let freqY;
let phi;

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function setup() {
  computeCanvas();
  noLoop();
  angleMode(RADIANS);
  generateArt();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(viewScale);

  strokeWeight(baseStroke);
  noFill();

  renderArt();
}

function mousePressed() {

  let mx = (mouseX - width / 2) / viewScale;
  let my = (mouseY - height / 2) / viewScale;

  if (mx >= -HALF && mx <= HALF && my >= -HALF && my <= HALF) {
    generateArt();
    redraw();
  }
}

function generateArt() {
  particles = 5000;
  symmetry = 2;
  maxRadius = 200;

  freqX = random(1, 5);
  freqY = random(1, 5);
  phi = random(TWO_PI);
}

function renderArt() {
  for (let i = 0; i < particles; i++) {

    let t = map(i, 0, particles, 0, TWO_PI * 8);
    let r = map(sin(t * 3 + phi), -1, 1, 50, maxRadius);

    let x = r * sin(freqX * t + phi);
    let y = r * sin(freqY * t);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    for (let s = 0; s < symmetry; s++) {
      let angle = s * TWO_PI / symmetry;
      let sx = x * cos(angle) - y * sin(angle);
      let sy = x * sin(angle) + y * cos(angle);
      point(sx, sy);
    }
  }
}