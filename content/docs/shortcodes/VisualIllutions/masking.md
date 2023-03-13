# Masking

{{< hint info >}}
<b> Ejercicio</b>
Implementar un kinegram y algunos patrones de moiré que están estrechamente relacionado con el fenómeno de masking.

{{< /hint >}}

### Pacman Scanimation
{{< p5-iframe sketch="/showcase/sketches/pacman.js" width="900" height="300" >}}

### Código:

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