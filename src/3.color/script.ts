import { clear, resizeCanvasToDisplaySize, setFullScreenViewport } from "../common/utils";
import { getProgram } from "../common/shaders";
import vertexShaderSource from "./vertex.glsl";
import fragmentShaderSource from "./fragment.glsl";
import { getAndBindArrayBuffer, getArrayBufferf32 } from "../common/buffer";


const canvas: HTMLCanvasElement | null =
  document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
  throw "WebGL not supported";
}
if (!canvas) {
  throw "No canvas";
}

function render(gl: WebGLRenderingContext, canvas: HTMLCanvasElement) {
  const program = getProgram(gl, vertexShaderSource, fragmentShaderSource);
  if (!program) return;
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  const positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
  ];
  const positionBuffer = getAndBindArrayBuffer(gl);
  resizeCanvasToDisplaySize(canvas);
  setFullScreenViewport(gl);
  clear(gl, 0, 0, 0, 0);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

  for (let i = 0; i < 50; i++) {
    setRectangleBuffer(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

}

function setRectangleBuffer(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}

render(gl, canvas);
