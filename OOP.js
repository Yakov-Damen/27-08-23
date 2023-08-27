"use strict";
// shape class that has an info method that returns a string
class Shape {
    info() {
        console.log("This is a shape");
    }
    draw() {
        console.log('drawing a shape');
    }
}
// rectangle class that gets hight and width as parameters and has a method to calculate area
class Rectangle extends Shape {
    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;
    }
    static combine(r1, r2) {
        return new Rectangle(r1.height + r2.height, r1.width + r2.width);
    }
    scale(x, y) {
        this.height = this.height * x;
        this.width = this.width * y;
        return this;
    }
    area() {
        console.log(this.height * this.width);
    }
    info() {
        console.log('This is a rectangle');
    }
}
// extend the rectangle class to a square class
class Square extends Rectangle {
    constructor(langth, width, height) {
        super(height, width);
        this.langth = langth;
    }
    area() {
        console.log(this.langth * this.langth);
    }
    draw() {
        console.log('drawing a circle');
    }
}
// extend the rectangle class to a colored rectangle class
class ColoredRectangle extends Rectangle {
    constructor(color, height, width) {
        super(height, width);
        this.color = color;
    }
    info() {
        console.log(`This is a ${this.color} rectangle`);
    }
}
class Circle extends Shape {
    constructor() {
        super();
    }
    draw() {
        console.log('drawing a circle');
    }
}
class Triangle extends Shape {
    constructor() {
        super();
    }
    draw() {
        console.log('drawing a triangle');
    }
}
function renderShapes(arr) {
    arr.forEach(obj => {
        obj.draw();
    });
}
