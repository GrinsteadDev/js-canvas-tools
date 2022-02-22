/**
*The bounding Rect provides a standard accessor for the canvas renderer
*It creates a top, right, bottom, left bounds based off of the provided params
*   @param {number} x: the location of the top left most point based upon the horizontal axis
*   @param {number} y: the location of the top left most point based upon the vertical axis
*   @param {number} width: the supplied with of the object
*   @param {number} height: the supplied height of the object
*   @param {Function} onChange: an onChange event to update values 
*/
function BoundingRect(x, y, width, height, onChange){
    x = (x !== null)? parseInt(x) : null;
    y = (y !== null)? parseInt(y) : null;
    width = (width !== null)? parseInt(width) : null;
    height = (height !== null)? parseInt(height) : null;
    
    Object.defineProperty(this, "x", {
        get: function() { return x; },
        set: function(val) {
            x = (val !== null)? parseInt(val) : null;
            onChange({
                attribute: 'x',
                value: x
            });
        }
    });
    
    Object.defineProperty(this, "y", {
        get: function() { return y; },
        set: function(val) {
            y = (val !== null)? parseInt(val) : null;
            onChange({
                attribute: 'y',
                value: y
            });
        }
    });
    
    Object.defineProperty(this, "width", {
        get: function() { return width; },
        set: function(val) {
            width = (val !== null)? parseInt(val) : null;
            onChange({
                attribute: 'width',
                value: width
            });
        }
    });
    
    Object.defineProperty(this, "height", {
        get: function() { return height; },
        set: function(val) {
            height = (val !== null)? parseInt(val) : null;
            onChange({
                attribute: 'height',
                value: height
            });
        }
    });
    
    Object.defineProperty(this, "top", {
        get: function() {
            var top = 0;
            if(height < 0) { top = y + height; } else { top = y; }
            return top;
        }
    });
    
    Object.defineProperty(this, "right", {
        get: function() {
            var right = 0;
            if(width < 0) { right = x; } else { right = x + width; }
            return right;
        }
    });
    
    Object.defineProperty(this, "bottom", {
        get: function() {
            var bottom = 0;
            if(height < 0) { bottom = y; } else { bottom = y + height; }
            return bottom;
        }
    });
    
    Object.defineProperty(this, "left", {
        get: function() {
            var left = 0;
            if(width < 0) { left = y + width; } else { left = y; }
            return left;
        }
    });
}

export { BoundingRect };