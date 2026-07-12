const CANVAS_SIZE = 1000;
const ART_SIZE = 500;
const GRID_UNITS = 8;
const UNIT = 48;
const ART_OFFSET = (CANVAS_SIZE - ART_SIZE) / 2;
const GRID_X = 40;
const GRID_Y = 72;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noLoop();
  scaleCanvasToWindow();
}

function draw() {
  background(0);

  translate(ART_OFFSET, ART_OFFSET);
  drawCleanRelief();
}

function drawCleanRelief() {
  const frameInk = makeInk();
  const blocks = makePartitionedBlocks();

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, ART_SIZE, ART_SIZE);
  drawingContext.clip();

  noFill();
  strokeJoin(MITER);
  strokeCap(SQUARE);

  drawFrame(frameInk);
  drawPartitionEdges(blocks);

  const raisedBlocks = blocks
    .filter((block) => block.raised)
    .sort((a, b) => a.y + a.h - (b.y + b.h));

  for (const block of raisedBlocks) {
    drawExtrusion(block);
  }

  drawQuietDetails(blocks);
  drawingContext.restore();
}

function makePartitionedBlocks() {
  const blocks = [{ x: 0, y: 0, w: GRID_UNITS, h: GRID_UNITS }];
  const target = floor(random(13, 18));

  while (blocks.length < target) {
    const candidates = blocks.filter((block) => block.w > 1 || block.h > 1);
    if (candidates.length === 0) {
      break;
    }

    const block = random(candidates);
    const index = blocks.indexOf(block);
    const splitVertical = block.w > block.h || (block.w === block.h && random() < 0.5);

    if (splitVertical && block.w > 1) {
      const cut = floor(random(1, block.w));
      blocks.splice(
        index,
        1,
        { x: block.x, y: block.y, w: cut, h: block.h },
        { x: block.x + cut, y: block.y, w: block.w - cut, h: block.h },
      );
    } else if (block.h > 1) {
      const cut = floor(random(1, block.h));
      blocks.splice(
        index,
        1,
        { x: block.x, y: block.y, w: block.w, h: cut },
        { x: block.x, y: block.y + cut, w: block.w, h: block.h - cut },
      );
    }
  }

  return blocks.map((block) => ({
    ...block,
    edgeInk: makeInk(),
    liftInk: makeInk(),
    depth: random([16, 20, 24, 28]),
    raised: block.w * block.h > 1 && random() < 0.54,
  }));
}

function blockToShape(block) {
  return {
    x: GRID_X + block.x * UNIT,
    y: GRID_Y + block.y * UNIT,
    w: block.w * UNIT,
    h: block.h * UNIT,
  };
}

function makeInk(alpha = 255) {
  return color(random(155, 255), random(155, 255), random(155, 255), alpha);
}

function drawFrame(ink) {
  setLine(ink, 6);
  rect(22, 28, ART_SIZE - 44, ART_SIZE - 54);
}

function drawPartitionEdges(blocks) {
  const edges = new Map();

  for (const block of blocks) {
    addBlockEdges(edges, block);
  }

  for (const edge of edges.values()) {
    setLine(edge.ink, 5);
    line(edge.x1, edge.y1, edge.x2, edge.y2);
  }
}

function addBlockEdges(edges, block) {
  for (let x = block.x; x < block.x + block.w; x += 1) {
    addGridEdge(edges, 'h', x, block.y, block.edgeInk);
    addGridEdge(edges, 'h', x, block.y + block.h, block.edgeInk);
  }

  for (let y = block.y; y < block.y + block.h; y += 1) {
    addGridEdge(edges, 'v', block.x, y, block.edgeInk);
    addGridEdge(edges, 'v', block.x + block.w, y, block.edgeInk);
  }
}

function addGridEdge(edges, axis, x, y, ink) {
  const key = `${axis}:${x}:${y}`;
  if (edges.has(key)) {
    return;
  }

  const x1 = GRID_X + x * UNIT;
  const y1 = GRID_Y + y * UNIT;
  const x2 = axis === 'h' ? x1 + UNIT : x1;
  const y2 = axis === 'v' ? y1 + UNIT : y1;
  edges.set(key, { x1, y1, x2, y2, ink });
}

function drawExtrusion(block) {
  const shape = blockToShape(block);
  const depth = block.depth;
  const dx = depth;
  const dy = -depth * 0.62;

  setLine(block.liftInk, 4);

  const x = shape.x;
  const y = shape.y;
  const w = shape.w;
  const h = shape.h;

  line(x, y, x + dx, y + dy);
  line(x + w, y, x + w + dx, y + dy);
  line(x + w, y + h, x + w + dx, y + h + dy);
  line(x + dx, y + dy, x + w + dx, y + dy);
  line(x + w + dx, y + dy, x + w + dx, y + h + dy);
  line(x + w, y, x + w, y + h);

  if (shape.w >= UNIT * 2) {
    const split = shape.x + floor(shape.w / UNIT / 2) * UNIT;
    line(split, y, split + dx, y + dy);
  }
}

function drawQuietDetails(blocks) {
  for (const block of blocks) {
    const shape = blockToShape(block);

    if (block.w * block.h < 3) {
      continue;
    }

    setLine(block.edgeInk, 3);

    if (shape.w >= UNIT * 3) {
      const y = shape.y + shape.h * 0.5;
      line(shape.x + UNIT * 0.25, y, shape.x + shape.w - UNIT * 0.25, y);
    }
  }
}

function setLine(ink, weight) {
  stroke(ink);
  strokeWeight(weight);
  strokeJoin(MITER);
  strokeCap(SQUARE);
}

function mousePressed() {
  redraw();
  return false;
}

function windowResized() {
  scaleCanvasToWindow();
}

function scaleCanvasToWindow() {
  const displaySize = min(CANVAS_SIZE, windowWidth, windowHeight);
  const canvas = document.querySelector('canvas');

  if (!canvas) {
    return;
  }

  canvas.style.width = `${displaySize}px`;
  canvas.style.height = `${displaySize}px`;
}