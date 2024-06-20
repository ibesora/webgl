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
  const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  const positionAndColorBuffer = getAndBindArrayBuffer(gl);
  resizeCanvasToDisplaySize(canvas);
  setFullScreenViewport(gl);
  clear(gl, 0, 0, 0, 0);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(colorAttributeLocation);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // We'll store position and color in the same buffer. Position will be encoded using floats
  // and color using unsigned bytes.
  gl.vertexAttribPointer(
    positionAttributeLocation, 2, gl.FLOAT, false, 12 /* Needs to be in bytes */, 0);
  gl.vertexAttribPointer(
    colorAttributeLocation, 4, gl.UNSIGNED_BYTE, true, 12, 8 /* Needs to be in bytes */);

  // Create array buffer
  const bytesPerVertex = 12 // 4 bytes per coordinate + 1 byte per color component
  const verticesPerRectangle = 6;
  const rectangles = 50;
  const buffer = new ArrayBuffer(bytesPerVertex * verticesPerRectangle * rectangles);

  // Fill array buffer using a data view to mix types
  const dv = new DataView(buffer);
  [...new Array(rectangles)].forEach((_, i) => {
    const color = [Math.random()*255.0, Math.random()*255.0, Math.random()*255.0, 255.0];
    const x1 = randomInt(300);
    const y1 = randomInt(300);
    const x2 = randomInt(300);
    const y2 = randomInt(300);
    const rectangleOffset = bytesPerVertex * verticesPerRectangle * i;
    addVertex(dv, rectangleOffset, x1, y1, color);
    addVertex(dv, rectangleOffset + bytesPerVertex, x2, y1, color);
    addVertex(dv, rectangleOffset + bytesPerVertex * 2, x1, y2, color);
    addVertex(dv, rectangleOffset + bytesPerVertex * 3, x1, y2, color);
    addVertex(dv, rectangleOffset + bytesPerVertex * 4, x2, y1, color);
    addVertex(dv, rectangleOffset + bytesPerVertex * 5, x2, y2, color);
  });

  gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionAndColorBuffer);
  gl.drawArrays(gl.TRIANGLES, 0, 6*50);

}

function addVertex(dv: DataView, vertexOffset: number, x: number, y: number, color: number[]) {
  dv.setFloat32(vertexOffset, x, true);
  dv.setFloat32(vertexOffset + 4, y, true);
  dv.setUint8(vertexOffset + 8, color[0]);
  dv.setUint8(vertexOffset + 9, color[1]);
  dv.setUint8(vertexOffset + 10, color[2]);
  dv.setUint8(vertexOffset + 11, color[3]);
}

function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}

render(gl, canvas);
