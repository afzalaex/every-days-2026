const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const COUNT = 100;

const ARM = 120;
const LINE_WEIGHT = 3;

const GIF_DURATION = 4;
const FPS = 60;
const FRAMES = GIF_DURATION * FPS;

let motion = 0;
let motionStep;

let elements = [];

function setup() {
  createCanvas(SIZE, SIZE);
  pixelDensity(1);

  motionStep = TWO_PI / FRAMES;

  generate();
}

function draw() {
  background(0);

  push();
  translate(OFFSET, OFFSET);

  noFill();

  for (let i = 0; i < elements.length; i++) {
    let f = elements[i];

    let t = i / (COUNT - 1);

    let wave = sin(motion + t * TWO_PI);

    let angle = f.angle + wave * 0.9;

    strokeWeight(LINE_WEIGHT);
    stroke(f.color[0], f.color[1], f.color[2]);

    push();

    translate(f.x, f.y);
    rotate(angle);

    line(-ARM, 0, ARM, 0);
    line(0, 0, 0, ARM);

    pop();
  }

  pop();

  motion += motionStep;

  if (motion >= TWO_PI) {
    motion -= TWO_PI;
  }
}

function generate() {
  elements = [];

  let center = ART / 2;

  for (let i = 0; i < COUNT; i++) {
    let t = i / (COUNT - 1);

    elements.push({
      x: center - 170 + t * 340,
      y: center - 170 + t * 340,

      angle: -QUARTER_PI + t * HALF_PI,

      color: [random(155, 255), random(155, 255), random(155, 255)],
    });
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("Dillusion", GIF_DURATION);
  }
}
