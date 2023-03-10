## Workshop: Visual Illusions

{{< hint info >}}
**Exercise**  
Study, implement and discuss possible applications of some known visual phenomena and optical illusions.
{{< /hint >}}

## Marco Teórico

AQUÍ VA EL MARCO TEÓRICO
Poner información de cada fenómeno

## 1.  Stroboscopic Artifacts

La rueda de color mostrada contiene los tres colores: rojo, verde y azul. Cuando la velocidad angular de la rotación se eleva a 120° por fotograma, puede verse un efecto extraño. Los colores parecen mezclarse y el resultado es un color grisáceo. Esto ocurre porque el movimiento en una pantalla nunca es puramente suave, sólo lo parece cuando se producen pequeños cambios fotograma tras fotograma. A esta velocidad de rotación, las tres secciones circulares sólo cambian de color, por lo que nuestra percepción es que los colores se están mezclando; de ahí que veamos un tono grisáceo.

La visualización de este efecto depende también de la velocidad de fotogramas de la pantalla, por lo que los resultados pueden variar. También hay que tener en cuenta que si la velocidad se ajusta a casi 120° pero no llega hasta el final, la percepción será que la rueda está girando en el sentido contrario a las agujas del reloj en lugar del giro original en el sentido de las agujas del reloj.

### Solución

```js
var start, speed;
var color_1, color_2, color_3;

function setup() {
  createCanvas(400, 400);
  start = 0;
  // Slider that controls the truning speed.
  slider = createSlider(0, 120, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
  // Color pickers for the three sections.
  color_1 = createColorPicker('red');
  color_1.position(width + 5, 5);
  color_2 = createColorPicker('green');
  color_2.position(width + 5, 35);
  color_3 = createColorPicker('blue');
  color_3.position(width + 5, 65);
}

function draw() {
  background(220);
  speed = slider.value();
  // Draw the three circular sections.
  fill(color_1.color());
  arc(200, 200, 100, 100, start, start + 2*PI/3);
  fill(color_2.color());
  arc(200, 200, 100, 100, start + 2*PI/3, start + 4*PI/3);
  fill(color_3.color());
  arc(200, 200, 100, 100, start + 4*PI/3, start);
  // Update the start point to turn in the next frame.
  start += speed*PI/180;
}
```

{{< p5-global-iframe id="breath" width="500" height="450" >}}
var start, speed;
var color_1, color_2, color_3;

