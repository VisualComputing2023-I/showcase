# **Ejercicios: Texturing**

## **UV Visualization**
{{<hint info>}}
**Exercise**

Redefine the shape texture coordinates to turn the above image upside down.
{{</hint>}}


{{< p5-iframe sketch="/showcase/sketches/SHADERS/UV_v/UV_visualization.js" width="325" height="325" >}}

{{< details title="UV Visualization js" open=false >}}
{{< highlight js >}}
let uvShader;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/sketches/SHADERS/UV_v/UV_inv.frag',
                        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  /*
  clip-space quad shape, i.e., both x and y vertex coordinates ∈ [-1..1]
  since textureMode is NORMAL, texture coordinates ∈ [-1..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
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
  vertex(  1,  1, 1, 1,  0);
  vertex( -1,  1, 0, 1,  0);
  vertex( -1, -1, 1, 1,  1);
  vertex(1,  -1, -1, 0, 1);
  endShape();
  // ✨ it's worth noting (not mentioned in the p5 api docs though)
  // that quad (https://p5js.org/reference/#/p5/quad) also adds the
  // texture coords to each of its vertices. Hence:
  // quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // produce the same results as the above beginShape / endShape
}
{{< /highlight >}}
{{< /details >}}

{{< details title="UV Visualization frag" open=false >}}
{{< highlight js >}}
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
{{< /highlight >}}
{{< /details >}}


{{<hint info>}}
**Exercise**

Include the blue channel in the uv visualization (e.g., use blue with red or green channels).
{{</hint>}}
{{< p5-iframe sketch="/showcase/sketches/SHADERS/UV_v/UV_3D.js" width="335" height="345" >}}

{{< details title="UV 3D js" open=false >}}
{{< highlight js >}}
let easycam;
let uvShader;
let opacity;
let checkbox;
let bc;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/sketches/SHADERS/UV_v/UV_3D.frag',
              { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
  
  checkbox = createCheckbox('Blue Channel', false);
  checkbox.style('color', 'black');
  checkbox.changed(myCheckedEvent);
}

function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  // world space scene
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  // use custom shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  uvShader.setUniform('opacity', opacity.value());
  
  uvShader.setUniform('bc', bc);
  
  
  // screen-space quad (i.e., x ∈ [0..width] and y ∈ [0..height])
  // see: https://github.com/VisualComputing/p5.treegl#heads-up-display
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    bc = 1.0;
    console.log('Blue!');
  } else {
    bc = 0.0;
    console.log("Not blue :(");
  }
}
{{< /highlight >}}
{{< /details >}}

{{< details title="UV 3D frag" open=false >}}
{{< highlight js >}}
precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;
uniform float bc;

void main() {
  gl_FragColor = vec4(texcoords2.xy, bc, opacity);
}
{{< /highlight >}}
{{< /details >}}

## **Texture Sampling**
HSL( hue, saturation, lightness) y HSV ( hue, saturation, value o HSB con brightness) son formas alternativas de representar el modelo de color RGB.

- Hue (Tono): Es el color mismo, definido físicamente por una longitud de onda.
- Saturation (Saturación): Es qué tan puro o intenso es ese matiz. Entre menos intenso fuera este tono, el resultado sería que el color percibido tendería al gris.
- Lightness (Luminosidad): Es la intensidad lumínica. Una gran intensidad es muy brillante y la percibimos como blanco y, si no hay intensidad o luz, se vuelve negro.
- Value (Valor): Representa la altura en el eje blanco-negro. Los valores posibles van del 0 al 100%. 0 siempre es negro.
- Luma: es el promedio ponderado de los valores RGB, basado en su contribución a la luminosidad percibida. Este se ha utilizado frecuentemente en la televisión.
- Component average: es el promedio de los valores RGB.

{{< details title="texture sampling js" open=false >}}
{{< highlight js >}}

let lumaShader;
let img;
let img2;
let grey_scale;
let hsv_scale;
let brightnessO;
let opcionS;
let modo_tinte;
let fotoS;
const brightnessD  = {'None': 0, 'Luma':1, 'HSV':2, 'HSL':3, 'Average':4};
const opcionesS  = {'None': 0, 'blend':1, 'add':2,'darkest':3,'lightest':4, 'difference':5, 'burn':6};

function preload() {
  lumaShader = readShader('/showcase/sketches/SHADERS/brightness_tinting/luma.frag',{varyings: Tree.texcoords2 });
  
  img = loadImage('/showcase/sketches/perro_foto.jpg');
  img2 = loadImage('/showcase/sketches/pirotecniaA.jpg');
  
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);

  brightnessO = createSelect();
  brightnessO.position(15, 15);
  brightnessO.style('width', '90px');
  brightnessO.option('None'); 
  brightnessO.option('Luma'); 
  brightnessO.option('HSV');
  brightnessO.option('HSL');
  brightnessO.option('Average');

  fotoS = createSelect();
  fotoS.position(15, 45);
  fotoS.style('width', '90px');
  fotoS.option('perro'); 
  fotoS.option('pirotecnia'); 
  
  colorPicker1 = createColorPicker('blue');
  colorPicker1.position(15,70);
  

  tinte = createCheckbox('Tint', false);
  tinte.style('color', 'white');
  tinte.position(15,105);

  modo = createSelect();
  modo.position(15, 135);
  modo.style('width', '90px');
  modo.option('None'); 
  modo.option('blend'); 
  modo.option('add');
  modo.option('darkest');
  modo.option('ligthtest');
  modo.option('difference');
  modo.option('burn');

  //modo.changed(modo_tinte_S);

  //lumaShader.setUniform('texture', img);
}

function draw() {
  background(255);
  color1=colorPicker1.color()
  if(fotoS.value()=='perro'){
    lumaShader.setUniform('texture', img);
  }
  else if(fotoS.value()=='pirotecnia'){
    lumaShader.setUniform('texture', img2);
  }
  
  lumaShader.setUniform('brightnessO', brightnessD[brightnessO.value()]);
  lumaShader.setUniform('color_tinte', color1.levels);
  lumaShader.setUniform('tinte_a', tinte.checked());
  lumaShader.setUniform('opcionS', opcionesS[modo.value()]);
  
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  
}

{{< /highlight >}}
{{< /details >}}

{{< details title="texture sampling frag" open=false >}}
{{< highlight js >}}

precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform int brightnessO;
uniform int opcionS;
uniform vec4 color_tinte;
uniform bool tinte_a;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}
float hsv(vec3 texel){
  return max(max(texel.r, texel.g), texel.b);
}
float hsl(vec3 texel){
  float maxColor = max(max(texel.r, texel.g), texel.b);
  float minColor = min(min(texel.r, texel.g), texel.b);

  return (maxColor + minColor)/2.0;
}
float average(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

vec4 blend(vec4 texel){
  return color_tinte * texel;
}

vec4 add(vec4 texel){
  return color_tinte + texel;
}

vec4 difference(vec4 texel){
  return max(texel, color_tinte) - min(texel, color_tinte);
}

vec4 lightest(vec4 texel){
  return max(color_tinte, texel);
}

vec4 darkest(vec4 texel){
  return min(color_tinte, texel);
}
vec4 burn(vec4 texel){
  return max((1.0-((1.0-color_tinte)/texel)),0.0);
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  
  if (brightnessO == 0){
    texel = texel;
  }
  else if (brightnessO == 1){
    texel = vec4((vec3(luma(texel.rgb))), 1.0);
  }
  else if (brightnessO == 2){
    texel = vec4((vec3(hsv(texel.rgb))), 1.0);
  }
  else if (brightnessO == 3){
    texel = vec4((vec3(hsl(texel.rgb))), 1.0);
  }
  else if (brightnessO == 4){
    texel = vec4((vec3(average(texel.rgb))), 1.0);
  }

  if (tinte_a){
    if (opcionS == 1){
      texel = blend(texel);
    }
    else if (opcionS == 2){
      texel = add(texel);
    }
    else if (opcionS == 3) {
      texel = difference(texel);
    }
    else if (opcionS == 4){
      texel = lightest(texel);
    }
    else if (opcionS == 5){
      texel = darkest(texel);
    }
    else if (opcionS == 6){
      texel = burn(texel);
    }
  }


  gl_FragColor = texel;
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/SHADERS/brightness_tinting/brightness_tinting.js" width="725" height="525" >}}

**Conclusiones**

- El uso de diferentes herramientas de brillo y el tintado se pueden utilizar al tiempo para realizar diferentes cambios a una imagen.
- Utilizar, ademas de los anteriores, los distintos modos de mezcla de color permite que las imágenes generen o trasmitan diferentes sensaciones.

{{<hint warning>}}
### **Referencias**
- https://visualcomputing.github.io/docs/shaders/texturing/
- https://github.com/jamieowen/glsl-blend
{{</hint>}}
