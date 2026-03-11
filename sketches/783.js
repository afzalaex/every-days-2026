const BASE = 1000;

let viewScale = 1;

let particleCount = 5000;
let baseRadius = 250;

let colors = [];

function setup(){
  computeCanvas();
  noStroke();

  for(let i=0;i<particleCount;i++){
    colors.push([
      random(155,255),
      random(155,255),
      random(155,255)
    ]);
  }
}

function computeCanvas(){
  viewScale = min(windowWidth,windowHeight,BASE)/BASE;
  viewScale = min(viewScale,1);
  createCanvas(BASE*viewScale,BASE*viewScale,WEBGL);
}

function draw(){

  background(0);

  scale(viewScale);

  let t = frameCount*0.005;

  rotateY(t*0.4);
  rotateX(-PI/5);

  for(let i=0;i<particleCount;i++){

    let u = i/particleCount;

    let spiral = u * TWO_PI * 60;

    let r = baseRadius * (0.3 + 0.7*u);

    let x = r*cos(spiral + t);
    let y = r*sin(spiral + t);

    let z = 180*sin(spiral*0.5 + t*2);

    push();

    translate(x,y,z);

    rotateY(t);

    let c = colors[i];
    fill(c[0],c[1],c[2]);

    let s = 1.5 + sin(spiral + t*4)*1.5;

    sphere(abs(s),4,4);

    pop();
  }
}

function windowResized(){
  computeCanvas();
}