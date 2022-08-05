import * as PIXI from 'pixi.js-legacy'
import { createRandomColor, getShapeArea } from '../helpers';

//serves as a template for shapes of all types
export class Shape {
    constructor(data) {

        this.id = data.id || new Date().getTime();
        this.width = data.width || 50;
        this.height = data.height || 50;
        this.vertices = data.vertices || null;
        this.sprite = data.sprite;
        this.x = data.x;
        this.y = data.y;
        this.createRandomColor = createRandomColor;

        this.initSprite(this.render());
        this.coveredArea = this.getArea();
    }

    get x() {
        return this.sprite.position.x;
    }

    get y() {
        return this.sprite.position.y;
    }

    set x(value) {
        this.sprite.position.x = value;
    }

    set y(value) {
        this.sprite.position.y = value;
    }

    initSprite(textureGraphics) {
        if (textureGraphics != null) {
            this.sprite.texture = textureGraphics.generateCanvasTexture();
        }
    }

    move(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }

    render() {
        if (!this.vertices) {
            return;
        }

        const renderGraphics = new PIXI.Graphics();
        renderGraphics.beginFill(this.createRandomColor());
        renderGraphics.moveTo(this.x, this.y);
        this.vertices.forEach(point => {
            renderGraphics.lineTo(point.x, point.y);
        });
        renderGraphics.lineTo(this.x, this.y);
        renderGraphics.endFill();

        return renderGraphics;
    }

    getArea() {
        if (!this.vertices) {
            return;
        }
        const firstVertex = { x: this.x, y: this.y };
        const lastVertex = { x: this.x, y: this.y };
        return getShapeArea([firstVertex].concat(this.vertices).concat([lastVertex]));
    }
}