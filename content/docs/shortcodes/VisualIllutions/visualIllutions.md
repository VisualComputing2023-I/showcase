# Workshop: Visual Illusions

{{< hint info >}}
**Workshop 1**  
Study, implement and discuss possible applications of some known visual phenomena and optical illusions.
{{< /hint >}}

## Problem statement
Identify, implement, and discuss possible applications of some known optical illussions on the design and development of computer graphics.

## Background

### Stroboscopic Artifacts

The color wheel displayed contains the three colors: red, green, and blue. When the angular speed of the rotation is turned up to 120° per frame, a strange effect can be seen. The colors seems to mix and it results in a gray-ish color. This occurs since movement on a screen is never purely smooth, it only appears to be so when small changes occur frame after frame. At this rotation speed, the three circular sections just change their color, so our perception is that the colors are mixing; hence why we see a tone of gray.

The visualization of this effect is dependent also on the framerate of the display, so results may vary. It is also worth noting that if the speed is set to almost 120° but not quite all the way there, the perception will be that the wheel is turning counter-clockwise instead of the original clockwise turn.

### Stepping feet

The yellow and blue bars are reffered as "feet" since they appear to move one after the other as if they're walking. When the background is removed, the true nature of their movement is apparent: they move steadily and together. This illusion was originally demonstrated by Stuart Anstis in 2003. The actual cause of this illusion is still being debated.

### Ebbinghaus Illusion

The discovery of this illusion dates back to the end of the 19th century. Its mechanics are still not well understood. It is a quite direct way to show how the context of an object in the scene can heavily influence our perception of size. In the animation, the orange circle surrounded by the smaller rotating ones seems to clearly be larger that the left one, when in reality they are the same size. This can be confirmed by using the slider to make the rotating circles in both sides transparent.

## Code (solution) & results

### Stroboscopic Artifacts

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

### Stepping feet
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

### Ebbinghaus Illusion
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

## Conclusions & future work

### Stroboscopic Artifacts

It is very important to take into account the particularities of our color and movement perception when working with computer graphics. Specifically, the limitations and design of our display technology can impact and fundamentaly change how our animations are perceived.

### Stepping feet

Movement illusions like this are an important remainder that our perception of movement and its timing is heavuly dependent on the background, and therefore should be tested and observed with in the required context to obtain the desired perception. This illusion could possibly be used as means to accentuate certain movements, specialy in comparison to the movement of other objects in the scene.

### Ebbinghaus Illusion

Our perception of size is heavly skewed by the context. With this knowledge, we can make certain objects in our scene be perceived as smaller of bigger in comparison by using artifacts of this kind. In this way we can draw focus to certain elements we want to make more noticeable.

## Sources

