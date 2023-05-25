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

### Solución (Código):

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

Fucnione para aplicar el efecto de lupa:

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
### Resultado:

{{< /details >}}

<br>

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="cbat">

{{< p5-iframe sketch="/showcase/sketches/image_processing/sketch.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"  width="705" height="850">}}

</div>

# **Conclusiones**

1. 

# **Trabajo futuro**

# Referencias

1.  Rubio, O. (2020, 2 octubre). Procesamiento de imagenes. https://www.vistronica.com/blog/post/procesamiento-de-imagenes.html

2. https://www.famaf.unc.edu.ar/~pperez1/manuales/cim/cap2.html

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