import { BoundingRect } from "../objects/boundingrect.js";

/**
 * Bubble Module
 * @class
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 */
function Bubble(ctx, x, y, radius) {
    this.canvasCtx = this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.boundingRect = new BoundingRect(x - radius, y - radius, radius + radius, radius + radius);
}

//window.jsCanvasTools.Bubble = Bubble
export { Bubble };