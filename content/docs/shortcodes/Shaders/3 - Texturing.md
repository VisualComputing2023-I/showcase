# Texturing

{{< hint info >}}
<b> Exercise </b>

1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.

{{< /hint >}}

# **Introducción**
### **Hablar más del tema**

### Solución (Código) y resultado:
Instrucciones de uso:
- Se tiene un selector donde se puede escoger cual es la textura que se desea aplicar.
- El botón de chequeo de “Cámara” permite activar la cámara para que sea eso lo que se pasa al shader.
- El seleccionador de archivos permite subir una imágen o video para su procesamiento.
- El seleccionador de color permite enviar al shader el color para ciertas texturas, como teñido y eliminación.
- El botón “Randomize” permite generar valores aleatorios para las cuatro esquinas cuando se está en la textura teñida 2.


{{< details title="Fragment Shader - Código" open=false >}}
```js
precision mediump float;

varying vec4 color4;
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D vid0;

uniform bool inv;
uniform bool baw;
uniform bool cam;
uniform bool ten;
uniform bool elm;
uniform bool luz;
uniform bool hsl;
uniform vec2 mousePos;
uniform vec3 colT;
uniform float opc;

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}



vec3 hslCol(vec3 texel){
  float Cmin =  min(min(texel.r,texel.g),texel.b);
  float Cmax =  max(max(texel.r,texel.g),texel.b);
  float delta = Cmax - Cmin;
  float H = 0.0 ,S = 0.0 ,L = 0.0 ;
  
  if(delta == 0.0){
    H = 0.0;
    S = 0.0;
  }else if(texel.r == Cmax){
    H = 60.0 * (mod(((texel.g-texel.b)/delta), 6.0));
  }else if(texel.g==Cmax){
    H = 60.0 * (((texel.b-texel.r)/delta) + 2.0);
  }else{
    H = 60.0 * (((texel.r-texel.g)/delta) + 4.0);
  }
  L = (Cmax + Cmin)/2.0;
  
  if(delta!=0.0){
    S = delta/(1.0-(2.0*L - 1.0 > 0.0 ? 2.0*L-1.0 : -(2.0*L-1.0)));
  }

  return vec3(H,S,L);
}

void main() {
  
  vec2 uv = vTexCoord;
  uv = vec2(uv.x,1.0-uv.y);
  vec4 tex;
  if(!cam){
      tex = texture2D(tex0, uv);
  }else{
      tex = texture2D(vid0, uv);
  }
  
  float pct = 0.0;
  pct = distance(vTexCoord,vec2(mousePos.x,1.0-mousePos.y));

  if(baw){
    tex = vec4((vec3(luma(tex.rgb))), opc);
  }else if(inv){
    tex = vec4(vec3(1.0) - tex.rgb, opc);
  }else if(ten){
    tex = vec4((tex.rgb*colT.rgb), opc);
  }else if(elm){
    tex = vec4(tex.rgb-colT.rgb, opc);
  }else if(hsl){
    tex = vec4(tex.rgb*color4.rgb, opc);
  }else if(luz){
    tex = vec4((tex.rgb+(0.5-vec3(pct))), 1.0);
  }else{
    tex = vec4(tex.rgb, opc);
  }
  gl_FragColor = tex;
}
```
{{< /details >}}

{{< p5-global-iframe id="pyramid" width="750" height="555" >}}

let Shader; 
let tex; 
let Binv = false, Bbaw = false, Bcam = false, Bten = false, Belm = false, Bhsl = false, Bluz = false; 
let c1, c2, c3, c4;

function preload(){ 
  Shader = loadShader('/showcase/sketches/texturing.vert', '/showcase/sketches/texturing.frag'); 
  tex = loadImage('/showcase/sketches/VanGogh.jpg'); }

function setup() { 
  createCanvas(740, 550, WEBGL);
  inputImg = createFileInput(handleFile); 
  inputImg.position(255, 5); 
  inputImg.size(240);
  option = createSelect(); 
  option.position(15, 5); 
  option.option('Original'); 
  option.option('Blanco y negro'); 
  option.option('Invertir');
  option.option('Teñido'); 
  option.option('Eliminación'); 
  option.option('Teñido 2'); 
  option.option('Luz'); 
  option.selected('Original'); 
  option.changed(optionEvent);
  media = createCheckbox('Cámara', false); 
  media.position(150, 5); 
  media.changed(myCheckedEvent);
  vid = createCapture(VIDEO); 
  vid.size(740, 550); 
  vid.hide();
  colorPicker = createColorPicker('#ed225d'); 
  colorPicker.position(15, 30);
  colorR = createButton('Randomize'); 
  colorR.position(80, 30); 
  colorR.mousePressed(randomizeColor);
  randomizeColor();
 }

