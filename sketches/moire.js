let x = 0
let checkbox;
let slider;

function setup() {
    createCanvas(700, 700);
    checkbox = createCheckbox('Automático', true);
    slider = createSlider(-250, 1000, -250);
    slider.position(10, 10);
    slider.style('width', '700px');
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
        ellipse(360, 280, i, i)
    }

    // Automatic movement
    if (checkbox.checked()) {
        x = x > width ? 0 : x + 3
    } else {
        x = slider.value()
    }
}