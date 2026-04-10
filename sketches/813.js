const BASE = 1000;
let s = 1;

const MID = BASE / 2;

let seed;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  angleMode(RADIANS);
  colorMode(RGB);

  seed = floor(random(100000));
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);

  background(0);
  scale(s);

  translate(MID, MID);

  let layers = 500;
  let points = 180;
  let maxR = 180;

  for (let i = 0; i < layers; i++) {

    let radius = map(i, 0, layers, 0, maxR);
    strokeWeight(map(i, 0, layers, 2, 0.15));

    let rCol = random(155, 255);
    let gCol = random(155, 255);
    let bCol = random(155, 255);

    stroke(rCol, gCol, bCol);
    noFill();

    beginShape();

    for (let a = 0; a < TWO_PI; a += TWO_PI / points) {

      let noiseWarp = noise(
        cos(a) * 2,
        sin(a) * 2,
        i * 0.02
      );

      let r = radius * (0.7 + noiseWarp * 1.4);

      let x = cos(a + noiseWarp * 0.5) * r;
      let y = sin(a - noiseWarp * 0.4) * r;

      curveVertex(x, y);
    }

    endShape(CLOSE);
  }
}

function mousePressed() {
  seed = floor(random(100000));
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}