function draw(){ 
  shader(Shader); 
  Shader.setUniform('tex0', tex); 
  Shader.setUniform('vid0', vid); 
  Shader.setUniform('inv', Binv); 
  Shader.setUniform('baw', Bbaw); 
  Shader.setUniform('ten', Bten); 
  Shader.setUniform('cam', Bcam); 
  Shader.setUniform('elm', Belm); 
  Shader.setUniform('luz', Bluz); 
  Shader.setUniform('hsl', Bhsl); 
  Shader.setUniform('mousePos', [mouseX/740,mouseY/550]); 
  Shader.setUniform('colT', colorPicker.color()._array); 
  Shader.setUniform('opc', 1);
  if(Bhsl){ 
    beginShape(); 
    fill(c1); 
    vertex(0, 0); 
    fill(c2); 
    vertex(0, 1); 
    fill(c3); 
    vertex(1, 1); 
    fill(c4); 
    vertex(1, 0); 
    endShape(); 
  } rect(0,0,width, height); 
}

function handleFile(file) { 
  if (file.type === 'image') { 
    tex = createImg(file.data, ''); 
    tex.hide(); 
  } else { 
    tex = createVideo(file.data, vidLoad); 
    tex.hide(); } 
}

function optionEvent() { 
  let opt = option.value(); 
  if(opt=="Original"){ 
    Bbaw = false; 
    Binv = false; 
    Bten = false; 
    Belm = false; 
    Bhsl = false; 
    Bluz = false; 
  }else if(opt=="Blanco y negro"){ 
    Bbaw = true; 
    Binv = false; 
    Bten = false; 
    Belm = false; 
    Bhsl = false; 
    Bluz = false; 
  }else if(opt=="Invertir"){ 
    Bbaw = false; 
    Binv = true; 
    Bten = false; 
    Belm = false; 
    Bhsl = false; 
    Bluz = false; 
  }else if(opt=="Teñido"){ 
    Bbaw = false; 
    Binv = false; 
    Bten = true; 
    Belm = false; 
    Bhsl = false; 
    Bluz = false; 
  }else if(opt=="Eliminación"){ 
    Bbaw = false; 
    Binv = false; 
    Bten = false; 
    Belm = true; 
    Bhsl = false; 
    Bluz = false; 
  }else if(opt=="Teñido 2"){ 
    Bbaw = false; 
    Binv = false; 
    Bten = false; 
    Belm = false; 
    Bhsl = true; 
    Bluz = false; 
  }else if(opt=="Luz"){ 
    Bbaw = false; 
    Binv = false; 
    Bten = false; 
    Belm = false; 
    Bhsl = false; 
    Bluz = true; 
  }
 }

function vidLoad() { 
  tex.loop(); 
}

function myCheckedEvent() { 
  if (media.checked()) { 
    Bcam = true; 
  } else { Bcam = false; 
  } 
}

function randomizeColor() { 
  c1 = [random(0,255),random(0,255),random(0,255)]; 
  c2 = [random(0,255),random(0,255),random(0,255)]; 
  c3 = [random(0,255),random(0,255),random(0,255)]; 
  c4 = [random(0,255),random(0,255),random(0,255)]; 
}{{< /p5-global-iframe >}}

# **Conclusiones**

1. 

# **Trabajo futuro**

# Referencias

{{< hint danger >}}

- Rubio, O. (2020, 2 octubre). Procesamiento de imagenes. https://www.vistronica.com/blog/post/procesamiento-de-imagenes.html

{{< /hint >}}


<style>
#cbat{
  background-color: white;
  opacity: 1;
  background-image: radial-gradient(#444cf7 0.5px, white 0.5px);
  background-size: 10px 10px;
  border-radius: 1rem;
  padding: 1rem;
}
#cbat iframe{
  border: none;
}
</style>