const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const CUTS = 25;

let palette = [];
let regions = [];
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

  palette = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  regions = [
    {
      points: [
        { x: 0, y: 0 },
        { x: ART, y: 0 },
        { x: ART, y: ART },
        { x: 0, y: ART },
      ],
    },
  ];

  for (let i = 0; i < CUTS; i++) {
    const angle = random(TWO_PI);

    const offset = random(-ART * 0.35, ART * 0.35);

    const next = [];

    for (let region of regions) {
      const a = [];
      const b = [];

      for (let j = 0; j < region.points.length; j++) {
        const p1 = region.points[j];
        const p2 = region.points[(j + 1) % region.points.length];

        const d1 = cos(angle) * p1.x + sin(angle) * p1.y - offset;

        const d2 = cos(angle) * p2.x + sin(angle) * p2.y - offset;

        if (d1 >= 0) {
          a.push(p1);
        } else {
          b.push(p1);
        }

        if ((d1 >= 0 && d2 < 0) || (d1 < 0 && d2 >= 0)) {
          const t = d1 / (d1 - d2);

          const ix = lerp(p1.x, p2.x, t);
          const iy = lerp(p1.y, p2.y, t);

          const intersection = {
            x: ix,
            y: iy,
          };

          a.push(intersection);
          b.push(intersection);
        }
      }

      if (a.length >= 3) {
        next.push({ points: a });
      }

      if (b.length >= 3) {
        next.push({ points: b });
      }
    }

    regions = next;
  }

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);

  scale(viewScale);

  noStroke();

  for (let i = 0; i < regions.length; i++) {
    fill(palette[i % palette.length]);

    beginShape();

    for (let p of regions[i].points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
