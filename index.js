function loadFile(name, returnType) {
    var httpReq = new XMLHttpRequest();
    var out;
    var parser = new DOMParser();

    httpReq.open('GET', name, false);
    httpReq.overrideMimeType('text\/plain; charset=x-user-defined');
    httpReq.send(null);
    switch (returnType? returnType : loadFile.returnType.default) {
        case loadFile.returnType.text:
            out = httpReq.responseText;
            break;
        case loadFile.returnType.arrayBuffer:
            let buff = new ArrayBuffer(httpReq.responseText.length);
            let buffView = new Uint8Array(buff);
            for (let i = 0, strLen = httpReq.responseText.length; i < strLen; i++) {
                buffView[i] = httpReq.responseText.charCodeAt(i) & 0xff;
            }
            out = buff;
            break;
        case loadFile.returnType.blob:
            out = new Blob(
                [httpReq.response],
                {
                    type: httpReq.getResponseHeader('content-type')
                }
            );
            break;
        case loadFile.returnType.document:
            out = parser.parseFromString(httpReq.responseText, 'text\/html');
            break;
        case loadFile.returnType.json:
            out = JSON.parse(httpReq.responseText);
            break;
        case loadFile.returnType.xml:
            out = parser.parseFromString(httpReq.responseText, 'text\/xml');
            break;
        default:
            out = httpReq.response;
            break;
    }
    return out;
}

Object.defineProperty(loadFile, 'returnType', {
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

function ModuleLoader() {

}

Object.defineProperty(ModuleLoader.prototype, 'config', {
    value: loadFile('.\/config.json', loadFile.returnType.json)
});

var test = loadFile('https://grinsteaddev.github.io/html5canvas-shapes-ui/main.js');

console.log(test);