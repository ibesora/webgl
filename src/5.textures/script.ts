import {
  clear,
  resizeCanvasToDisplaySize,
  setFullScreenViewport,
} from "../common/utils";
import { getProgram } from "../common/shader";
import vertexShaderSource from "./vertex.glsl";
import fragmentShaderSource from "./fragment.glsl";
import { getAndBindArrayBuffer } from "../common/buffer";
import { getAndBindTexture } from "../common/texture";

function render(
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
) {
  const program = getProgram(gl, vertexShaderSource, fragmentShaderSource);
  if (!program) return;
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution",
  );

  const positionBuffer = getAndBindArrayBuffer(gl);
  resizeCanvasToDisplaySize(canvas);
  setFullScreenViewport(gl);
  clear(gl, 0, 0, 0, 0);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  setRectangleBuffer(gl, 100, 100, 100, 100);

  const texCoordBuffer = getAndBindArrayBuffer(gl);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]),
    gl.STATIC_DRAW,
  );

  const texture = getAndBindTexture(gl);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function setRectangleBuffer(
  gl: WebGLRenderingContext,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW,
  );
}

function main() {
  const canvas: HTMLCanvasElement | null =
    document.querySelector("#webgl-canvas");
  const gl = canvas?.getContext("webgl");
  if (!gl) {
    throw "WebGL not supported";
  }
  if (!canvas) {
    throw "No canvas";
  }

  const image = new Image();
  image.src = "./berga.jpg";
  image.onload = function () {
    render(gl, canvas, image);
  };
}

main();
