const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let faces = [];
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

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  faces.sort((a, b) => a.depth - b.depth);

  noStroke();

  for (let f of faces) {
    fill(f.col);

    beginShape();

    for (let p of f.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  stroke(0);
  strokeWeight(2);
  noFill();

  for (let f of faces) {
    beginShape();

    for (let p of f.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function generate() {
  faces = [];

  let origin = {
    x: ART / 2,
    y: ART / 2,
  };

  let levels = int(random(9, 18));

  for (let i = 0; i < levels; i++) {
    let cubeSize = 400 - i * 25;

    let rotation = random(-0.18, 0.18);

    let depth = i * 55;

    let cube = createCube(origin.x, origin.y, cubeSize, rotation, depth);

    for (let face of cube) {
      if (random() < 1) {
        faces.push(face);
      }
    }
  }

  let bridges = int(random(1, 10));

  for (let i = 0; i < bridges; i++) {
    let angle = random(TWO_PI);

    let r1 = random(60, 110);
    let r2 = random(170, 240);

    let w = random(8, 22);

    let a = {
      x: origin.x + cos(angle) * r1,
      y: origin.y + sin(angle) * r1,
    };

    let b = {
      x: origin.x + cos(angle) * r2,
      y: origin.y + sin(angle) * r2,
    };

    let nx = -sin(angle) * w;
    let ny = cos(angle) * w;

    faces.push({
      points: [
        {
          x: a.x + nx,
          y: a.y + ny,
        },
        {
          x: a.x - nx,
          y: a.y - ny,
        },
        {
          x: b.x - nx,
          y: b.y - ny,
        },
        {
          x: b.x + nx,
          y: b.y + ny,
        },
      ],

      depth: random(50, 400),
      col: brightColor(),
    });
  }

  let voidSize = random(35, 75);

  faces = faces.filter((f) => {
    let cx = 0;
    let cy = 0;

    for (let p of f.points) {
      cx += p.x;
      cy += p.y;
    }

    cx /= f.points.length;
    cy /= f.points.length;

    return dist(cx, cy, origin.x, origin.y) > voidSize;
  });
}

function createCube(cx, cy, cubeSize, rotation, depth) {
  let s = cubeSize;

  let d = cubeSize * random(0.45, 0.8);

  let front = [];
  let back = [];

  let corners = [
    [-s, -s],
    [s, -s],
    [s, s],
    [-s, s],
  ];

  for (let c of corners) {
    let x = c[0];
    let y = c[1];

    let rx = x * cos(rotation) - y * sin(rotation);

    let ry = x * sin(rotation) + y * cos(rotation);

    front.push({
      x: cx + rx * 0.48,
      y: cy + ry * 0.48,
    });

    back.push({
      x: cx + rx * 0.48 + d * 0.32,
      y: cy + ry * 0.48 - d * 0.22,
    });
  }

  let result = [];

  result.push({
    points: front,
    depth: depth,
    col: brightColor(),
  });

  result.push({
    points: back,
    depth: depth + 100,
    col: brightColor(),
  });

  for (let i = 0; i < 4; i++) {
    let j = (i + 1) % 4;

    result.push({
      points: [front[i], front[j], back[j], back[i]],

      depth: depth + 50 + i,

      col: brightColor(),
    });
  }

  return result;
}

function brightColor() {
  return color(random(155, 255), random(155, 255), random(155, 255));
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
