const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;
let resolution = 60;
let step;

let colorGrid = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  resizeCanvas(BASE * viewScale, BASE * viewScale);
}

function setup() {
  createCanvas(BASE, BASE);
  computeScale();

  step = ART / resolution;

  for (let x = 0; x <= ART; x += step) {

    let columnColors = [];

    for (let y = 0; y <= ART; y += step) {
      columnColors.push({
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255)
      });
    }

    colorGrid.push(columnColors);
  }
}

function windowResized() {
  computeScale();
}

function draw() {
  background(0);

  scale(viewScale);
  translate(BASE / 2, BASE / 2);
  translate(-HALF, -HALF);

  strokeWeight(1.5 / viewScale);

  let mx = mouseX / viewScale - BASE / 2 + HALF;
  let my = mouseY / viewScale - BASE / 2 + HALF;

  let xi = 0;

  for (let x = 0; x <= ART; x += step) {

    let yi = 0;

    for (let y = 0; y <= ART; y += step) {

      let baseAngle =
        sin(x * 0.015) * 1.2 +
        cos(y * 0.018) * 1.1 +
        sin((x + y) * 0.01);

      let dx = mx - x;
      let dy = my - y;
      let d = sqrt(dx * dx + dy * dy);

      let radius = 200;
      let influence = 0;

      if (d < radius) {
        let falloff = 1 - (d / radius);
        falloff *= falloff;

        let injectAngle = atan2(dy, dx);
        influence = injectAngle * falloff;
      }

      let finalAngle = baseAngle * 0.7 + influence * 0.9;
      let snapped = round(finalAngle / (PI / 4)) * (PI / 4);

      let len = step * 0.9;

      let x2 = x + cos(snapped) * len;
      let y2 = y + sin(snapped) * len;

      let c = colorGrid[xi][yi];
      stroke(c.r, c.g, c.b);

      line(x, y, x2, y2);

      yi++;
    }

    xi++;
  }
}