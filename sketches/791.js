const BASE = 1000;

let angle = 0;
let viewScale = 1;

function setup() {
  createCanvas(BASE, BASE, WEBGL);
  strokeWeight(2);
  noFill();

  computeScale();
}

function computeScale() {
  const s = min(windowWidth, windowHeight, BASE);
  resizeCanvas(s, s);
  viewScale = s / BASE;
}

function windowResized() {
  computeScale();
}

function draw() {
  background(0);

  ortho(
    -BASE/2, BASE/2,
    -BASE/2, BASE/2,
    -2000, 2000
  );

  rotateX(angle);
  rotateY(angle);

  drawPlanes();

  angle += 0.01;
}

function drawPlanes() {
  let size = 450;

  for (let i = 0; i < 10; i++) {

    push();

    let a = angle + i * PI / 24;

    rotateX(a);
    rotateY(a);
    rotateZ(a);

    stroke(
      155 + (i * 20) % 100,
      155 + (i * 30) % 100,
      155 + (i * 40) % 100
    );

    drawPlane(size, 20);

    pop();
  }
}

function drawPlane(size, divisions) {
  let step = size / divisions;
  let half = size / 2;

  for (let x = -half; x <= half; x += step) {
    line(x, -half, 0, x, half, 0);
  }

  for (let y = -half; y <= half; y += step) {
    line(-half, y, 0, half, y, 0);
  }
}