[148 Optical Illusions & Visual Phenomena + Explanations](https://michaelbach.de/ot/) by Michael Bach
* [Stroboscopic Artifacts](https://michaelbach.de/ot/mot-strob/index.html)
* [“Stepping feet” Motion Illusion](https://michaelbach.de/ot/mot-feetLin/index.html)
* [Ebbinghaus Illusion](https://michaelbach.de/ot/cog-Ebbinghaus/index.html)


# -------------------------------------------------------------------------------------------------------------------------------

# Visual Illusions 👁

{{< hint danger >}}
<b> Workshop </b>

Estudie, implemente y discuta posibles aplicaciones de algunos fenómenos visuales e ilusiones ópticas conocidas.

{{< /hint >}}


## Illusion 1: Stepping Feet 👣

## Marco Teorico

La ilusión "Stepping Feet" es un fenómeno de percepción del movimiento, donde se percibe que el recuadro azul y amarillo varían sus velocidades relativa de manera dramática, aunque en realidad su movimiento es constante.

{{< hint warning >}}
**¿Qué está pasando?**
Cuando el recuadro azul se encuentra sobre las líneas blancas, el contraste es alto, por lo cual el movimiento se percibe más rápido que su velocidad real. Por otro lado, cuando el recuadro se encuentra sobre las líneas negras, el contraste resultante es bajo y más difícil de ver.

El efecto contrario ocurre para el recuadro amarillo, resultando en la ilusión de que los recuadros dan pasos alternadamente.
{{< /hint >}}

Debido a lo anterior, cuando el contraste desaparece, es posible ver que los recuadros se mueven a la misma velocidad.

## Solucion y resultados

Este efecto es más pronunciado cuando se fija la visión en la zona entre los recuadros.
{{< hint info >}} ‼ Haz click en el canvas para revelar la ilusión. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/SteppingFeet.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="405" height="258">}}

## Source Code

```js
let x = 0; // Posición en x de los recuadros
let vx = 0.5; // Velocidad de desplazamiento
let w = 50; // Ancho de los recuadros

function setup() {
  createCanvas(400, 250);
  colorMode(RGB, 255);
}

function draw() {
  // De acuerdo al mouseIsPressed se pinta un fondo con alto o bajo contraste
  if (mouseIsPressed) {
    lowContrastBackground();
  } else {
    highContrastBackground();
  }

  // Actualización de la velocidad cuando llega al limite del canvas
  if (x + vx > width - w || x + vx < 0) {
    vx *= -1;
  }

  // Actualización de la posición en cada iteración
  x += vx;

  noStroke();

  // Recuadro amarillo
  fill(color(244, 244, 0));
  rect(x, 80, w, 20);

  // Recuadro azul
  fill(color(4, 4, 156));
  rect(x, 160, w, 20);
}

function highContrastBackground() {
  for (let i = 0; i < 750; i += 9) {
    if (i % 2 == 0) {
      fill(242, 242, 242, 255);
    } else {
      fill(12, 12, 12, 255);
    }
    rect(i, 0, 9, 400);
  }
}

function lowContrastBackground() {
  for (let i = 0; i < 750; i += 9) {
    if (i % 2 == 0) {
      fill(140);
    } else {
      fill(116);
    }
    rect(i, 0, 9, 400);
  }
}
```

## Illusion 2 : Stereokinetic Effect (SKE) 🧿

## Marco Teorico

La rotación de las figuras adecuadas puede crear una ilusión tridimensional. Un ejemplo que permite demostarlo es el <b>efecto estereocinético</b> el cual una ilusión de profundidad. Puede pasar algún tiempo hasta que surja la percepción.

{{< hint info >}}
**¿Qué es el efecto estereocinético?**  
El efecto estereocinético (SKE) se ha definido y estudiado mediante <b>patrones circulares anidados</b> que giran en una plataforma giratoria. Los círculos deben parecer que no giran, lo que a su vez da lugar a que parecen trasladarse unos a otros.
{{< /hint >}}

## Solucion y resultados

A continuación, podemos observar un ejemplo de lo mencionado anteriormente: <br/>

{{< hint info >}} Manten el click en el canvas para ver otro tipo de efecto !. {{< /hint >}}

{{<p5-iframe ver="1.4.2" sketch="/showcase/sketches/illusions/StereokineticEffect.js" lib1="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="404" height="408">}}

Se ha comprobado que las visualizaciones consistentes en simples traslaciones evocan impresiones de <b>profundidad sólidas</b>.

{{< hint warning >}}
<b>Musatti (1924)</b> publicó el primer informe sobre los fenómenos estereocinéticos y atribuyó su descubrimiento y denominación a su maestro profesor, Vittorio Benussi
{{< /hint >}}

Como se observa en la ilusión, un conjunto de anillos concéntricos gira como si estuviera en una plataforma giratoria. Un conjunto más pequeño de anillos en el centro gira alrededor de un eje diferente, lo que puede dar la ilusión de que estos anillos más pequeños tienen <b>profundidad espacial</b>.

<img src="/showcase/sketches/illusions/stereokineticEffect.PNG">

<b>Imagen 1</b> : Efecto estereocinético (SKE) tradicional girada 90°.

## Source Code

A continuación se muestran las funciónes principales las cuales permitieron crear esta ilusion:

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

## Aplicaciones

Los candidatos más lógicos son los sistemas que requieren movimiento en tiempo real pero en los que las limitaciones de coste, tamaño o fiabilidad impiden el uso de motores de geometría 3D.

{{< hint info >}}
<b>Mapas de contorno en movimiento</b> : Los mapas de contorno se utilizan en la navegación por la siesta,
La tripulación correlaciona las características del terreno vistas fuera de la cabina con las características representadas en el mapa para lograr y mantener la orientación geográfica.
{{< /hint >}}
<img src="/showcase/sketches/illusions/application.PNG">

<b>Imagen 2</b> : Una línea de elevación constante representada en una superficie y en un mapa de contorno.

{{< hint info >}}
<b>Pantalla de control del tráfico aéreo</b>: Al enrutar y poner en cola el tráfico aéreo, los controladores necesitan recuperar las relaciones espaciales en 3D entre las aeronaves.

Se han desarrollado y evaluado varios formatos de visualización alternativos que utilizan señales de perspectiva
{{< /hint >}}
<img src="/showcase/sketches/illusions/airTrafficControlDisplay.jpg">

<b>Imagen 3</b> : Pantalla de control de tráfico aereo.

## Conclusiones

* Es útil estudiar las ilusiones ópticas y “Visual Artifacts” que existen, de modo que se eviten o apliquen de manera estratégica cuando sea pertinente, para lograr algún objetivo visual.

# Referencias

{{< hint danger >}}

Stereokinetic Effect.Neurobs.
https://www.neurobs.com/manager/content/docs/psychlab101_experiments/Stereokinetic%20Effect/description.html

Proffitt, D. R., Rock, I., Hecht, H., & Schubert, J. (1992). Stereokinetic effect and its relation to the kinetic depth effect. Journal of Experimental Psychology: Human Perception
and Performance, 18(1), 3–21. https://doi.org/10.1037/0096-1523.18.1.3

G. (2018, 8 noviembre). ¿Qué son las isolíneas, contornos o curvas de nivel? El blog de franz. https://acolita.com/que-son-las-isolineas-contornos-o-curvas-de-nivel/

{{< /hint >}}
