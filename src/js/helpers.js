export const createRandomColor = () => `0x${Math.floor(Math.random() * 16777215).toString(16)}`;

const multiplyVector = (v1, v2) => v1.x * v2.y - v1.y * v2.x;

export const getShapeArea = (vertices) =>
    vertices.reduce((prev, current, index, array) => prev + (index > 0 ? multiplyVector(array[index - 1], current) : 0), 0) / 2;

export const getRandomFromTo = (min, max) => Math.floor(Math.random() * (max - min)) + min;
