//gives controller some API to change DOM
export class View {
    constructor(app) {
        this.app = app;

        this.numberOfCurrentShapesElement = document.getElementById('number-of-current-shapes');
        this.surfaceAreaOccupiedByShapesElement = document.getElementById('surface-area-occupied-by-shapes');
        this.numberOfShapesPerSecElement = document.getElementById('number-of-shapes-per-sec');
        this.gravityValueElement = document.getElementById('gravity-value');

        this.numberOfShapesLeftControlElement = document.getElementById('number-of-shapes-left-control');
        this.numberOfShapesRightControlElement = document.getElementById('number-of-shapes-right-control');

        this.gravityValueLeftControlElement = document.getElementById('gravity-value-left-control');
        this.gravityValueRightControlElement = document.getElementById('gravity-value-right-control');
    }

    updateData(coveredArea, numberOfShapes) {
        this.surfaceAreaOccupiedByShapesElement.innerText = `${coveredArea} px^2`;
        this.numberOfCurrentShapesElement.innerText = numberOfShapes;
    }
}