function setup() {
  createCanvas(400, 400);
  start = 0;
  // Slider that controls the truning speed.
  slider = createSlider(0, 120, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
  // Color pickers for the three sections.
  color_1 = createColorPicker('red');
  color_1.position(width + 5, 5);
  color_2 = createColorPicker('green');
  color_2.position(width + 5, 35);
  color_3 = createColorPicker('blue');
  color_3.position(width + 5, 65);
}

function draw() {
  background(220);
  speed = slider.value();
  // Draw the three circular sections.
  fill(color_1.color());
  arc(200, 200, 100, 100, start, start + 2*PI/3);
  fill(color_2.color());
  arc(200, 200, 100, 100, start + 2*PI/3, start + 4*PI/3);
  fill(color_3.color());
  arc(200, 200, 100, 100, start + 4*PI/3, start);
  // Update the start point to turn in the next frame.
  start += speed*PI/180;
}
{{< /p5-global-iframe >}}


## 2.  Stepping feet

Observe el movimiento de los "pies" azules y amarillos. Los pies parecen pisar alternativamente, como diminutos pies que hacen tip-tap-tip-tap... Esto es más pronunciado si no se mira directamente a los pies, sino entre ellos.

En realidad, su movimiento es siempre simultáneo. Este fenómeno parece especialmente simpático.

### Solución

```js
let checkbox;
var barsColor;

var start, speedSlider, direction;
const feetHeight = 25, feetWidth = 80;

function setup() {
  createCanvas(700, 300);
  start = 0;
  noStroke();
  // Checkbox to toggle the background.
  checkbox = createCheckbox('background', true);
  checkbox.changed(backgroundCheckbox);
  // Start with the bars being drawn.
  barsColor = color('black');
  direction = 1;
  // Slider for the feet speed.
  speedSlider = createSlider(0, 100, 25);
  speedSlider.position(10, height + 20);
  speedSlider.style('width', '80px');
}

function draw() {
  background(220);
  const number_of_bars = 40;
  // Draw the bars using the color from the checkbox.
  for( var i = 0 ; i < number_of_bars ; i ++ ){
    if( i%2 == 0 ) fill(barsColor);
    else fill('white');
    var x = (width/number_of_bars) * i;
    rect(x, 0, width/number_of_bars, height);
  }
  // Draw the feet.
  fill('yellow');
  rect(start, 100, feetWidth, feetHeight);
  fill('blue');
  rect(start, 200, feetWidth, feetHeight);
  // Update the position of the feet.
  var speed = speedSlider.value() / 100 * 2;
  // Update the direction if necessary.
  if( start + feetWidth + speed * direction > width || start + speed * direction < 0 )
    direction *= -1;
  start += speed * direction;
}

function backgroundCheckbox() {
  // If the chack box is active, draw the black bars.
  if (checkbox.checked()) {
    barsColor = color('black');
  } else {
    barsColor = color('white');
  }
}
```

{{< p5-global-iframe id="breath" width="720" height="400" >}}
let checkbox;
var barsColor;

var start, speedSlider, direction;
const feetHeight = 25, feetWidth = 80;

function setup() {
  createCanvas(700, 300);
  start = 0;
  noStroke();
  // Checkbox to toggle the background.
  checkbox = createCheckbox('background', true);
  checkbox.changed(backgroundCheckbox);
  // Start with the bars being drawn.
  barsColor = color('black');
  direction = 1;
  // Slider for the feet speed.
  speedSlider = createSlider(0, 100, 25);
  speedSlider.position(10, height + 30);
  speedSlider.style('width', '80px');
}

function draw() {
  background(220);
  const number_of_bars = 40;
  // Draw the bars using the color from the checkbox.
  for( var i = 0 ; i < number_of_bars ; i ++ ){
    if( i%2 == 0 ) fill(barsColor);
    else fill('white');
    var x = (width/number_of_bars) * i;
    rect(x, 0, width/number_of_bars, height);
  }
  // Draw the feet.
  fill('yellow');
  rect(start, 100, feetWidth, feetHeight);
  fill('blue');
  rect(start, 200, feetWidth, feetHeight);
  // Update the position of the feet.
  var speed = speedSlider.value() / 100 * 2;
  // Update the direction if necessary.
  if( start + feetWidth + speed * direction > width || start + speed * direction < 0 )
    direction *= -1;
  start += speed * direction;
}

function backgroundCheckbox() {
  // If the chack box is active, draw the black bars.
  if (checkbox.checked()) {
    barsColor = color('black');
  } else {
    barsColor = color('white');
  }
}
{{< /p5-global-iframe >}}

## 3.  Ebbinghaus Illusion

Llamada así por el psicólogo alemán Hermann Ebbinghaus (1850-1909), la ilusión de Ebbinghaus (a veces también denominada círculos de Titchener) es una ilusión óptica que muestra cómo la percepción del tamaño puede ser manipulada por las formas circundantes.

El descubrimiento de esta ilusión se remonta a finales del siglo XIX. Todavía no se conoce bien su mecánica. Es una forma bastante directa de mostrar cómo el contexto de un objeto en la escena puede influir mucho en nuestra percepción del tamaño. En la animación, el círculo naranja rodeado por los más pequeños que giran parece ser claramente más grande que el de la izquierda, cuando en realidad tienen el mismo tamaño. Esto puede confirmarse utilizando el control deslizante para hacer transparentes los círculos giratorios de ambos lados.

### Solución

```js
var r;
var x1, y1, r1, mov1, number_of_circles_1;
var x2, y2, r2, mov2, number_of_circles_2;
var start = 0, angularSpeed;
var circleAlpha;

function setup() {
  createCanvas(600, 400);
  noStroke();
  // Set the parameters for the circles
  x1 = 200;
  y1 = 200;
  x2 = 400;
  y2 = 200;
  r = 30;
  r1 = 60
  r2 = 20;
  mov1 = 55;
  number_of_circles_1 = 5;
  mov2 = 30;
  number_of_circles_2 = 7;
  // Set the rotation speed.
  angularSpeed = 0.5 * PI/180;
  // Slider that set the opacity of the rotating circles.
  slider = createSlider(0, 100, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  background(220);
  // Draw the center circles.
  fill('orange');
  circle(x1, y1, r);
  circle(x2, y2, r);
  // Set the color for the rotating circles using the alpha from the slider.
  fill(`rgba(0,0,255,${slider.value()/100})`);
  // Draw the big rotating circles.
  var step = 2*PI / number_of_circles_1;
  for(var i = 0 ; i < number_of_circles_1 ; i++) {
    var alpha = start + step*i;
    var curr_x = x1 + mov1 * cos(alpha);
    var curr_y = y1 + mov1 * sin(alpha);
    circle(curr_x, curr_y, r1);
  }
  // Draw the small rotating circles.
  step = 2*PI / number_of_circles_2;
  for(var i = 0 ; i < number_of_circles_2 ; i++) {
    var alpha = start + step*i;
    var curr_x = x2 + mov2 * cos(alpha);
    var curr_y = y2 + mov2 * sin(alpha);
    circle(curr_x, curr_y, r2);
  }
  // Update the start point to rotate the circles.
  start += angularSpeed;
}
```

{{< p5-global-iframe id="breath" width="625" height="450" >}}
var r;
var x1, y1, r1, mov1, number_of_circles_1;
var x2, y2, r2, mov2, number_of_circles_2;
var start = 0, angularSpeed;
var circleAlpha;

function setup() {
  createCanvas(600, 400);
  noStroke();
  // Set the parameters for the circles
  x1 = 200;
  y1 = 200;
  x2 = 400;
  y2 = 200;
  r = 30;
  r1 = 60
  r2 = 20;
  mov1 = 55;
  number_of_circles_1 = 5;
  mov2 = 30;
  number_of_circles_2 = 7;
  // Set the rotation speed.
  angularSpeed = 0.5 * PI/180;
  // Slider that set the opacity of the rotating circles.
  slider = createSlider(0, 100, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  background(220);
  // Draw the center circles.
  fill('orange');
  circle(x1, y1, r);
  circle(x2, y2, r);
  // Set the color for the rotating circles using the alpha from the slider.
  fill(`rgba(0,0,255,${slider.value()/100})`);
  // Draw the big rotating circles.
  var step = 2*PI / number_of_circles_1;
  for(var i = 0 ; i < number_of_circles_1 ; i++) {
    var alpha = start + step*i;
    var curr_x = x1 + mov1 * cos(alpha);
    var curr_y = y1 + mov1 * sin(alpha);
    circle(curr_x, curr_y, r1);
  }
  // Draw the small rotating circles.
  step = 2*PI / number_of_circles_2;
  for(var i = 0 ; i < number_of_circles_2 ; i++) {
    var alpha = start + step*i;
    var curr_x = x2 + mov2 * cos(alpha);
    var curr_y = y2 + mov2 * sin(alpha);
    circle(curr_x, curr_y, r2);
  }
  // Update the start point to rotate the circles.
  start += angularSpeed;
}
{{< /p5-global-iframe >}}

## 4.   Stereokinetic Effect

El efecto estereocinético es una ilusión de profundidad. Sin embargo, a diferencia de las simples ilusiones de profundidad, como el cubo de Necker, el efecto estereocinético es un ejemplo de profundidad a partir del movimiento. En la ilusión, un conjunto de anillos concéntricos gira como si estuviera sobre una plataforma giratoria. Un conjunto más pequeño de anillos en el centro gira alrededor de un eje diferente, lo que puede dar la ilusión de que estos anillos más pequeños tienen profundidad espacial. Aunque la ilusión más frecuente es la de un agujero giratorio (en otras palabras, el anillo más interior es el punto más alejado del espectador), con algo de práctica se puede cambiar la percepción a la de un pico giratorio (en cuyo caso el anillo más interior es el más cercano al espectador).

### Solucion

```js
class Circle {
  constructor(r, coordR, color) {
    this.r = r;
    this.coordR = coordR;
    this.color = color;
  }

  render(centerX, centerY, angle) {
    const coord = polarCoordinates(this.coordR, angle);
    const x = coord.x;
    const y = coord.y;

    noStroke();
    fill(this.color);

    circle(centerX + x, centerY + y, this.r);
  }
}
function polarCoordinates(r, angle) {
  let x = 0;
  y = 0;
  x = r * cos(angle);
  y = r * sin(angle);

  return { x, y };
}

function renderingCirles() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].render(centerX, centerY, angle);
  }
}
```

## Conclusionses

### Stroboscopic Artifacts

It is very important to take into account the particularities of our color and movement perception when working with computer graphics. Specifically, the limitations and design of our display technology can impact and fundamentaly change how our animations are perceived.

### Stepping feet

Movement illusions like this are an important remainder that our perception of movement and its timing is heavuly dependent on the background, and therefore should be tested and observed with in the required context to obtain the desired perception. This illusion could possibly be used as means to accentuate certain movements, specialy in comparison to the movement of other objects in the scene.

### Ebbinghaus Illusion

Our perception of size is heavly skewed by the context. With this knowledge, we can make certain objects in our scene be perceived as smaller of bigger in comparison by using artifacts of this kind. In this way we can draw focus to certain elements we want to make more noticeable.

### Stereokinetic Effect

## Referencias

[148 Optical Illusions & Visual Phenomena + Explanations](https://michaelbach.de/ot/) by Michael Bach
* [Stroboscopic Artifacts](https://michaelbach.de/ot/mot-strob/index.html)
* [“Stepping feet” Motion Illusion](https://michaelbach.de/ot/mot-feetLin/index.html)
* [Ebbinghaus Illusion](https://michaelbach.de/ot/cog-Ebbinghaus/index.html)

 # -----------

 # **Ilusiones Ópticas** 👀 🧠

Las ilusiones ópticas, son imágenes que el ojo humano percibe como real y que en realidad no existe. 

Las ilusiones ópticas son producto de que los ojos envias información a nuestro cerebro que nos hace creer que podemos ver algo que realmente no existe. 

Existen diferentes tipos de ilusiones ópticas. Ya sean las psicológicas, las ambiguas, distorsionadores y las paradójicas, todas juegan con lo que percibimos como realidad y nos hace cuestionar si todo lo que vemos nuesto cerebro lo percibe como real y tal vez no exista.

*   Ilusiones ambiguas:

Son imágenes que se pueden ver en más de una forma. Un ejemplo de ello es la imagen de dos personas de perfil que puede interpretarse como una copa de beber.

*   Ilusiones paradójicas:

Son imágenes que muestran objetos que no pueden existir debido a que rompen las leyes de la física. Este tipo de ilusiones se ven mayoritariamente en las obras de arte.

*   Ilusiones psicológicas:

Causadas por el orden psicológico de cada mente y lo que ven sus ojos.


*   Ilusiones de distorsión:

Son imágenes que usan técnicas de diseño para hacer objetos que poseen el mismo tamaño, verse distorsionados.


{{<hint info >}}
### **Dato curioso** ⚡

La palabra *ilusión* viene del latín *illudere* que significa burlarse.

{{< /hint >}}

## **Algunos ejemplos de ilusiones ópticas**

1.   **Adaptación del contorno** - Stuart Anstis

En esta ilusión óptica trata sobre la adaptación al contraste que hace que al mantenerse las ruedas de la bicicleta parpadeando de blanco a negro, la función de transferencia de contraste se desplace. 

Esta función de transferencia de contraste hace referencia a cómo las anomalias en un microscopio electrónico de transmisión (TEM) modifican el resultado de la imagen vista desde allí y por lo tanto los pasos de la luminancia del contorno de las ruedas hace que haya un subumbral (proceso en el que se usan pequeños impulsos eléctricos para estimular los músculos débiles). 

Debido a que al no poder observar la percepción de los pasos de cambio de color de las ruedas y al generar e subumbra, el ojo perderá la vista de toda el área. La ganancia de contraste junto con una constante de tiempo hace que se pueda percibir las ruedas existentes de la bícicleta.

### **¿Cómo funciona?**

Para evidenciar la ilusión óptica se debe mantener el click presionado, allí entonces empezará a funcionar la ilusión.

Se recomienda presionar el mayor tiempo posible para experimentar una mejor sensación


{{< p5-global-iframe id="kk" ver="1.4.2" width="650" height="500" >}}
let tamanioCanvas = 500;
var angulo = 0;
var velocidad = 0.09;

function setup() {
  createCanvas(tamanioCanvas*1.3, tamanioCanvas);
  angleMode(DEGREES);
}

function draw() {
  
  let ms = millis();
  let cloudx = 100;
  let cloudy = 100;
  let blue = 189;


  background(119,119,119);

  //Nubes

  makeCloud(cloudx, cloudy-70);
  makeCloud(cloudx + 100, cloudy + 30)
  makeCloud(cloudx + 300, cloudy - 70)
  makeCloud(cloudx + 380, cloudy + 10)
  cloudx+=0.1;


  //Pasto 

  //Ruedas
  fill(132,132,132)
  noStroke()
  circle(200,350,130);
  circle(440,353,130);

  strokeWeight(11);

  stroke('#7F7FCC')
  line(200, 350, 250, 200);
  //manubrio
  line(250,200, 280, 200);
  
  //Marco
  line(240,245,360,350); // \
  line(400,230,360,340); // /
  line(360,350,440,353); // _
  line(440,353,390,255);
  line(240,245,390,245);
  
  //sillín
  line(390,230,410,230);
  
  if (mouseIsPressed === true) {

    //ruedas alumbrantes
    if(ms%1.5 === 0){
      noFill();
      stroke('black');
      strokeWeight(8);
      circle(200,350,130);
      circle(440,353,130);


    }else{

      noFill();
      stroke('white')
      strokeWeight(8)
      circle(200,350,130);
      circle(440,353,130);

    }

    //+
    translate(320, 300);
    strokeWeight(3)
    stroke('#00ff00');
    rotate(angulo);
    line(0,0,5,5);
    line(0,0,-5,5);
    line(0,0,5,-5);   
    line(0,0,-5,-5);
    angulo++;   
  }

}

function makeCloud(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

class Mas{
  constructor(x_1, y_1, x_2, y_2) {
    this.x_1 = x_1;
    this.y_1 = y_1;
    this.x_2 = x_2;
    this.y_2 = y_2;
  }

  display(){
    strokeWeight(3)
    stroke('#00ff00');
    rotate(0)
    line(this.x_1,this.y_1,this.x_2,this.y_2);
    rotate(0)
    line(this.x_1+5,this.y_1-5,this.x_2-5,this.y_2+5);
    angulo++;
  }
}

{{< /p5-global-iframe >}}

# **Código**

```js
let tamanioCanvas = 500;
var angulo = 0;
var velocidad = 0.09;

function setup() {
  createCanvas(tamanioCanvas*1.3, tamanioCanvas);
  angleMode(DEGREES);
}

function draw() {
  
  let ms = millis();
  let cloudx = 100;
  let cloudy = 100;
  let blue = 189;


  background(119,119,119);

  //Nubes

  makeCloud(cloudx, cloudy-70);
  makeCloud(cloudx + 100, cloudy + 30)
  makeCloud(cloudx + 300, cloudy - 70)
  makeCloud(cloudx + 380, cloudy + 10)
  cloudx+=0.1;


  //Pasto 

  //Ruedas
  fill(132,132,132)
  noStroke()
  circle(200,350,130);
  circle(440,353,130);

  strokeWeight(11);

  stroke('#7F7FCC')
  line(200, 350, 250, 200);
  //manubrio
  line(250,200, 280, 200);
  
  //Marco
  line(240,245,360,350); // \
  line(400,230,360,340); // /
  line(360,350,440,353); // _
  line(440,353,390,255);
  line(240,245,390,245);
  
  //sillín
  line(390,230,410,230);
  
  if (mouseIsPressed === true) {

    //ruedas alumbrantes
    if(ms%1.5 === 0){
      noFill();
      stroke('black');
      strokeWeight(8);
      circle(200,350,130);
      circle(440,353,130);


    }else{

      noFill();
      stroke('white')
      strokeWeight(8)
      circle(200,350,130);
      circle(440,353,130);

    }

    //+
    translate(320, 300);
    strokeWeight(3)
    stroke('#00ff00');
    rotate(angulo);
    line(0,0,5,5);
    line(0,0,-5,5);
    line(0,0,5,-5);   
    line(0,0,-5,-5);
    angulo++;   
  }

}

function makeCloud(cloudx, cloudy) {
  fill(250)
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

class Mas{
  constructor(x_1, y_1, x_2, y_2) {
    this.x_1 = x_1;
    this.y_1 = y_1;
    this.x_2 = x_2;
    this.y_2 = y_2;
  }

  display(){
    strokeWeight(3)
    stroke('#00ff00');
    rotate(0)
    line(this.x_1,this.y_1,this.x_2,this.y_2);
    rotate(0)
    line(this.x_1+5,this.y_1-5,this.x_2-5,this.y_2+5);
    angulo++;
  }
}

```

2.   **La ilusión confeti** 🎉 🎉 🎉

Esta ilusión muestra como varios elementos que poseen un mismo color, al estar expuestos a diferentes franjas de determinados colores se pueden percibir como colores diferentes.  

La base de esta ilusión óptica es ver como a partir de la aparición de ciertos colores entro de un elemento, se pueden generar cambios en el color. Es importante destacar que esta ilusión óptica no toma en cuenta la luminacia en ningún instante.

  *   **Ilusiones de asimilación de color** 🔴 🟢 🟡 🔵

  Estas ilusiones permiten ver cómo se puede cambiar el color de fondode ciertos objetos cuando introducimos formas de colores dentro de ellos, como por ejemplo las rayas, círculos concéntricos, etc.  

Aun independientemente del tipo de forma que se use para que se sobreponga a los objetos de igual color, el efecto será el mismo debido a que el cerebro desea llenar los espacios vacíos de entre las rayas y esto lo hace teniendo en cuenta los colores que tenga a su alrededor. Es importante destacar que estos colores deben poseer una luminancia mayor a la del color que poseen las formas, de esta manera se garantiza que el cerebro capte mejor las rayas más sobresalientes.


{{<hint info >}}
### **Dato curioso** ⚡

El color es una de las cosas más subjetivas que existen. Muchas personas no poseen la capacidad de diferencias entre tonos de colores en incluso colores.

{{< /hint >}}

### **¡Pruébalo tú mismo!** 🎩 🪄
Para quitar las rayas de colores y poder evidenciar el efecto de esta ilusión optica se debe mantener presionado el mouse. 

{{< p5-global-iframe id="kk" ver="1.4.2" width="700" height="500" >}}

let ancho = 0.4;
let alturaMalla = 0.5;
let distanciaEntreBarras = 400;
let numeroBarras = 4;
let tamanio = 500
let tamanioBarrasCuadrado = 10;
let tamanioCuadrado = 45

function setup() {
  createCanvas(tamanio*1.4, tamanio);
  let franjas = tamanio/(ancho*numeroBarras)

  cuadrado1 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,60, "red");
  cuadrado2 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,270, "green");
  cuadrado3 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,460, "red");
  cuadrado4 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,700);
  cuadrado5 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,170);
  cuadrado6 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,370);
  cuadrado7 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,570);
  cuadrado8 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,60);
  cuadrado9 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,260);
  cuadrado10 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,460);
  cuadrado11 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,710);
  cuadrado12 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,170);
  cuadrado13 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,370);
  cuadrado14 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,560);

  malla = new Malla(10,0,alturaMalla,0,distanciaEntreBarras,numeroBarras, franjas);
  
}

