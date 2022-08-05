import * as PIXI from 'pixi.js'
import "../styles/reset.css"
import "../styles/style.css"

import { Model } from './models/model';
import { View } from './views/view';
import { Controller } from './controllers/controller';

const Application = PIXI.Application;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight - 200,
    backgroundAlpha: 1,
    antialias: true,
});

app.renderer.view.style.position = 'relative';
app.stage.interactive = true;

document.getElementById('app').appendChild(app.view);

const model = new Model(app);
const view = new View(app);
const controller = new Controller(app, view, model);

const defaultIcon = "url('../assets/plus.png'), auto";

app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;