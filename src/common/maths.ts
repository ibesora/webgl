export function translate2dMatrix(x: number, y: number) {
  // Column-major 3d rotation matrix
  return [1, 0, 0, 0, 1, 0, x, y, 1];
}

export function rotate2dMatrix(angleInRadians: number) {
  // Column-major 3d rotation matrix on Z axis
  const cos = Math.cos(angleInRadians);
  const sin = Math.sin(angleInRadians);
  return [cos, sin, 0, -sin, cos, 0, 0, 0, 1];
}

export function scale2dMatrix(x: number, y: number) {
  // Column-major 3d scale matrix
  return [x, 0, 0, 0, y, 0, 0, 0, 1];
}
