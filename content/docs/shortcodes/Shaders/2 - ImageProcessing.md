# 2 - Image And Video Processing

{{< hint info >}}
<b> Exercise </b>

Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

- A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
- A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
- Integrate luma and other coloring brightness tools.
  {{< /hint >}}

# **Introducción**
El análisis y procesamiento de imágenes se realiza a través de computadoras, debido a la complejidad y el número de cálculos necesarios para realizarlo. Es por esto que, si bien la formulación matemática necesaria para su realización data de varios siglos atrás, la posibilidad real de utilizarla de forma cotidiana en la práctica clínica ha sido posible recién en las últimas décadas, gracias al avance en las tecnologías del hardware.

La proliferación de nuevos equipamientos con capacidad para realizar millones de operaciones por segundo y su extensión a la vida cotidiana y a todo tipo de usuario, ha hecho posible que el análisis y procesamiento de imágenes digitales se constituya en un gran campo de estudio. En la actualidad, esta tecnología se encuentra incorporada incluso en todo tipo de equipamiento doméstico, como cámaras digitales, scaners y teléfonos celulares, entre otros.

En términos históricos, la utilización de imágenes radiográficas para diagnóstico clínico data prácticamente desde el descubrimiento de los rayos X en 1895 (Röentgen). Incluso, las imágenes funcionales a partir de la emisión de fotones (rayos γ
) por parte de radionucleidos ya cuenta con más de 90 años de antigüedad (Heavesy & Seaborg, 1924). Sin embargo, las imágenes eran adquiridas sobre films radiográficos o directamente in vivo, por lo que su correcto procesamiento no ha explotado su real potencialidad sino hasta la incorporación de la tecnología que permitió digitalizarlas.

El motivo principal de esta “aparición tardía” del procesamiento de imágenes ha sido entonces, debido a los requerimientos de hardware tanto para el procesamiento de las mismas como para la representación de estas en sistemas gráficos de alta performance. Paralelamente a este desarrollo, la formulación de algoritmos para el procesamiento ha seguido los avances tecnológicos logrando un alto grado de sofisticación y manipulación de imágenes en tiempo casi real.

La variedad actual de técnicas, algoritmos y desarrollos de software y hardware utilizados en el procesamiento de imágenes digitales escapa al alcance de cualquier curso. En ellos se aprovechan técnicas desarrolladas inicialmente sobre conceptos fundacionales para el análisis de imágenes, y se incorporan conceptos y nociones de los más variados, propios de la física y la matemática, como el caso de la entropía o la métrica.


# **Implementación**

### **Solución (Código):**

A continuación se presentan los extractos más significativos del código utilizado en el fragment shader.

Variables utilizadas:

{{< details "Variables" closed >}}

```glsl
precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

// Herramienta de brillo seleccionada
uniform int brightnessTool;

// Posicion del mouse
uniform vec2 mouse;

// Resolucion de la pantalla
uniform vec2 resolution;

uniform float kernel[9];

uniform bool magnifier;
uniform bool region;
uniform float radius;
uniform float scale;

varying vec2 texcoords2;
```

{{< /details >}}

Función que aplica y determina el kernel seleccionado:

{{< details "Aplicar kernel" closed >}}

```glsl
vec4 applyKernel(){
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*kernel[i];
  }

  convolution = vec4(convolution.rgb, 1.0);

  return convolution;
}
```

{{< /details >}}

Función empleada para calcular la lupa o el área de interés:

{{< details "Área de interés" closed >}}

```glsl
float dist = distance(gl_FragCoord.xy, mouse);

if(dist < radius){
...
}
```

{{< /details >}}

Aplicar el efecto de lupa:

{{< details "Efecto de lupa" closed >}}


```glsl
vec2 mouseDist = gl_FragCoord.xy - mouse;

vec2 newCoords = gl_FragCoord.xy;

vec2 zoomed = (newCoords - (mouseDist * scale)) / resolution;

// Se invierte el eje y
zoomed = vec2(zoomed.x, 1.0 - zoomed.y);

vec4 zoomedTexel = texture2D(texture, zoomed);
zoomedTexel = changeBrightness(zoomedTexel);

gl_FragColor = zoomedTexel;
```

{{< /details >}}

<br>

### **Resultado:**

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="cbat">

