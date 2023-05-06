## **Procedural Procedural_Texturing**

En computación gráfica, una [textura procedimental](https://en.wikipedia.org/wiki/Procedural_texture) es una textura creada mediante una descripción matemática (es decir, un algoritmo), en lugar de datos almacenados directamente. La ventaja de este enfoque es el bajo coste de almacenamiento, la resolución ilimitada de las texturas y la facilidad de mapeo de las mismas.

{{< p5-iframe sketch="/showcase/content/sketches/Shaders/Procedural_Texturing/Procedural_Texturing.js" width="425" height="425" >}}

VisualComputing2023-I/showcase/content/sketches/Shaders/Procedural_Texturing/texturing_bricks.frag
JuanCll/showcase/content/sketches/SHADERS/texturing/texturing.js

{{< details title="procedural Procedural_Texturing js" open=false >}}
{{< highlight js >}}
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
  truchetShader = readShader('/showcase/content/sketches/shaders/Procedural_Texturing/texturing_truchet.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  colorShader = readShader('/showcase/content/sketches/shaders/Procedural_Texturing/texturing_color.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  brickShader = readShader('/showcase/content/sketches/shaders/Procedural_Texturing/texturing_bricks.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });   
  dotsShader = readShader('/showcase/content/sketches/shaders/Procedural_Texturing/texturing_dots.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE }); 
  plasmaShader = readShader('/showcase/content/sketches/shaders/Procedural_Texturing/texturing_plasma.frag',
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
{{< /highlight >}}
{{< /details >}}

{{< details title="fragment shader truchet" open=false >}}
{{< highlight js >}}
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,3.0);
    st = rotateTilePattern(st);

    // Make more interesting combinations
    st = tile(st,2.0);
    st = rotate2D(st,-PI*u_time*0.25);
    st = rotateTilePattern(st*2.);
    st = rotate2D(st,PI*u_time*0.25);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}
{{< /highlight >}}
{{< /details >}}

{{< details title="fragment shader plasma" open=false >}}
{{< highlight js >}}
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float cellular(vec2 p) {
    vec2 i_st = floor(p);
    vec2 f_st = fract(p);
    float m_dist = 10.;
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin(6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            if( dist < m_dist ) {
                m_dist = dist;
            }
        }
    }
    return m_dist;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    st *= 5.0;
    float r = cellular(st);
    float b = cellular(st - vec2(0.0, sin(u_time * 0.5) * 0.5));
    gl_FragColor = vec4(r, 0.0, b, 1.0);
}
{{< /highlight >}}
{{< /details >}}

**Aplicaciones**

Este tipo de texturas son utilizadas, debido a sus características, para el modelamiento de representaciones superficiales de elementos naturales, como lo podrían ser madera, mármol, piera, entre otros. Es por esto, que esta forma de representación podría ser utilizada en la ambientación de espacios, sobretodo en aquellos que, por sus mecánicas, pudieran requerir alto dinamismo y velocidad.

**Conclusiones**

- Las texturas procedimentales son una muestra de que existen mecanismos para el modelamiento de diferentes elementos de maneras altamente eficientes y efectivas.
- El uso de las texturas sobre sólidos permite emular elementos o estructuras para generar ambientación.

{{<hint warning>}}
**Referencias**
- https://en.wikipedia.org/wiki/Procedural_texture
- Shaders tomados de The Book of Shaders, https://thebookofshaders.com/09/
-  Fuente shader plasma: https://thebookofshaders.com/edit.php?log=161127235422
{{</hint>}}
