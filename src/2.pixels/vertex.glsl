attribute vec2 a_position;
uniform vec2 u_resolution;
 
void main() {
  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;
  gl_Position = vec4(clipSpaceCoords, 0, 1);
}