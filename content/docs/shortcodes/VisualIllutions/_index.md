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

### Solución (Código):

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
### Resultado:

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


## 2.   Contour adaptation

En esta ilusión óptica trata sobre la adaptación al contraste que hace que al mantenerse las ruedas de la bicicleta parpadeando de blanco a negro, la función de transferencia de contraste se desplace. 

Esta bicicleta perderá sus ruedas... Pulsa el botón "Parpadeo" y mantén la mirada fija en la cruz verde del centro. Cuando el parpadeo se detenga, las ruedas habrán desaparecido, pero volverán a aparecer al cabo de unos segundos.

El deslizador de contraste de la derecha debe ajustarse de modo que las ruedas de la bicicleta sean apenas -pero claramente- visibles. La duración del parpadeo está preajustada a 8 s, tiempos más largos aumentan el efecto de supresión, entonces funciona con contrastes más altos. También puede comprobar varias frecuencias de parpadeo, preajustadas a 5 Hz.

### Solución (Código):

```js
let sizeCanvas = 500;
var angulo = 0;
var velocidad = 0.09;

function setup() {
  createCanvas(sizeCanvas*1.3, sizeCanvas);
  angleMode(DEGREES);
}

function draw() {
  
  let ms = millis();
  let cloudx = 100;
  let cloudy = 100;
  let blue = 189;

  background(119,119,119);

  makeCloud(cloudx, cloudy-70);
  makeCloud(cloudx + 100, cloudy + 30)
  makeCloud(cloudx + 300, cloudy - 70)
  makeCloud(cloudx + 380, cloudy + 10)
  cloudx+=0.1;

  fill(132,132,132)
  noStroke()
  circle(200,350,130);
  circle(440,353,130);

  strokeWeight(11);

  stroke('#7F7FCC')
  line(200, 350, 250, 200);

  line(250,200, 280, 200);
  
  line(240,245,360,350); // \
  line(400,230,360,340); // /
  line(360,350,440,353); // _
  line(440,353,390,255);
  line(240,245,390,245);
  
  line(390,230,410,230);
  
  if (mouseIsPressed === true) {
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
  builder(x_1, y_1, x_2, y_2) {
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

### Resultado:

{{< p5-global-iframe id="kk" ver="1.4.2" width="650" height="500" >}}
let sizeCanvas = 500;
var angulo = 0;
var velocidad = 0.09;

function setup() {
  createCanvas(sizeCanvas*1.3, sizeCanvas);
  angleMode(DEGREES);
}

function draw() {
  let ms = millis();
  let cloudx = 100;
  let cloudy = 100;
  let blue = 189;

  background(119,119,119);

  makeCloud(cloudx, cloudy-70);
  makeCloud(cloudx + 100, cloudy + 30)
  makeCloud(cloudx + 300, cloudy - 70)
  makeCloud(cloudx + 380, cloudy + 10)

  cloudx+=0.1;

  fill(132,132,132)
  noStroke()
  circle(200,350,130);
  circle(440,353,130);

  strokeWeight(11);

  stroke('#7F7FCC')
  line(200, 350, 250, 200);

  line(250,200, 280, 200);
  
  line(240,245,360,350); // \
  line(400,230,360,340); // /
  line(360,350,440,353); // _
  line(440,353,390,255);
  line(240,245,390,245);
  
  line(390,230,410,230);
  
  if (mouseIsPressed === true) {
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
  builder(x_1, y_1, x_2, y_2) {
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


## 3.  Stepping feet

Observe el movimiento de los "pies" azules y amarillos. Los pies parecen pisar alternativamente, como diminutos pies que hacen tip-tap-tip-tap... Esto es más pronunciado si no se mira directamente a los pies, sino entre ellos.

En realidad, su movimiento es siempre simultáneo. Este fenómeno parece especialmente simpático.

### Solución (Código):

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

### Resultado:

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


## 4.  The confetti illusion

Estas esferas levitantes pueden parecer rojas, moradas o verdes a primera vista, pero en realidad los 12 orbes tienen el mismo tono insípido de beige.  

Según David Novick, creador de la imagen y profesor de educación y liderazgo en ingeniería en la Universidad de Texas en El Paso, al reducir la imagen se exagera esta ilusión, mientras que al ampliarla se minimiza el efecto. Pero, ¿por qué percibimos las esferas de otro color que no es el suyo, el beige? 

Esta percepción sesgada tiene su origen en un fenómeno conocido como ilusión de Munker-White, explica Novick a Live Science.

Para quitar las rayas de colores y poder observar el efecto de esta ilusión optica, se debe mantener presionado el mouse. 


### Solución (código):

```js
let width = 0.4;
let gridHeight = 0.5;
let distanceBetweenBars = 400;
let numberOfBars = 4;
let size = 500
let sizeSquareBars = 10;
let squareSize = 45

