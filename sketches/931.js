let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), 1000) / 1000;
}

function setup() {
  computeScale();
  createCanvas(1000 * viewScale, 1000 * viewScale);
  strokeWeight(2 * viewScale);
  noLoop();
}

function draw() {
  background(0);

  let canvasWidth = 500;
  let canvasHeight = 500;
  let offsetX = (1000 - canvasWidth) / 2;
  let offsetY = (1000 - canvasHeight) / 2;

  push();
  scale(viewScale);

  for (let y = offsetY + 20; y < offsetY + canvasHeight; y += 40) {
    for (let x = offsetX + 20; x < offsetX + canvasWidth; x += 40) {
      stroke(random(155, 255), random(155, 255), random(155, 255));
      drawLines(x, y);
    }
  }

  pop();
}

function drawLines(x, y) {
  let angleStep = 40;

  for (let i = 0; i < 360; i += angleStep) {
    let x1 = x + cos(radians(i)) * 40;
    let y1 = y + sin(radians(i)) * 40;
    let x2 = x + cos(radians(i + 180)) * 40;
    let y2 = y + sin(radians(i + 180)) * 40;

    line(x1, y1, x2, y2);
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(1000 * viewScale, 1000 * viewScale);
  strokeWeight(2 * viewScale);
  redraw();
}
