# 2 - Masking

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

{{< p5-iframe sketch="/showcase/sketches/pacman.js" width="700" height="300" >}}

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

{{< p5-iframe sketch="/showcase/sketches/dino.js" width="525" height="525" >}}

## Patrones de Moaré

 Es un patrón de interferencia que se forma cuando se superponen dos rejillas de líneas, ya sean rectas o curvas, con un cierto ángulo3​ o cuando tales rejillas tienen tamaños ligeramente diferentes.

Este efecto se manifiesta de muchas maneras. Las líneas pueden ser las fibras textiles de una tela de muaré (las cuales dan su nombre al efecto), o bien simples líneas en una pantalla de ordenador. La visión humana crea la ilusión de unas bandas oscuras y claras horizontales, que se superponen a las líneas finas que en realidad son las que forman el trazo. Patrones de muaré más complejos pueden formarse igualmente al superponer figuras complejas hechas de líneas curvas y entrelazadas. Si cada una de las rejillas tiene un color distinto, el patrón de muaré resultante será de un tercer color.

Tomado de: [Wikipedia](https://es.wikipedia.org/wiki/Patr%C3%B3n_de_muar%C3%A9)

### Patrones circulares

### Código

```js
let x = 0
let checkbox;
let slider;

function setup() {
    createCanvas(520, 520);
    checkbox = createCheckbox('Automático', true);
    checkbox.position(10, 30)
    slider = createSlider(-250, 800, -250);
    slider.position(10, 10);
    slider.style('width', '500px');
    // Draw on canvas center
    rectMode(CENTER)

}

function draw() {
    background('white');
    // Create 100 circles
    for (let i = 0; i < 1000; i += 10) {
        // First set of circles
        stroke('yellow')
        strokeWeight(3)
        ellipse(x, 280, i - 500, i - 500)

        // Second set of circles
        noFill()
        stroke('blue')
        strokeWeight(3)
        ellipse(260, 280, i, i)
    }

    // Automatic movement
    if (checkbox.checked()) {
        x = x > width ? 0 : x + 3
    } else {
        x = slider.value()
    }
    stroke('white')
    fill('white')
    rect(60, 42, 100, 25);

}
```

### Resultado

{{< p5-iframe sketch="/showcase/sketches/moire.js" width="545" height="545" >}}