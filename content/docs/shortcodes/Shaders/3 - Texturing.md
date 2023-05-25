# Texturing

{{< hint info >}}
<b> Exercise </b>

1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.

{{< /hint >}}

# **Introducción**

El Texturizado es el proceso que toma una superficie y modifica su apariencia a partir de imágenes, funciones u otros tipos de datos. Las texturas también son utilizadas para guardar una gran colección de datos para ser enviados a los shaders. Permiten agregar detalles sin la necesidad de agregar más polígonos.

El texturizado es un proceso que consiste en la aplicación de una imagen determinada para cubrir y envolver una zona de un elemento, por lo que también se puede definir en el área informática, es por ello que en este artículo se explica qué es el texturizado y cómo se debe aplicar.

Además, El texturizado es un proceso que se aplica cuando se dispone de una figura ajustada en el cual se debe emplear una textura para cubrir la imagen. En el área de la informática esta imagen es virtual, por lo que está constituido por un mapa o conjunto de bits. Se puede utilizar de forma bidimensional y tridimensional dependiendo del trabajo que esté ejecutando el usuario.

Se puede usar un programa especial para estos casos como uno basado de gráficos determinados, de modo que se tiene la capacidad de utilizar más de una textura en una figura especifica. Esto se conoce como un proceso multitexturizado incluso se tiene la posibilidad de cubrir objetos que se encuentren en 3D.

En los objetos virtuales generalmente no se puede dar una definición en su aspecto, es decir, no están constituidos por solo un color. Todo está compuesto por una amplia variedad de olores que a su vez presentan una geometría específica que puede ser fundamental en su distribución de matiz, ya que pueden ser únicas o similares entre sí.

Debido a esto se tiene que explicar que es el texturizado, ya que cada imagen está compuesta por un formato determinado que define su superficie virtual. Cada dato o imagen almacenada en el sistema tiene propiedades que se pueden identificar por medio de este proceso de envoltura de bits.

Este procedimiento se caracteriza por permitir usar distintas formas de la imagen, es decir, no se requiere que sea plana, puede contar con cualquier forma geométrica. Un ejemplo es un cilindro, un circulo, entre otros. Sin importar como se encuentre modelado el texturizado se encarga de cubrir la superficie de la imagen sin dejar una zona descubierto.

El procedimiento se ejecuta de forma progresiva donde se repite consecutivamente el trazo en cada bits para asegurar envolver por completo la superficie virtual del objeto, tomando en cuenta cada uno de los puntos y zonas que cambian de dirección, así se logra cubrir en su totalidad.

Las imágenes se conocen en la informática como un mapa de bits que esté constituido por un conjunto de datos que dan con resultado la foto tomada por una cámara o por una imagen elaborada con un software especializado, un ejemplo es el Photoshop.

No importa si la imagen es real o creada, se le puede denominar como textura bitmap, en la cual se debe mantener la gestión de su resolución, esto se puede controlar ya que las cámaras presentan la posibilidad de escoger el valor que puede estar constituida la imagen. La calidad y la nitidez también es importante ya que dependiendo de las características que posea se debe disponer de una mayor cantidad de texturizado.

La resolución de la imagen proporciona el tamaño, por eso a su vez depende totalmente de la calidad, es decir, si el tamaño de la imagen es pequeña su calidad es baja por lo que no se requiere de un texturizado profundo. En cambio si la imagen es grande la calidad es alta y se requiere de una mayor cantidad en el proceso de texturizado.

**Beneficios:**

Al entender qué es el texturizado se puede determinar cada uno de los beneficios que se obtienen con este procedimiento, ya que se pueden aplicar diversos algoritmos que permiten trabajar con programas en 3D. Toma en cuenta la estructura original de la imagen para proceder con diversas herramientas que generan una textura especifica en el objeto virtual.

En la actualidad se han desarrollado software que se encargan del texturizado facilitando su aplicación en una imagen determinada, estos sistemas se conocen como shaders o también procedurales. Se tiene la posibilidad de trabajar con la estructura fractal de la imagen por lo que se tiene la ventaja de emplear la resolución optima durante el proceso.

Si deseas conocer como están constituidos las aplicaciones y las imágenes virtuales que se poseen en el equipo entonces se invita a leer el articulo de Que es un algoritmo en programación

Debido a esto no se llega a ver los pixels de la imagen, ya que en el momento en que se note este elemento de la imagen indica que se pierda la calidad y que presenta una baja resolución. Por medio del texturizado se pueden cubrir estos datos del objeto para aumentar la nitidez de su superficie.

También este proceso da la posibilidad de imitar las estructuras fractales de la naturaleza, es decir, se puede realizar la textura de un árbol perfectamente en la imagen, incluso se puede realizar las llamas del fuego siendo muy similar a como se puede notar en la vida real.

