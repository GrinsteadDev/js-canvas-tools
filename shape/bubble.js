/**
 * Bubble Module
 * @class
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 */
function Bubble(ctx, x, y, radius) {
    this.canvasCtx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
}

//window.jsCanvasTools.Bubble = Bubble
export { Bubble };