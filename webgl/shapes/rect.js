import { Rect2D_frag } from "../shaders/fragment/2DRect.js";
import { Triangle2D_vert } from "../shaders/vertex/2DTriangle.js";

const prog = {
    fShader: null,
    vShader: null,
    program: null,
    v_a_positionLocation: null,
    u_resolutionLocation: null,
    f_u_resolutionLocation: null,
    f_u_f_colorLocation: null,
    f_u_b_colorLocation: null,
    f_u_b_thicknessLocation: null,
    f_u_aspectLocation: null,
    buffer: null,
    loaded: false,
    data: {
        size: 3,
        type: null,
        normalize: false,
        stride: 0,
        offset: 0,
        count: 30
    }
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number[]} fillColor 
 * @param {number[]} borderColor 
 * @param {number} borderThickness 
 */
function drawRect(gl, x, y, width, height, fillColor = [0.0,0.0,0.0,0.0], borderColor = [0.0,0.0,0.0,0.0], borderThickness = 0) {
    prog.data.type = gl.FLOAT;

    if (prog.fShader == null || prog.vShader == null) {
        prog.fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(prog.fShader, Rect2D_frag);
        gl.compileShader(prog.fShader);
        if (!gl.getShaderParameter(prog.fShader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shader: '+gl.getShaderInfoLog(prog.fShader));
            prog.fShader = null;
            return;
        }

        prog.vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(prog.vShader, Triangle2D_vert);
        gl.compileShader(prog.vShader);
        if (!gl.getShaderParameter(prog.vShader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shader: '+gl.getShaderInfoLog(prog.vShader));
            prog.fShader = prog.vShader = null;
            return;
        }
    }

    if (prog.program == null) {
        prog.program = gl.createProgram();
        gl.attachShader(prog.program, prog.vShader);
        gl.attachShader(prog.program, prog.fShader);
        gl.linkProgram(prog.program);

        if (!gl.getProgramParameter(prog.program, gl.LINK_STATUS)) {
            console.error('Unable to initialize program: '+gl.getProgramInfoLog(prog.program));
            prog.fShader = prog.vShader = prog.program = null;
            return;
        }
    }

    if (prog.v_a_positionLocation == null) {
        prog.v_a_positionLocation = gl.getAttribLocation(prog.program, "a_position");
    }

    if (prog.u_resolutionLocation == null) {
        prog.u_resolutionLocation = gl.getUniformLocation(prog.program, "u_resolution");
    }

    if (prog.f_u_f_colorLocation == null) {
        prog.f_u_f_colorLocation = gl.getUniformLocation(prog.program, "f_color");
    }

    if (prog.f_u_b_colorLocation == null) {
        prog.f_u_b_colorLocation = gl.getUniformLocation(prog.program, "b_color");
    }

    if (prog.buffer == null) {
        prog.buffer = gl.createBuffer();
    }

    if (!prog.loaded) {
        gl.useProgram(prog.program);
        prog.loaded = true;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, prog.buffer);
    gl.enableVertexAttribArray(prog.v_a_positionLocation);
    gl.vertexAttribPointer(prog.v_a_positionLocation, prog.data.size, prog.data.type, prog.data.normalize, prog.data.stride, prog.data.offset);

    gl.uniform2f(prog.u_resolutionLocation, gl.canvas.width, gl.canvas.height);

    gl.uniform4fv(prog.f_u_f_colorLocation, fillColor);
    gl.uniform4fv(prog.f_u_b_colorLocation, borderColor);

    let lx = x,
    ly = y,
    rx = x + width,
    ry = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        lx, ly, 0,
        rx, ly, 0,
        lx, ry, 0,
        lx, ry, 0,
        rx, ly, 0,
        rx, ry, 0,
        lx - borderThickness, ly, 1,
        lx - borderThickness, ry + borderThickness, 1,
        lx, ly, 1,
        lx, ry + borderThickness, 1,
        lx - borderThickness, ry + borderThickness, 1,
        lx, ly, 1,
        lx, ry + borderThickness, 1,
        lx, ry, 1,
        rx + borderThickness, ry + borderThickness, 1,
        lx, ry, 1,
        rx + borderThickness, ry, 1,
        rx + borderThickness, ry + borderThickness, 1,
        rx, ry, 1,
        rx, ly - borderThickness, 1,
        rx + borderThickness, ly - borderThickness, 1,
        rx + borderThickness, ry, 1,
        rx, ry, 1,
        rx + borderThickness, ly - borderThickness, 1,
        rx, ly, 1,
        lx - borderThickness, ly, 1,
        lx - borderThickness, ly - borderThickness, 1,
        rx, ly - borderThickness, 1,
        rx, ly, 1,
        lx - borderThickness, ly - borderThickness, 1
    ]), gl.STATIC_DRAW);

    gl.drawArrays(gl.TRIANGLES, prog.data.offset, prog.data.count);
}

export { drawRect };