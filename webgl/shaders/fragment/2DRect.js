var Rect2D_frag = `
#version 100
precision mediump float;

uniform vec4 f_color;
uniform vec4 b_color;
varying float pos;

void main() {
    if (pos > 0.0) {
        gl_FragColor = b_color;
    } else {
        gl_FragColor = f_color;
    }
}
`;

export { Rect2D_frag };