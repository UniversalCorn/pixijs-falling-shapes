import * as PIXI from 'pixi.js'
import { getRandomFromTo } from '../helpers';
import { EVENTS } from '../events';
import { createRandomColor } from '../helpers';

const MILLISECONDS_IN_SECOND = 1000;

//uses view API to change DOM, uses model API to chane app state, connects view and model
export class Controller {
    constructor(app, view, model) {
        this.app = app;
        this.view = view;
        this.model = model;

        this.shapeDataObj = {};
        this.shapeTypeDataObj = {};

        this.generationArea = {};
        this.createGenerationArea();

        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight - 200);
            this.generationArea.width = app.screen.width;
            this.generationArea.height = app.screen.height;
        });

        this.actionCount = 0

        this.registerEvents();
        this.updateGame();
    }

    //define if to update game
    updateGame() {
        const ticker = new PIXI.Ticker();
        ticker.add(() => {
            const appScreenSize = { width: this.app.screen.width, height: this.app.screen.height };
            const ifToAction = ((this.actionCount * ticker.elapsedMS) % MILLISECONDS_IN_SECOND) < ticker.elapsedMS;
            this.action(ifToAction, appScreenSize);
            this.actionCount++;
        });
        ticker.start();
    }

    //update game when needed
    action(ifToAction, appScreenSize) {
        if (ifToAction) {
            this.createShapes(appScreenSize, this.model.shapesPerSecond);
            this.destroyGoneShapes(appScreenSize);
        }
        this.moveShapes();
        this.view.updateData(this.model.coveredArea, this.model.numberOfShapes);
    }
    
    //creating interactive background to produce new shapes on click
    createGenerationArea() {
        this.app.stage.removeChild(this.generationArea);
        this.generationArea = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.generationArea.width = this.app.screen.width;
        this.generationArea.height = this.app.screen.height;
        this.generationArea.interactive = true;
        this.app.stage.addChild(this.generationArea);
    }

    //checking event to register it accordingly
    registerEvent(event, handler) {
        switch (event) {
            case EVENTS.CREATE_SHAPE: {
                this.generationArea.click = ($event) => {
                    handler(this.getShapeData($event.data.global));
                };
                break;
            }

            case EVENTS.CHANGE_SHAPES_PER_SECOND: {
                this.view.numberOfShapesLeftControlElement.addEventListener('click', () => {
                    const isValidationSuccess = this.model.inputFieldValidator(this.view.numberOfShapesPerSecElement);
                    if (!isValidationSuccess) {
                        return
                    } else if (this.view.numberOfShapesPerSecElement.innerText === '2') {
                        this.view.numberOfShapesLeftControlElement.style.color = 'gray';
                    }
                    this.view.numberOfShapesPerSecElement.innerText = Number(this.view.numberOfShapesPerSecElement.innerText) - 1 + '';
                    handler(this.view.numberOfShapesPerSecElement.innerText);
                });
                this.view.numberOfShapesRightControlElement.addEventListener('click', () => {
                    if (this.view.numberOfShapesPerSecElement.innerText === '1') {
                        this.view.numberOfShapesLeftControlElement.style.color = 'blue';
                    }
                    this.view.numberOfShapesPerSecElement.innerText = Number(this.view.numberOfShapesPerSecElement.innerText) + 1 + '';
                    handler(this.view.numberOfShapesPerSecElement.innerText);
                });
                break;
            }

            case EVENTS.CHANGE_GRAVITY: {
                this.view.gravityValueLeftControlElement.addEventListener('click', () => {
                    const isValidationSuccess = this.model.inputFieldValidator(this.view.gravityValueElement);
                    if (!isValidationSuccess) {
                        return
                    } else if (this.view.gravityValueElement.innerText === '2') {
                        this.view.gravityValueLeftControlElement.style.color = 'gray';
                    }
                    this.view.gravityValueElement.innerText = Number(this.view.gravityValueElement.innerText) - 1 + '';
                    handler(this.view.gravityValueElement.innerText);
                });
                this.view.gravityValueRightControlElement.addEventListener('click', () => {
                    if (this.view.gravityValueElement.innerText === '1') {
                        this.view.gravityValueLeftControlElement.style.color = 'blue';
                    }
                    this.view.gravityValueElement.innerText = Number(this.view.gravityValueElement.innerText) + 1 + ''
                    handler(this.view.gravityValueElement.innerText);
                });
                break;
            }

            default: return;
        }
    }

    getShapeData(position) {
        this.shapeDataObj = {
            ...position, 
            width: getRandomFromTo(this.app.screen.width / 20, this.app.screen.width / 10),
            height: getRandomFromTo(this.app.screen.height / 20, this.app.screen.height / 10)
        }
        return this.shapeDataObj;
    }

    //registering events for DOM elements
    registerEvents() {
        this.registerEvent(EVENTS.CREATE_SHAPE, this.onShapeCreate.bind(this));
        this.registerEvent(EVENTS.CHANGE_GRAVITY, (value) => { this.model.gravity = value });
        this.registerEvent(EVENTS.CHANGE_SHAPES_PER_SECOND, (value) => { this.model.shapesPerSecond = value });
    }

    //creates a set of shapes with ticker for each shape inside to distribute space between shapes more smoothly, without gaps
    createShapes(appScreenSize, amount) {
        const stepValue = 1;
        for (let i = 0; i < amount; i++) {
            let timer = new PIXI.Ticker();
            timer.speed = 1 / timer.FPS;
            let value = 0;
            timer.add(() => {
                value += stepValue;
                if (value > i * (Number(this.view.numberOfShapesPerSecElement.innerText) / Number(this.view.gravityValueElement.innerText) / amount) * MILLISECONDS_IN_SECOND / 10) {
                    const width = getRandomFromTo(this.app.screen.width / 20, this.app.screen.width / 10);
                    const height = getRandomFromTo(this.app.screen.height / 20, this.app.screen.height / 10)
                    this.onShapeCreate({
                        id: new Date().getTime(),
                        x: getRandomFromTo(0, appScreenSize.width - width),
                        y: -height * 2,
                        width,
                        height
                    });
                    timer.stop();
                    timer = null;
                    value = 0;
                }
            })
            timer.start();
        }
    }

    //creates shape with click listener for it
    onShapeCreate(data) {
        const newShape = this.createShape(data);
        newShape.sprite.click = ($event) => {
            $event.stopPropagation();
            this.destroyShape(newShape, true);
        };
        
        this.app.stage.addChild(newShape.sprite)
    }

    createShape(data) {
        const hoverIcon = "url('../../assets/minus.png'), auto";
        this.app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;
        const sprite = new PIXI.Sprite();
        sprite.cursor = 'hover'
        sprite.interactive = true;
        const shapeType = this.model.shapeTypes[getRandomFromTo(0, this.model.shapeTypes.length)];
        this.shapeTypeDataObj = {...data, sprite}
        const newShape = new shapeType(this.shapeTypeDataObj);
        this.model.shapes.push(newShape);

        return newShape;
    }

    moveShapes() {
        this.model.shapes.forEach(shape => {
            shape.move({ x: 0, y: this.model.gravity});
        });
    }

    destroyShape(shapeToRemove, manualDestroy = false) {
        const shapeIndex = this.model.shapes.findIndex(shape => shape.id === shapeToRemove.id);
        for (let i = 0; i < this.model.shapes.length; i++) {
            if (this.model.shapes[i].constructor.name === this.model.shapes[shapeIndex].constructor.name && manualDestroy) {
                this.model.shapes[i].sprite.tint = createRandomColor();
            }
        }
        const shape = this.model.shapes[shapeIndex];
        const sprite = shape.sprite
        this.app.stage.removeChild(sprite);
        sprite.click = null;
        sprite.destroy();
        this.model.shapes.splice(shapeIndex, 1);
    }

    destroyGoneShapes(appScreenSize) {
        this.model.shapes.filter(shape => shape.y >= appScreenSize.height)
            .forEach((shape) => {
                this.destroyShape(shape);
            });
    }
}
