const Triangle2D_vert = `
#version 100
precision mediump float;

attribute vec4 a_position;
uniform vec2 u_resolution;
varying float pos;

void main() {
   vec2 zeroToOne = a_position.xy / u_resolution;
   vec2 zeroToTwo = zeroToOne * 2.0;
   vec2 clipSpace = zeroToTwo - 1.0;

   pos = a_position.z;
   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

export { Triangle2D_vert };