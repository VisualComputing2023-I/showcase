/*
Código para generar un terreno usando ruido de perlin, usando arboles binarios de triangulos para poder crear un nivel de detalle sencillo.
Autor del código: Diego Alejandro Alvarado Chaparro
*/

let max_lod = 4;

let w = 512;
let h = 512;
let scl = 64;
let cols, rows;

let max_min = 100;

let terrain, heights;
let flying = 0;

let max_min_slider, flying_slider, stroke_cb;

class Triangle {
  constructor(a, b, c, level, parent, leftChild = null, rightChild = null){
    this.a = a;
    this.b = b;
    this.c = c;
    this.level = level;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.N = null;
    this.E = null;
    this.S = null;
    this.W = null;
  }

  split() {
    let level = this.level + 1;

    if (level % 2 == 1){
      let a = this.a;
      let b = this.b;
      let c = p5.Vector.add(p5.Vector.div(p5.Vector.sub(this.c, this.a),2), a);
      c.z = heights[c.y][c.x];
      this.leftChild = new Triangle(a, b, c, level, this);

      a = this.c;
      b = this.b;
      // c = p5.Vector.div(p5.Vector.sub(this.c, this.a),2);
      // c.z = heights[floor(c.x)][floor(c.y)];
      this.rightChild = new Triangle(a, b, c, level, this);
    } else {
      let a = this.a;
      let b = p5.Vector.add(p5.Vector.div(p5.Vector.sub(this.b, this.a),2), a);
      b.z = heights[b.y][b.x];
      let c = this.c;
      this.leftChild = new Triangle(a, b, c, level, this);

      a = this.b;
      // b = p5.Vector.div(p5.Vector.sub(this.b, this.a),2);
      // b.z = heights[floor(b.x)][floor(b.y)];
      c = this.c;
      this.rightChild = new Triangle(a, b, c, level, this);
    }
  }

  merge() {
    this.leftChild = null;
    this.rightChild = null;
  }
}

function setup() {
  createCanvas(600,600, WEBGL);

  rows = h/scl;
  cols = w/scl;

  // noise_map_size = 2/scl;
  noise_map_size = 0.25;

  let yoff = 0;
  heights = new Array(h);
  for (let i = 0; i < h; ++i){
    let xoff = 0;
    heights[i] = new Array(w);
    for (let j = 0; j < w; ++j){
      heights[i][j] = map(noise(xoff,yoff), 0, 1, -max_min, max_min);
      xoff += 0.05*noise_map_size;
    }
    yoff += 0.05*noise_map_size;
  }
  
  
  terrain = new Array(rows);
  for (let i = 0; i < rows-1; ++i){
    terrain[i] = new Array(cols);
    for (let j = 0; j < cols-1; ++j){
      y = i;
      x = j;
      
      let a = createVector(x*scl, y*scl, heights[y*scl][x*scl]);
      let b = createVector((x+1)*scl, y*scl, heights[y*scl][(x+1)*scl]);
      let c = createVector((x+1)*scl, (y+1)*scl, heights[(y+1)*scl][(x+1)*scl]);
      let d = createVector(x*scl, (y+1)*scl, heights[(y+1)*scl][x*scl]);
      
      //Root
      terrain[i][j] = new Triangle(0,0,0, -1, -1);
      // Left Child
      let leftChild = new Triangle(a, b, c, 0, terrain[i][j]);
      terrain[i][j].leftChild = leftChild;
      // Right Child
      let rightChild = new Triangle(a, d, c, 0, terrain[i][j]);
      terrain[i][j].rightChild = rightChild;
    }
  }

  for (let i = 0; i < rows-1; ++i){
    for (let j = 0; j < cols-1; ++j){
      if (i-1 >= 0){
        terrain[i][j].N = terrain[i-1][j].rightChild;
      }
      if (i+1 < rows-1){
        terrain[i][j].S = terrain[i+1][j].leftChild;
      }
      if (j-1 >= 0){
        terrain[i][j].W = terrain[i][j-1].leftChild;
      }
      if (j+1 < cols-1){
        terrain[i][j].E = terrain[i][j+1].rightChild;
      }
    }
  }

  stroke("green");

  max_min_slider = createSlider(50, 400, 100);
  max_min_slider.position(10,10);

  stroke_cb = createCheckbox('Stroke', true);
  stroke_cb.changed(x => stroke_cb.checked() ? stroke("green") : noStroke());
  stroke_cb.position(10,30);
}

function Render() {
  beginShape(TRIANGLES);
  for (let i = 0; i < rows-1; ++i){
    triangles = []
    for (let j = 0; j < cols-1; ++j){
      root = terrain[i][j];
      RenderTriangles(root);
    }
  }
  endShape();
}

