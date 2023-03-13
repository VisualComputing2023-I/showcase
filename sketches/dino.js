let slider;

function setup() {
  createCanvas(500, 500);
  dino = loadImage('/showcase/sketches/assets/dino.jpg');
  slider = createSlider(0, 480, 480);
  slider.position(0, 40);
  slider.style('width', '480px');
  textSize(18);
  text('Deslizar para ver la animación', width/2 - 100, 15);
}

function draw() {
  // Image background
  image(dino, 0, 20);
  
  // Get slide value
  x = slider.value()
  
  // Vertical lines
  for (let i = x; i < width ; i+=7) {
    fill(color('black'));
    rect(i, 40, 5, 380);
  } 
   
}