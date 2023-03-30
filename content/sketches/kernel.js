/* 
    Base Code for Kernel from: https://editor.p5js.org/jeffThompson/sketches/MyfhklBlv

*/

let kernels = {
  "identity" : [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
  ],
  "blur": [
      [0.0625, 0.125, 0.0625],
      [0.125, 0.25, 0.125],
      [0.0625, 0.125, 0.0625]
  ],
  "sharpen" : [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
  ],
  "edge" : [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1]
  ],
  "bottomsobel" : [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
  ],
  "emboss" : [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2]
  ],
  "leftsobel" : [
      [1, 0, -1],
      [2, 0, -2],
      [1, 0, -1]
  ],
  "rigtsobel" : [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
  ],
  "topsobel" : [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1]
  ],    
}

let originalimg;

let img;

let selectkernel;

function preload() {
  originalimg = loadImage('/showcase/sketches/assets/versalles.jpg');
  img = originalimg;
}


function setup() {

  // resize the image to fit the window, then 
  // create the canvas at that size
  img.resize(windowWidth, 0);
  createCanvas(img.width, img.height);
  noLoop();

  // Select kernel

  selectkernel = createSelect();
  selectkernel.position(10, 10);
  for(const key of Object.keys(kernels)){
      selectkernel.option(key)
  }
  selectkernel.changed(applyKernel)

}


function draw() {
  image(img, 0, 0);
}

function applyKernel(){
  let k = selectkernel.value();
  img = kernelFilter(originalimg, kernels[k]);
  image(img, 0, 0);
}

function kernelFilter(input, kernel) {

  // we need to access neighboring pixels, so we have
  // to create a blank output image to work with
  let output = createImage(input.width, input.height);

  // start at 1 and end -1 from edge so our kernel
  // doesn't try to grab pixels that don't exist!
  input.loadPixels();
  output.loadPixels();
  for (let y = 1; y < input.height - 1; y++) {
      for (let x = 1; x < input.width - 1; x++) {

          // for each pixel, we add up rgb values for
          // itself and its neighbors, weighted by the kernel
          let sumR = 0;
          let sumG = 0;
          let sumB = 0;

          // go through neighboring pixels
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
              for (let offsetX = -1; offsetX <= 1; offsetX++) {

                  // grab the current pixel
                  let neighborIndex = ((y + offsetY) * input.width + (x + offsetX)) * 4;
                  let r = input.pixels[neighborIndex];
                  let g = input.pixels[neighborIndex + 1];
                  let b = input.pixels[neighborIndex + 2];

                  // apply kernel and add to the sum
                  // (we +1 here so that we get the kernel index
                  // from our offsetX/offsetY values)
                  sumR += kernel[offsetY + 1][offsetX + 1] * r;
                  sumG += kernel[offsetY + 1][offsetX + 1] * g;
                  sumB += kernel[offsetY + 1][offsetX + 1] * b;
              }
          }

          // having checked all neighbors, make sure final
          // values are in range 0–255
          sumR = constrain(sumR, 0, 255);
          sumG = constrain(sumG, 0, 255);
          sumB = constrain(sumB, 0, 255);

          // change the pixel value
          let index = (y * input.width + x) * 4;
          output.pixels[index] = sumR;
          output.pixels[index + 1] = sumG;
          output.pixels[index + 2] = sumB;
          output.pixels[index + 3] = 255;
      }
  }

  // send the image back
  output.updatePixels();
  return output;
}