{{< p5-iframe sketch="/showcase/sketches/image_processing/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"  width="705" height="850">}}

</div>

# **Conclusiones**

1. En la computación visual, el procesamiento de imágenes desempeña un papel fundamental al permitir la extracción de información valiosa a partir de datos visuales, lo que impulsa el avance de diversas aplicaciones en campos como la medicina, la robótica y la realidad virtual.

2. El continuo desarrollo de algoritmos de procesamiento de imágenes en la computación visual ha llevado a mejoras significativas en áreas como el reconocimiento facial, la detección de objetos y la segmentación de imágenes, lo que ha ampliado las posibilidades de aplicaciones prácticas y creativas.

3. El procesamiento de imágenes en tiempo real se ha convertido en una necesidad cada vez más apremiante en aplicaciones como la realidad aumentada y los sistemas de visión en tiempo real, lo que requiere algoritmos eficientes y técnicas optimizadas para ofrecer resultados instantáneos y precisos.

4. La evolución de la inteligencia artificial y el aprendizaje automático ha impulsado enormemente el procesamiento de imágenes en la computación visual, permitiendo tareas más complejas como el reconocimiento de patrones, la generación de imágenes y la interpretación semántica de contenido visual.

5. A medida que el procesamiento de imágenes en la computación visual avanza, también surgen desafíos éticos y de privacidad, como la manipulación de imágenes, la privacidad de datos y la responsabilidad en el uso de información visual. Es fundamental abordar estos desafíos de manera responsable para garantizar el beneficio y la protección de los usuarios y la sociedad en general.

# **Trabajo futuro**

El procesamiento de imágenes en la computación visual es un campo en continuo progreso y se espera que siga ofreciendo nuevas oportunidades y desafíos en el futuro.

En primer lugar, se anticipa una mayor atención hacia la inteligencia artificial y el aprendizaje automático con el fin de mejorar la precisión y eficiencia del procesamiento de imágenes. Los algoritmos de detección, reconocimiento y seguimiento de objetos se beneficiarán de modelos más avanzados y técnicas de entrenamiento sofisticadas.

Además, se prevé un mayor enfoque en el procesamiento de imágenes en tiempo real, especialmente en aplicaciones de realidad aumentada y virtual. Esto requerirá algoritmos y técnicas más rápidos y eficientes que ofrezcan resultados en tiempo real sin comprometer la calidad de la imagen.

Otro aspecto relevante es el procesamiento de imágenes en dispositivos móviles y en entornos con restricciones de energía. A medida que los dispositivos móviles se vuelven más potentes, resultará crucial desarrollar algoritmos optimizados y técnicas de procesamiento de imágenes que se adapten a las limitaciones de recursos y energía.

La colaboración entre la computación visual y otras disciplinas, como la robótica y la medicina, también experimentará un crecimiento significativo. El procesamiento de imágenes desempeñará un papel fundamental en el desarrollo de sistemas autónomos, como robots y vehículos autónomos, así como en aplicaciones médicas como el diagnóstico por imagen y la cirugía asistida por ordenador.

Por último, el procesamiento de imágenes deberá enfrentar desafíos éticos y de privacidad en el futuro. A medida que la tecnología avanza, será necesario abordar cuestiones relacionadas con la manipulación de imágenes, la protección de datos personales y el uso responsable de la información visual.

En resumen, el futuro del procesamiento de imágenes en la computación visual promete avances emocionantes en áreas como la inteligencia artificial, la realidad aumentada, la eficiencia energética y la colaboración interdisciplinaria. Al explorar estas áreas, resulta fundamental abordar los desafíos éticos y de privacidad para garantizar un desarrollo responsable y beneficioso de esta tecnología en constante evolución.

# Referencias

*   [Información de consulta (Introducción)](https://www.famaf.unc.edu.ar/~pperez1/manuales/cim/cap2.html)

*   [Procesamiento de imágenes](https://www.vistronica.com/blog/post/procesamiento-de-imagenes.html)

*   [Primera guía para la implementación de los ejercicios](https://codepen.io/tag/p5-js)

*   [Segunda guía para la implementación de los ejercicios](https://github.com/CodingTrain/website-archive/tree/main/CodingChallenges)

*   [Tercera guía para la implementación de los ejercicios](https://openprocessing.org/)

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