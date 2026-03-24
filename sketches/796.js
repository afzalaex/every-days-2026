const BASE = 1000;
let s;

let layers = 36;
let colors = [];

function setup() {
  computeScale();
  rectMode(CENTER);
  noStroke();
  generateColors();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function windowResized() {
  computeScale();
  redraw();
}

function generateColors() {
  colors = [];
  for (let i = 0; i < layers; i++) {
    colors.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }
}

function mousePressed() {
  generateColors();
  redraw();
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  scale(s / BASE);

  let mx = (mouseX - width / 2) * (BASE / s);
  let my = (mouseY - height / 2) * (BASE / s);

  mx = constrain(mx, -250, 250);
  my = constrain(my, -250, 250);

  let dx = mx / 250;
  let dy = my / 250;

  for (let i = 0; i < layers; i++) {

    let t = i / (layers - 1);

    let w = 500 * (1 - t * 0.6);
    let h = 500 * (1 - t * 0.6);

    let x = dx * t * 120;
    let y = dy * t * 120;

    let col = colors[i];
    fill(col[0], col[1], col[2]);

    rect(x, y, w, h);
  }
}