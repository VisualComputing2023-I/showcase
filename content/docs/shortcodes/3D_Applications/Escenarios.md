# **Escenarios**

{{< hint info >}}
<b> Ejercicio </b>

Design and implement a 3D Application using WebGL, through some library or framwork based on it.
{{< /hint >}}

# Introducción

La creación de escenarios 3D utilizando p5.js y la librería easycam ofrece a los desarrolladores una forma poderosa y accesible de construir entornos interactivos en tres dimensiones. Con p5.js, una librería de programación creativa basada en JavaScript, y easycam, una extensión que facilita el control de la cámara en entornos 3D, es posible crear mundos virtuales con objetos estáticos y dinámicos que se mueven de manera fluida.

La librería easycam proporciona una cámara fácilmente manipulable, permitiendo a los usuarios controlar el punto de vista y la posición de la cámara dentro del escenario 3D. Esto significa que se pueden establecer vistas específicas, cambiar el ángulo de visualización y acercar o alejar la cámara de los objetos en la escena.

Para crear un escenario 3D, se pueden agregar objetos fijos que formen parte del entorno estático. Estos objetos pueden ser estructuras arquitectónicas, paisajes, terrenos o cualquier elemento que componga el fondo del escenario. Estos objetos se definen con coordenadas tridimensionales y se dibujan en la escena utilizando las funciones de dibujo proporcionadas por p5.js.

Además de los objetos fijos, se pueden incluir elementos que se muevan por el escenario. Estos objetos pueden ser personajes animados, partículas, vehículos u otros elementos interactivos. Para lograr el movimiento de estos objetos, se actualizan sus coordenadas en cada fotograma del ciclo de dibujo. Pueden utilizarse algoritmos y técnicas como la física básica, ecuaciones de movimiento o comportamientos predefinidos para controlar el movimiento de los objetos en respuesta a la interacción del usuario o a eventos específicos.

# Implementación

### **Solución (Código):**

El código fue desarrolado usando los ejemplos de <a href="https://carrot.whitman.edu/P5JS/javascript/p5.EasyCam-master/examples/" target="_blank">Whitman</a>.

{{< details "Source Code: JavaScript" closed >}}

