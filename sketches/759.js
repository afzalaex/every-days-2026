const BASE = 1000;
const ART = 450;
const HALF = ART / 2;

let palettes = [];

function setup() {
  createCanvas(BASE, BASE);
  strokeCap(SQUARE);
  generatePalette();
  noLoop();
}

function generatePalette() {
  palettes = [];
  let layers = 6;
  let colorsPerLayer = 100;

  for (let i = 0; i < layers; i++) {

    let family = [];

    for (let j = 0; j < colorsPerLayer; j++) {
      family.push([
        random(155,255),
        random(155,255),
        random(155,255)
      ]);
    }

    palettes.push(family);
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  let baseStroke = 1;
  strokeWeight(baseStroke);

  let layers = palettes.length;
  let gridCount = 20;
  let spacing = ART / (gridCount * 2);

  for (let l = 0; l < layers; l++) {

    push();

    let rotationAmount = map(l, 0, layers, 0, PI * 0.75);
    rotate(rotationAmount);

    for (let x = -gridCount; x <= gridCount; x++) {
      for (let y = -gridCount; y <= gridCount; y++) {

        let px = x * spacing;
        let py = y * spacing;

        if (abs(px) > HALF || abs(py) > HALF) continue;

        let family = palettes[l];
        let index = abs(x + y) % family.length;
        let c = family[index];

        stroke(c[0], c[1], c[2]);

        let field =
          sin(x * 0.18) *
          cos(y * 0.18);

        let lineLength = map(field, -1, 1, 2, 10);

        line(
          px - lineLength / 2,
          py,
          px + lineLength / 2,
          py
        );
      }
    }

    pop();
  }
}



