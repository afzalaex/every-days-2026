const BASE = 1000;
const ART = 500;

let s;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
  smooth();
  noLoop();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}

function mousePressed() {
  generate();
}

function generate() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  noFill();
  strokeWeight(5);

  const petals = int(random(50, 120));
  const points = 3000;
  const maxR = 250;

  for (let i = 0; i < points; i++) {
    const t = i / points;
    const angle = t * petals * TWO_PI;
    const radius = maxR * pow(t, 0.5);

    const x = radius * cos(angle + sin(t * 5) * 0.5);
    const y = radius * sin(angle + sin(t * 5) * 0.5);

    stroke(rand255(), rand255(), rand255());
    point(x, y);
  }

  pop();
}

function rand255() {
  return random(155, 255);
}