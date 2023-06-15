var easycam;

function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
  
  easycam = createEasyCam({distance:300});
  
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }
} 


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}


function draw(){
 
  // projection
  perspective(60 * PI/180, width/height, 1, 5000);
  
  // BG
  background(32);
  
  // objects
  strokeWeight(0.5);
  stroke(0);
  
  push();
  translate(50, 50, 0);
  fill(255);
  box(50, 50, 25);
  pop();
  
  push();
  translate(-50, -50, 0);
  fill(255,0,128);
  box(50, 50, 25);
  pop();
  
  push();
  translate(+50, -50, 0);
  fill(0,128,255);
  box(50, 50, 25);
  pop();
  
  push();
  translate(-50, +50, 0);
  fill(255,255,0);
  box(50, 50, 25);
  pop();

}
