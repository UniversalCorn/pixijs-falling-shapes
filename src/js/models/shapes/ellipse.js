import { Shape } from '../shape';
import * as PIXI from 'pixi.js-legacy'

export class Ellipse extends Shape {
    render() {
        const renderGraphics = new PIXI.Graphics();
        renderGraphics.beginFill(this.createRandomColor());
        renderGraphics.drawEllipse(this.x, this.y, this.width / 2, this.height / 2);
        renderGraphics.endFill();
        return renderGraphics;
    }

    getArea() {
        return Math.PI * (this.width / 2) * (this.height / 2);
    }
}
