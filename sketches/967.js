const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const CELLS = 100;
const PARTICLES = 5000;
const STEPS = 5;

const FIELDS = 8;

const LINE_WEIGHT = 1;

let viewScale;
let fields = [];
let particles = [];

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
  fields = [];
  particles = [];

  for (let i = 0; i < FIELDS; i++) {
    fields.push({
      x: random(-0.2, 1.2),
      y: random(-0.2, 1.2),

      strength: random(0.7, 2.0),
      radius: random(0.12, 0.4),

      type: floor(random(4)),
      phase: random(TWO_PI),

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
    });
  }

  for (let i = 0; i < PARTICLES; i++) {
    let x = random();
    let y = random();

    let influences = [];

    for (let fi = 0; fi < fields.length; fi++) {
      let f = fields[fi];

      let dx = x - f.x;
      let dy = y - f.y;

      let d2 = dx * dx + dy * dy;

      let influence = exp(-d2 / (f.radius * f.radius));

      influences.push({
        field: f,
        influence: influence,
      });
    }

    influences.sort((a, b) => b.influence - a.influence);

    let primary = influences[0].field;

    let secondary = influences[floor(random(min(4, influences.length)))].field;

    let mixAmount = random();

    let r = lerp(primary.r, secondary.r, mixAmount);

    let g = lerp(primary.g, secondary.g, mixAmount);

    let b = lerp(primary.b, secondary.b, mixAmount);

    r += random(-55, 55);
    g += random(-55, 55);
    b += random(-55, 55);

    let colorWave = sin(x * 31 + y * 17 + random(TWO_PI));

    r += colorWave * 30;
    g += sin(colorWave * 2.7) * 30;
    b += cos(colorWave * 3.1) * 30;

    particles.push({
      x: x,
      y: y,

      r: constrain(r, 155, 255),
      g: constrain(g, 155, 255),
      b: constrain(b, 155, 255),
    });
  }
}

function flow(x, y) {
  let vx = 0;
  let vy = 0;

  for (let f of fields) {
    let dx = x - f.x;
    let dy = y - f.y;

    let d2 = dx * dx + dy * dy + 0.00001;

    let d = sqrt(d2);

    let influence = exp(-d2 / (f.radius * f.radius));

    if (f.type === 0) {
      vx += (dx / d) * influence * f.strength;

      vy += (dy / d) * influence * f.strength;
    } else if (f.type === 1) {
      vx += (-dy / d) * influence * f.strength;

      vy += (dx / d) * influence * f.strength;
    } else if (f.type === 2) {
      let a = f.phase + sin(d * 12) * 0.8;

      vx += cos(a) * influence * f.strength;

      vy += sin(a) * influence * f.strength;
    } else {
      vx += dx * influence * f.strength * 2;

      vy -= dy * influence * f.strength * 2;
    }
  }

  return {
    x: vx,
    y: vy,
  };
}

function draw() {
  background(0);

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);

  scale(viewScale);

  noFill();

  strokeWeight(LINE_WEIGHT);
  strokeCap(SQUARE);
  strokeJoin(MITER);

  for (let p of particles) {
    let x = p.x;
    let y = p.y;

    stroke(p.r, p.g, p.b);

    beginShape();

    vertex(x * ART, y * ART);

    for (let s = 0; s < STEPS; s++) {
      let v = flow(x, y);

      let magnitude = sqrt(v.x * v.x + v.y * v.y) + 0.0001;

      let stepSize = map(constrain(magnitude, 0, 3), 0, 3, 2, 7) / ART;

      x += (v.x / magnitude) * stepSize;

      y += (v.y / magnitude) * stepSize;

      vertex(x * ART, y * ART);

      if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) {
        break;
      }
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  redraw();
}
