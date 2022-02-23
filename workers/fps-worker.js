/**
 * Webworker Class
 * It's job is to dispatch events to the main thread at a constant interval unaffected by
 * browser throttling.
 */

var bgFps = 60;
var cAFps = 60;
var uiFps = 60;
var bgInterval;
var uiInterval;
var cAInterval;
var isRunning = false;

function Start() {
    bgInterval = setInterval(
        function () {
            postMessage({
                type: "update",
                value: "background"
            });
        }, 1000 / bgFps
    );
    uiInterval = setInterval(
        function () {
            postMessage({
                type: "update",
                value: "user-interface"
            });
        }, 1000 / uiFps
    );
    cAInterval = setInterval(
        function () {
            postMessage({
                type: "update",
                value: "constant-animation"
            });
        }, 1000 / cAFps
    );
    isRunning = true;
}

function Stop() {
    clearInterval(bgInterval);
    clearInterval(uiInterval);
    clearInterval(cAInterval);
    isRunning = false;
}

function SetFps(obj) {
    bgFps = obj.background? obj.background : bgFps;
    cAFps = obj.constantAnimation? obj.constantAnimation : cAFps;
    uiFps = obj.userInterface? obj.userInterface : uiFps;
    if(isRunning) {
        Stop();
        Start();
    }
}

onmessage = function (e) {
    let data = e.data;
    switch (data.type) {
        case 'start':
            Start();
            break;
        case 'stop':
            Stop();
            break;
        case 'set-fps':
            SetFps(data.value);
            break;
    }
};