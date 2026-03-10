const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;
let rotationOffset = 0;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  resizeCanvas(BASE * viewScale, BASE * viewScale);
}

function setup() {
  createCanvas(BASE, BASE);
  computeScale();
  noLoop();
}

function windowResized() {
  computeScale();
  redraw();
}

function mousePressed() {
  if (insideArt()) {
    redraw();
  }
}

function mouseWheel(event) {
  if (insideArt()) {
    rotationOffset += event.delta * 0.0005;
    redraw();
    return false;
  }
}

function insideArt() {
  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  return (
    mx > -HALF &&
    mx < HALF &&
    my > -HALF &&
    my < HALF
  );
}

function draw() {

  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);
  rotate(rotationOffset);

  const maxRadius = 250;
  const ringCount = 10;
  const segmentCount = 220;
  const thickness = 10;
  const frequency = 120;
  const warp = 1;

  noStroke();

  for (let i = 0; i < ringCount; i++) {

    let baseR = map(i, 0, ringCount - 1, 0, maxRadius);
    let ringOffset = map(i, 0, ringCount - 1, 0, TWO_PI * warp);

    for (let j = 0; j < segmentCount; j++) {

      let angleStep = TWO_PI / segmentCount;
      let angle = angleStep * j;

      let wave = sin(angle * frequency + ringOffset);

      let localThick = thickness + wave * 8;
      let rInner = baseR + wave * 18;
      let rOuter = rInner + localThick;

      let a1 = angle;
      let a2 = angle + angleStep * 1.2;

      let x1 = cos(a1) * rInner;
      let y1 = sin(a1) * rInner;
      let x2 = cos(a2) * rInner;
      let y2 = sin(a2) * rInner;

      let x3 = cos(a2) * rOuter;
      let y3 = sin(a2) * rOuter;
      let x4 = cos(a1) * rOuter;
      let y4 = sin(a1) * rOuter;

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      quad(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  }

  pop();
}