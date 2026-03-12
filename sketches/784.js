const BASE = 1000;

let s = 1;
let tris = [];

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);

  strokeJoin(MITER);
  strokeCap(SQUARE);

  generate();
  noLoop();
}

function mousePressed(){
  generate();
}

function generate(){

  resetMatrix();
  background(0);

  translate(width/2, height/2);
  scale(s);

  tris = [];

  let r = 250;

  tris.push([
    createVector(-r,-r),
    createVector(r,-r),
    createVector(r,r)
  ]);

  tris.push([
    createVector(-r,-r),
    createVector(r,r),
    createVector(-r,r)
  ]);

  let iterations = 900;

  for(let i=0;i<iterations;i++){

    let index = int(random(tris.length));
    let t = tris[index];

    let a = t[0];
    let b = t[1];
    let c = t[2];

    let edge = int(random(3));

    let p1,p2;

    if(edge===0){
      let m = p5.Vector.lerp(a,b,random(0.3,0.7));
      p1=[a,m,c];
      p2=[m,b,c];
    }

    if(edge===1){
      let m = p5.Vector.lerp(b,c,random(0.3,0.7));
      p1=[a,b,m];
      p2=[a,m,c];
    }

    if(edge===2){
      let m = p5.Vector.lerp(c,a,random(0.3,0.7));
      p1=[a,b,m];
      p2=[m,b,c];
    }

    tris.splice(index,1);
    tris.push(p1);
    tris.push(p2);
  }

  noStroke();

  for(let t of tris){

    fill(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    triangle(
      t[0].x,t[0].y,
      t[1].x,t[1].y,
      t[2].x,t[2].y
    );
  }

  stroke(0);
  strokeWeight(1 * s);
  noFill();

  for(let t of tris){

    line(t[0].x,t[0].y, t[1].x,t[1].y);
    line(t[1].x,t[1].y, t[2].x,t[2].y);
    line(t[2].x,t[2].y, t[0].x,t[0].y);
  }

}