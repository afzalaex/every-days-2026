const BASE = 1000;
let s = 1;

const lines = 120;
const range = 250;

let vColors = [];
let hColors = [];

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);

  colorMode(RGB);

  for (let i = 0; i < lines; i++) {
    vColors.push(color(random(155,255), random(155,255), random(155,255)));
    hColors.push(color(random(155,255), random(155,255), random(155,255)));
  }
}

function draw() {

  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2 / s);

  let mx = mouseX / s - BASE / 2;
  let my = mouseY / s - BASE / 2;

  mx = constrain(mx, -range, range);
  my = constrain(my, -range, range);

  let tension = map(mx, -range, range, 10, 120);
  let frequency = map(my, -range, range, 0.005, 0.04);

  for (let i = 0; i < lines; i++) {

    let t = map(i, 0, lines, -range, range);
    let offset = sin(t * frequency) * tension;

    stroke(vColors[i]);

    line(t + offset, -range, t - offset, range);
  }

  for (let i = 0; i < lines; i++) {

    let t = map(i, 0, lines, -range, range);
    let offset = cos(t * frequency) * tension;

    stroke(hColors[i]);

    line(-range, t + offset, range, t - offset);
  }
}