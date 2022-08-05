import { Triangle } from './shapes/triangle';
import { Tetragon } from './shapes/tetragon';
import { Pentagon } from './shapes/pentagon';
import { Hexagon } from './shapes/hexagon';
import { Circle } from './shapes/circle';
import { Ellipse } from './shapes/ellipse';
import { Random } from './shapes/random';

//keeps state and gives controller some API to change state; contains some business logic
export class Model {
    constructor(app) {
        this.app = app;
        this.shapes = [];
        this.gravity = 1;
        this.shapesPerSecond = 1;
        this.shapeTypes = [Triangle, Tetragon, Pentagon, Hexagon, Circle, Ellipse, Random];
    }

    get coveredArea() {
        return Math.ceil(this.shapes.reduce((prev, current) => prev + current.coveredArea, 0));
    }

    get gravity() {
        return this._gravity;
    }

    get shapesPerSecond() {
        return this._shapesPerSecond;
    }

    get numberOfShapes() {
        return this.shapes.length;
    }

    set gravity(value) {
        this._gravity = Number(value);
    }

    set shapesPerSecond(value) {
        this._shapesPerSecond = Number(value);
    }

    //business logic validators
    inputFieldValidator(field) {
        if (field.innerText !== '1') {
            return true;
        }
    }
}
