const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const STEP = 25;
const CELLS = ART / STEP;

let pieces = [];
let activePiece = null;
let offsetX = 0;
let offsetY = 0;

const SHAPES = [
  // --- Monomino ---
  [[0,0]],

  // --- Dominoes ---
  [[0,0],[1,0]],
  [[0,0],[0,1]],

  // --- Triminoes ---
  [[0,0],[1,0],[2,0]],     // I
  [[0,0],[0,1],[0,2]],
  [[0,0],[1,0],[0,1]],     // L
  [[0,0],[0,1],[1,1]],
  [[1,0],[0,1],[1,1]],
  [[0,0],[1,0],[1,1]],

  // --- Tetrominoes ---
  [[0,0],[1,0],[0,1],[1,1]],     // O
  [[0,0],[1,0],[2,0],[3,0]],     // I
  [[0,0],[0,1],[0,2],[1,2]],     // L
  [[1,0],[0,1],[1,1],[2,1]],     // T
  [[0,0],[1,0],[1,1],[2,1]],     // S
  [[1,0],[2,0],[0,1],[1,1]],     // Z
  [[0,0],[1,0],[2,0],[2,1]]      // J
];

function setup() {
  computeCanvas();
  buildPieces();
  scatterPiecesNoOverlap();
}

function windowResized() {
  computeCanvas();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function buildPieces() {
  pieces = [];
  const COUNT = 50;

  for (let i = 0; i < COUNT; i++) {
    pieces.push({
      cells: random(SHAPES),
      gx: 0,
      gy: 0,
      col: color(random(155,255),random(155,255),random(155,255))
    });
  }
}

function scatterPiecesNoOverlap() {
  let occ = {};

  for (let p of pieces) {
    let placed = false;
    while (!placed) {
      let gx = floor(random(CELLS));
      let gy = floor(random(CELLS));
      if (canPlace(p, gx, gy, occ)) {
        p.gx = gx;
        p.gy = gy;
        occupy(p, occ);
        placed = true;
      }
    }
  }
}

function canPlace(piece, gx, gy, occ) {
  for (let c of piece.cells) {
    let x = gx + c[0];
    let y = gy + c[1];
    if (x < 0 || y < 0 || x >= CELLS || y >= CELLS) return false;
    if (occ[x+","+y]) return false;
  }
  return true;
}

function occupy(piece, occ) {
  for (let c of piece.cells) {
    occ[(piece.gx+c[0])+","+(piece.gy+c[1])] = true;
  }
}

function draw() {
  background(0);

  translate(width/2, height/2);
  scale(width / BASE);

  drawPieces();
}

function drawPieces() {
  for (let p of pieces) {
    fill(p.col);
    stroke(0);
    strokeWeight(2);
    for (let c of p.cells) {
      rect(
        (p.gx+c[0]) * STEP - HALF,
        (p.gy+c[1]) * STEP - HALF,
        STEP, STEP
      );
    }
  }
}

function mousePressed() {
  let gx = mouseGridX();
  let gy = mouseGridY();

  for (let i = pieces.length-1; i >= 0; i--) {
    let p = pieces[i];
    for (let c of p.cells) {
      if (gx === p.gx+c[0] && gy === p.gy+c[1]) {
        activePiece = p;
        p.prevX = p.gx;
        p.prevY = p.gy;
        offsetX = gx - p.gx;
        offsetY = gy - p.gy;
        pieces.splice(i,1);
        pieces.push(p);
        return;
      }
    }
  }
}

function mouseDragged() {
  if (!activePiece) return;
  activePiece.gx = mouseGridX() - offsetX;
  activePiece.gy = mouseGridY() - offsetY;
}

function mouseReleased() {
  if (!activePiece) return;

  activePiece.gx = round(activePiece.gx);
  activePiece.gy = round(activePiece.gy);

  if (!validPlacement(activePiece)) {
    activePiece.gx = activePiece.prevX;
    activePiece.gy = activePiece.prevY;
  }
  activePiece = null;
}

function validPlacement(piece) {
  let occ = {};
  for (let o of pieces) {
    if (o === piece) continue;
    for (let c of o.cells) {
      occ[(o.gx+c[0])+","+(o.gy+c[1])] = true;
    }
  }
  return canPlace(piece, piece.gx, piece.gy, occ);
}

function mouseGridX() {
  let scaleFactor = width / BASE;
  let mx = (mouseX - width/2) / scaleFactor;
  return floor((mx + HALF) / STEP);
}

function mouseGridY() {
  let scaleFactor = width / BASE;
  let my = (mouseY - height/2) / scaleFactor;
  return floor((my + HALF) / STEP);
}


