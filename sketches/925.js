const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let viewScale;

let vRibbons = [];
let hRibbons = [];
let over = [];

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}

function draw() {
  scale(viewScale);
  background(0);

  generate();
  drawWeave();
}

function generate() {
  vRibbons = [];
  hRibbons = [];
  over = [];

  makeVerticals();
  makeHorizontals();

  for (let i = 0; i < vRibbons.length; i++) {
    over[i] = [];
    for (let j = 0; j < hRibbons.length; j++) {
      over[i][j] = random() < 0.5;
    }
  }
}

function makeVerticals() {
  const count = floor(random(10, 17));

  const totalGap = ART * 0.12;
  const usable = ART - totalGap;
  const gap = count > 1 ? totalGap / (count - 1) : 0;

  let weights = [];
  let sum = 0;

  for (let i = 0; i < count; i++) {
    const w = random(1, 2.5);
    weights.push(w);
    sum += w;
  }

  let x = OFFSET;

  for (let i = 0; i < count; i++) {
    const w = usable * (weights[i] / sum);

    vRibbons.push({
      x: x,
      w: w,
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });

    x += w + gap;
  }
}

function makeHorizontals() {
  const count = floor(random(10, 20));

  const totalGap = ART * 0.2;
  const usable = ART - totalGap;
  const gap = count > 1 ? totalGap / (count - 1) : 0;

  let weights = [];
  let sum = 0;

  for (let i = 0; i < count; i++) {
    const h = random(1, 2.5);
    weights.push(h);
    sum += h;
  }

  let y = OFFSET;

  for (let i = 0; i < count; i++) {
    const h = usable * (weights[i] / sum);

    hRibbons.push({
      y: y,
      h: h,
      c: color(random(155, 255), random(155, 255), random(155, 255)),
    });

    y += h + gap;
  }
}

function drawWeave() {
  noStroke();

  for (const v of vRibbons) {
    fill(v.c);
    rect(v.x, OFFSET, v.w, ART);
  }

  for (const h of hRibbons) {
    fill(h.c);
    rect(OFFSET, h.y, ART, h.h);
  }

  for (let i = 0; i < vRibbons.length; i++) {
    const v = vRibbons[i];

    for (let j = 0; j < hRibbons.length; j++) {
      const h = hRibbons[j];

      if (over[i][j]) {
        fill(v.c);
      } else {
        fill(h.c);
      }

      rect(v.x, h.y, v.w, h.h);
    }
  }
}

function mousePressed() {
  redraw();
}
