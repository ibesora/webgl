import { resizeCanvasToDisplaySize } from "../common/utils";
import { createProgram, createShader } from "../common/shaders";

const canvas: HTMLCanvasElement | null =
  document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
  throw "WebGL not supported";
}

const vertexShaderSource = `
  attribute vec4 a_position;
 
  void main() {
    gl_Position = a_position;
  }
`;
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);


const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
  }
`;
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

resizeCanvasToDisplaySize(canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 
const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)

const primitiveType = gl.TRIANGLES;
const count = 3;
gl.drawArrays(primitiveType, offset, count);
