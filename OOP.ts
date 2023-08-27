// shape class that has an info method that returns a string
class Shape {
    info(): void {
        console.log("This is a shape");
    }
    draw(): void {
        console.log('drawing a shape');
    }
}
// rectangle class that gets hight and width as parameters and has a method to calculate area
class Rectangle extends Shape {
    height: number;
    width: number;
    constructor(height:number, width:number) {
        super();
        this.height = height;
        this.width = width;
    }
    static combine(r1:Rectangle, r2:Rectangle): Rectangle {
        return new Rectangle(r1.height + r2.height, r1.width + r2.width);
    }
    scale(x:number, y:number): Rectangle{
        this.height = this.height * x;
        this.width = this.width * y;
        return this;
    }
    area(): void {
        console.log(this.height*this.width);
    }
    info(): void {
        console.log('This is a rectangle');
    }
}

// extend the rectangle class to a square class
class Square extends Rectangle {
    langth: number;
    constructor(langth: number, width:number, height:number) {
        super(height, width);
        this.langth = langth;
    }
    area(): void {
        console.log(this.langth*this.langth);
    }
    draw(): void {
        console.log('drawing a circle');
    }
}

// extend the rectangle class to a colored rectangle class
class ColoredRectangle extends Rectangle {
    color: string;
    constructor(color: string, height:number, width:number) {
        super(height, width);
        this.color = color;
    }
    info(): void {
        console.log(`This is a ${this.color} rectangle`);
    }
}

class Circle extends Shape {
    constructor() {
        super();
    }
    draw(): void {
        console.log('drawing a circle');
    }
}


class Triangle extends Shape {
    constructor() {
        super();
    }
    draw(): void {
        console.log('drawing a triangle');
    }
}

function renderShapes(arr: Shape[]): void {
    arr.forEach(obj => {
        obj.draw();
    });
}