/***************************************************************************
 * Do What THe Fuck You Want To Public Licence 2                           *
 *                                                                         *
 * JavaScript implementation by Piotr Rochala (http://rocha.la/)           *
 * Based on C# work of Serge Meunier (http://www.smokycogs.com/)           *
 *                                                                         *
 * Check this code in action on http://rocha.la/javascript-plasma-fractal  *
 *                                                                         *
 **************************************************************************/

// El código original fue cambiado para poderlo usar en este caso

//plasma.js
var $plasma = function()
{
	var roughness, totalSize;
	var width, height, canvas, ctx;
	var types = { PLASMA: 0, CLOUD: 1 };
  var noise;
	
	this.colorModif = [255, 255, 255];

	this.init = function(w, h, rough, type)
	{
		//initialize local variables
		width = w;
		height = h;
		roughness = rough;
		plasmaType = type;


		//generate points
		this.points = this.getPoints(width, height, roughness);
		
	}
	
	this.getPoints = function(width, height, rough)  
	{  
		var p1, p2, p3, p4;  
		var points = [];
		for (var x = 0; x < width; x++)
		{
			points[x] = [];
		}
		//give corners random colors
		p1 = 0.6;
		p2 = 0.3;
		p3 = 0.3;
		p4 = 0.6;
		roughness = rough;
		totalSize = width + height;
		this.splitRect(points, 0, 0, width, height, p1, p2, p3, p4);
		return points;
	}

	this.splitRect = function(points, x, y, width, height, p1, p2, p3, p4)
	{  
		var side1, side2, side3, side4, center;
		var transWidth = ~~(width / 2);
		var transHeight = ~~(height / 2);
		
		//as long as square is bigger then a pixel..
		if (width > 1 || height > 1)
		{  
			//center is just an average of all 4 corners
			center = ((p1 + p2 + p3 + p4) / 4);
			
			//randomly shift the middle point 
			center += this.shift(transWidth + transHeight);
			
			//sides are averages of the connected corners
			//p1----p2
			//|     |
			//p4----p3
			side1 = ((p1 + p2) / 2);
			side2 = ((p2 + p3) / 2);
			side3 = ((p3 + p4) / 2);
			side4 = ((p4 + p1) / 2);
			
			//its possible that middle point was moved out of bounds so correct it here
			center = this.normalize(center);
			side1 = this.normalize(side1);
			side2 = this.normalize(side2);
			side3 = this.normalize(side3);
			side4 = this.normalize(side4);
			
			//repear operation for each of 4 new squares created
			//recursion, baby!
			this.splitRect(points, x, y, transWidth, transHeight, p1, side1, center, side4);
			this.splitRect(points, x + transWidth, y, width - transWidth, transHeight, side1, p2, side2, center);
			this.splitRect(points, x + transWidth, y + transHeight, width - transWidth, height - transHeight, center, side2, p3, side3);
			this.splitRect(points, x, y + transHeight, transWidth, height - transHeight, side4, center, side3, p4);
		}
		else 
		{
			//when last square is just a pixel, simply average it from the corners
			points[x][y]= (p1 + p2 + p3 + p4) / 4;
		}
	}

	this.normalize = function(val)  
	{  
		return (val < 0) ? 0 : (val > 1) ? 1 : val;
	}
  
	this.shift = function(smallSize)
	{ 
		return (Math.random() - 0.5) * smallSize / totalSize * roughness;
	}
		
	return this;
}

let w = 512;
let h = 512;
let scl = 16;
let cols, rows;

let max_min = 100;

let landscape;
let flying = 0;

let max_min_slider, smooth_slider, stroke_cb;
var eso = new $plasma;

function setup() {
  createCanvas(600,600, WEBGL);

  rows = h/scl;
  cols = w/scl;

  landscape = new Array(rows);
  for (let i = 0; i < rows; ++i){
    landscape[i] = new Array(cols);
  }

  stroke("green");
  // noStroke();
  // noFill();

  max_min_slider = createSlider(50, 400, 300);
  max_min_slider.position(10,10);

  smooth_slider = createSlider(1, scl, scl);
  smooth_slider.position(10,30);

  stroke_cb = createCheckbox('label', true);
  stroke_cb.changed(x => stroke_cb.checked() ? stroke("green") : noStroke());
  stroke_cb.position(10,50);

  max_min = max_min_slider.value();
  
  eso = new $plasma;
  eso.init(w,h,1,0);
}

function draw() {

  max_min = max_min_slider.value();

  // landscape = eso.getPoints(w,h,5,max_min);

  let yoff = 0;
  for (let y = 0; y < rows; ++y){
    let xoff = 0;
    for (let x = 0; x < cols; ++x){
      landscape[y][x] = map(eso.points[yoff][xoff], 0, 1, -max_min, max_min);
      xoff += smooth_slider.value();
    }
    yoff += smooth_slider.value();
  }

  background(0); 

  orbitControl();
  rotateX(PI/3);
  translate(-w/2,-h/2);

  for (let y = 1; y < rows-1; ++y){
    beginShape(TRIANGLE_STRIP);
    // stroke(map(y,0,rows,0,255));
    // stroke(0)
    for (let x = 1; x < cols-1; ++x){
      // vx = map(landscape[y][x], 0, 1, -max_min, max_min);
      // vxx = map(landscape[y+1][x], 0, 1, -max_min, max_min);
      vx = landscape[y][x];
      vxx = landscape[y+1][x];
      fill(map(vx, -max_min, max_min, 0, 255));
      vertex(x*scl, y*scl, vx);
      fill(map(vxx, -max_min, max_min, 0, 255));
      vertex(x*scl, (y+1)*scl, vxx);
    }
    endShape();
  }

  
}