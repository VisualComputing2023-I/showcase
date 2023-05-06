# **Spatial Coherence**

**Marco teórico**
Se define a la [coherencia espacial](https://visualcomputing.github.io/docs/illusions/spatial_coherence/) como un fenómeno, donde los objetos y los colores definidos en ellos varían según la distancia y posición del espectador, brindando al mismo un espectro de información más completo sobre su entorno, su profundidad y distribución.


{{<hint info>}}
**Exercise**

Implement your own source dataset and a mechanism to select different images from it.
{{</hint>}}


{{< p5-iframe sketch="/showcase/sketches/SpatialCoherenceSketch/SpatCohe.js" width="630" height="630" >}}

{{< details title="SpatialCoherence.js" open=false >}}
{{< highlight js >}}

'use strict';

let image_src;
let video_src;
let mosaic;
// ui
let resolution;
let video_on;
let mode;
let photoSelect;
let photoA;

function preload() {
  // paintings are stored locally in the /sketches/shaders/paintings dir
  // and named sequentially as: p1.jpg, p2.jpg, ... p30.jpg
  // so we pick up one randomly just for fun:
  //image_src = loadImage(`/sketches/shaders/paintings/p${int(random(1, 3))}.jpg`);
  photoA = int(random(1, 6));
  image_src = loadImage(`/showcase/sketches/photos/Photo${photoA}.jpg`);
  video_src = createVideo(['/showcase/sketches/mapache.webm']);
  video_src.hide();
  mosaic = readShader('/showcase/sketches/SHADERS/Spacial_Coherence/SC.frag',
           { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  resolution = createSlider(1, 100, 30, 1);
  resolution.position(10, 35);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  mosaic.setUniform('resolution', resolution.value());
  video_on = createCheckbox('video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('source', video_src);
      video_src.loop();
    } else {
      mosaic.setUniform('source', image_src);
      video_src.pause();
    }
  });
  mosaic.setUniform('source', image_src);
  video_on.position(10, 55);
  mode = createSelect();
  mode.position(10, 75);
  mode.option('original');
  mode.option('pixelator');
  mode.selected('pixelator');
  mode.changed(() => {
    mosaic.setUniform('original', mode.value() === 'original');
  });
  photoSelect = createSelect();
  photoSelect.position(10, 95);
  photoSelect.option('Photo1');
  photoSelect.option('Photo2');
  photoSelect.option('Photo3');
  photoSelect.option('Photo4');
  photoSelect.option('Photo5');
  photoSelect.selected(`Photo${photoA}`)
  photoSelect.changed(() => {
    if (photoSelect.value() == 'Photo1'){
      image_src = loadImage(`/showcase/sketches/photos/Photo1.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo2'){
      image_src = loadImage(`/showcase/sketches/photos/Photo2.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo3'){
      image_src = loadImage(`/showcase/sketches/photos/Photo3.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo4'){
      image_src = loadImage(`/showcase/sketches/photos/Photo4.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
    if (photoSelect.value() == 'Photo5'){
      image_src = loadImage(`/showcase/sketches/photos/Photo5.jpg`);
      mosaic.setUniform('source', image_src);
      
    }
  });
}

function draw() {
  // which previous exercise does this code actually solve?
  /*
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

{{< /highlight >}}
{{< /details >}}

{{< details title="SpatialCoherence.frag" open=false >}}
{{< highlight js >}}

precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated texcoord (same name and type as in vertex shader)
// defined as a (normalized) vec2 in [0..1]
varying vec2 texcoords2;

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else {
    // define stepCoord to sample the texture source as a 3-step process:
    // i. define stepCoord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 stepCoord = texcoords2 * resolution;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    // iii. remap stepCoord in [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution);
    // source texel
    gl_FragColor = texture2D(source, stepCoord);
    // ✨ source texels may be used to compute image palette lookup keys,
    // such as in video & photographic mosaics or ascii art visualizations.
  }
}

{{< /highlight >}}
{{< /details >}}

**Aplicaciones**

Este tipo de fenómenos pueden aplicarse para generar un efecto ya sea de enfoque o desenfoque en elementos específicos, como de profundidad y ambientación de espacios.

{{<hint warning>}}
### **Referencias**
- https://visualcomputing.github.io/docs/shaders/spatial_coherence/
{{</hint>}}

