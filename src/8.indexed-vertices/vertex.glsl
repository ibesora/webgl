attribute vec2 a_position;
attribute vec4 a_color;

uniform vec2 u_resolution;

varying vec4 color;
 
void main() {
  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;
  color = a_color;
  gl_Position = vec4(clipSpaceCoords, 0, 1);
}