function draw() {
  background(238, 75, 43);
  let c =  color(250,219,172);
  fill(c);
  noStroke();
  
  if (mouseIsPressed === false) {
    malla.display();
  }
  
  cuadrado1.display();
  cuadrado2.display();
  cuadrado3.display();
  cuadrado4.display();
  cuadrado5.display();
  cuadrado6.display();
  cuadrado7.display();
  cuadrado8.display();
  cuadrado9.display();
  cuadrado10.display();
  cuadrado11.display();
  cuadrado12.display();
  cuadrado13.display();
  cuadrado14.display();
  

}

// clase Malla
class Malla {
  constructor(iw, ixp, ih, iyp, id, it, f) {
    this.w = iw; // ancho de una barra
    this.xpos = ixp; // posición x del rectángulo
    this.h = ih; // altura del rectángulo
    this.ypos = iyp; // posición y del rectángulo
    this.d = id; // distancia de una barra
    this.t = it; // número de barras
    this.f = f; //Franjas de colores en la imagen
  }
  
  display() {
    let verde = color(105,229,174)
    let rojo = color(238, 75, 43)
    for (let i = 0; i < tamanio; i++) {
      fill(verde);
      rect(0 , this.ypos + i * (2*this.w) , tamanio*1.5, this.w);
    }
  }
}

