let x = 900
let flag = true

function setup() {
  createCanvas(700, 300);
  pacman = loadImage('/showcase/sketches/assets/pacman.png');
}

function draw() {
  // Image background
  image(pacman, 0, 0);
  
  // Move lines
  flag ? x-- : x++
  
  // Change direction
  if(x < 0) flag = false
  if(x > width) flag = true
  
  
  // Vertical lines
  for (let i = x; i < width ; i+=18) {
    fill(color('black'));
    rect(i, 0, 13, 247);
  } 
 
}