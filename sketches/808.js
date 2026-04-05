const BASE = 1000;
let s = 1;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function draw() {
  generate();
}

function generate() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  const HALF = 250;

  let cuts = floor(random(20, 120));

  for (let i = 0; i < cuts; i++) {

    strokeWeight(4);
    stroke(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    let type = floor(random(3));

    if (type === 0) {
      let x = random(-HALF, HALF);
      line(x, -HALF, x, HALF);
    }

    if (type === 1) {
      let y = random(-HALF, HALF);
      line(-HALF, y, HALF, y);
    }

    if (type === 2) {

      let offset = random(-HALF, HALF);

      if (random() < 0.5) {

        let x1 = max(-HALF, -HALF - offset);
        let y1 = x1 + offset;

        let x2 = min(HALF, HALF - offset);
        let y2 = x2 + offset;

        line(x1, y1, x2, y2);

      } else {

        let x1 = max(-HALF, offset - HALF);
        let y1 = -x1 + offset;

        let x2 = min(HALF, offset + HALF);
        let y2 = -x2 + offset;

        line(x1, y1, x2, y2);
      }
    }
  }
}


function mousePressed() {
  redraw();
}