``` javascript

/**
 * 
 * The p5.EasyCam library - Easy 3D CameraControl for p5.js and WEBGL.
 *
 *   Copyright 2018-2020 by p5.EasyCam authors
 *
 *   Source: https://github.com/freshfork/p5.EasyCam
 *
 *   MIT License: https://opensource.org/licenses/MIT
 * 
 * 
 * explanatory notes:
 * 
 * p5.EasyCam is a derivative of the original PeasyCam Library by Jonathan Feinberg 
 * and combines new useful features with the great look and feel of its parent.
 * 
 * 
 */

//
// SplitView setup
//
// Two cameras, each one owns its own rendertarget.
//
//
 
var easycam1, easycam2;


function setup() {

  pixelDensity(2);

  var canvas = createCanvas(windowWidth, windowHeight);

  var w = Math.ceil(windowWidth / 2);
  var h = windowHeight;
  
  var graphics1 = createGraphics(w, h, WEBGL)
  var graphics2 = createGraphics(w, h, WEBGL);
  
  console.log(Dw.EasyCam.INFO);

  easycam1 = new Dw.EasyCam(graphics1._renderer, {distance : 600});
  easycam2 = new Dw.EasyCam(graphics2._renderer, {distance : 600});
  
  easycam1.setDistanceMin(10);
  easycam1.setDistanceMax(3000);
  
  easycam2.setDistanceMin(10);
  easycam2.setDistanceMax(3000);
  
  easycam1.attachMouseListeners(this._renderer);
  easycam2.attachMouseListeners(this._renderer);
  
  
  // add some custom attributes
  easycam1.IDX = 0;
  easycam2.IDX = 1;
  
  // set viewports
  easycam1.setViewport([0,0,w,h]);
  easycam2.setViewport([w,0,w,h]);
} 



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  var w = Math.ceil(windowWidth / 2);
  var h = windowHeight;
  
  // resize p5.RendererGL
  easycam1.renderer.resize(w,h);
  easycam2.renderer.resize(w,h);
  
  // set new graphics dim
  easycam1.graphics.width  = w;
  easycam1.graphics.height = h;
  
  easycam2.graphics.width  = w;
  easycam2.graphics.height = h;

  // set new viewport
  easycam1.setViewport([0,0,w,h]);
  easycam2.setViewport([w,0,w,h]);
}



function draw(){
  clear();
  handleSuperController([easycam1, easycam2]);
  
  // render a scene for each camera
  displayScene(easycam1);
  displayScene(easycam2);

  // display results
  displayResult_P2D();
  // displayResult_WEBGL();
}

// use this, when the main canvas is P2D ... createCanvas(w,h,P2D)
function displayResult_P2D(){
  var vp1 = easycam1.getViewport();
  var vp2 = easycam2.getViewport();
  
  image(easycam1.graphics, vp1[0], vp1[1], vp1[2], vp1[3]);
  image(easycam2.graphics, vp2[0], vp2[1], vp2[2], vp2[3]);
}


// use this, when the main canvas is WEBGL ... createCanvas(w,h,WEBGL)
function displayResult_WEBGL(){
  var vp1 = easycam1.getViewport();
  var vp2 = easycam2.getViewport();
 
  resetMatrix();
  ortho(0, width, -height, 0, -Number.MAX_VALUE, +Number.MAX_VALUE);

  texture(easycam1.graphics);
  rect(vp1[0], vp1[1], vp1[2], vp1[3]);
  
  texture(easycam2.graphics);
  rect(vp2[0], vp2[1], vp2[2], vp2[3]);
}




function displayScene(cam){

  var pg = cam.graphics;
  
  var w = pg.width;
  var h = pg.height;
  
  var gray = 200;
  
  pg.push();
  pg.noStroke();
  
  // projection
  pg.perspective(60 * PI/180, w/h, 1, 5000);

  // BG
  if(cam.IDX == 0) {pg.clear(220);pg.background(220);}
  if(cam.IDX == 1) {pg.clear(32);pg.background(32);}
 
  pg.ambientLight(100);
  pg.pointLight(255, 255, 255, 0, 0, 0);
  
  // objects
  randomSeed(2);
  for(var i = 0; i < 50; i++){
    pg.push();
    var m = 100;
    var tx = random(-m, m);
    var ty = random(-m, m);
    var tz = random(-m, m);

    var r = ((tx / m) * 0.5 + 0.5) * 255;
    var g = ((ty / m) * 0.5 + 0.5) * r/2;
    var b = ((tz / m) * 0.5 + 0.5) * g;
 
    pg.translate(tx, ty, tz);
    
    var gray = random(64,255);

    if(cam.IDX == 0) pg.ambientMaterial(r,g,b);
    if(cam.IDX == 1) pg.ambientMaterial(gray);
    
    pg.box(random(10,40));
    pg.pop();
  }
  
  pg.ambientMaterial(255, 220, 0);
  pg.box(50, 50, 10);
  
  pg.push();
  pg.rotateZ(sin(frameCount*0.015) * PI*1.5);
  pg.translate(120, 0, 0);
  pg.ambientMaterial(0,128,255);
  pg.sphere(15);
  pg.pop();
    
  pg.push();
  pg.rotateX(sin(frameCount*0.02) * PI);
  pg.translate(0, 150, 0);
  pg.ambientMaterial(128,255,0);
  pg.sphere(15);
  pg.pop();
  
  pg.pop();
}



function mousePressed(){
}



function handleSuperController(cameralist){

  if(keyIsPressed && key === ' '){
    
    var delay = 150; 
    var active  = undefined;
    var focused = undefined;
    
    // find active or focused camera which controls the others
    for(var i in cameralist){
      var cam = cameralist[i];
      if(cam.mouse.isPressed){
        active = cam;
        break;
      }
      if(cam.mouse.insideViewport(mouseX, mouseY)){
        focused = cam;
      }
    }
    
    // no active camera, try focused
    active = active || focused;
    
    // apply state to all other cameras
    if(active) {
      var state = active.getState();
      for(var i in cameralist){
        var cam = cameralist[i];
        if(cam != active){
          cam.setState(state, delay);
        }
      }
    }
  }
  
}
```

