# Procesamiento de imágenes

Gracias a la implementación de los shaders, el procesamiento de imágenes se hace más sencillo gracias a las herramientas que este lenguaje provee. 

Mediante el uso de diferentes variables uniformes, se hace la implementación del magnificador o lupa para la imagen. Además se permite controlar la aplicación de un tipo de filtro seleccionado por el usuario el cual se implementa mediante la multiplicación con los elementos de la matriz de convolución. El programa permite usar filtros como Blurring, Sharpen, Box Blur y Ridge Detection.

La aplicación también permite aplicar el luma en la imagen y sobre este se podrá hacer uso de la lupa e incluso aplicar filtros sobre esta.

{{<p5-iframe sketch="/VisualComputing/sketches/workshops/shaders/imageProcessing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="750" height="625" >}}


# **imageProcessing.js**

```js

let lumaShader;
let filtersShader;
let img;
let filter;
let mode;
let sharpen = [0,-1,0,-1,5,-1,0,-1,0];
let box_blur = [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9];
let ridge_detection = [-1,-1,-1,-1,8,-1,-1,-1,-1];
let blurring = [1/16,2/16,1/16,2/16,4/16,2/16,1/16,2/16,1/16];

function preload() {
  filtersShader = readShader('/VisualComputing/sketches/workshops/shaders/shadersDef/imageProcessing.frag',
                        { varyings: Tree.texcoords2 });
  img = loadImage('/VisualComputing/sketches/workshops/shaders/resources/fire_breathing.jpg');
}

function setup() {
  createCanvas(730, 600, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(filtersShader);

  filter = createCheckbox('filter', false);
  magnifier = createCheckbox('magnifier', false);
  luma = createCheckbox('luma', false);

  filter.position(10, 10);  
  filter.style('color', 'white');

  magnifier.position(10, 30);  
  magnifier.style('color', 'white');

  luma.position(10, 50);  
  luma.style('color', 'white');

  mode = createSelect();
  mode.position(10, 85);
  mode.option('blurring');
  mode.option('sharpen');
  mode.option('box_blur');
  mode.option('ridge_detection');
  mode.option('none');
  mode.selected('none');
  
  filter.input(() => filtersShader.setUniform('withFilter', filter.checked() ));
  magnifier.input(() => filtersShader.setUniform('withMagnifier', magnifier.checked()));
  luma.input(() => filtersShader.setUniform('withLuma', luma.checked()));
  

  emitMousePosition(filtersShader, [uniform = 'u_mouse'])

  filtersShader.setUniform('texture', img);
  filtersShader.setUniform('iResolution',[700,500]);
  filtersShader.setUniform('iResolution',[700,500]);
  emitTexOffset(filtersShader, img, ['texOffset'])
  
  
}

function draw() {
  background(0);
  filtersShader.setUniform('u_mouse', [mouseX, mouseY]);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  if(mode.value()== 'sharpen'){
    filtersShader.setUniform('mask1', sharpen);
  }
  else if(mode.value()== 'blurring'){
    filtersShader.setUniform('mask1', blurring);
  }
  else if(mode.value()== 'box_blur'){
    filtersShader.setUniform('mask1', box_blur);
  }
  else if(mode.value()== 'ridge_detection'){
    filtersShader.setUniform('mask1', ridge_detection);
  }
  else{
    filtersShader.setUniform('mask1', [1,0,0,0,1,0,0,0,1]);
  }
}
```

# **imageProcessing.frag**

```ghcl

precision mediump float;

uniform sampler2D texture;
// see the emitTexOffset() treegl macro
// https://github.com/VisualComputing/p5.treegl#macros
uniform bool withFilter;
uniform bool withMagnifier;
uniform bool withLuma;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask1[9];
uniform float mask2[9];
uniform float mask3[9];
uniform float mask4[9];

// we need our interpolated tex coord
varying vec2 texcoords2;

//magnifier
uniform vec3 iResolution;// viewport resolution (in pixels)
uniform float iTime;// shader playback time (in seconds)
uniform float iTimeDelta;// render time (in seconds)
uniform float iFrameRate;// shader frame rate
uniform int iFrame;// shader playback frame
uniform float iChannelTime[4];// channel playback time (in seconds)
uniform vec3 iChannelResolution[4];// channel resolution (in pixels)
uniform vec2 u_mouse;// mouse pixel coords. xy: current (if MLB down), zw: click
uniform vec4 iDate;// (year, month, day, time in seconds)
uniform float iSampleRate;


float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}


void main(){
    // 1. Use offset to move along texture space.
    // In this case to find the texcoords of the texel neighbours.
    vec2 tc0=texcoords2+vec2(-texOffset.s,-texOffset.t);
    vec2 tc1=texcoords2+vec2(0.,-texOffset.t);
    vec2 tc2=texcoords2+vec2(+texOffset.s,-texOffset.t);
    vec2 tc3=texcoords2+vec2(-texOffset.s,0.);
    // origin (current fragment texcoords)
    vec2 tc4=texcoords2+vec2(0.,0.);
    vec2 tc5=texcoords2+vec2(+texOffset.s,0.);
    vec2 tc6=texcoords2+vec2(-texOffset.s,+texOffset.t);
    vec2 tc7=texcoords2+vec2(0.,+texOffset.t);
    vec2 tc8=texcoords2+vec2(+texOffset.s,+texOffset.t);
    
    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0]=texture2D(texture,tc0);
    rgba[1]=texture2D(texture,tc1);
    rgba[2]=texture2D(texture,tc2);
    rgba[3]=texture2D(texture,tc3);
    rgba[4]=texture2D(texture,tc4);
    rgba[5]=texture2D(texture,tc5);
    rgba[6]=texture2D(texture,tc6);
    rgba[7]=texture2D(texture,tc7);
    rgba[8]=texture2D(texture,tc8);
    
    // 3. Apply convolution kernel
    vec4 convolution;
    for(int i=0;i<9;i++){
        convolution+=rgba[i]*mask1[i];
    }
    
    vec2 uv = texcoords2.xy;
    vec2 mouse = u_mouse.xy;
    
    if(mouse == vec2(0.0))
        mouse = iResolution.xy/2.0;
    
    //UV coordinates of mouse
    vec2 mouse_uv = mouse/iResolution.xy;
    
    //Distance to mouse
    float mouse_dist = distance(uv,mouse_uv);
    
    //Draw the texture
    
    vec4 texel = texture2D(texture,texcoords2);

    vec4 filter = vec4(convolution.rgb,1.0);
    
    if(mouse_dist<.21)
        texel = withMagnifier ? vec4(0.1, 0.1, 0.1, 1.0): texel ; 

    if(mouse_dist<.2)
        texel =  withMagnifier ?  texture2D(texture,(uv+mouse_uv)/2.0)*(convolution.rgb,1.0) : texel;

    if(mouse_dist<.21)
        texel = withFilter ? vec4(0.1, 0.1, 0.1, 1.0): texel; 

    if(mouse_dist<.2)
        texel =  withFilter ?  filter : texel;  

    if(mouse_dist<.2)
        texel =  withLuma ?  vec4((vec3(luma(texel.rgb))), 1.0) : texel;

    gl_FragColor = texel;

}

```