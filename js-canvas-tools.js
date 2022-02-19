function importModule() {
    var httpReq = new XMLHttpRequest();

    httpReq.onload = function () {
        console.log(httpReq.response);
    }
    httpReq.open('GET', 'https://github.com/GrinsteadDev/html5canvas-shapes-ui.git/main.js');
    httpReq.responseType = responseType | importModule.responseType.arrayBuffer;
    httpReq.send();
}

Object.defineProperty(importModule, 'responseType', {
    value: {
        default: 'text',
        text: 'text',
        arrayBuffer: 'arrayBuffer',
        blob: 'blob',
        document: 'document',
        json: 'json',
        msStream: 'ms-stream'
    }
});

importModule();