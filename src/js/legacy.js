// import { gsap } from "gsap";
// const TWEEN = require('@tweenjs/tween.js')
// const RECTANGLE_WIDTH = 20;
// const RECTANGLE_HEIGHT = 20

// const poly = new PIXI.Graphics();
// poly.beginFill(0x25f0ad)
// .drawPolygon([
//     600, 50,
//     800, 150,
//     300, 200,
//     400, 100
// ])
// .endFill();

// app.stage.addChild(poly);

// function createRandomColor() {
//     return `0x${Math.floor(Math.getRandomFromTo() * 16777215).toString(16)}`;
// }

// function createRect() {
//     const rectangle = new PIXI.Graphics();
//     rectangle.beginFill(createRandomColor())
//     .drawRect(Math.getRandomFromTo() * app.screen.width, -RECTANGLE_HEIGHT, RECTANGLE_WIDTH, RECTANGLE_HEIGHT)
//     .endFill();

//     app.stage.addChild(rectangle);
//     return rectangle
// }

// let value = 0;
// const stepValue = 0.02;

// function isInt(value) {
//     const x = parseFloat(value);
//     return !isNaN(value) && (x | 0) === x;
// }

// function drawRect() {
//     value = value + stepValue;
//     if (!isInt(value.toFixed(2))) {
//         return;
//     }

//     const rectangle = createRect()

//     let position = {x: 0, y: 0};

//     let tween = new TWEEN.Tween(position)
//     .to({x: 0, y: app.screen.height}, 2000)
//     .onUpdate(() => {
//         rectangle.position.set(position.x, position.y);
//     });

//     tween.start();

//     app.ticker.add(() => TWEEN.update(app.ticker.lastTime));

//     // gsap.to(rectangle, {
//     //     y: app.screen.width, duration: 4, repeat: 0, yoyo: false,
//     // });
// }

// drawRect();

// const ticker = new PIXI.Ticker();
// ticker.add(drawRect);
// ticker.start();\

// const ticker = new PIXI.Ticker();
// ticker.add(dt => gameLoop(dt));
// ticker.start();

// const ticker = new PIXI.Ticker();
// ticker.add(drawRect);
// ticker.start();

// app.ticker.add((delta) => {
//     drawRect(delta);
// });


//
// this.x1 = getRandomFromTo(10, 20);
// this.y1 = getRandomFromTo(10, 20);
// this.x2 = getRandomFromTo(10, 20);
// this.y2 = getRandomFromTo(10, 20);
// this.d = Math.hypot(this.x2 - this.x1, this.y2 - this.y1);
// while (this.d > this.R + this.r) {
//     console.log('lalka');
//     this.x1 = getRandomFromTo(10, 20);
//     this.y1 = getRandomFromTo(10, 20);
//     this.x2 = getRandomFromTo(10, 20);
//     this.y2 = getRandomFromTo(10, 20);
//     this.d = Math.sqrt((this.x1 - this.x2)**2 + (this.y1 - this.y2)**2);
// }
// this.d = Math.sqrt((this.x1 - this.x2)**2 + (this.y1 - this.y2)**2);

// this.d1 = Math.abs(((this.R**2) - (this.r**2) + (this.d**2)) / (2*this.d));
// this.d2 = Math.abs(this.d - this.d1);
// this.y = Math.sqrt(this.R**2 - this.d1**2);
// this.area = ((this.r**2) * Math.acos(this.d1/this.r)) - (this.d1 * Math.sqrt((this.r - this.d1**2))) + ((this.R**2) * Math.acos(this.d2 / this.R)) - (this.d2 * (Math.sqrt(this.R**2 - this.d2**2)));
// console.log(this.d1/this.r);
// console.log(Math.acos(this.d1/this.r))
// console.log(Math.acos(this.d2 / this.R))
