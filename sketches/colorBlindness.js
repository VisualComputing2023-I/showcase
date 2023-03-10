let colorPicker;
let button;
 let black;
  let orange;
  let skyBlue;
  let bluishGreen;
  let yellow;
  let blue;
  let vermillion;
  let reddishPurple;

function setup() {
  let black = color(0,0,0)
  let orange = color(230, 159, 0)
  let skyBlue = color(86, 180, 233)
  let bluishGreen = color(0, 158, 115)
  let yellow =  color(240, 228, 66)
  let blue = color(0, 114, 178)
  let vermillion = color(213, 94, 0)
  let reddishPurple = color(204, 121, 167)
  
  createCanvas(400, 400);
  
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height + 5);
  //fill(black)
  //rect(0, height + 10, 20, 20)
  
  button = createButton('To color blind');
  button.position(0, 0);
  // button.mousePressed(changeBG);
}

function brightnessByColor(color) {
    color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
    if (isHEX) {
        const hasFullSpec = color.length == 7;
        var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
        if (m) var r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16), g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16), b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
    }
    if (isRGB) {
        var m = color.match(/(\d+){3}/g);
        if (m) var r = m[0], g = m[1], b = m[2];
    }
    if (typeof r != "undefined") return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}


function draw() {
  
  background(colorPicker.color());
  
  // const v = colorSlider.value();
  // the idea is to color something by the color selected 
  //const brightness = brightnessByColor(`rgb(${v},${v},${v}`)/255
  
  // fill(brightness >= .5 ? "black" : "white");
  
  text("test text", width/2, height/2)
}


function toColorBlind(){
  
}