export function getAndBindArrayBuffer(gl: WebGLRenderingContext) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  return buffer;
}

export function getArrayBufferf32(gl: WebGLRenderingContext, data: number[]) {
  const buffer = getAndBindArrayBuffer(gl);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buffer;
}

export function bindAndSetArrayBufferData(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  data: ArrayBuffer,
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
}

export function getAndBindElementBuffer(gl: WebGLRenderingContext) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  return buffer;
}

export function bindAndSetElementBuffer(
  gl: WebGLRenderingContext,
  buffer: WebGLBuffer,
  data: ArrayBuffer,
) {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
}
