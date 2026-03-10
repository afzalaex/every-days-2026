const BASE = 1000;
const ART = 550;
const HALF = ART / 2;

let s = 1;

let layers = 300;
let maxR = 550;

let layerColors = [];
let phase = 0;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  rectMode(CENTER);
  noFill();

  for (let i = 0; i < layers; i++) {
    layerColors.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2 / s);

  phase += 0.09;

  for (let i = 0; i < layers; i++) {

    let shifted = (i + phase) % layers;

    let a = shifted * 0.04;
    let r = map(shifted, 0, layers, maxR, 0);

    let col = layerColors[i];
    stroke(col[0], col[1], col[2]);

    push();
    rotate(a);
    rect(0, 0, r, r / 2);
    pop();
  }
}