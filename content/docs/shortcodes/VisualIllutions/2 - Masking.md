# 2 - Masking

{{< hint info >}}
<b> Ejercicio</b>
Implementar un kinegram y algunos patrones de moiré que están estrechamente relacionado con el fenómeno de masking.

{{< /hint >}}

# **Introducción**

### **Kinegram - Scanimation**

Los scanimations son un tipo de kinegramas. Estos son una ilusión óptica que se produce cuando un dibujo, fotograma opatrón gráfico adquiere movimiento.

Consta   de   dos   partes:   un   dibujo   “formado   por   diversas   rayas   de   diferentegrosor y disposición” y una pantalla transparente de plástico con franjas o rayas.

Al superponerse dicha transparencia o acetato de rayas sobre los dibujos segenera una imagen en movimiento.

Esta ilusión se basa en el principio de la persistencia retiniana y el patrón deinterferencias que nuestro cerebro interpreta como movimiento.

El dibujo está formado en realidad por todos los fotogramas de una imagenanimada, uno encima de otro y bien centrados. La función de la rejilla es tapartodos los fotogramas excepto uno, que es el que vemos ese momento. Losfotogramas están colocados de forma que a media que se desplaza la rejillahacia un lado vemos el siguiente fotograma tapando todos los demás y dandola impresión de movimiento.



# **Antecedentes y trabajo previo**

La ilusión óptica es un fenómeno fascinante que ha cautivado a las personas durante siglos. En el campo de la computación visual, las ilusiones ópticas se han estudiado y se han utilizado para comprender mejor cómo el cerebro procesa la información visual. Una técnica comúnmente utilizada en el estudio de las ilusiones ópticas es el "masking", que consiste en presentar un estímulo visual que enmascara el estímulo principal para determinar cómo se percibe el estímulo principal en presencia del enmascaramiento.

En la investigación sobre el masking en ilusiones ópticas, se han utilizado diferentes tipos de máscaras para enmascarar el estímulo principal. Estas máscaras pueden ser patrones de luz o sombras, o patrones de color o textura. El objetivo de estas máscaras es ocultar parcial o completamente el estímulo principal para medir la sensibilidad de los sistemas visuales humanos a diferentes tipos de información visual. Los estudios sobre masking en ilusiones ópticas han arrojado resultados interesantes y han ayudado a los investigadores a entender mejor cómo el cerebro procesa y percibe la información visual.

En cuanto al trabajo previo en el campo del masking en ilusiones ópticas en computación visual, se han desarrollado diferentes técnicas para generar máscaras y aplicarlas a los estímulos visuales. Una de las técnicas más utilizadas es la generación de máscaras de ruido aleatorio, que se aplican al estímulo visual para enmascarar la información en diferentes niveles de intensidad y frecuencia espacial. También se han utilizado técnicas de máscara adaptativa, en las que se ajusta la máscara según la sensibilidad visual del observador, y técnicas de máscara de enmascaramiento interocular, en las que se presenta una máscara diferente en cada ojo del observador para crear un efecto de enmascaramiento binocular. Estas técnicas han permitido a los investigadores estudiar la percepción visual en diferentes condiciones y han proporcionado nuevas perspectivas sobre el procesamiento visual humano.

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

## Kernels de Imagen

{{< hint info >}}
<b> Ejercicio</b>
Implementar en software una aplicación web de procesamiento de imágenes compatible con diferentes kernels de imágenes

{{< /hint >}}

Un núcleo o kernel de imagen es una pequeña matriz que se utiliza para aplicar efectos como los que se pueden encontrar en Photoshop o Gimp, como desenfoque, nitidez, contorno o relieve. También se utilizan en el aprendizaje automático para la "extracción de características", una técnica para determinar las partes más importantes de una imagen. En este contexto, el proceso se denomina más generalmente "convolución".

Para esta implemetación se usarán kernels de 3x3, los cuales serán aplicado a la imagen original.

### Código