function setup() {
  createCanvas(size*1.4, size);
  let franjas = size/(width*numberOfBars)

  cuadrado1 = new Square(squareSize,sizeSquareBars,100,60, "red");
  cuadrado2 = new Square(squareSize,sizeSquareBars,100,270, "green");
  cuadrado3 = new Square(squareSize,sizeSquareBars,100,460, "red");
  cuadrado4 = new Square(squareSize,sizeSquareBars,100,700);
  cuadrado5 = new Square(squareSize,sizeSquareBars,300,170);
  cuadrado6 = new Square(squareSize,sizeSquareBars,300,370);
  cuadrado7 = new Square(squareSize,sizeSquareBars,300,570);
  cuadrado8 = new Square(squareSize,sizeSquareBars,500,60);
  cuadrado9 = new Square(squareSize,sizeSquareBars,500,260);
  cuadrado10 = new Square(squareSize,sizeSquareBars,500,460);
  cuadrado11 = new Square(squareSize,sizeSquareBars,500,710);
  cuadrado12 = new Square(squareSize,sizeSquareBars,700,170);
  cuadrado13 = new Square(squareSize,sizeSquareBars,700,370);
  cuadrado14 = new Square(squareSize,sizeSquareBars,700,560);

  grid = new Grid(10,0,gridHeight,0,distanceBetweenBars,numberOfBars, franjas);
  
}

function draw() {
  background(238, 75, 43);
  let c =  color(250,219,172);
  fill(c);
  noStroke();
  
  if (mouseIsPressed === false) {
    grid.display();
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

// clase Grid
class Grid {
  builder(iw, ixp, ih, iyp, id, it, f) {
    this.w = iw; // width de una barra
    this.xpos = ixp; // posición x del rectángulo
    this.h = ih; // altura del rectángulo
    this.ypos = iyp; // posición y del rectángulo
    this.d = id; // distancia de una barra
    this.t = it; // número de barras
    this.f = f; //Franjas de colores en la imagen
  }
  
  display() {
    let green = color(105,229,174)
    let red = color(238, 75, 43)
    for (let i = 0; i < size; i++) {
      fill(green);
      rect(0 , this.ypos + i * (2*this.w) , size*1.5, this.w);
    }
  }
}

// clase cuadrado con lines verdes
class Square{
  builder(lado, widthLines, x , y ,color) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lines = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    let rayas = new Rayas(this.lado, this.w, this.x, this.y,this.color);
    if (mouseIsPressed === false) {
      rayas.display();
    }
    
  }
}
// clase cuadrado con lines rojas
class SquareRed {
  builder(lado, widthLines, x , y ) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
  }
  
  display() {
    let lines = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    for(let i = 0; i< lines-1; i++){
      fill(238, 75, 43);
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }
  }
}

class Rayas{ 
  