# **Implementación**

### **Solución (Código):**
Indicaciones para su uso:

* Existe un selector que permite elegir la textura deseada para su aplicación.
* El botón "Cámara" activa la cámara para utilizarla como entrada en el shader.
* El selector de archivos permite cargar una imagen o video para su procesamiento.
* El selector de color envía al shader el color para determinadas texturas, como teñido o eliminación.
* El botón "Randomize" genera valores aleatorios para las cuatro esquinas cuando se encuentra en la textura teñida 2.


{{< details title="Código del Fragment Shader" open=false >}}
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

</br>

### **Resultado:**

</br>

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

1. En el ámbito de la computación visual, la texturización se presenta como una técnica fundamental para enriquecer los objetos virtuales, dotándolos de detalles y realismo al generar superficies que imitan una amplia variedad de materiales reales.

2. Dentro del contexto de la computación visual, la texturización desempeña un rol central al crear entornos inmersivos y experiencias visuales envolventes, al permitir la generación de sensaciones táctiles y visuales que mejoran la interacción con los elementos virtuales.

3. La texturización en la computación visual resulta versátil, ya que tiene la capacidad de simular una extensa gama de materiales y efectos visuales, como madera, metal, piel, vidrio, sombras y reflejos, lo que otorga mayor fidelidad y detalle a las escenas generadas por computadora.

4. Es crucial tomar decisiones acertadas al elegir las técnicas y herramientas de texturización en la computación visual, dado que ello puede impactar significativamente el rendimiento y la calidad visual de las aplicaciones, requiriendo encontrar un equilibrio entre la eficiencia de los cálculos y el resultado visual deseado.

5. La texturización en la computación visual se encuentra en constante evolución, con continuos avances en técnicas de mapeo, generación procedimental de texturas y algoritmos de renderizado, abriendo así nuevas posibilidades para la creación de mundos virtuales cada vez más realistas y atractivos para los usuarios.


# **Trabajo futuro**

El futuro del trabajo en texturización en la computación visual es prometedor y lleno de oportunidades emocionantes. A medida que avanzamos, se anticipa el desarrollo de nuevas técnicas y herramientas que permitirán lograr un mayor nivel de realismo y detalle en la representación de materiales y superficies virtuales.

En primer lugar, se espera un enfoque más profundo en la generación procedimental de texturas. Esto implica la creación de algoritmos y métodos que posibiliten la generación automática y en tiempo real de texturas, evitando así la necesidad de generar y almacenar grandes volúmenes de datos texturales. Esta aproximación brindará mayor flexibilidad y eficiencia en la creación y manipulación de texturas.

Además, se prevé una mayor integración entre las técnicas de captura de datos del mundo real y su aplicación en la texturización. La utilización de técnicas como la fotogrametría y la captura 3D permitirá obtener texturas a partir de escaneos de objetos y entornos reales, lo cual resultará en una representación visual más precisa y una mayor fidelidad de los materiales.

Otro aspecto relevante es la evolución de la texturización en entornos interactivos y de realidad virtual. Se espera el desarrollo de técnicas que posibiliten una texturización dinámica y adaptativa en tiempo real, lo que permitirá una experiencia más inmersiva y personalizada para los usuarios.

Por último, el trabajo futuro en texturización se enfocará en la optimización y eficiencia de los algoritmos y técnicas utilizadas. Se buscará encontrar soluciones que permitan lograr una texturización rápida y de alta calidad, con una menor demanda de recursos computacionales.

En resumen, el futuro del trabajo en texturización en la computación visual presenta avances en la generación procedimental de texturas, la integración de técnicas de captura de datos reales, la texturización en entornos interactivos y de realidad virtual, así como la optimización y eficiencia en los procesos de texturización. Estos avances contribuirán a mejorar la calidad visual y la inmersión en entornos virtuales, abriendo nuevas posibilidades creativas y aplicaciones en áreas como los videojuegos, la simulación y la realidad virtual.

# Referencias

*   [Primera fuente de consulta (Introducción)](https://www.fing.edu.uy/inco/cursos/cga/Clases/2018/TexturasMelisaTechera.pdf)

*   [Segunda fuente de consulta (Introducción)](https://vidabytes.com/que-es-el-texturizado/)

*   [Primera guía para la implementación de los ejercicios](https://thebookofshaders.com/)

*   [Segunda guía para la implementación de los ejercicios](https://p5js.org/examples/)

*   [Tercera guía para la implementación de los ejercicios](https://codepen.io/tag/p5-js)

*   [Edición de texto](https://chat.openai.com/)

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