// clase cuadrado con lineas verdes
class Cuadrado{
  constructor(lado, anchoLineas, x , y ,color) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lineas = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    let rayas = new Rayas(this.lado, this.w, this.x, this.y,this.color);
    if (mouseIsPressed === false) {
      rayas.display();
    }
    
  }
}
// clase cuadrado con lineas rojas
class CuadradoRed {
  constructor(lado, anchoLineas, x , y ) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
  }
  
  display() {
    let lineas = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    for(let i = 0; i< lineas-1; i++){
      fill(238, 75, 43);
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }
  }
}

class Rayas{ 
  
  constructor(lado, anchoLineas, x , y , color) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lineas = this.lado/this.w
    for(let i = 0; i< lineas-1; i++){
      if(this.color === 'red'){
        fill(238, 75, 43);
      }else{
        fill(105,229,174);      
      } 
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }

  
  }
}

{{< /p5-global-iframe >}}
# **Código**
```js

let ancho = 0.4;
let alturaMalla = 0.5;
let distanciaEntreBarras = 400;
let numeroBarras = 4;
let tamanio = 500
let tamanioBarrasCuadrado = 10;
let tamanioCuadrado = 45

function setup() {
  createCanvas(tamanio*1.4, tamanio);
  let franjas = tamanio/(ancho*numeroBarras)

  cuadrado1 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,60, "red");
  cuadrado2 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,270, "green");
  cuadrado3 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,460, "red");
  cuadrado4 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,100,700);
  cuadrado5 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,170);
  cuadrado6 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,370);
  cuadrado7 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,300,570);
  cuadrado8 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,60);
  cuadrado9 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,260);
  cuadrado10 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,460);
  cuadrado11 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,500,710);
  cuadrado12 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,170);
  cuadrado13 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,370);
  cuadrado14 = new Cuadrado(tamanioCuadrado,tamanioBarrasCuadrado,700,560);

  malla = new Malla(10,0,alturaMalla,0,distanciaEntreBarras,numeroBarras, franjas);
  
}

function draw() {
  background(238, 75, 43);
  let c =  color(250,219,172);
  fill(c);
  noStroke();
  
  if (mouseIsPressed === false) {
    malla.display();
  }
  
  cuadrado1.display();
  cuadrado2.display();
  cuadrado3.display();
  cuadrado4.display();
  cuadrado5.display();
  cuadrado6.display();
  cuadrado7.display();
  cuadrado8.display();
  cuadrado9.display();
  cuadrado10.display();
  cuadrado11.display();
  cuadrado12.display();
  cuadrado13.display();
  cuadrado14.display();
  

}

// clase Malla
class Malla {
  constructor(iw, ixp, ih, iyp, id, it, f) {
    this.w = iw; // ancho de una barra
    this.xpos = ixp; // posición x del rectángulo
    this.h = ih; // altura del rectángulo
    this.ypos = iyp; // posición y del rectángulo
    this.d = id; // distancia de una barra
    this.t = it; // número de barras
    this.f = f; //Franjas de colores en la imagen
  }
  
  display() {
    let verde = color(105,229,174)
    let rojo = color(238, 75, 43)
    for (let i = 0; i < tamanio; i++) {
      fill(verde);
      rect(0 , this.ypos + i * (2*this.w) , tamanio*1.5, this.w);
    }
  }
}

// clase cuadrado con lineas verdes
class Cuadrado{
  constructor(lado, anchoLineas, x , y ,color) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lineas = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    let rayas = new Rayas(this.lado, this.w, this.x, this.y,this.color);
    if (mouseIsPressed === false) {
      rayas.display();
    }
    
  }
}
// clase cuadrado con lineas rojas
class CuadradoRed {
  constructor(lado, anchoLineas, x , y ) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
  }
  
  display() {
    let lineas = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    for(let i = 0; i< lineas-1; i++){
      fill(238, 75, 43);
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }
  }
}

class Rayas{ 
  
  constructor(lado, anchoLineas, x , y , color) {
    this.lado = lado
    this.w = anchoLineas
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lineas = this.lado/this.w
    for(let i = 0; i< lineas-1; i++){
      if(this.color === 'red'){
        fill(238, 75, 43);
      }else{
        fill(105,229,174);      
      } 
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }

  
  }
}

```