```js
/* 
    Base Code for Kernel from: https://editor.p5js.org/jeffThompson/sketches/MyfhklBlv

*/

let kernels = {
  "identity" : [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
  ],
  "blur": [
      [0.0625, 0.125, 0.0625],
      [0.125, 0.25, 0.125],
      [0.0625, 0.125, 0.0625]
  ],
  "sharpen" : [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]
  ],
  "edge" : [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1]
  ],
  "bottomsobel" : [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1]
  ],
  "emboss" : [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2]
  ],
  "leftsobel" : [
      [1, 0, -1],
      [2, 0, -2],
      [1, 0, -1]
  ],
  "rigtsobel" : [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1]
  ],
  "topsobel" : [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1]
  ],    
}

let originalimg;

let img;

let selectkernel;

function preload() {
  originalimg = loadImage('/showcase/sketches/assets/versalles.jpg');
  img = originalimg;
}


function setup() {

  // resize the image to fit the window, then 
  // create the canvas at that size
  img.resize(windowWidth, 0);
  createCanvas(img.width, img.height);
  noLoop();

  // Select kernel

  selectkernel = createSelect();
  selectkernel.position(10, 10);
  for(const key of Object.keys(kernels)){
      selectkernel.option(key)
  }
  selectkernel.changed(applyKernel)

}


function draw() {
  image(img, 0, 0);
}

function applyKernel(){
  let k = selectkernel.value();
  img = kernelFilter(originalimg, kernels[k]);
  image(img, 0, 0);
}

function kernelFilter(input, kernel) {

  // we need to access neighboring pixels, so we have
  // to create a blank output image to work with
  let output = createImage(input.width, input.height);

  // start at 1 and end -1 from edge so our kernel
  // doesn't try to grab pixels that don't exist!
  input.loadPixels();
  output.loadPixels();
  for (let y = 1; y < input.height - 1; y++) {
      for (let x = 1; x < input.width - 1; x++) {

          // for each pixel, we add up rgb values for
          // itself and its neighbors, weighted by the kernel
          let sumR = 0;
          let sumG = 0;
          let sumB = 0;

          // go through neighboring pixels
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
              for (let offsetX = -1; offsetX <= 1; offsetX++) {

                  // grab the current pixel
                  let neighborIndex = ((y + offsetY) * input.width + (x + offsetX)) * 4;
                  let r = input.pixels[neighborIndex];
                  let g = input.pixels[neighborIndex + 1];
                  let b = input.pixels[neighborIndex + 2];

                  // apply kernel and add to the sum
                  // (we +1 here so that we get the kernel index
                  // from our offsetX/offsetY values)
                  sumR += kernel[offsetY + 1][offsetX + 1] * r;
                  sumG += kernel[offsetY + 1][offsetX + 1] * g;
                  sumB += kernel[offsetY + 1][offsetX + 1] * b;
              }
          }

          // having checked all neighbors, make sure final
          // values are in range 0–255
          sumR = constrain(sumR, 0, 255);
          sumG = constrain(sumG, 0, 255);
          sumB = constrain(sumB, 0, 255);

          // change the pixel value
          let index = (y * input.width + x) * 4;
          output.pixels[index] = sumR;
          output.pixels[index + 1] = sumG;
          output.pixels[index + 2] = sumB;
          output.pixels[index + 3] = 255;
      }
  }

  // send the image back
  output.updatePixels();
  return output;
}

```

### Resultado

Se pueden aplicar los siguientes kernels:

  * Identity (Ningún filtro a la imagen)
  * Blur
  * Sharpen
  * Edge
  * Bottomsobel
  * Emboss
  * Leftsobel
  * Rigthsobel
  * Topsobel

Para variar entre kernels utilice el selector ubicado en la parte superior izquierda.


{{< p5-iframe sketch="/showcase/sketches/kernel.js" width="925" height="600" >}}


# **Conclusiones**

1. El masking es un fenómeno perceptual importante en la visión humana que ha sido objeto de estudio en la psicología y la neurociencia durante décadas.

2. En la computación visual, el masking se utiliza para mejorar la eficacia de las técnicas de procesamiento de imágenes y la detección de objetos.

3. Los métodos de masking han demostrado ser eficaces para reducir el ruido en las imágenes y aumentar la percepción de los detalles.

4. El masking también se utiliza en la creación de ilusiones ópticas, lo que ha llevado a un mayor entendimiento de cómo funciona la visión humana y cómo se pueden engañar nuestros ojos.

5. Aunque el masking ha sido estudiado durante décadas, todavía hay mucho por aprender sobre su funcionamiento en la visión humana y cómo se puede aplicar de manera efectiva en la computación visual. Por lo tanto, se espera que se realice más investigación en esta área en el futuro.


# **Trabajo futuro**

La ilusión óptica es un fenómeno intrigante y fascinante que ha cautivado la atención de las personas durante siglos. En los últimos años, los avances en la tecnología de la computación visual han permitido a los investigadores explorar en profundidad los mecanismos subyacentes a estas ilusiones y crear nuevas ilusiones ópticas mediante técnicas de procesamiento de imágenes. En particular, el "masking" o enmascaramiento es una técnica utilizada para estudiar la percepción visual que consiste en presentar una imagen visualmente ruidosa para enmascarar la imagen objetivo que se desea presentar al observador. El masking se ha utilizado ampliamente en la investigación de la percepción visual en el campo de la psicología y la neurociencia, y su uso en ilusiones ópticas promete ser aún más prometedor en el futuro.

En el futuro, se espera que el masking se utilice en combinación con otras técnicas de procesamiento de imágenes para crear ilusiones ópticas aún más complejas y fascinantes. Por ejemplo, se podría utilizar el masking para crear ilusiones ópticas tridimensionales que parezcan saltar de la pantalla. También se podría utilizar el masking para estudiar cómo se procesa la información visual en el cerebro, lo que podría tener importantes implicaciones en el tratamiento de enfermedades neurológicas y psiquiátricas. En última instancia, el uso del masking en ilusiones ópticas promete ser una herramienta valiosa para entender mejor la percepción visual humana y llevar la tecnología de la computación visual a nuevas alturas.

# **Referencias**

* [Wikipedia - Patrones de Moaré](https://es.wikipedia.org/wiki/Patr%C3%B3n_de_muar%C3%A9)

* [Universidad de México - Scanimations](https://www.studocu.com/es-mx/document/universidad-de-mexico/tecnologias-de-la-informacion/los-scanimations-son-un-tipo-de-kinegramas/31686995)

* [Setosa.io - Image Kernels](https://setosa.io/ev/image-kernels/)


