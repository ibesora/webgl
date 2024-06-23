/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/buffer.ts":
/*!******************************!*\
  !*** ./src/common/buffer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAndBindArrayBuffer: () => (/* binding */ getAndBindArrayBuffer),
/* harmony export */   getArrayBufferf32: () => (/* binding */ getArrayBufferf32)
/* harmony export */ });
function getAndBindArrayBuffer(gl) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    return buffer;
}
function getArrayBufferf32(gl, data) {
    const buffer = getAndBindArrayBuffer(gl);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}


/***/ }),

/***/ "./src/common/shader.ts":
/*!******************************!*\
  !*** ./src/common/shader.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProgram: () => (/* binding */ createProgram),
/* harmony export */   createShader: () => (/* binding */ createShader),
/* harmony export */   getProgram: () => (/* binding */ getProgram)
/* harmony export */ });
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error(`Creating ${type === gl.VERTEX_SHADER ? "Vertex" : "Fragment"} shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.error(`Creating program: ${gl.getProgramInfoLog(program)}`);
    gl.deleteProgram(program);
}
function getProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader)
        return;
    return createProgram(gl, vertexShader, fragmentShader);
}


/***/ }),

/***/ "./src/common/texture.ts":
/*!*******************************!*\
  !*** ./src/common/texture.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAndBindTexture: () => (/* binding */ getAndBindTexture)
/* harmony export */ });
function getAndBindTexture(gl) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    return texture;
}


/***/ }),

/***/ "./src/common/utils.ts":
/*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   resizeCanvasToDisplaySize: () => (/* binding */ resizeCanvasToDisplaySize),
/* harmony export */   setFullScreenViewport: () => (/* binding */ setFullScreenViewport)
/* harmony export */ });
function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    if (needResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}
function setFullScreenViewport(gl) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
function clear(gl, r, g, b, a) {
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
}


/***/ }),

/***/ "./src/6.image-manipulation/fragment.glsl":
/*!************************************************!*\
  !*** ./src/6.image-manipulation/fragment.glsl ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\nuniform sampler2D u_image;\nuniform vec2 u_textureSize;\nuniform float u_kernel[9];\nuniform float u_kernelWeight;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n  vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;\n  vec4 colorSum =\n    texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +\n    texture2D(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +\n    texture2D(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +\n    texture2D(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8];\n\n  gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1.0);\n}");

/***/ }),

/***/ "./src/6.image-manipulation/vertex.glsl":
/*!**********************************************!*\
  !*** ./src/6.image-manipulation/vertex.glsl ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("attribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_texCoord;\n \nvoid main() {\n  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;\n  v_texCoord = a_texCoord;\n  gl_Position = vec4(clipSpaceCoords, 0, 1);\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/6.image-manipulation/script.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.ts");
/* harmony import */ var _common_shader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shader */ "./src/common/shader.ts");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./src/6.image-manipulation/vertex.glsl");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragment.glsl */ "./src/6.image-manipulation/fragment.glsl");
/* harmony import */ var _common_buffer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/buffer */ "./src/common/buffer.ts");
/* harmony import */ var _common_texture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/texture */ "./src/common/texture.ts");






function render(gl, canvas, image) {
    const program = (0,_common_shader__WEBPACK_IMPORTED_MODULE_1__.getProgram)(gl, _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"], _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__["default"]);
    if (!program)
        return;
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const textureSizeUniformLocation = gl.getUniformLocation(program, "u_textureSize");
    const kernelLocation = gl.getUniformLocation(program, "u_kernel[0]");
    const kernelWeightLocation = gl.getUniformLocation(program, "u_kernelWeight");
    const positionBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindArrayBuffer)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(canvas);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.setFullScreenViewport)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.clear)(gl, 0, 0, 0, 0);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(texCoordAttributeLocation);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(textureSizeUniformLocation, image.width, image.height);
    // Gaussian blur kernel
    // const kernel = [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625];
    // Edge detection kernel
    const kernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
    gl.uniform1fv(kernelLocation, kernel);
    gl.uniform1f(kernelWeightLocation, kernel.reduce((acc, val) => acc + val, 0));
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    setRectangleBuffer(gl, 0, 0, 1000, 1000);
    const texCoordBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindArrayBuffer)(gl);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]), gl.STATIC_DRAW);
    const texture = (0,_common_texture__WEBPACK_IMPORTED_MODULE_5__.getAndBindTexture)(gl);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
function setRectangleBuffer(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}
function main() {
    const canvas = document.querySelector("#webgl-canvas");
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvNi5pbWFnZS1tYW5pcHVsYXRpb24vYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVMscUJBQXFCLENBQUMsRUFBeUI7SUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxFQUF5QixFQUFFLElBQWM7SUFDekUsTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZNLFNBQVMsWUFBWSxDQUMxQixFQUF5QixFQUN6QixJQUU0QyxFQUM1QyxNQUFjO0lBRWQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLElBQUksT0FBTyxFQUFFLENBQUM7UUFDWixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssQ0FDWCxZQUFZLElBQUksS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDdkcsQ0FBQztJQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVNLFNBQVMsYUFBYSxDQUMzQixFQUF5QixFQUN6QixZQUF5QixFQUN6QixjQUEyQjtJQUUzQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDakMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdkMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ1osT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRU0sU0FBUyxVQUFVLENBQ3hCLEVBQXlCLEVBQ3pCLGtCQUEwQixFQUMxQixvQkFBNEI7SUFFNUIsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDNUUsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUNqQyxFQUFFLEVBQ0YsRUFBRSxDQUFDLGVBQWUsRUFDbEIsb0JBQW9CLENBQ3JCLENBQUM7SUFDRixJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsY0FBYztRQUFFLE9BQU87SUFDN0MsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN6RCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNwRE0sU0FBUyxpQkFBaUIsQ0FBQyxFQUF5QjtJQUN6RCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSk0sU0FBUyx5QkFBeUIsQ0FBQyxNQUF5QjtJQUNqRSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3hDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFFMUMsTUFBTSxVQUFVLEdBQ2QsTUFBTSxDQUFDLEtBQUssS0FBSyxZQUFZLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUM7SUFFbkUsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxFQUF5QjtJQUM3RCxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRU0sU0FBUyxLQUFLLENBQ25CLEVBQXlCLEVBQ3pCLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7SUFFVCxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJELGlFQUFlLHlCQUF5Qiw4QkFBOEIsNkJBQTZCLDRCQUE0QiwrQkFBK0IsNEJBQTRCLGlCQUFpQixtREFBbUQsZ3RCQUFndEIsZ0VBQWdFLEdBQUc7Ozs7Ozs7Ozs7Ozs7O0FDQWpoQyxpRUFBZSwyQkFBMkIsNEJBQTRCLDhCQUE4Qiw0QkFBNEIsa0JBQWtCLGlFQUFpRSw0QkFBNEIsOENBQThDLEdBQUc7Ozs7OztVQ0FoUztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDRnlCO0FBQ3FCO0FBQ0M7QUFDSTtBQUNNO0FBQ0g7QUFFdEQsU0FBUyxNQUFNLENBQ2IsRUFBeUIsRUFDekIsTUFBeUIsRUFDekIsS0FBdUI7SUFFdkIsTUFBTSxPQUFPLEdBQUcsMERBQVUsQ0FBQyxFQUFFLEVBQUUsb0RBQWtCLEVBQUUsc0RBQW9CLENBQUMsQ0FBQztJQUN6RSxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU87SUFDckIsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzlFLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM5RSxNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDckQsT0FBTyxFQUNQLGNBQWMsQ0FDZixDQUFDO0lBQ0YsTUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQ3RELE9BQU8sRUFDUCxlQUFlLENBQ2hCLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTlFLE1BQU0sY0FBYyxHQUFHLHFFQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELHdFQUF5QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLG9FQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLG9EQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRCLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsRUFBRSxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdEQsRUFBRSxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEUsdUJBQXVCO0lBQ3ZCLHFGQUFxRjtJQUNyRix3QkFBd0I7SUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHOUUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUN0QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQixFQUFFLENBQUMsbUJBQW1CLENBQ3BCLHlCQUF5QixFQUN6QixJQUFJLEVBQ0osSUFBSSxFQUNKLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxDQUNQLENBQUM7SUFFRixrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFekMsTUFBTSxjQUFjLEdBQUcscUVBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsRUFBRSxDQUFDLFVBQVUsQ0FDWCxFQUFFLENBQUMsWUFBWSxFQUNmLElBQUksWUFBWSxDQUFDO1FBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0tBQzNELENBQUMsRUFDRixFQUFFLENBQUMsV0FBVyxDQUNmLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxrRUFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5FLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFM0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FDekIsRUFBeUIsRUFDekIsQ0FBUyxFQUNULENBQVMsRUFDVCxLQUFhLEVBQ2IsTUFBYztJQUVkLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN0QixFQUFFLENBQUMsVUFBVSxDQUNYLEVBQUUsQ0FBQyxZQUFZLEVBQ2YsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ2xFLEVBQUUsQ0FBQyxXQUFXLENBQ2YsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDWCxNQUFNLE1BQU0sR0FDVixRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1IsTUFBTSxxQkFBcUIsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDMUIsS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUM7SUFDMUIsS0FBSyxDQUFDLE1BQU0sR0FBRztRQUNiLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21tb24vYnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vc2hhZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdGV4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy82LmltYWdlLW1hbmlwdWxhdGlvbi9mcmFnbWVudC5nbHNsIiwid2VicGFjazovLy8uL3NyYy82LmltYWdlLW1hbmlwdWxhdGlvbi92ZXJ0ZXguZ2xzbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvNi5pbWFnZS1tYW5pcHVsYXRpb24vc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheUJ1ZmZlcmYzMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBudW1iZXJbXSkge1xuICBjb25zdCBidWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdHlwZTpcbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIlZFUlRFWF9TSEFERVJcIl1cbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIkZSQUdNRU5UX1NIQURFUlwiXSxcbiAgc291cmNlOiBzdHJpbmcsXG4pIHtcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgYENyZWF0aW5nICR7dHlwZSA9PT0gZ2wuVkVSVEVYX1NIQURFUiA/IFwiVmVydGV4XCIgOiBcIkZyYWdtZW50XCJ9IHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCxcbiAgKTtcbiAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyLFxuICBmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXIsXG4pIHtcbiAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYENyZWF0aW5nIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSl9YCk7XG4gIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHN0cmluZyxcbiAgZnJhZ21lbnRTaGFkZXJTb3VyY2U6IHN0cmluZyxcbikge1xuICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNvdXJjZSk7XG4gIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKFxuICAgIGdsLFxuICAgIGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICBmcmFnbWVudFNoYWRlclNvdXJjZSxcbiAgKTtcbiAgaWYgKCF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSByZXR1cm47XG4gIHJldHVybiBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kVGV4dHVyZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICByZXR1cm4gdGV4dHVyZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY29uc3QgZGlzcGxheVdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcblxuICBjb25zdCBuZWVkUmVzaXplID1cbiAgICBjYW52YXMud2lkdGggIT09IGRpc3BsYXlXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0O1xuXG4gIGlmIChuZWVkUmVzaXplKSB7XG4gICAgY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIG5lZWRSZXNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBnbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHI6IG51bWJlcixcbiAgZzogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGE6IG51bWJlcixcbikge1xuICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgdV9pbWFnZTtcXG51bmlmb3JtIHZlYzIgdV90ZXh0dXJlU2l6ZTtcXG51bmlmb3JtIGZsb2F0IHVfa2VybmVsWzldO1xcbnVuaWZvcm0gZmxvYXQgdV9rZXJuZWxXZWlnaHQ7XFxuXFxudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBvbmVQaXhlbCA9IHZlYzIoMS4wLCAxLjApIC8gdV90ZXh0dXJlU2l6ZTtcXG4gIHZlYzQgY29sb3JTdW0gPVxcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgLTEpKSAqIHVfa2VybmVsWzBdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsIC0xKSkgKiB1X2tlcm5lbFsxXSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAtMSkpICogdV9rZXJuZWxbMl0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgIDApKSAqIHVfa2VybmVsWzNdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsICAwKSkgKiB1X2tlcm5lbFs0XSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAgMCkpICogdV9rZXJuZWxbNV0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgIDEpKSAqIHVfa2VybmVsWzZdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsICAxKSkgKiB1X2tlcm5lbFs3XSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAgMSkpICogdV9rZXJuZWxbOF07XFxuXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KChjb2xvclN1bSAvIHVfa2VybmVsV2VpZ2h0KS5yZ2IsIDEuMCk7XFxufVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XFxuXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXG52YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcXG4gXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBjbGlwU3BhY2VDb29yZHMgPSAoYV9wb3NpdGlvbiAvIHVfcmVzb2x1dGlvbikgKiAyLiAtIDEuO1xcbiAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoY2xpcFNwYWNlQ29vcmRzLCAwLCAxKTtcXG59XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNsZWFyLFxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplLFxuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQsXG59IGZyb20gXCIuLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IGdldFByb2dyYW0gfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlclwiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNvdXJjZSBmcm9tIFwiLi92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gXCIuL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB7IGdldEFuZEJpbmRBcnJheUJ1ZmZlciB9IGZyb20gXCIuLi9jb21tb24vYnVmZmVyXCI7XG5pbXBvcnQgeyBnZXRBbmRCaW5kVGV4dHVyZSB9IGZyb20gXCIuLi9jb21tb24vdGV4dHVyZVwiO1xuXG5mdW5jdGlvbiByZW5kZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuKSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfdGV4Q29vcmRcIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfcmVzb2x1dGlvblwiLFxuICApO1xuICBjb25zdCB0ZXh0dXJlU2l6ZVVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihcbiAgICBwcm9ncmFtLFxuICAgIFwidV90ZXh0dXJlU2l6ZVwiLFxuICApO1xuICBjb25zdCBrZXJuZWxMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfa2VybmVsWzBdXCIpO1xuICBjb25zdCBrZXJuZWxXZWlnaHRMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfa2VybmVsV2VpZ2h0XCIpO1xuXG4gIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXMpO1xuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2wpO1xuICBjbGVhcihnbCwgMCwgMCwgMCwgMCk7XG5cbiAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC51bmlmb3JtMmYocmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbiAgZ2wudW5pZm9ybTJmKHRleHR1cmVTaXplVW5pZm9ybUxvY2F0aW9uLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgLy8gR2F1c3NpYW4gYmx1ciBrZXJuZWxcbiAgLy8gY29uc3Qga2VybmVsID0gWzAuMDYyNSwgMC4xMjUsIDAuMDYyNSwgMC4xMjUsIDAuMjUsIDAuMTI1LCAwLjA2MjUsIDAuMTI1LCAwLjA2MjVdO1xuICAvLyBFZGdlIGRldGVjdGlvbiBrZXJuZWxcbiAgY29uc3Qga2VybmVsID0gWy0xLCAtMSwgLTEsIC0xLCAgOCwgLTEsIC0xLCAtMSwgLTFdO1xuICBnbC51bmlmb3JtMWZ2KGtlcm5lbExvY2F0aW9uLCBrZXJuZWwpO1xuICBnbC51bmlmb3JtMWYoa2VybmVsV2VpZ2h0TG9jYXRpb24sIGtlcm5lbC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MgKyB2YWwsIDApKTtcbiAgXG5cbiAgY29uc3Qgc2l6ZSA9IDI7XG4gIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbiAgY29uc3Qgbm9ybWFsaXplID0gZmFsc2U7XG4gIGNvbnN0IHN0cmlkZSA9IDA7XG4gIGNvbnN0IG9mZnNldCA9IDA7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbixcbiAgICBzaXplLFxuICAgIHR5cGUsXG4gICAgbm9ybWFsaXplLFxuICAgIHN0cmlkZSxcbiAgICBvZmZzZXQsXG4gICk7XG5cbiAgc2V0UmVjdGFuZ2xlQnVmZmVyKGdsLCAwLCAwLCAxMDAwLCAxMDAwKTtcblxuICBjb25zdCB0ZXhDb29yZEJ1ZmZlciA9IGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbCk7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgZ2wuYnVmZmVyRGF0YShcbiAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLFxuICAgIF0pLFxuICAgIGdsLlNUQVRJQ19EUkFXLFxuICApO1xuXG4gIGNvbnN0IHRleHR1cmUgPSBnZXRBbmRCaW5kVGV4dHVyZShnbCk7XG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG5cbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMSk7XG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgaW1hZ2UpO1xuXG4gIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KTtcbn1cblxuZnVuY3Rpb24gc2V0UmVjdGFuZ2xlQnVmZmVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4pIHtcbiAgY29uc3QgeDEgPSB4O1xuICBjb25zdCB4MiA9IHggKyB3aWR0aDtcbiAgY29uc3QgeTEgPSB5O1xuICBjb25zdCB5MiA9IHkgKyBoZWlnaHQ7XG4gIGdsLmJ1ZmZlckRhdGEoXG4gICAgZ2wuQVJSQVlfQlVGRkVSLFxuICAgIG5ldyBGbG9hdDMyQXJyYXkoW3gxLCB5MSwgeDIsIHkxLCB4MSwgeTIsIHgxLCB5MiwgeDIsIHkxLCB4MiwgeTJdKSxcbiAgICBnbC5TVEFUSUNfRFJBVyxcbiAgKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2ViZ2wtY2FudmFzXCIpO1xuICBjb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuICBpZiAoIWdsKSB7XG4gICAgdGhyb3cgXCJXZWJHTCBub3Qgc3VwcG9ydGVkXCI7XG4gIH1cbiAgaWYgKCFjYW52YXMpIHtcbiAgICB0aHJvdyBcIk5vIGNhbnZhc1wiO1xuICB9XG5cbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2Uuc3JjID0gXCIuL2JlcmdhLmpwZ1wiO1xuICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVuZGVyKGdsLCBjYW52YXMsIGltYWdlKTtcbiAgfTtcbn1cblxubWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9