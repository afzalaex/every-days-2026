const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

let palette = [];
let layers = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function generate() {
  background(0);

  layers = [];

  const layerCount = floor(random(8, 18));

  palette = [];

  for (let i = 0; i < layerCount; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  const cx = OFFSET + ART / 2;
  const cy = OFFSET + ART / 2;

  for (let i = 0; i < layerCount; i++) {
    const t = i / layerCount;

    layers.push({
      w: lerp(random(380, 500), random(25, 90), t),

      h: lerp(random(380, 500), random(25, 90), t),

      x: random(-45, 45),
      y: random(-45, 45),

      skewTop: random(-70, 70),
      skewBottom: random(-70, 70),

      rotation: random(-0.08, 0.08),

      colorIndex: i,
    });
  }

  push();

  scale(viewScale);

  rectMode(CENTER);
  noStroke();

  for (let layer of layers) {
    push();

    translate(cx + layer.x, cy + layer.y);

    rotate(layer.rotation);

    fill(palette[layer.colorIndex]);

    beginShape();

    vertex(-layer.w / 2 + layer.skewTop, -layer.h / 2);

    vertex(layer.w / 2 + layer.skewTop, -layer.h / 2);

    vertex(layer.w / 2 + layer.skewBottom, layer.h / 2);

    vertex(-layer.w / 2 + layer.skewBottom, layer.h / 2);

    endShape(CLOSE);

    pop();
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