{{<hint info >}}
### **Tip**  📣
¡Aléjate un poco para poder apreciar mejor el efecto de la ilusión!

{{< /hint >}}

3.   **Animación y estereografía de rejilla de barrera** 💃  🎥

Esta ilusión óptica muestra como a través de una rejilla y partes de un fotograma, se puede recrear un movimiento. 

La animación y la estereografía de rejilla nació en 1980 y fue utiliado ampliamente en el sector del cine ya que el método de pryección de las péliculas se basaba en una rejilla que se mantina estárica y una colección de fotos con animación de cuadrícula y de esta manera se lograba obtener toda una escena. 

Esta manera de obtener movimiento se basa en lograr engañar al cerebro y persuadirlo a ver lo que se quiere ya que el uso de estas franjas hacer que esto puendan descubrir figuras en patrones de datos asombrosamente escasos, si solo se mueven coherentemente. Las distancia entre rejas debe lograr solapar con las lineas de la imagen ajustada.


### **¿Cómo se crea una animación de cuadrícula?**  🤔

Para empezar se debe contar con una secuencia de fotogramas del objeto en movimiento. Se requiere que esta secuencia empiece y termine igual, estas se sobrepondran en determinado momento.

Posterior a ello cada imagen se deberá convertir en una silueta sombreada o en su defecto oscura, y por cada una de estas imágenes se tomarán las líneas sombreadas que se deseen. El número de lineas no es del todo relevantes, pero re requiere que el ancho y el espaciado de la cuadrícula logren captar las líneas de la imagen en determinado momento para que esta pueda simular el efecto de movimiento. Para mayor efecto de la ilusión estas imágenes puedes llevar colores y entre las lineas de las fotos se pueden generar sombreados para evitar el corte de las imágenes.

