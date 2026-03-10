const BASE = 1000;
let s = 1;

let cols = 15;
let rows = 15;

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE*s, BASE*s);
  pixelDensity(1);

  noLoop();
}

function draw(){
  generate();
}

function generate(){

  resetMatrix();
  background(0);
  colorMode(RGB);

  scale(s);
  translate(BASE/2,BASE/2);

  let cell = 500/cols;

  strokeWeight(1.5 / s);
  noFill();

  for(let gx=0; gx<cols; gx++){
  for(let gy=0; gy<rows; gy++){

    let x = -250 + gx*cell;
    let y = -250 + gy*cell;

    push();

    translate(x+cell/2,y+cell/2);

    rotate(floor(random(4))*HALF_PI);

    stroke(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    let r = cell*0.35;

    if(random()<0.6) line(-r,0,r,0);
    if(random()<0.6) line(0,-r,0,r);

    if(random()<0.35) line(-r,-r,r,r);
    if(random()<0.35) line(-r,r,r,-r);

    if(random()<0.35) arc(-r,-r,r*2,r*2,0,HALF_PI);
    if(random()<0.35) arc(r,-r,r*2,r*2,HALF_PI,PI);
    if(random()<0.35) arc(r,r,r*2,r*2,PI,PI+HALF_PI);
    if(random()<0.35) arc(-r,r,r*2,r*2,PI+HALF_PI,TWO_PI);

    if(random()<0.5){
      circle(0,0,cell*0.08);
    }

    if(random()<0.35){
      circle(-r,0,cell*0.06);
      circle(r,0,cell*0.06);
      circle(0,-r,cell*0.06);
      circle(0,r,cell*0.06);
    }

    pop();

  }}

}

function mousePressed(){
  generate();
}