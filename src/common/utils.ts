export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

export function setFullScreenViewport(gl: WebGLRenderingContext) {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

export function clear(
  gl: WebGLRenderingContext,
  r: number,
  g: number,
  b: number,
  a: number,
) {
  gl.clearColor(r, g, b, a);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
