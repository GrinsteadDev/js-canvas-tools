import { drawRect } from "./rect.js";
/**
 * Each shape is designed to be independent of the webgl tools object, however they will dependent on the shader objects.
 */
const shapes = {
    drawRect: drawRect
};

export { shapes };