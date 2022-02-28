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
    /**
     * Creates an object containing all the uniform setters
     * @method
     * @param {WebGL2RenderingContext} gl 
     * @param {WebGLProgram} program 
     * @returns {Object}
     */
    createUniformSetters: function (gl, program) {
        /**
         * 
         * @param {WebGLProgram} program 
         * @param {WebGLActiveInfo} uniformInfo 
         * @returns {Function}
         */
        function createUniformSetter(program, uniformInfo) {
            var location = gl.getUniformLocation(program, uniformInfo.name);
            var type = uniformInfo.type;
            var isArray = (uniformInfo.size > 1) && (uniformInfo.name.substring(uniformInfo.name.length - 3) === '[0]');
            var out = null;

            switch (type) {
                case gl.FLOAT:
                    out = function (val) {
                        gl.uniform1f(location, val);
                    }
                    break;
                case gl.FLOAT_VEC2:
                    out = function (val) {
                        gl.uniform2fv(location, val);
                    }
                    break;
                case gl.FLOAT_VEC3:
                    out = function (val) {
                        gl.uniform3fv(location, val);
                    }
                    break;
                case gl.FLOAT_VEC4:
                    out = function (val) {
                        gl.uniform3fv(location, val);
                    }
                    break;
                case gl.INT: case gl.BOOL:
                    if (isArray) {
                        out = function (val) {
                            gl.uniform1iv(location, val);
                        }
                    } else {
                        out = function (val) {
                            gl.uniform1i(location, val);
                        }
                    }
                    break;
                case gl.INT_VEC2: case gl.BOOL_VEC2:
                    out = function (val) {
                        gl.uniform2iv(location, val);
                    }
                    break;
                case gl.INT_VEC3: case gl.BOOL_VEC3:
                    out = function (val) {
                        gl.uniform3iv(location, val);
                    }
                    break;
                case gl.INT_VEC4: case gl.BOOL_VEC4:
                    out = function (val) {
                        gl.uniform4iv(location, val);
                    }
                    break;
                case gl.FLOAT_MAT2:
                    out = function (val) {
                        gl.uniformMatrix2fv(location, val);
                    }
                    break;
                case gl.FLOAT_MAT3:
                    out = function (val) {
                        gl.uniformMatrix3fv(location, val);
                    }
                    break;
                case gl.FLOAT_MAT4:
                    out = function (val) {
                        gl.uniformMatrix4fv(location, val);
                    }
                    break;
                case gl.SAMPLER_2D: case gl.SAMPLER_CUBE:
                    /* add code */
                    break;
                default:
                    break;
            }
            return out;
        }
        var setters = {};
        let len = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < len; i++) {
            var uniformInfo = gl.getActiveUniform(program, i);
            if (!uniformInfo) { break; }
            let name = uniformInfo.name.substring(uniformInfo.name.length - 3) === '[0]'? uniformInfo.name.substring(0, uniformInfo.name.length - 3) : uniformInfo.name;
            setters[name] = createUniformSetter(program, uniformInfo);
        }
        return setters;
    },
    /**
     * Creates an object containing all the attribute setters
     * @method
     * @param {WebGL2RenderingContext} gl 
     * @param {WebGLProgram} program 
     * @returns {object}
     */
    createAttributeSetters: function (gl, program) {
        /**
         * 
         * @param {WebGLProgram} program 
         * @param {WebGLActiveInfo} uniformInfo 
         * @returns {Function}
         */
        function createAttributeSetter(program, attrInfo) {
            var location = gl.getAttribLocation(program, attrInfo.name);
            return function(buffer, size, type = gl.FLOAT, normalize = false, stride = 0, offset = 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
            };
        }
        var attr = {};
        let len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < len; i++) {
            var attrInfo = gl.getActiveAttrib(program, i);
            if (!attrInfo) { break; }
            let name = attrInfo.name;
            attr[name] = createAttributeSetter(program, attrInfo);
        }
        return attr;
    },
    Mat4: m4,
    Mat3: m3,
    Vec4: v4,
    Vec3: v3,
    Vec2: v2,
};

export { webglTools };
