"use strict";
import { config as cfg } from "./config.js";
import { webglTools } from "./webgl/webgl-tools.js";
/**
 * jsCanvasTools is a javascript object collection designed to streamline the use and
 * deployment of complex canvas based javascript objects.
 * Entry point for all objects under jsCanvasTools. This tool is designed to be used
 * asynchronously to load objects dynamically using promises and the '.then' convention.
 * It is recommend not to add and/or overwrite object to the below namespace as changes
 * could have adverse and unpredictable consequences. 
 */

/** 
 * Initial Namespace declaration all loaded items shall be added to this name space. 
 * any import elements that are always used will be loaded throughout the course of
 * this module. Everything else is designed to be loaded on a peruse basis.
 * 
 */
var jsCanvasTools;
window.jsCanvasTools = jsCanvasTools = {
    round: Math.floor,
    randomMinMax: function (min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    clamp: function (num, min, max) {
        return Math.min(Math.max(num, min), max);
    },
    webgl: webglTools
};

/**
 * A tool designed to cache frequently used canvas elements as well as provide different
 * animation frames/canvases for UserInteraction, ConstantAnimation, and BackgroundAnimation.
 * Numbers are rounded to a whole number/integer as a way to avoid partial frame address in canvas.
 * Make sure that it's containing element's position is set to relative!!
 */
jsCanvasTools.canvasWorker = new  function() {
    const bg = document.createElement('canvas');
    const bgCtx = bg.getContext('2d');
    const ui = document.createElement('canvas');
    const uiCtx = ui.getContext('2d');
    const cA = document.createElement('canvas');
    const cACtx = cA.getContext('2d');

    Object.defineProperty(this, 'bg', {
        value: bg,
        writable: false
    });
    Object.defineProperty(this, 'background', {
        value: bg,
        writable: false
    });
    Object.defineProperty(this, 'bgCtx', {
        value: bgCtx,
        writable: false
    });
    Object.defineProperty(this, 'backgroundCtx', {
        value: this.bgCtx,
        writable: false
    });

    Object.defineProperty(this, 'ui', {
        value: ui,
        writable: false
    });
    Object.defineProperty(this, 'userInterface', {
        value: ui,
        writable: false
    });
    Object.defineProperty(this, 'uiCtx', {
        value: uiCtx,
        writable: false
    });
    Object.defineProperty(this, 'userInterfaceCtx', {
        value: uiCtx,
        writable: false
    });

    Object.defineProperty(this, 'cA', {
        value: cA,
        writable: false
    });
    Object.defineProperty(this, 'constantAnimation', {
        value: cA,
        writable: false
    });
    Object.defineProperty(this, 'cACtx', {
        value: cACtx,
        writable: false
    });
    Object.defineProperty(this, 'constantAnimationCtx', {
        value: cACtx,
        writable: false
    });

    const me = this;
    const config = cfg;
    const now = performance.now;
    const rnd = jsCanvasTools.round;
    const bgCol = [];
    const uiCol = [];
    const cACol = [];
    const fpsWorker = new Worker(config.workers['fps-worker']);

    const drawAll = function () {
        let len = Math.max(bgCol.length, uiCol.length, cACol.length);
        me.bgCtx.clearRect(0, 0, me.bg.width, me.bg.height);
        me.uiCtx.clearRect(0, 0, me.ui.width, me.ui.height);
        me.cACtx.clearRect(0, 0, me.cA.width, me.cA.height);
        for(let i = 0; i < len; i++){
            if(bgCol[i]) { bgCol[i].draw(); }
            if(uiCol[i]) { uiCol[i].draw(); }
            if(cACol[i]) { cACol[i].draw(); }
        }
        if(animate) { window.requestAnimationFrame(drawAll); }
    };

    const bgUpdate = function () {
        for(let i = 0; i < bgCol.length; i++){
            bgCol[i].update();
        }
    };
    
    const uiUpdate = function () {
        for(let i = 0; i < uiCol.length; i++){
            uiCol[i].update();
        }
    };

    const cAUpdate = function () {
        for(let i = 0; i < cACol.length; i++){
            cACol[i].update();
        }
    };

    var animate;
    var fps = {
        background: 60,
        userInterface: 60,
        constantAnimation: 60
    };

    this.bg.style.setProperty('position', 'absolute', 'important');
    this.ui.style.setProperty('position', 'absolute', 'important');
    this.cA.style.setProperty('position', 'absolute', 'important');
    this.bg.style.setProperty('top', '0', 'important');
    this.ui.style.setProperty('top', '0', 'important');
    this.cA.style.setProperty('top', '0', 'important');
    this.bg.style.setProperty('left', '0', 'important');
    this.ui.style.setProperty('left', '0', 'important');
    this.cA.style.setProperty('left', '0', 'important');
    this.bg.style.setProperty('bottom', '0', 'important');
    this.ui.style.setProperty('bottom', '0', 'important');
    this.cA.style.setProperty('bottom', '0', 'important');
    this.bg.style.setProperty('right', '0', 'important');
    this.ui.style.setProperty('right', '0', 'important');
    this.cA.style.setProperty('right', '0', 'important');
    this.bg.style.setProperty('width', '100%', 'important');
    this.ui.style.setProperty('width', '100%', 'important');
    this.cA.style.setProperty('width', '100%', 'important');
    this.bg.style.setProperty('height', '100%', 'important');
    this.ui.style.setProperty('height', '100%', 'important');
    this.cA.style.setProperty('height', '100%', 'important');
    /**
     * @param {any} rate - the desired frame rate defaults to 60 fps.
     *      accepts a single number, an array of numbers, or an object
     *      {
     *          background,
     *          userInterface,
     *          constantAnimation
     *      }
     */
    this.setFrameRate = this.setFps = function (rate) {
        if(Array.isArray(rate)) {
            fps.background = rate[0]? rnd(rate[0]) : 60;
            fps.userInterface = rate[1]? rnd(rate[1]) : 60;
            fps.constantAnimation = rate[2]? rnd(rate[2]) : 60;
        } else if (typeof rate === 'object' && rate !== null) {
            fps.background = rate.background? rnd(rate.background) : 60;
            fps.userInterface = rate.userInterface? rnd(rate.userInterface) : 60;
            fps.constantAnimation = rate.constantAnimation? rnd(rate.constantAnimation) : 60;
        } else {
            fps.background = fps.userInterface = fps.constantAnimation = rate? rnd(rate) : 60;
        }
        fpsWorker.postMessage({
            type: 'set-fps',
            value: fps
        });
    };

    this.setParentElement = function (element) {
        element.appendChild(me.bg);
        element.appendChild(me.cA);
        element.appendChild(me.ui);
        me.bg.width = me.cA.width = me.ui.width = parseInt(element.clientWidth);
        me.bg.height = me.cA.height = me.ui.height = parseInt(element.clientHeight);
    }

    this.addToBackground = function (obj) {
        obj.ctx = this.bgCtx;
        obj.fps = fps.background;
        bgCol.push(obj);
    };

    this.addToUserInterface = function (obj) {
        obj.ctx = this.uiCtx;
        obj.fps = fps.userInterface;
        uiCol.push(obj);
    };

    this.addToConstantAnimation = function (obj) {
        obj.ctx = this.cACtx;
        obj.fps = fps.constantAnimation;
        cACol.push(obj);
    };

    this.startAnimation = function() {
        fpsWorker.postMessage({
            type: 'start'
        });
        animate = true;
        window.requestAnimationFrame(drawAll);
    };

    this.setBackgroundColor = async function (color, matchFps, idx, len) {
        len = len || Math.max(bgCol.length, uiCol.length, cACol.length);
        idx = idx || 0;

        if(bgCol[idx]) { bgCol[idx].setBackgroundColor(color); }
        if(uiCol[idx]) { uiCol[idx].setBackgroundColor(color); }
        if(cACol[idx]) { cACol[idx].setBackgroundColor(color); }

        idx++;
        if (idx < len) {
            if(matchFps === true){
                window.setTimeout(
                    function () {
                        me.setBackgroundColor(color, true, idx, len);
                    },
                    1000 / rnd(Math.min(fps.background, fps.constantAnimation, fps.userInterface) / 2)
                );
            } else {
                me.setBackgroundColor(color, false, idx, len);
            }
        }
    };

    this.stopAnimation = function() {
        fpsWorker.postMessage({
            type: "stop"
        });
        animate = false;
    };

    fpsWorker.onmessage = function (e) {
        let data = e.data;
        switch(data.type) {
            case 'update':
                if (data.value == "background") {
                    bgUpdate();
                }
                if (data.value == "user-interface") {
                    uiUpdate();
                }
                if (data.value == "constant-animation") {
                    cAUpdate();
                }
                break;
        }
    };

    this.setFps(fps);
}();
