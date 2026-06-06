const BASE = 1000;
const ART = 500;

let s;

function computeScale() {
  s = Math.min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);
  translate(-ART / 2, -ART / 2);

  drawComposition(0, 0, ART, ART, 6);

  pop();
}

function drawComposition(x, y, w, h, depth) {
  if (depth <= 0 || (w < 20 && h < 20)) {
    noStroke();
    if (random() < 0.3) {
      fill(getRandomColor());
      rect(x, y, w, h);
    }
  } else {
    if (random() < 0.5) {
      let splitPoint = random(w * 0.3, w * 0.7);
      drawComposition(x, y, splitPoint, h, depth - 1);
      drawComposition(x + splitPoint, y, w - splitPoint, h, depth - 1);
    } else {
      let splitPoint = random(h * 0.3, h * 0.7);
      drawComposition(x, y, w, splitPoint, depth - 1);
      drawComposition(x, y + splitPoint, w, h - splitPoint, depth - 1);
    }
  }

  stroke(255);
  strokeWeight(map(depth, 0, 8, 0.5, 2));
  noFill();
  rect(x, y, w, h);
}

function getRandomColor() {
  return color(
    random(155, 255),
    random(155, 255),
    random(155, 255)
  );
}

function mousePressed() {
  redraw();
}