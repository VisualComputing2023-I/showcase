# **3D Camera**

{{< hint info >}}
<b> Ejercicio </b>

Design and implement a 3D Application using WebGL, through some library or framwork based on it.
{{< /hint >}}

# Introducción

La cámara 3D es un componente importante en la creación de gráficos 3D en tiempo real y de alta calidad en la web. La cámara 3D se utiliza para definir la posición y orientación del punto de vista del usuario en el espacio 3D. WebGL es una tecnología que permite la creación de gráficos 3D interactivos en la web utilizando características del hardware de la tarjeta gráfica. WebGL utiliza el elemento Canvas de HTML5 para mostrar gráficos 3D de alta calidad y hacerlos interactivos 

WebGL es una excelente opción para mostrar gráficos 3D en tiempo real y de alta calidad en la web. Sin embargo, el contenido mostrado dentro de un Canvas no es indexable, por lo que sólo es recomendable su uso para elementos decorativos o para ofrecer funcionalidades adicionales a los usuarios 1.

La biblioteca p5.EasyCam es una herramienta que se puede utilizar para controlar la cámara 3D en p5.js. Esta biblioteca es una derivada de la biblioteca original PeasyCam de Jonathan Feinberg y combina nuevas características útiles con la gran apariencia y sensación de la versión original. La biblioteca p5.EasyCam es compatible con el renderizador WEBGL/P3D y se puede utilizar para crear animaciones y visualizaciones 3D en p5.js.

# Implementación

### **Solución (Código):**

El código fue desarrolado usado los ejemplos disponibles en el repo de <a href="https://jsfiddle.net/user/intrinsica/fiddles/" target="_blank">intrinsica</a>.

{{< details "Source Code: JavaScript" closed >}}

``` javascript

var easycam;

function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
  
  easycam = createEasyCam({distance:300});
  
  document.oncontextmenu = function() { return false; }
  document.onmousedown   = function() { return false; }
} 


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}


function draw(){
 
  // projection
  perspective(60 * PI/180, width/height, 1, 5000);
  
  // BG
  background(32);
  
  // objects
  strokeWeight(0.5);
  stroke(0);
  
  push();
  translate(50, 50, 0);
  fill(255);
  box(50, 50, 25);
  pop();
  
  push();
  translate(-50, -50, 0);
  fill(255,0,128);
  box(50, 50, 25);
  pop();
  
  push();
  translate(+50, -50, 0);
  fill(0,128,255);
  box(50, 50, 25);
  pop();
  
  push();
  translate(-50, +50, 0);
  fill(255,255,0);
  box(50, 50, 25);
  pop();

}


```

{{< /details >}}

### **Resultado:**

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="procedular-texturing">

{{< p5-iframe sketch="/showcase/sketches/3d/firstexample.js"  lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam/p5.easycam.js" width="420" height="420">}}



</div>

# Conclusiones

1. La biblioteca p5.EasyCam es una herramienta útil para controlar la cámara 3D en p5.js y puede ser utilizada para crear animaciones y visualizaciones 3D. Con esta biblioteca, puedes mover la cámara alrededor de tus objetos 3D y cambiar la perspectiva de la escena. También puedes utilizar la biblioteca para crear animaciones complejas y visualizaciones interactivas.

2. La biblioteca es fácil de usar y se integra bien con el renderizador WEBGL/P3D. La biblioteca es fácil de instalar y utilizar en tus proyectos de p5.js. Además, se integra bien con el renderizador WEBGL/P3D, lo que te permite crear gráficos 3D detallados y realistas.

3. La biblioteca es una derivada de la biblioteca original PeasyCam de Jonathan Feinberg y combina nuevas características útiles con la gran apariencia y sensación de la versión original. La biblioteca p5.EasyCam es una versión mejorada de la biblioteca PeasyCam original. Incluye nuevas características útiles que no están disponibles en la versión original, como soporte para múltiples cámaras y controladores personalizados.

4. La biblioteca es compatible con la mayoría de los navegadores web modernos y se puede utilizar en cualquier sistema operativo. La biblioteca p5.EasyCam es compatible con la mayoría de los navegadores web modernos, incluyendo Chrome, Firefox, Safari y Edge. Además, se puede utilizar en cualquier sistema operativo, incluyendo Windows, macOS y Linux.


# **Trabajo futuro**

El trabajo futuro para la librería easycam de p5.js implica varias áreas de mejora y desarrollo. Una de las áreas clave es la optimización del rendimiento. Dado que easycam se utiliza para entornos 3D interactivos, es importante garantizar un rendimiento fluido y eficiente, especialmente al manejar escenas complejas o modelos 3D pesados. En ese sentido, se podrían explorar diferentes estrategias para mejorar la velocidad de la cámara y reducir la carga computacional al mover o rotar la cámara. Esto podría implicar el uso de algoritmos optimizados y técnicas de culling para evitar el renderizado de objetos que no son visibles en la escena actual.

Además de la optimización del rendimiento, otra área de enfoque para el trabajo futuro sería la incorporación de nuevas características y funcionalidades. Por ejemplo, se podría considerar la implementación de un zoom suave para permitir un acercamiento gradual y sin saltos en la cámara. También se podrían explorar transiciones animadas entre diferentes posiciones de la cámara para lograr efectos visuales más suaves y atractivos. Además, sería interesante integrar easycam con sistemas de física para simular movimientos realistas de la cámara en respuesta a interacciones con el entorno o colisiones con objetos.

Otro aspecto importante sería ampliar la compatibilidad de easycam con diferentes dispositivos de entrada. Por ejemplo, se podría trabajar en la integración con dispositivos de realidad virtual (VR) para permitir a los usuarios explorar entornos 3D inmersivos mediante el uso de cascos VR. También sería beneficioso agregar soporte para controles de movimiento como gamepads o mandos de consola, lo que permitiría una interacción más intuitiva y directa con la cámara.

# Referencias

*   [Ejemplos p5 intrinsica](https://jsfiddle.net/user/intrinsica/fiddles/)
*   [3D en la web](https://www.humanlevel.com/articulos/desarrollo-web/llega-el-3d-a-la-web.html)
*   [WEBGL](https://developer.mozilla.org/es/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
*   [Easycam](https://diwi.github.io/p5.EasyCam/)

<style>
    #procedular-texturing{
        background-color: black;
        border-radius: 1rem;
        padding: 1rem;

        text-decoration: none !important;
    }
    #procedular-texturing iframe{
        border: none;
    }
</style>