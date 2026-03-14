const BASE = 1000;

let s = 1;

let shards = 4000;
let baseRadius = 250;
let baseStroke = 1.5;

function setup(){

  computeScale();
  createCanvas(BASE * s, BASE * s);

  noLoop();
  generate();

}

function generate(){

  background(0);

  push();
  scale(s);
  translate(BASE/2, BASE/2);

  strokeWeight(baseStroke);

  let mx = mouseX / s - BASE/2;
  let my = mouseY / s - BASE/2;

  let insideArt = (mx*mx + my*my) < baseRadius*baseRadius;

  for(let i = 0; i < shards; i++){

    let angle = random(TWO_PI);
    let r = baseRadius * sqrt(random());

    let x = cos(angle) * r;
    let y = sin(angle) * r;

    let field = sin(x * 0.01) + cos(y * 0.01);

    if(insideArt){

      let dx = x - mx;
      let dy = y - my;

      let d2 = dx*dx + dy*dy;
      let influence = 200;

      if(d2 < influence*influence){

        let d = sqrt(d2);
        field += (influence - d) * 0.01;

      }

    }

    let dir = field * PI;

    let len = random(5, 20);

    let x2 = x + cos(dir) * len;
    let y2 = y + sin(dir) * len;

    stroke(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    line(x, y, x2, y2);

  }

  pop();

}

function mouseMoved(){

  let mx = mouseX / s - BASE/2;
  let my = mouseY / s - BASE/2;

  if((mx*mx + my*my) < baseRadius*baseRadius){
    generate();
  }

}

function computeScale(){
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized(){

  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();

}