{{< p5-global-iframe id="kk" ver="1.4.2" width="700" height="500" >}}

let ancho = 10;
let alturaMalla = 0.4;
let distanciaEntreBarras = 1;
let numeroBarras = 40;
let equivalencia = 770
function setup() {

  createCanvas(700, 700);

  malla = new Malla(ancho,0,alturaMalla,0,distanciaEntreBarras,numeroBarras);
}

function draw() {
  background(255);

  
  //Creación de la malla
  malla.display();
  malla.move(mouseX, mouseY);

  strokeWeight(2);

  //Se dibuja la máquina
  rect(410,150,100,100);
  rect(420,250,80,20);
  
  rect(420,270,1,70)
  for (let i = 425; i< 495; i+=10){
    rect(i,270,7,7);
  }
  for (let i = 425; i< 495; i+=10){
    rect(i,278,5,30);
  }
  for (let i = 485; i>= 425; i-=10){
    rect(i,309,3,15);
  }
  for (let i = 485; i>= 425; i-=10){
    rect(i+2,324,1,15);
  }
  rect(495, 270, 5,5);
  rect(494, 278, 5,30);
  rect(494, 307, 3,15);
  rect(497, 324, 1,15);

  //Se crea malla principal
  for (let i = 0; i<=500; i+=10){
    strokeWeight(4);
    line(i, 300,i, 370);
    strokeWeight(2);
  }

  //Se crea malla luego de pasar por la maquina
  for (let i = 480; i<=1000; i+=10){
    strokeWeight(5);
    line(i, 360,i, 370);
    strokeWeight(1);
    line(i+3, 358,i+3, 372);
    line(i+4, 357,i+4, 372);
    strokeWeight(2);

  }
  
  let x = 0;
  let y = 300;
  for(let i = 0; i<= 8; i+=1){
    strokeWeight(2);
    line(x, y+5,x, y+73);
    line(x-10, y+10,x-10, y+73);

    line(x+2, y-2,x+2, y+76);
    line(x-2, y-2,x-2, y+76);

    line(x-13, y+8,x-13, y+75);
    line(x-23, y+18,x-23, y+61);
    line(x-12, y+25,x-12, y+58);
    line(x-20, y+20,x-20, y+63);
    line(x-22, y+16,x-22, y+59);

    line(x+12, y+25,x+12, y+58);
    line(x+10, y+10,x+10, y+73);
    line(x+13, y+8,x+13, y+75);
    line(x+23, y+18,x+23, y+63);
    line(x+20, y+20,x+20, y+65);
    line(x+30, y+30,x+30, y+55);

    x+=60;  
  }

  strokeWeight(2);

  




 

}
// clase Malla
class Malla {
  constructor(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // ancho de una barra
    this.xpos = ixp; // posición x del rectángulo
    this.h = ih; // altura del rectángulo
    this.ypos = iyp; // posición y del rectángulo
    this.d = id; // distancia de una barra
    this.t = it; // número de barras
  }
  
