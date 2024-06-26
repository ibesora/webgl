# webgl

This are implementations of various things in WebGL 1/2

## What's WebGL

WebGL only cares about 2 things: clip space coordinates and colors. Vertex shaders provides clip space coordinates and Fragment shaders provide the colors.

## Examaples

You'll find all these under the `src/` folder

- **1.hello-world:** A first take at rendering a triangle using clip coordinates
- **2.pixels:** Show how to render a rectangle using screen coordinates
- **3.color:** Show how to render multiple rectangles and setting a color
- **4.single-draw-call:** Render multiple rectangles with a single draw call
- **5.textures:** Use a texture to be rendered on a rectangle
- **6.image-manipulation:** Use WebGL to do image manipulation
- **7.matrices:** Pixel to clip space transform using matrices
- **8.indexed-vertices:** Render multiple rectangles using a vertex index buffer

## Glossary

### Attributes

Attributes are used to specify how to pull data out of your buffers and provide them to your vertex shader. For example you might put positions in a buffer as three 32bit floats per position. You would tell a particular attribute which buffer to pull the positions out of, what type of data it should pull out (3 component 32 bit floating point numbers), what offset in the buffer the positions start, and how many bytes to get from one position to the next.

### Buffers

Buffers are arrays of binary data you upload to the GPU. Usually buffers contain things like positions, normals, texture coordinates, vertex colors, etc although you're free to put anything you want in them.

Buffers are not random access. Instead a vertex shader is executed a specified number of times. Each time it's executed the next value from each specified buffer is pulled out and assigned to an attribute.

### Clip space

Clip space is an intermediate coordinate system used on the rendering pipeline and it's what WebGL is aware of.

Clip space XYZ coordinates are in the `[-1, 1]` range.
![Clip space](images/clip_space_graph.svg)

Clip space is the step before the perspective division that will get us Normalized Device Coordinates.

## Column-major vs Row-major matrices

Given an array of 9 values: `[a, b, c, d, e, f, g, h, i]`
Using row-major, which is what's used in mathematical notation, we get the following matrix

```
a b c
d e f
g h i
```

Using column-major, which is what WebGL and OpenGL uses, you get the following matrix

```
a d g
b e h
c f i
```

Notice that this means that translation and rotation matries are transposed vs the classical mathematics notation. Scaling matrices are symmetrical, meaning that they are the same when transposed.

```
# Translation matrix in Math
1 0 tx
0 1 ty
0 0 1
```

```Translation matrix in WebGL
const translationMatrix = [
  1  0  0
  0  1  0
  tx ty 1
]
```

### Textures

Textures are arrays of data you can randomly access in your shader program. The most common thing to put in a texture is image data but textures are just data and can just as easily contain something other than colors.

### Uniforms

Uniforms are effectively global variables you set before you execute your shader program.

### Varyings

Varyings are a way for a vertex shader to pass data to a fragment shader. Depending on what is being rendered, points, lines, or triangles, the values set on a varying by a vertex shader will be interpolated while executing the fragment shader.

## References

[MDN: WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
[WebGL fundamentals](https://webglfundamentals.org/)
