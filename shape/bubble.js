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
    const rnd = Math.floor;
    const me = this;
    var boundingRect_onChange = function (attr) {
        switch (attr.attribute) {
            case 'x':
                if (me.x != rnd(attr.value + me.radius)){
                    me.x = rnd(attr.value + me.radius);
                }
                break;
            case 'y':
                if (me.y != rnd(attr.value + me.radius)){
                    me.y = rnd(attr.value + me.radius);
                }
                break;
            case 'width':
            case 'height':
                if (me.radius != rnd(attr.value / 2)){
                    me.radius = rnd(attr.value / 2);
                }
                break;
        }
    }

    Object.defineProperty(this, "x", {
        get: function() { return x; },
        set: function(val) {
            x = (val !== null)? parseFloat(val) : null;
            this.boundingRect.x = x - radius;
        }
    });
    
    Object.defineProperty(this, "y", {
        get: function() { return y; },
        set: function(val) {
            y = (val !== null)? parseFloat(val) : null;
            this.boundingRect.y = y - radius;
        }
    });
    
    Object.defineProperty(this, "radius", {
        get: function() { return radius; },
        set: function(val) {
            radius = (val !== null)? parseFloat(val) : null;
            this.boundingRect.width = this.boundingRect.height = radius + radius;
        }
    });

    this.canvasCtx = this.ctx = ctx;
    this.x = rnd(x);
    this.y = rnd(y);
    this.radius = rnd(radius);
    this.boundingRect = new BoundingRect(x - radius, y - radius, radius + radius, radius + radius, boundingRect_onChange);
}

//window.jsCanvasTools.Bubble = Bubble
export { Bubble };