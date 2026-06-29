const BASE = 1000;
const ART = 500;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  colorMode(RGB);
  noLoop();
}

function draw() {
  push();

  scale(s / BASE);

  background(0);

  let palette = createPalette();

  translate((BASE - ART) / 2, (BASE - ART) / 2);

  drawBackgroundShapes(palette);
  drawForegroundElements(palette);

  pop();
}

function createPalette() {
  return [
    color(random(155, 255), random(155, 255), random(155, 255)),
    color(random(155, 255), random(155, 255), random(155, 255)),
    color(random(155, 255), random(155, 255), random(155, 255)),
    color(random(155, 255), random(155, 255), random(155, 255)),
    color(random(155, 255), random(155, 255), random(155, 255))
  ];
}

function drawBackgroundShapes(palette) {
  noStroke();

  for (let i = 0; i < 8; i++) {
    fill(random(palette));

    beginShape();

    for (let j = 0; j < 8; j++) {
      curveVertex(random(ART), random(ART));
    }

    endShape(CLOSE);
  }
}

function drawForegroundElements(palette) {
  strokeCap(SQUARE);

  for (let i = 0; i < 20; i++) {
    stroke(random(palette));
    strokeWeight(random(2, 20));

    let x1 = random(ART);
    let y1 = random(ART);
    let x2 = x1 + random(-100, 100);
    let y2 = y1 + random(-100, 100);

    line(x1, y1, x2, y2);
  }

  noStroke();

  for (let i = 0; i < 20; i++) {
    fill(random(palette));

    circle(
      random(ART),
      random(ART),
      random(4, 40)
    );
  }

  for (let i = 0; i < 15000; i++) {
    point(random(ART), random(ART));
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}