{{< /details >}}

### **Resultado:**

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="procedular-texturing">

{{< p5-iframe sketch="/showcase/sketches/3d/randomboxes.js"  lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam/p5.easycam.js" width="420" height="420">}}



</div>

# Conclusiones

1. La combinación de p5.js y la librería easycam proporciona una solución efectiva y accesible para crear escenarios 3D interactivos. Estas herramientas permiten a los desarrolladores construir entornos virtuales envolventes y dinámicos que pueden ser explorados y manipulados por los usuarios.

2. La librería easycam simplifica significativamente el control de la cámara en entornos 3D. Proporciona funciones y métodos que facilitan el ajuste del punto de vista, la posición y los ángulos de visualización en el escenario. Esto permite a los desarrolladores crear y modificar la perspectiva de la cámara con mayor facilidad y precisión.

3. Al incluir objetos fijos en el escenario, se puede establecer una base estática que forma parte del fondo. Estos objetos pueden representar paisajes, estructuras arquitectónicas, terrenos u otros elementos que compongan el entorno en el que se desarrolla la experiencia 3D. Los objetos fijos proporcionan la estructura y el contexto necesarios para el escenario.

4. La introducción de objetos en movimiento en el escenario agrega dinamismo y acción. Estos objetos pueden tomar la forma de personajes animados, partículas que se mueven con cierto comportamiento o cualquier otro elemento interactivo. A través de algoritmos de movimiento o comportamientos predefinidos, estos objetos pueden moverse de manera autónoma o en respuesta a las interacciones del usuario, añadiendo un elemento de vida y emoción al escenario.

5. La combinación de objetos fijos y objetos en movimiento crea una experiencia inmersiva para los usuarios. Les permite explorar y participar activamente en el escenario 3D, interactuando con los elementos que lo componen. Esta interactividad enriquece la experiencia de usuario, ya que pueden experimentar cambios en la perspectiva, observar cómo los objetos se mueven y reaccionar ante ellos, creando una sensación de presencia y realismo en el entorno virtual.


# **Trabajo futuro**

Un área de trabajo futuro importante es la optimización del rendimiento de los escenarios 3D, mediante la aplicación de técnicas de optimización y mejoras en la renderización para lograr una experiencia fluida incluso en escenas complejas. Otra área de investigación prometedora es la implementación de interacciones avanzadas, como detección de colisiones realistas y reconocimiento de gestos, para mejorar la interacción del usuario con los escenarios.

De la misma forma es importante podría enfocarse en la implementación de técnicas de inteligencia artificial y aprendizaje automático para mejorar la interacción y el comportamiento de los objetos en movimiento en los escenarios 3D. Esto podría implicar el desarrollo de algoritmos de inteligencia artificial que permitan a los objetos reaccionar de manera más realista a su entorno y a las acciones del usuario, creando una experiencia más dinámica y envolvente.

# Referencias

*   [Ejemplos](https://carrot.whitman.edu/P5JS/javascript/p5.EasyCam-master/examples/)
*   [3D en la web](https://www.humanlevel.com/articulos/desarrollo-web/llega-el-3d-a-la-web.html)
*   [WEBGL](https://developer.mozilla.org/es/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)
*   [Easycam](https://diwi.github.io/p5.EasyCam/)
*   [EasyCam freshfrok](https://github.com/freshfork/p5.EasyCam)

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