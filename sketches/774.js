const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s = 1;

let gridCount = 25;
let fixedRadius = 250;
let baseStroke = 3;

let colors = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();

  for (let gx = 0; gx < gridCount; gx++) {
    colors[gx] = [];
    for (let gy = 0; gy < gridCount; gy++) {
      colors[gx][gy] = [
        random(155,255),
        random(155,255),
        random(155,255)
      ];
    }
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  let cell = ART / gridCount;

  let mx = (mouseX / s) - BASE / 2;
  let my = (mouseY / s) - BASE / 2;

  let insideArt =
    mx > -HALF && mx < HALF &&
    my > -HALF && my < HALF;

  for (let gx = 0; gx < gridCount; gx++) {
    for (let gy = 0; gy < gridCount; gy++) {

      let x = -HALF + gx * cell + cell / 2;
      let y = -HALF + gy * cell + cell / 2;

      let angle = PI / 4;

      if (insideArt) {
        let shearX = map(mx, -HALF, HALF, -1, 1);
        let shearY = map(my, -HALF, HALF, -1, 1);

        angle += shearX * (y / HALF) * PI * 0.5;
        angle += shearY * (x / HALF) * PI * 0.5;
      }

      let lengthFactor = fixedRadius * 0.06;

      let x1 = cos(angle) * lengthFactor;
      let y1 = sin(angle) * lengthFactor;

      let x2 = cos(angle + PI / 2) * lengthFactor;
      let y2 = sin(angle + PI / 2) * lengthFactor;

      push();
      translate(x, y);

      let c = colors[gx][gy];
      stroke(c[0], c[1], c[2]);

      strokeWeight(baseStroke / s);
      noFill();

      line(-x1, -y1, x1, y1);
      line(-x2, -y2, x2, y2);

      pop();
    }
  }

  pop();
}

function mouseMoved() {
  redraw();
}