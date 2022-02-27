"use strict";

import { m3 } from "./m3";
import { m4 } from "./m4";
import { v2 } from "./v2";
import { v3 } from "./v3";
import { v4 } from "./v4";

const webglTools = {
    /**
     * Creates and compiles a shader
     * @method
     * @param {WebGLRenderingContext} gl 
     * @param {number} type 
     * @param {string} shaderSource 
     * @returns {WebGLShader} shader
     */
    loadShader: function (gl, type, shaderSource) {
        var s = gl.createShader(type);

        gl.shaderSource(s, shaderSource);
        gl.compileShader(s);

        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shader: '+gl.getShaderInfoLog(s));
            return;
        }
        return s;
    },
    /**
     * Creates a program for two shaders
     * @method
     * @param {WebGLRenderingContext} gl 
     * @param {string} vertex 
     * @param {string} fragment 
     * @return {WebGLProgram} program
     */
    createProgram: function (gl, vertex, fragment) {
        var vS = webglTools.loadShader(gl, gl.VERTEX_SHADER, vertex);
        var fS = webglTools.loadShader(gl, gl.FRAGMENT_SHADER, fragment);
        var p = gl.createProgram();

        gl.attachShader(p, vS);
        gl.attachShader(p, fS);
        gl.linkProgram(p);

        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
            console.error('Unable to initialize program: '+gl.getProgramInfoLog());
            return;
        }
        return p;
    },
    mat4: m4,
    mat3: m3,
    Vec4: v4,
    Vec3: v3,
    Vec2: v2,
};

export { webglTools };