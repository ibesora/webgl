attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;
 
void main() {
  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;
  v_texCoord = a_texCoord;
  gl_Position = vec4(clipSpaceCoords, 0, 1);
}