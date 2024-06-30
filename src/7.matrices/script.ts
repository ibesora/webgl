import {
  clear,
  resizeCanvasToDisplaySize,
  setFullScreenViewport,
} from "../common/utils";
import { getProgram } from "../common/shader";
import vertexShaderSource from "./vertex.glsl";
import fragmentShaderSource from "./fragment.glsl";
import { getArrayBufferf32 } from "../common/buffer";
import { scale2dMatrix, translate2dMatrix } from "../common/maths";
import { mat3 } from "gl-matrix";

const canvas: HTMLCanvasElement | null =
  document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
  throw "WebGL not supported";
}

function render(gl: WebGLRenderingContext, canvas: HTMLCanvasElement) {
  const program = getProgram(gl, vertexShaderSource, fragmentShaderSource);
  if (!program) return;
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

  const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];
  const positionBuffer = getArrayBufferf32(gl, positions);
  resizeCanvasToDisplaySize(canvas);
  setFullScreenViewport(gl);
  clear(gl, 0, 0, 0, 0);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Project from screen space to clip space by doing coords / resolution * 2 - 1 in
  // a single matrix.
  const projectionMatrix = mat3.identity(mat3.create());
  const divByResolutionMatrix = scale2dMatrix(1.0 / gl.canvas.width, 1.0 / gl.canvas.height) as mat3;
  const scaleByTwoMatrix = scale2dMatrix(2, 2) as mat3;
  const translateByMinusOneMatrix = translate2dMatrix(-1, -1) as mat3;
  mat3.multiply(
    projectionMatrix,
    translateByMinusOneMatrix,
    scaleByTwoMatrix
  );
  mat3.multiply(
    projectionMatrix,
    projectionMatrix,
    divByResolutionMatrix
  );
  gl.uniformMatrix3fv(matrixUniformLocation, false, projectionMatrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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

  const primitiveType = gl.TRIANGLES;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

render(gl, canvas);
