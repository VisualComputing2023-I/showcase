# 3 - Mach Bands

{{< hint info >}}
<b> Ejercicio</b>
Desarrolle una aplicación de visualización de terrenos. Revise el tutorial de Coding Train sobre la generación de terrenos en 3D con ruido de Perlin.

<div style=position:relative;padding-bottom:56.25%;height:0;overflow:hidden><iframe src=https://www.youtube.com/embed/IKB1hWWedMk style=position:absolute;top:0;left:0;width:100%;height:100%;border:0 allowfullscreen title="3D terrain generation with Perlin noise"></iframe></div>

{{< /hint >}}

# **Introducción**

La visualización de terrenos se ha realizado por muchos años mediante modos tradicionales con dibujos en representaciones planas en 2D para fines militares y de estudio de la geografía. Pero con la llegada de la computación y la capacidad de generar imagenes en 3D, se desarrollaron diferentes técnicas para poder visualizar y crear terrenos para no solo los mismos fines sino también otros como los videojuegos y los simuladores de vuelos.

# **Antecedentes y trabajo previo**

## Visualización

Para la visualización de terrenos lo primero que se usaba eran los Modelos Digitales de Terrenos (DTM por las siglas en ingles) los cuales se usaban para representar partes de la superficie del suelo de manera digital. Historicamente los DTM fueron introducidos por ingenierso del MIT a finales de los años 50's. La definición de estos modelos es simplemente una representación estadística de la superficie continua de la tierra por un numero muy grande de puntos seleccionados con coordenadas x,y,z conocidas y en un campo de coordenadas arbitrario. También existen otros terminos como Modelo Digital de Elevación. (DEM), Modelo Digital de Altura (DHM), Modelo Digital del Suelo (DGM) y Datos Digitales de Elevación del Terreno (DTED). A pesar de los diferentes términos, todos representan la topografía de la tierra. [1]

Para poder organizar los datos que pueden ser regulares o irregulares se usan diferentes estructuras de datos, tales como cuadriculas/tramas (matrices), quadtrees, arboles binarios de triangulos u otras estructuras para datos de triangulos irregulares.

- Al usar las cuadriculas o tramas, se tiene la ventaja de que estas son las más sencillas de usar ya que son matrices y los puntos vecinos estan definidos de manera implícita. Pero su mayor problema es que usualmente requiere mucho espacio de almacenamiento y hay muchos datos rebundantes de datos en terrenos planos.

- Los quadtrees (arboles donde cada nodo puede tener hasta 4 nodos hijos) fueron bastante populares para los DTM y los Sistemas de Información Geográfica (GIS) a finales del siglo pasado. La idea es tener como elementos primitivos cuadrados, los cuales se pueden dividir internamente en más cuadrados (dividir en 4 nodos hijos) y así recursivamente. Esto por lo tanto permite eliminar la información rebundante en terrenos planos, pero sigue teniendo el problema que al ser cuadrados es cómo una cuadricula simplificada y para datos que sean continuos no es efectivo.

- La Red de Triangulos Irregulares (TIN) es una estructura bastante usada para modelamiento de terrenos ya que permite usar datos continuos de manera directa. A diferencia de las cuadriculas se tienen que especificar las relaciones entre puntos vecinos de manera explícita. [2]

- Las herarquias de triangulos rectángulos (HRT) son similares a los quadtrees, pero en este se usan normalmente arboles binarios donde al inicio tenemos una baldosa raíz la cual salen dos triangulos rectangulos (la división de un cuadrado en dos triangulos trazando una linea por la diagonal). Cada triangulo puede dividirse por la mitad para obtener dos triangulos hijos y así recursivamente hasta tener el nivel de detalle necesario.

### Optimización (LOD)

