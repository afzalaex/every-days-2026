const BASE   = 1000;
const ART    = 500;
const HALF   = ART / 2;
const AGENTS = 1000;
const STEPS  = 120;

let s;
let ideas = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generate() {
  ideas = [];

  for (let i = 0; i < 8; i++) {
    let a = map(i, 0, 8, 0, TWO_PI);
    ideas.push({
      x:     cos(a) * random(80, 180),
      y:     sin(a) * random(80, 180),
      force: random(-1.2, 1.2)
    });
  }

  redraw();
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  generate();
}

function draw() {
  background(0);
  push();
  scale(s);
  translate(BASE / 2, BASE / 2);
  strokeWeight(5);
  noFill();

  for (let i = 0; i < AGENTS; i++) {
    let x = random(-HALF, HALF);
    let y = random(-HALF, HALF);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    beginShape();
    curveVertex(x, y);

    for (let j = 0; j < STEPS; j++) {
      curveVertex(x, y);

      let vx = 0;
      let vy = 0;

      for (let c of ideas) {
        let dx   = c.x - x;
        let dy   = c.y - y;
        let d    = max(sqrt(dx * dx + dy * dy), 40);
        let pull = c.force / d;
        vx += dx * pull;
        vy += dy * pull;
      }

      vx += 0.15;
      vy += 0.10;

      x += vx * 10;
      y += vy * 10;

      if (abs(x) > HALF || abs(y) > HALF) break;
    }

    curveVertex(x, y);
    endShape();
  }

  pop();
}

function mousePressed()  { generate(); }
function touchStarted()  { generate(); return false; }

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}