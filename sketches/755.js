const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let particleCount = 5000;
let baseRadius = 250;

let colors = [];

function setup() {
  computeCanvas();
  noStroke();

  for (let i = 0; i < particleCount; i++) {
    colors.push([
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ]);
  }
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale, WEBGL);
}

function draw() {
  background(0);

  scale(viewScale);

  let t = frameCount * 0.006;

  rotateY(t * 0.6);
  rotateX(-PI / 6);

  for (let i = 0; i < particleCount; i++) {

    let angle = map(i, 0, particleCount, 0, TWO_PI);

    let x = baseRadius * cos(angle) * sin(t + angle * 15);
    let y = baseRadius * sin(angle) * sin(t + angle * 1500);
    let z = baseRadius * 0.5 * sin(t + angle * 30);

    push();
    translate(x, y, z);

    rotateZ(t);

    let c = colors[i];
    fill(c[0], c[1], c[2]);

    let shapeSize = sin(t + i) * 2;
    sphere(abs(shapeSize), 4, 4);

    pop();
  }
}

function windowResized() {
  computeCanvas();
}




