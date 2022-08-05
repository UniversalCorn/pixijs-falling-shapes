import { Shape } from '../shape';
import { getRandomFromTo } from '../../helpers';
import * as PIXI from 'pixi.js-legacy'

//special shape to create random shape from test task example, constructed out of circles to be able to find its area as area of their intersection
export class Random extends Shape {
    findIntersectionArea(circle1, circle2) {
        let intersectionArea = 0;
        let radius1 = circle1.radius;
        let radius2 = circle2.radius;
        const distanceBetweenPoints = Math.hypot(circle2.x - circle1.x, circle2.y - circle1.y);
        let xParam = (radius1 - radius2 + distanceBetweenPoints**2) / (2 * distanceBetweenPoints);
        let zParam = xParam**2;
        let yParam = Math.sqrt(radius1 - zParam);
        if (distanceBetweenPoints < Math.abs(circle2.radius - circle1.radius)) {
            intersectionArea = Math.PI * Math.min(radius1, radius2);
        } else {
            intersectionArea = radius1 * Math.asin(yParam / circle1.radius);
            + radius2 * Math.asin(yParam / circle2.radius) - yParam * (xParam + Math.sqrt(zParam + radius2 - radius1));
        }
        return intersectionArea;
    }
    
    findIntersectionsAreas() {
        for (let i = 0; i < this.circles.length; i++) {
            for (let j = i + 1; j < this.circles.length; j++) {
                if (i !== j) {
                        this.intersectionsAreas.push(Math.round(100 * Math.abs(this.findIntersectionArea(this.circles[i], this.circles[j]))) / 100);
                }
            }
        }
    }

    findCirclesAreas() {
        for (let i = 0; i < this.circles.length; i++) {
            this.circlesAreas.push(Math.round(100 * Math.abs(Math.PI * ((this.circles[i].radius)**2))) / 100);
        }
    }

    setCoordinates(circle1, circle2, isOverlap) {
        circle1.x = getRandomFromTo(50, 100);
        circle1.y = getRandomFromTo(50, 100);
        circle2.x = getRandomFromTo(50, 100);
        circle2.y = getRandomFromTo(50, 100);
        circle1.radius = getRandomFromTo(20, 30);
        circle2.radius = getRandomFromTo(20, 30);
        const distanceBetweenPoints = Math.hypot(circle2.x - circle1.x, circle2.y - circle1.y);
        if (distanceBetweenPoints - (circle1.radius + circle2.radius) > 5) {
            isOverlap = false;
            this.setCoordinates(circle1, circle2);
        } else {
            isOverlap = true;
            return isOverlap;
        }
    }

    setAllCoordinates() {
        let overlaps = [];
        for (let i = 0; i < this.circles.length; i++) {
            for (let j = 0; j < this.circles.length; j++) {
                if (i !== j) {
                    overlaps.push(this.setCoordinates(this.circles[i], this.circles[j]));
                }
            }
        }

        if (overlaps.every(el => el === true)) {
            return;
        } else {
            overlaps = [];
            this.setAllCoordinates();
        }
    }

    render() {
        //fill didn't work for some reason, no time to investigate
        this.circles = [
            {
                radius: 0,
                x: 0,
                y: 0
            },
            {
                radius: 0,
                x: 0,
                y: 0
            },
            {
                radius: 0,
                x: 0,
                y: 0
            },
            {
                radius: 0,
                x: 0,
                y: 0
            },
            {
                radius: 0,
                x: 0,
                y: 0
            }
        ]
        this.intersectionsAreas = [];
        this.circlesAreas = [];
        this.setAllCoordinates();
        this.findIntersectionsAreas();
        this.findCirclesAreas();

        this.intersectionsAreas = this.intersectionsAreas.map(el => isNaN(el) ? 0 : el);
        this.circlesAreas = this.circlesAreas.map(el => isNaN(el) ? 0 : el);

        const circlesAreasSum = this.circlesAreas.reduce((partialSum, a) => partialSum + a, 0);
        const intersectionsAreasSum = this.intersectionsAreas.reduce((partialSum, a) => partialSum + a, 0);
        this.area = circlesAreasSum - intersectionsAreasSum;

        const renderGraphics = new PIXI.Graphics();
        const randomColor = this.createRandomColor();

        const cumulativeGraphics = [];
        for (let i = 0; i < this.circles.length; i++) {
            const separateGraphics = new PIXI.Graphics();
            separateGraphics.beginFill(randomColor);
            separateGraphics.drawCircle(this.circles[i].x, this.circles[i].y, this.circles[i].radius);
            separateGraphics.endFill();
            cumulativeGraphics.push(separateGraphics);
        }

        for (let i = 0; i < cumulativeGraphics.length; i++) {
            renderGraphics.addChild(cumulativeGraphics[i]);
        }
        return renderGraphics;
    }

    getArea() {
        return this.area;
    }
}