function RenderTriangles(t){
  if (t.leftChild === null && t.rightChild === null){
    fill(map(t.a.z, -max_min, max_min, 0, 255));
    vertex(t.a.x, t.a.y, t.a.z);
    fill(map(t.b.z, -max_min, max_min, 0, 255));
    vertex(t.b.x, t.b.y, t.b.z);
    fill(map(t.c.z, -max_min, max_min, 0, 255));
    vertex(t.c.x, t.c.y, t.c.z);
    return;
  }

  if (t.leftChild !== null){
    RenderTriangles(t.leftChild);
  }

  if (t.leftChild !== null){
    RenderTriangles(t.rightChild);
  }
}

function SplitLeaves(t){
  if (t === null){
    return;
  }
  if (t.leftChild === null && t.rightChild === null){
    t.split();
    return;
  }

  if (t.leftChild !== null){
    SplitLeaves(t.leftChild);
  }

  if (t.leftChild !== null){
    SplitLeaves(t.rightChild);
  }
}

function getMaxLevel(t){
  if (t === null){
    return;
  }
  if (t.leftChild === null && t.rightChild === null){
    return t.level;
  }

  let left_level = 0;
  if (t.leftChild !== null){
    left_level = getMaxLevel(t.leftChild);
  }
  
  let right_level = 0;
  if (t.leftChild !== null){
    right_level = getMaxLevel(t.leftChild);
  }

  if (left_level > right_level){
    return left_level;
  } else {
    return right_level;
  }
}

function fixNeighbours(t){
  if (t.W !== null){
    let level = getMaxLevel(t.rightChild);
    let Wlevel = getMaxLevel(t.W.rightChild);
    if (level % 2 == 0 && level > 0 && Wlevel > 0 && Wlevel < level){
      // t.W.rightChild.split();
      SplitLeaves(t.W.rightChild);
    }
  }
  if (t.E !== null){
    let level = getMaxLevel(t.leftChild);
    let Elevel = getMaxLevel(t.E);
    if (level % 2 == 0 && level > 0 && Elevel > 0 && Elevel < level){
      // t.E.leftChild.split();
      SplitLeaves(t.E.leftChild);
    }
  }
  if (t.N !== null){
    let level = getMaxLevel(t.leftChild);
    let Nlevel = getMaxLevel(t.N.rightChild);
    if (level % 2 == 0 && level > 0 && Nlevel > 0 && Nlevel < level){
      // t.N.rightChild.split();
      SplitLeaves(t.N.rightChild);
    }
  }
  if (t.S !== null){
    let level = getMaxLevel(t.rightChild);
    let Slevel = getMaxLevel(t.S.leftChild);
    if (level % 2 == 0 && level > 0 && Slevel > 0 && Slevel < level){
      // t.S.leftChild.split();
      SplitLeaves(t.S.leftChild);
    }
  }
}

function draw() {

  max_min = max_min_slider.value();

  for (let i = 0; i < rows-1; ++i){
    for (let j = 0; j < cols-1; ++j){
      // y = i;
      // x = j;
      
      // let a = createVector(x*scl, y*scl, heights[y*scl][x*scl]);
      // let b = createVector((x+1)*scl, y*scl, heights[y*scl][(x+1)*scl]);
      // let c = createVector((x+1)*scl, (y+1)*scl, heights[(y+1)*scl][(x+1)*scl]);
      // let d = createVector(x*scl, (y+1)*scl, heights[(y+1)*scl][x*scl]);
      
      // // Left Child
      // leftChild = new Triangle(a, b, c, 0, 0);
      // // Right Child
      // rightChild = new Triangle(a, d, c, 0, 0);
      // //Root
      // terrain[i][j] = new Triangle(0,0,0, -1, -1, leftChild, rightChild);
      terrain[i][j].leftChild.merge();
      terrain[i][j].rightChild.merge();
    }
  }

  // camPos = createVector(cam.eyeX, cam.eyeZ, cam.eyeY);

  // mousePos = createVector(winMouseX, winMouseY, 0);
  mousePos = createVector(mouseX, mouseY, 0);

  for (let i = 0; i < rows-1; ++i){
    for (let j = 0; j < cols-1; ++j){
      center = p5.Vector.add(p5.Vector.div(p5.Vector.sub(terrain[i][j].leftChild.c, terrain[i][j].leftChild.a),2), terrain[i][j].leftChild.a);
      let distance = p5.Vector.dist(center, mousePos);
      // print(i + " " + j + ": " + distance);
      if (distance < 600){
        SplitLeaves(terrain[i][j]);
      }
      if (distance < 500){
        SplitLeaves(terrain[i][j]);
      }
      if (distance < 400){
        SplitLeaves(terrain[i][j]);
      }
      if (distance < 300){
        SplitLeaves(terrain[i][j]);
      }
    }
  }

  for (let i = 0; i < rows-1; ++i){
    for (let j = 0; j < cols-1; ++j){
      fixNeighbours(terrain[i][j]);
    }
  }

  background(0); 
  orbitControl();
  rotateX(PI/3);
  translate(-w/2,-h/2);

  Render();
}