import { clear, resizeCanvasToDisplaySize, setFullScreenViewport } from "../common/utils";
import { getProgram } from "../common/shaders";
import vertexShaderSource from "./vertex.glsl";
import fragmentShaderSource from "./fragment.glsl";
import { getArrayBufferf32 } from "../common/buffer";


const canvas: HTMLCanvasElement | null =
  document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
  throw "WebGL not supported";
}

const program = getProgram(gl, vertexShaderSource, fragmentShaderSource);
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
const positionBuffer = getArrayBufferf32(gl, positions)
resizeCanvasToDisplaySize(canvas);
setFullScreenViewport(gl);
clear(gl, 0, 0, 0, 0);

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
