const BASE = 1000;
const ART = 500;

const SIZE = 62.5;
const HALF = SIZE / 2;

let viewScale = 1;

const RECTS = [
  [250,250],[250,312.5],[312.5,312.5],[312.5,250],
  [375,312.5],[437.5,312.5],[375,250],
  [500,312.5],[562.5,312.5],[562.5,250],
  [625,312.5],[687.5,312.5],[625,250],
  [312.5,437.5],[250,375],[312.5,375],[375,375],
  [375,437.5],[437.5,375],
  [562.5,437.5],[500,375],[562.5,375],[625,375],
  [625,437.5],[687.5,375],
  [250,500],[250,562.5],[312.5,562.5],[312.5,500],
  [375,562.5],[437.5,562.5],[375,500],[437.5,500],
  [500,500],[500,562.5],[562.5,562.5],[562.5,500],
  [625,562.5],[687.5,562.5],[625,500],[687.5,500],
  [312.5,687.5],[250,625],[312.5,625],[375,625],
  [375,687.5],[437.5,687.5],[437.5,625],
  [500,687.5],[562.5,687.5],[500,625],[562.5,625],
  [625,625],[625,687.5],[687.5,625],
  [250,937.5],[312.5,937.5],[312.5,875],
  [375,937.5],[437.5,937.5],[375,875],[437.5,875],
  [500,875],[500,937.5],[562.5,937.5],[562.5,875],
  [625,937.5],[687.5,937.5],[625,875]
];

let colors = [];

function setup() {
  computeCanvas();
  strokeWeight(2);
  noFill();
  generateColors();
  noLoop();
}

function computeCanvas() {
  const s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
  pixelDensity(2);
}

function generateColors() {
  colors = RECTS.map(() =>
    color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    )
  );
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  mx = constrain(mx, -ART / 2, ART / 2);
  my = constrain(my, -ART / 2, ART / 2);

  for (let i = 0; i < RECTS.length; i++) {
    const [x, y] = RECTS[i];

    const cx = x + HALF - BASE / 2;
    const cy = y + HALF - BASE / 2;

    const dx = cx - mx;
    const dy = cy - my;
    const d = sqrt(dx * dx + dy * dy);

    let depth = map(d, 0, ART * 0.7, 8, 1);
    depth = constrain(depth, 1, 8);

    stroke(colors[i]);
    drawNestedFrame(x, y, SIZE, depth);
  }

  pop();
}

function drawNestedFrame(x, y, size, depth) {
  let margin = size / (depth * 2);

  let px = x;
  let py = y;
  let w = size;
  let h = size;

  for (let i = 0; i < depth; i++) {
    rect(px, py, w, h);
    px += margin;
    py += margin;
    w -= margin * 2;
    h -= margin * 2;
  }
}

function mouseMoved() {
  redraw();
}

function windowResized() {
  resizeCanvas(1, 1);
  computeCanvas();
  redraw();
}