  display() {
    for (let i = 0; i < this.t; i++) {
      let negro = color('black');
      fill(negro);
      stroke(255,255,255)
      rect(
        this.xpos + i * (this.d + this.w),
        this.ypos,
        this.w,
        height * this.h
      );
      stroke(0,0,0)
    }
  }

  move(posX, posY) {
    this.ypos = posY;
    this.xpos = posX;
  }
}

{{< /p5-global-iframe >}}
# **Código**
```js
let ancho = 10;
let alturaMalla = 0.4;
let distanciaEntreBarras = 1;
let numeroBarras = 40;
let equivalencia = 770
function setup() {

  createCanvas(700, 700);

  malla = new Malla(ancho,0,alturaMalla,0,distanciaEntreBarras,numeroBarras);
}

function draw() {
  background(255);

  
  //Creación de la malla
  malla.display();
  malla.move(mouseX, mouseY);

  strokeWeight(2);

  //Se dibuja la máquina
  rect(410,150,100,100);
  rect(420,250,80,20);
  
  rect(420,270,1,70)
  for (let i = 425; i< 495; i+=10){
    rect(i,270,7,7);
  }
  for (let i = 425; i< 495; i+=10){
    rect(i,278,5,30);
  }
  for (let i = 485; i>= 425; i-=10){
    rect(i,309,3,15);
  }
  for (let i = 485; i>= 425; i-=10){
    rect(i+2,324,1,15);
  }
  rect(495, 270, 5,5);
  rect(494, 278, 5,30);
  rect(494, 307, 3,15);
  rect(497, 324, 1,15);

  //Se crea malla principal
  for (let i = 0; i<=500; i+=10){
    strokeWeight(4);
    line(i, 300,i, 370);
    strokeWeight(2);
  }

  //Se crea malla luego de pasar por la maquina
  for (let i = 480; i<=1000; i+=10){
    strokeWeight(5);
    line(i, 360,i, 370);
    strokeWeight(1);
    line(i+3, 358,i+3, 372);
    line(i+4, 357,i+4, 372);
    strokeWeight(2);

  }
  
  let x = 0;
  let y = 300;
  for(let i = 0; i<= 8; i+=1){
    strokeWeight(2);
    line(x, y+5,x, y+73);
    line(x-10, y+10,x-10, y+73);

    line(x+2, y-2,x+2, y+76);
    line(x-2, y-2,x-2, y+76);

    line(x-13, y+8,x-13, y+75);
    line(x-23, y+18,x-23, y+61);
    line(x-12, y+25,x-12, y+58);
    line(x-20, y+20,x-20, y+63);
    line(x-22, y+16,x-22, y+59);

    line(x+12, y+25,x+12, y+58);
    line(x+10, y+10,x+10, y+73);
    line(x+13, y+8,x+13, y+75);
    line(x+23, y+18,x+23, y+63);
    line(x+20, y+20,x+20, y+65);
    line(x+30, y+30,x+30, y+55);

    x+=60;  
  }

  strokeWeight(2);

  




 

}
// clase Malla
class Malla {
  constructor(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // ancho de una barra
    this.xpos = ixp; // posición x del rectángulo
    this.h = ih; // altura del rectángulo
    this.ypos = iyp; // posición y del rectángulo
    this.d = id; // distancia de una barra
    this.t = it; // número de barras
  }
  
  display() {
    for (let i = 0; i < this.t; i++) {
      let negro = color('black');
      fill(negro);
      stroke(255,255,255)
      rect(
        this.xpos + i * (this.d + this.w),
        this.ypos,
        this.w,
        height * this.h
      );
      stroke(0,0,0)
    }
  }

  move(posX, posY) {
    this.ypos = posY;
    this.xpos = posX;
  }
}

```
# **Referencias**

  *   [Constrast transfer function](https://en.wikipedia.org/wiki/Contrast_transfer_function)
  *   [Anstis' Contour Adaptation](https://michaelbach.de/ot/lum-contourAdapt/index.html)
  *   [Ilusión óptica de Munker-White: cuestión de percepciones](https://franciscotorreblanca.es/ilusion-optica-de-munker-white/)
  *   [The confetti illusion](https://journalofillusion.net/index.php/joi/article/view/6152t)
  * [Barrier-grid animation and stereography](https://en.wikipedia.org/wiki/Barrier-grid_animation_and_stereography)
  *  [Barrier-Grid (or Picket-Fence) Animation](https://www.opticalillusion.net/optical-illusions/animated-moire-or-scanimation/)