  builder(lado, widthLines, x , y , color) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lines = this.lado/this.w
    for(let i = 0; i< lines-1; i++){
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

### Resultado:

{{< p5-global-iframe id="kk" ver="1.4.2" width="700" height="500" >}}

let width = 0.4;
let gridHeight = 0.5;
let distanceBetweenBars = 400;
let numberOfBars = 4;
let size = 500
let sizeSquareBars = 10;
let squareSize = 45

function setup() {
  createCanvas(size*1.4, size);
  let franjas = size/(width*numberOfBars)

  cuadrado1 = new Square(squareSize,sizeSquareBars,100,60, "red");
  cuadrado2 = new Square(squareSize,sizeSquareBars,100,270, "green");
  cuadrado3 = new Square(squareSize,sizeSquareBars,100,460, "red");
  cuadrado4 = new Square(squareSize,sizeSquareBars,100,700);
  cuadrado5 = new Square(squareSize,sizeSquareBars,300,170);
  cuadrado6 = new Square(squareSize,sizeSquareBars,300,370);
  cuadrado7 = new Square(squareSize,sizeSquareBars,300,570);
  cuadrado8 = new Square(squareSize,sizeSquareBars,500,60);
  cuadrado9 = new Square(squareSize,sizeSquareBars,500,260);
  cuadrado10 = new Square(squareSize,sizeSquareBars,500,460);
  cuadrado11 = new Square(squareSize,sizeSquareBars,500,710);
  cuadrado12 = new Square(squareSize,sizeSquareBars,700,170);
  cuadrado13 = new Square(squareSize,sizeSquareBars,700,370);
  cuadrado14 = new Square(squareSize,sizeSquareBars,700,560);

  grid = new Grid(10,0,gridHeight,0,distanceBetweenBars,numberOfBars, franjas);
  
}

function draw() {
  background(238, 75, 43);
  let c =  color(250,219,172);
  fill(c);
  noStroke();
  
  if (mouseIsPressed === false) {
    grid.display();
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

// clase Grid
class Grid {
  builder(iw, ixp, ih, iyp, id, it, f) {
    this.w = iw; // width de una barra
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
    for (let i = 0; i < size; i++) {
      fill(verde);
      rect(0 , this.ypos + i * (2*this.w) , size*1.5, this.w);
    }
  }
}

class Square{
  builder(lado, widthLines, x , y ,color) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lines = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    let rayas = new Rayas(this.lado, this.w, this.x, this.y,this.color);
    if (mouseIsPressed === false) {
      rayas.display();
    }
    
  }
}
// clase cuadrado con lines rojas
class SquareRed {
  builder(lado, widthLines, x , y ) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
  }
  
  display() {
    let lines = this.lado/this.w
    fill(185,182,233)
    rect(this.x, this.y, 2*this.lado, 2*this.lado);
    for(let i = 0; i< lines-1; i++){
      fill(238, 75, 43);
      rect(this.x,
          this.y + i * (2*this.w)+10,
          this.lado * 2,
          this.w)
    }
  }
}

class Rayas{ 
  
  builder(lado, widthLines, x , y , color) {
    this.lado = lado
    this.w = widthLines
    this.x = x
    this.y = y
    this.color = color
  }
  
  display() {
    let lines = this.lado/this.w
    for(let i = 0; i< lines-1; i++){
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


## 5.  Ebbinghaus Illusion

Llamada así por el psicólogo alemán Hermann Ebbinghaus (1850-1909), la ilusión de Ebbinghaus (a veces también denominada círculos de Titchener) es una ilusión óptica que muestra cómo la percepción del tamaño puede ser manipulada por las formas circundantes.

El descubrimiento de esta ilusión se remonta a finales del siglo XIX. Todavía no se conoce bien su mecánica. Es una forma bastante directa de mostrar cómo el contexto de un objeto en la escena puede influir mucho en nuestra percepción del tamaño. En la animación, el círculo naranja rodeado por los más pequeños que giran parece ser claramente más grande que el de la izquierda, cuando en realidad tienen el mismo tamaño. Esto puede confirmarse utilizando el control deslizante para hacer transparentes los círculos giratorios de ambos lados.

### Solución (Código):

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

### Resultado:

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


## 6.   Barrier grid animation and stereography

La animación de rejilla de barrera o animación de piquete es un efecto de animación creado moviendo una superposición transparente a rayas a través de una imagen entrelazada. La técnica de la rejilla de barrera se originó a finales de la década de 1890, coincidiendo con el desarrollo de la estereografía de paralaje (Relièphographie) para autoestereogramas 3D. La técnica también se ha utilizado para imágenes que cambian de color, pero en mucha menor medida.

El desarrollo de las tecnologías de rejilla de barrera también puede considerarse un paso hacia la impresión lenticular, aunque la técnica se ha mantenido tras la invención de las tecnologías lenticulares como una forma relativamente barata y sencilla de producir imágenes animadas impresas.

### Solución (código):

```js
let width = 10;
let gridHeight = 0.4;
let distanceBetweenBars = 1;
let numberOfBars = 40;
let equivalencia = 770
function setup() {

  createCanvas(700, 700);

  grid = new Grid(width,0,gridHeight,0,distanceBetweenBars,numberOfBars);
}

function draw() {
  background(255);

  
  //Creación de la grid
  grid.display();
  grid.move(mouseX, mouseY);

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

  //Se crea grid principal
  for (let i = 0; i<=500; i+=10){
    strokeWeight(4);
    line(i, 300,i, 370);
    strokeWeight(2);
  }

  //Se crea grid luego de pasar por la maquina
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
// clase Grid
class Grid {
  builder(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // width de una barra
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

## Resultado:

{{< p5-global-iframe id="kk" ver="1.4.2" width="700" height="500" >}}

let width = 10;
let gridHeight = 0.4;
let distanceBetweenBars = 1;
let numberOfBars = 40;
let equivalencia = 770
function setup() {

  createCanvas(700, 700);

  grid = new Grid(width,0,gridHeight,0,distanceBetweenBars,numberOfBars);
}

function draw() {
  background(255);

  
  //Creación de la grid
  grid.display();
  grid.move(mouseX, mouseY);

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

  //Se crea grid principal
  for (let i = 0; i<=500; i+=10){
    strokeWeight(4);
    line(i, 300,i, 370);
    strokeWeight(2);
  }

  //Se crea grid luego de pasar por la maquina
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
// clase Grid
class Grid {
  builder(iw, ixp, ih, iyp, id, it) {
    this.w = iw; // width de una barra
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