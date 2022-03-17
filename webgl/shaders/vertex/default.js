const default_vert = `
#version 100

attribute vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

export { default_vert };