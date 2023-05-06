let pg;
let colt;
let truchetShader;
let colorShader;
let brickShader;
let dotsShader;
let textura;
const opcionesS  = {'None': 0, 'truchet':1, 'color':2,'bricks':3,'dots':4, 'plasma':5};

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/SHADERS/texturing/texturing_truchet.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  colorShader = readShader('/showcase/sketches/SHADERS/texturing/texturing_color.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  brickShader = readShader('/showcase/sketches/SHADERS/texturing/texturing_bricks.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });   
  dotsShader = readShader('/showcase/sketches/SHADERS/texturing/texturing_dots.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE }); 
  plasmaShader = readShader('/showcase/sketches/SHADERS/texturing/texturing_plasma.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE })                                                 
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  texturaD = 'None'
  textura = createSelect();
  textura.position(15, 15);
  textura.style('width', '90px');
  textura.option('None'); 
  textura.option('truchet'); 
  textura.option('color');
  textura.option('bricks');
  textura.option('dots');
  textura.option('plasma');

}

function draw() {
  background(33);
  orbitControl();
  cylinder(100, 200);
  console.log(opcionesS[textura.value()]);  
  if(opcionesS[textura.value()] == 0){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
  else if(opcionesS[textura.value()] == 1){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(truchetShader);
    // emitResolution, see:
    // https://github.com/VisualComputing/p5.treegl#macros
    pg.emitResolution(truchetShader);
    // https://p5js.org/reference/#/p5.Shader/setUniform
    truchetShader.setUniform('u_zoom', 3);
    // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    // set pg as texture
    texture(pg);
  }
  else if (opcionesS[textura.value()] == 2){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(colorShader);
    pg.emitResolution(colorShader);
    //colorShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
  else if (opcionesS[textura.value()] == 3){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(brickShader);
    pg.emitResolution(brickShader);
    //brickShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
  else if (opcionesS[textura.value()] == 4){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(dotsShader);
    pg.emitResolution(dotsShader);
    //dotsShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
  else if (opcionesS[textura.value()] == 5){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(plasmaShader);
    pg.emitResolution(plasmaShader);
    //dotsShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}