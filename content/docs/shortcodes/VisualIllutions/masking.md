# Masking

{{< hint info >}}
<b> Ejercicio</b>
Implementar un kinegram y algunos patrones de moiré que están estrechamente relacionado con el fenómeno de masking.

{{< /hint >}}

## Kinegram - Scanimation

Los scanimations son un tipo de kinegramas. Estos son una ilusión óptica que se produce cuando un dibujo, fotograma opatrón gráfico adquiere movimiento.

Consta   de   dos   partes:   un   dibujo   “formado   por   diversas   rayas   de   diferentegrosor y disposición” y una pantalla transparente de plástico con franjas o rayas.

Al superponerse dicha transparencia o acetato de rayas sobre los dibujos segenera una imagen en movimiento.

Esta ilusión se basa en el principio de la persistencia retiniana y el patrón deinterferencias que nuestro cerebro interpreta como movimiento.

El dibujo está formado en realidad por todos los fotogramas de una imagenanimada, uno encima de otro y bien centrados. La función de la rejilla es tapartodos los fotogramas excepto uno, que es el que vemos ese momento. Losfotogramas están colocados de forma que a media que se desplaza la rejillahacia un lado vemos el siguiente fotograma tapando todos los demás y dandola impresión de movimiento.

Tomado de: [Universidad de México](https://www.studocu.com/es-mx/document/universidad-de-mexico/tecnologias-de-la-informacion/los-scanimations-son-un-tipo-de-kinegramas/31686995)


### Pacman Scanimation

### Código

```js
let x = 900
let flag = true

function setup() {
  createCanvas(900, 300);
  pacman = loadImage('/showcase/sketches/assets/pacman.png');
}

function draw() {
  // Image background
  image(pacman, 0, 0);
  
  // Move lines
  flag ? x-- : x++
  
  // Change direction
  if(x < 0) flag = false
  if(x > width) flag = true
  
  
  // Vertical lines
  for (let i = x; i < width ; i+=18) {
    fill(color('black'));
    rect(i, 0, 13, 247);
  } 
 
}
```
### Resultado

{{< p5-iframe sketch="/showcase/sketches/pacman.js" width="900" height="300" >}}

### Dino Scanimation

### Código


```js
let slider;

function setup() {
  createCanvas(500, 500);
  dino = loadImage('/showcase/sketches/assets/dino.jpg');
  slider = createSlider(0, 480, 480);
  slider.position(0, 40);
  slider.style('width', '480px');
  textSize(18);
  text('Deslizar para ver la animación', width/2 - 100, 15);
}

function draw() {
  // Image background
  image(dino, 0, 20);
  
  // Get slide value
  x = slider.value()
  
  // Vertical lines
  for (let i = x; i < width ; i+=7) {
    fill(color('black'));
    rect(i, 40, 5, 380);
  } 
   
}
```

### Resultado

{{< p5-iframe sketch="/showcase/sketches/dino.js" width="500" height="500" >}}