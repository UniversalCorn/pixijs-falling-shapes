import { Shape } from '../shape';
import { getRandomFromTo } from '../../helpers';

export class Hexagon extends Shape {
    constructor(data) {
        super({...data, 
            vertices: [
                { x: getRandomFromTo(data.x, data.x + data.width / 2), y: getRandomFromTo(data.y, data.y + data.height / 2) },
                { x: getRandomFromTo(data.x, data.x + data.width / 2), y: getRandomFromTo(data.y + data.height / 2, data.y + data.height) },
                { x: data.x, y: data.y + data.height },
                { x: getRandomFromTo(Math.max(0, data.x - data.width / 2), data.x), y: getRandomFromTo(data.y + data.height / 2, data.y + data.height) },
                { x: getRandomFromTo(Math.max(0, data.x - data.width / 2), data.x), y: getRandomFromTo(data.y, data.y + data.height / 2) }
            ]
        });
    }
}