Un tema interesante respecto a la visualización de terrenos es su optimización debido a la gran cantidad de puntos que se intentan renderizar. Una de las técnicas que existen para reducir el trabajo que se tiene que realizar es el nivel de detalle (LOD) el cual tiene como idea principal reducir la cantidad de triangulos que tienen los puntos más alejados de la camara. 
Para lograr esto se tienen diferentes métodos como usar HRT o quadtrees e ir aumentando la cantidad de hijos para los nodos que esten más cerca de la cámara o usar una TIN la cuale es una estructura con muy buen rendimiento inclusive mejor que las HRT, pero que usarla de manera general es más dificil y requiere soporte de geometría de multiresolución. Existen otros algoritmos pensados en optimizar aún más los rendimientos como las Mallas Dinámicas Adaptativas por Lotes (BDAM) las cuales buscan combinar las propiedades de las HRT y las TIN para buscar un mejor rendimiento [3] o como el método de Adaptación Óptima en Tiempo Real (ROAM) el cual usa dos colas de prioridad para realizar las operaciones de union y division que mantienen triangulaciones continuas en arboles binarios de triangulos pre procesados. [4]

## Generación de Terreno

En diferentes juegos 3D y aplicaciones se usan terrenos generados de manera aleatoria. Para lograr que estos se parezcan a los de la vida real no se pueden simplemente asignar números aleatorios a las alturas, asi que una forma sencilla de generarlos es usando fractales y los Fractales con Movimiento Browniano (FBM) son unos fractales que tienen un fondo matemático riguroso y tienen buenas propiedades matemáticas que permiten usarlos de manera facil. [5].

La idea central de de un fractal FBM es combinar diferentes tipos de funciones de ruido. Con ruido no se habla del ruido blanco sino de un tipo de ruido llamado ruido rosa (pink noise). La primera persona en usar este tipo de ruido en computación gráfica fue Ken Perlin al crear su famosa función de ruido (la cual es la que usa P5 cuando se llama la funcion noise()), con la cual ganó un premio oscar. Para crear ruido rosa en una dimensión lo que se hace es definir que tanto se mueve en x (frecuencia) y por cada x se genera un numero aleatorio, luego se hacer interpolación lineal entre estos puntos aleatorios. Un FBM se puede generar facilmente creando varias funciones de ruido rosa con diferentes frecuencias y luego se suman los resultados. La función de ruido de perlin usa este mismo principio, pero esta mucho más desarrollada y ha tenido diferentes mejoras con el tiempo.

# Solución

## Terreno usando un fractal plasma

Para este ejemplo de un terreno usando un fractal se usó un fractal plasma, usando como base la implementación en JavaScript de este fractal hecha por Piotr Rochala (http://rocha.la/) la cual se modificó un poco para poder ser usada para generar terrenos.

```js

eso = new $plasma;
eso.init(w,h,1,0);

...

let yoff = 0;
for (let y = 0; y < rows; ++y){
  let xoff = 0;
  for (let x = 0; x < cols; ++x){
    landscape[y][x] = map(eso.points[yoff][xoff], 0, 1, -max_min, max_min);
    xoff += smooth_slider.value();
  }
  yoff += smooth_slider.value();
}
```

{{< p5-iframe sketch="/showcase/sketches/terrain2.js" width="630" height="630" >}}

## Terreno generado usando Ruido de Perlin

Esto código fue hecho basado en el código del video de The Coding Train mencionado arriba del articulo. Para este generador de terreno lo principal es generar una malla de triangulos y luego asignarle las alturas usando la función de ruido de perlin y variando yoff y xoff. Para generar el movimiento simplemente se aumenta el valor por defecto de yoff cada iteración de draw.

```js
flying -= flying_slider.value()/1000;
let yoff = flying;
for (let y = 0; y < rows; ++y){
  let xoff = 0;
  for (let x = 0; x < cols; ++x){
    landscape[y][x] = map(noise(xoff,yoff), 0, 1, -max_min, max_min);
    xoff += 0.05;
  }
  yoff += 0.05;
}
```

{{< p5-iframe sketch="/showcase/sketches/terrain1.js" width="630" height="630" >}}


# **Conclusiones**


# **Trabajo futuro**

# **Referencias**