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