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
window.jsCanvasTools = jsCanvasTools = {
    round: Math.floor
};

/**
 * A tool designed to cache frequently used canvas elements as well as provide different
 * animation frames/canvases for UserInteraction, ConstantAnimation, and BackgroundAnimation.
 * Numbers are rounded to a whole number/integer as a way to avoid partial frame address in canvas.
 */
jsCanvasTools.canvasWorker =  function() {
    this.background = document.createElement('canvas');
    this.backgroundCtx = this.background.getContext('2d');
    this.userSpc = document.createElement('canvas');
    this.userSpcCtx = this.userSpc.getContext('2d');
    this.constantSpc = document.createElement('canvas');
    this.constantSpcCtx = this.constantSpc.getContext('2d');

    const now = performance.now;
    const rnd = jsCanvasTools.round;
    var fps = {
        background: 60,
        user: 60,
        constant: 60
    };

    /**
     * @param {number} rate - the desired frame rate defaults to 60 fps.
     */
    this.setFrameRate = this.setFps = function (rate) {
        if(Array.isArray(rate)) {
            fps.background = rate[0]? rnd(rate[0]) : 60;
            fps.user = rate[1]? rnd(rate[1]) : 60;
            fps.constant = rate[2]? rnd(rate[2]) : 60;
        } else if (typeof rate === 'object' && rate !== null) {
            fps.background = rate.background? rnd(rate.background) : 60;
            fps.user = rate.user? rnd(rate.user) : 60;
            fps.constant = rate.constant? rnd(rate.constant) : 60;
        } else {
            fps.background = fps.user = fps.constant = rate? rnd(rate) : 60;
        }
    };



}();

/**
 * This function does completes and loads files synchronously as the specified type
 * @param {string} name - the path, it is important to note that relative paths apply
 *      to the document containing the script not the script location
 * @param {number} returnType - a value from -1 to 5 as indicated by the loadFile.returnType
 *      enum.
 * 
 */
jsCanvasTools.loadFile = function (name, returnType) {
    var httpReq = new XMLHttpRequest();
    var out;
    var parser = new DOMParser();

    httpReq.open('GET', name, false);
    httpReq.overrideMimeType('text\/plain; charset=x-user-defined');
    httpReq.send(null);
    switch (returnType? returnType : jsCanvasTools.loadFile.returnType.default) {
        case jsCanvasTools.loadFile.returnType.text:
            out = httpReq.responseText;
            break;
        case jsCanvasTools.loadFile.returnType.arrayBuffer:
            let buff = new ArrayBuffer(httpReq.responseText.length);
            let buffView = new Uint8Array(buff);
            for (let i = 0, strLen = httpReq.responseText.length; i < strLen; i++) {
                buffView[i] = httpReq.responseText.charCodeAt(i) & 0xff;
            }
            out = buff;
            break;
        case jsCanvasTools.loadFile.returnType.blob:
            out = new Blob(
                [httpReq.response],
                {
                    type: httpReq.getResponseHeader('content-type')
                }
            );
            break;
        case jsCanvasTools.loadFile.returnType.document:
            out = parser.parseFromString(httpReq.responseText, 'text\/html');
            break;
        case jsCanvasTools.loadFile.returnType.json:
            out = JSON.parse(httpReq.responseText);
            break;
        case jsCanvasTools.loadFile.returnType.xml:
            out = parser.parseFromString(httpReq.responseText, 'text\/xml');
            break;
        default:
            out = httpReq.response;
            break;
    }
    return out;
}

Object.defineProperty(jsCanvasTools.loadFile, 'returnType', {
    value: {
        default: -1,
        text: 0,
        arrayBuffer: 1,
        blob: 2,
        document: 3,
        json: 4,
        xml: 5
    }
});

jsCanvasTools.ModuleLoader = function () {

}

Object.defineProperty(jsCanvasTools.ModuleLoader.prototype, 'config', {
    value: jsCanvasTools.loadFile('.\/config.json', jsCanvasTools.loadFile.returnType.json)
});

Object.defineProperty(jsCanvasTools.ModuleLoader.prototype, 'loadObject',{
    value: async function (name) {
        if (window.hasOwnProperty(name)) { return; }
        var objs = this.config['objects'];
        if(objs.hasOwnProperty(name)) {
            let temp = objs[name];
            if (temp.action == 'import') {
                var mod = await import(temp.module);
                jsCanvasTools[name] = mod[name];
            } else if (temp.action == 'run') {
                var js = jsCanvasTools.loadFile(temp.module);
                eval(js);
            }
        }
    },
    enumerable: false
});

var test = new jsCanvasTools.ModuleLoader();

test.loadObject('Bubble').then(
    function () {
        var b = new jsCanvasTools.Bubble(document.getElementById("testCanvas").getContext("2d"), 100, 200, 120);
        console.log(b);
    }
);

console.log("runningAFter");

console.log(test);