const BASE = 1000;
let s = 1;

let lineColors = [];

function setup() {
  computeScale();
  generateColors();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function windowResized() {
  computeScale();
}

function generateColors() {
  lineColors = [];

  let maxLines = 100;

  for (let i = 0; i < maxLines; i++) {
    lineColors.push(color(
      random(155,255),
      random(155,255),
      random(155,255)
    ));
  }
}

function draw() {
  background(0);

  push();
  scale(s / BASE);
  translate(BASE / 2, BASE / 2);

  strokeWeight(1.5);
  noFill();

  let mx = (mouseX / s) * BASE - BASE / 2;
  let my = (mouseY / s) * BASE - BASE / 2;

  let inside = (
    mx >= -250 && mx <= 250 &&
    my >= -250 && my <= 250
  );

  let sweep = 0;
  let density = 50;

  if (inside) {
    sweep = map(mx, -250, 250, -250, 250);
    density = floor(map(my, -250, 250, 10, 60));
  }

  let spacing = 10;
  let lineIndex = 0;

  for (let y = -250; y <= 250; y += spacing) {

    stroke(lineColors[lineIndex % lineColors.length]);

    let segments = density;

    for (let i = 0; i < segments; i++) {

      let t1 = i / segments;
      let t2 = (i + 1) / segments;

      let x1 = lerp(-250, 250, t1);
      let x2 = lerp(-250, 250, t2);

      let mid = (x1 + x2) * 0.5;
      let d = abs(mid - sweep);

      let offset = map(d, 0, 200, 40, 0);
      let yOffset = sin((y + mid) * 0.02) * offset;

      line(x1, y + yOffset, x2, y + yOffset);
    }

    lineIndex++;
  }

  pop();
}