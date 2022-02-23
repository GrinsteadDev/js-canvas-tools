import { BoundingRect } from "../objects/boundingrect.js";

/**
 * Bubble Module
 * @param {CanvasRenderingContext2D} ctx - Optional 2D canvas rendering object
 * @param {number} x - the x position of the bubble (center point parametrized)
 * @param {number} y - the y position of the bubble (center point parametrized)
 * @param {number} radius - the radius of the bubble
 * @param {number} movementRate - Optional max rate of movement
 */
function Bubble(ctx, x, y, radius, movementRate) {
    movementRate = movementRate || 3;
    const me = this;
    const rnd = Math.floor;
    const abs = Math.abs;
    const stAngle = 0;
    const endAngle = Math.PI * 2;
    const colorCol = [
        'rgba(227, 181, 255, 0.1)',
        'rgba(181, 244, 255, 0.1)',
        'rgba(139, 0, 139, 0.1)',
        'rgba(0, 103, 163, 0.1)',
        'rgba(237, 248, 255, 0.5)',
        'rgba(237, 248, 255, 0.5)',
        'rgba(247, 237, 255, 0.5)',
        'rgba(247, 237, 255, 0.5)'
    ];

    const cache = document.createElement('canvas').getContext('2d');

    const boundingRect_onChange = function (attr) {
        if (attr.value === null || isNaN(attr.value)) { return; }
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
    };

    const randomMinMax = function (min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    const randomPoint = function (x, y, radius) {
        var a = Math.random() * 2 * Math.PI;
        var r = radius * Math.sqrt(Math.random());
        return {
            x: Math.floor(r * Math.cos(a)  + x),
            y: Math.floor(r * Math.sin(a)  + y)
        };
    };

    const createCache = async function () {
        for(let i = 0; i < 200; i++) {
            let innerPoint = randomPoint(me.radius, me.radius, me.radius);
            let gradient = cache.createRadialGradient(innerPoint.x, innerPoint.y, 0, me.radius, me.radius, me.radius);
    
            gradient.addColorStop(0, colorCode);
            gradient.addColorStop(0.4, colorCol[randomMinMax(0, colorCol.length - 1)]);
            gradient.addColorStop(1, colorCode);
    
            cache.beginPath();
            cache.clearRect(0, 0, cache.width, cache.height);
            cache.fillStyle = gradient;
            cache.arc(me.radius, me.radius, me.radius, stAngle, endAngle, true);
            cache.fill();
            cache.closePath();
        }
    };

    const standardizeColor = function (color) {
        let elm = document.createElement('div');
        let out = '';
        let reg = /rgba/g;

        elm.style.display = 'none';
        elm.style.color = color;
        document.body.appendChild(elm);
        out = window.getComputedStyle(elm).color;
        document.body.removeChild(elm);

        if(!(out.match(reg))) {
            out = "rgba(" + out.replace('rgb(', '').replace(')', '') + ', 1)';
        }
        return out;
    }

    var xRate = randomMinMax(-movementRate, movementRate);
    var yRate = randomMinMax(-movementRate, movementRate);
    var colorCode = 'rgba(200, 200, 200, 0)';

    if(xRate == 0 && yRate == 0) {
        switch(randomMinMax(0,3)){
            case 0:
                xRate++;
                break;
            case 1:
                xRate--;
                break;
            case 2:
                yRate++;
                break;
            case 3:
                yRate--;
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

    Object.defineProperty(this, 'canvasCtx', {
        get() { return ctx; },
        set(val) { ctx = val; }
    });

    Object.defineProperty(this, 'ctx', {
        get() { return this.canvasCtx; },
        set(val) { this.canvasCtx = val; }
    });

    Object.defineProperty(this, 'boundingRect', {
        value: new BoundingRect(x - radius, y - radius, radius + radius, radius + radius, boundingRect_onChange),
        writable: false
    });

    this.ctx = ctx;
    this.x = x? rnd(x) : null;
    this.y = x? rnd(y) : null;
    this.radius = radius? rnd(radius) : null;

    cache.canvas.height = cache.canvas.width = this.radius + this.radius;
    createCache();

    this.setBackgroundColor = async function (color) {
        let rgba = standardizeColor(color);
        let colArr = rgba.replace('rgba(','').replace(')','').split(',');
        colArr[3] = 0;
        colorCode = 'rgba(' + colArr.join(',') + ')';
        createCache();
        
    }

    this.draw = async function () {
        me.ctx.drawImage(cache.canvas, 0, 0, cache.canvas.width, cache.canvas.height, me.boundingRect.x, me.boundingRect.y, me.boundingRect.width, me.boundingRect.height);
    }

    this.update = async function () {
        me.x += xRate;
        me.y += yRate;
        if(me.boundingRect.x + me.boundingRect.width >= me.ctx.canvas.width - abs(xRate) && xRate > 0) {
            xRate = -xRate;
        }
        if(me.boundingRect.y + me.boundingRect.height >= me.ctx.canvas.height - abs(yRate) && yRate > 0) {
            yRate = -yRate;
        }
        if(me.boundingRect.x < abs(xRate) && xRate < 0) {
            xRate = -xRate;
        }
        if(me.boundingRect.y < abs(yRate) && yRate < 0) {
            yRate = -yRate;
        }
    }
}

//window.jsCanvasTools.Bubble = Bubble
export { Bubble };