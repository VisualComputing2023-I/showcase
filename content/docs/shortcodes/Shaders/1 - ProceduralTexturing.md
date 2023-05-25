# **1 - Procedural texturing**

{{< hint info >}}
<b> Ejercicio </b>

Adapte otros patrones del <a href="https://thebookofshaders.com/09/" target="_blank">libro de shaders</a> (consulte también la colección <a href="https://www.shadertoy.com/" target="_blank">shadertoy</a>) y mapeelos como texturas sobre otras formas 3D.
{{< /hint >}}

# Introducción

El "procedural texturing" o "texturizado procedural" es una técnica en computación visual que se utiliza para generar texturas de manera algorítmica, en lugar de crearlas manualmente. Esto se logra mediante la definición de reglas y procedimientos matemáticos que permiten generar patrones y detalles en la textura de manera automática.

En el texturizado procedural, los artistas pueden crear texturas complejas y detalladas a partir de una serie de parámetros y reglas que se definen en un software especializado. Estas texturas pueden ser modificadas y ajustadas en tiempo real, lo que permite una mayor flexibilidad y eficiencia en el proceso de creación.

Los procedimientos matemáticos utilizados en el texturizado procedural permiten generar texturas complejas y detalladas con una gran variedad de patrones y detalles. Además, la técnica permite crear texturas que varían en función de diferentes parámetros como la posición, la escala, la rotación y la iluminación, lo que ofrece una amplia variedad de opciones para la personalización y creación de efectos visuales únicos.

El texturizado procedural es particularmente útil en la creación de videojuegos, películas de animación y efectos visuales, ya que permite generar texturas realistas de manera más rápida y eficiente que el texturizado manual. Además, las texturas generadas por procedimientos son mucho más ligeras en cuanto a su peso en memoria, lo que es importante en aplicaciones donde el rendimiento es crítico y se busca una alta eficiencia de recursos.


# Implementación

### **Solución (Código):**

Los fragment shaders correspondientes fueron tomados de el <a href="https://thebookofshaders.com/09/" target="_blank">libro de shaders</a>.

{{< details "Source Code: JavaScript" closed >}}

``` javascript

let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/procedular/bricks.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  console.log(pg);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(0);
  orbitControl();
  box(200, 200);
}

function mouseMoved() {
  if (pg){
    // https://p5js.org/reference/#/p5.Shader/setUniform
    truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
    // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }
}


```

{{< /details >}}

### **Resultado:**

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="procedular-texturing">

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch1.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch2.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

{{< p5-iframe sketch="/showcase/sketches/procedular/sketch4.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="420" height="420">}}

</div>

# Conclusiones

1. El texturizado procedural es una técnica en computación visual muy eficaz y adaptable que posibilita la creación de texturas complejas y detalladas de forma automática mediante el uso de algoritmos y reglas matemáticas. Esto conlleva una mayor flexibilidad y eficiencia en la creación de efectos visuales.

2. Una ventaja importante del texturizado procedural es que resulta especialmente beneficioso para la creación de videojuegos, películas de animación y efectos visuales, ya que permite generar texturas realistas de forma más eficiente y en menos tiempo que el texturizado manual. Además, las texturas generadas por procedimientos tienen un menor peso en memoria, lo cual es crucial en aplicaciones donde el rendimiento es un factor crítico.

3. La utilización de procedimientos matemáticos en el texturizado procedural permite crear una gran variedad de patrones y detalles, lo que proporciona una mayor capacidad de personalización en la generación de texturas complejas y detalladas. Esto permite crear efectos visuales únicos y personalizados en función de las necesidades del proyecto.

4. Es posible realizar ajustes y modificaciones rápidos en las texturas durante el proceso de creación de efectos visuales mediante el texturizado procedural, lo que proporciona una mayor flexibilidad y adaptabilidad en función de las necesidades del proyecto. Además, estos ajustes se pueden realizar en tiempo real, lo que acelera el proceso de creación y evita la necesidad de volver a crear las texturas desde cero en caso de que se produzcan cambios en el diseño.

5. Dado que el texturizado procedural implica la creación de texturas a través de procedimientos y reglas matemáticas, se necesita tener conocimientos especializados en programación y matemáticas para poder utilizar esta técnica. Por lo tanto, su uso puede estar restringido a artistas digitales con habilidades técnicas avanzadas.


# **Trabajo futuro**

Se espera que los avances en técnicas de aprendizaje automático permitan la creación de sistemas de texturizado procedural cada vez más sofisticados, capaces de generar texturas más realistas y detalladas en tiempo real. Esta mejora en la eficiencia del proceso de producción de efectos visuales sería especialmente beneficiosa en áreas como los videojuegos y las películas de animación. Además, el texturizado procedural podría ser utilizado en combinación con la realidad virtual y aumentada para generar texturas y efectos visuales en tiempo real, lo que llevaría a la creación de experiencias más inmersivas y realistas para los usuarios. Por último, con el mejoramiento de la capacidad de procesamiento de las computadoras, se podrían generar texturas personalizadas aún más detalladas y únicas, lo que permitiría una mayor expresión y creatividad en la industria del entretenimiento.

# Referencias

*   [Información de consulta (Introducción)](https://www.3dartistonline.com/news-and-features/2015/02/procedural-texturing-in-games-and-film/)

*   [Primera guía para la implementación de los ejercicios](https://thebookofshaders.com/09/)

*   [Segunda guía para la implementación de los ejercicios](https://www.shadertoy.com/)

*   [Repositorio de ejemplos de p5.js](https://p5js.org/examples/)

*   [Edición de texto](https://chat.openai.com/)


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