const BASE = 1000;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  strokeCap(SQUARE);
  strokeJoin(MITER);

  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function mousePressed() {
  generate();
  redraw();
}

function generate() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);

  noFill();

  let numRings = 80;
  let maxRadius = 300;
  let angleStep = 1;

  for (let r = maxRadius; r > 0; r -= maxRadius / numRings) {
    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    strokeWeight(3);

    let startAngle = random(TWO_PI);
    let endAngle = startAngle + random(PI / 3, PI);

    beginShape();

    for (
      let angle = startAngle;
      angle <= endAngle;
      angle += radians(angleStep)
    ) {
      vertex(
        cos(angle) * r,
        sin(angle) * r
      );
    }

    endShape();
  }

  pop();
}