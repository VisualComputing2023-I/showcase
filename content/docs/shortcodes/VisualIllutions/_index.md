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

{{< hint danger >}}

Stereokinetic Effect.Neurobs.
https://www.neurobs.com/manager/content/docs/psychlab101_experiments/Stereokinetic%20Effect/description.html

Proffitt, D. R., Rock, I., Hecht, H., & Schubert, J. (1992). Stereokinetic effect and its relation to the kinetic depth effect. Journal of Experimental Psychology: Human Perception
and Performance, 18(1), 3–21. https://doi.org/10.1037/0096-1523.18.1.3

G. (2018, 8 noviembre). ¿Qué son las isolíneas, contornos o curvas de nivel? El blog de franz. https://acolita.com/que-son-las-isolineas-contornos-o-curvas-de-nivel/

{{< /hint >}}

# ——————————————————————————————

