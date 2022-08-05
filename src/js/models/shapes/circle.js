import { Shape } from '../shape';
import * as PIXI from 'pixi.js-legacy'

export class Circle extends Shape {

    render() {
        const renderGraphics = new PIXI.Graphics();
        renderGraphics.beginFill(this.createRandomColor());
        renderGraphics.drawCircle(this.x, this.y, this.width / 4);
        renderGraphics.endFill();
        return renderGraphics;
    }

    getArea() {
        return Math.PI * Math.pow(this.width / 4, 2);
    }
}