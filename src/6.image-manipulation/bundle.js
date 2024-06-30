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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsQ0FDWCxFQUFFLENBQUMsWUFBWSxFQUNmLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUNsRSxFQUFFLENBQUMsV0FBVyxDQUNmLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1gsTUFBTSxNQUFNLEdBQ1YsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxQyxNQUFNLEVBQUUsR0FBRyxNQUFNLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNSLE1BQU0scUJBQXFCLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNaLE1BQU0sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQzFCLEtBQUssQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDO0lBQzFCLEtBQUssQ0FBQyxNQUFNLEdBQUc7UUFDYixNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2J1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3NoYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3RleHR1cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvNi5pbWFnZS1tYW5pcHVsYXRpb24vZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9zcmMvNi5pbWFnZS1tYW5pcHVsYXRpb24vdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjLzYuaW1hZ2UtbWFuaXB1bGF0aW9uL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJyYXlCdWZmZXJmMzIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgZGF0YTogbnVtYmVyW10pIHtcbiAgY29uc3QgYnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6XG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJWRVJURVhfU0hBREVSXCJdXG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJGUkFHTUVOVF9TSEFERVJcIl0sXG4gIHNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKFxuICAgIGBDcmVhdGluZyAke3R5cGUgPT09IGdsLlZFUlRFWF9TSEFERVIgPyBcIlZlcnRleFwiIDogXCJGcmFnbWVudFwifSBzaGFkZXI6ICR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpfWAsXG4gICk7XG4gIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcixcbiAgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyLFxuKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBDcmVhdGluZyBwcm9ncmFtOiAke2dsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pfWApO1xuICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZ3JhbShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdmVydGV4U2hhZGVyU291cmNlOiBzdHJpbmcsXG4gIGZyYWdtZW50U2hhZGVyU291cmNlOiBzdHJpbmcsXG4pIHtcbiAgY29uc3QgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihcbiAgICBnbCxcbiAgICBnbC5GUkFHTUVOVF9TSEFERVIsXG4gICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UsXG4gICk7XG4gIGlmICghdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuO1xuICByZXR1cm4gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZFRleHR1cmUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgcmV0dXJuIHRleHR1cmU7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IGRpc3BsYXlXaWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgY29uc3QgZGlzcGxheUhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG5cbiAgY29uc3QgbmVlZFJlc2l6ZSA9XG4gICAgY2FudmFzLndpZHRoICE9PSBkaXNwbGF5V2lkdGggfHwgY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodDtcblxuICBpZiAobmVlZFJlc2l6ZSkge1xuICAgIGNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcbiAgfVxuXG4gIHJldHVybiBuZWVkUmVzaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICByOiBudW1iZXIsXG4gIGc6IG51bWJlcixcbiAgYjogbnVtYmVyLFxuICBhOiBudW1iZXIsXG4pIHtcbiAgZ2wuY2xlYXJDb2xvcihyLCBnLCBiLCBhKTtcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHVfaW1hZ2U7XFxudW5pZm9ybSB2ZWMyIHVfdGV4dHVyZVNpemU7XFxudW5pZm9ybSBmbG9hdCB1X2tlcm5lbFs5XTtcXG51bmlmb3JtIGZsb2F0IHVfa2VybmVsV2VpZ2h0O1xcblxcbnZhcnlpbmcgdmVjMiB2X3RleENvb3JkO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIHZlYzIgb25lUGl4ZWwgPSB2ZWMyKDEuMCwgMS4wKSAvIHVfdGV4dHVyZVNpemU7XFxuICB2ZWM0IGNvbG9yU3VtID1cXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoLTEsIC0xKSkgKiB1X2tlcm5lbFswXSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAwLCAtMSkpICogdV9rZXJuZWxbMV0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMiggMSwgLTEpKSAqIHVfa2VybmVsWzJdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoLTEsICAwKSkgKiB1X2tlcm5lbFszXSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAwLCAgMCkpICogdV9rZXJuZWxbNF0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMiggMSwgIDApKSAqIHVfa2VybmVsWzVdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoLTEsICAxKSkgKiB1X2tlcm5lbFs2XSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAwLCAgMSkpICogdV9rZXJuZWxbN10gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMiggMSwgIDEpKSAqIHVfa2VybmVsWzhdO1xcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgoY29sb3JTdW0gLyB1X2tlcm5lbFdlaWdodCkucmdiLCAxLjApO1xcbn1cIiIsImV4cG9ydCBkZWZhdWx0IFwiYXR0cmlidXRlIHZlYzIgYV9wb3NpdGlvbjtcXG5hdHRyaWJ1dGUgdmVjMiBhX3RleENvb3JkO1xcblxcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuXFxudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XFxuIFxcbnZvaWQgbWFpbigpIHtcXG4gIHZlYzIgY2xpcFNwYWNlQ29vcmRzID0gKGFfcG9zaXRpb24gLyB1X3Jlc29sdXRpb24pICogMi4gLSAxLjtcXG4gIHZfdGV4Q29vcmQgPSBhX3RleENvb3JkO1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGNsaXBTcGFjZUNvb3JkcywgMCwgMSk7XFxufVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBjbGVhcixcbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSxcbiAgc2V0RnVsbFNjcmVlblZpZXdwb3J0LFxufSBmcm9tIFwiLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRQcm9ncmFtIH0gZnJvbSBcIi4uL2NvbW1vbi9zaGFkZXJcIjtcbmltcG9ydCB2ZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSBcIi4vdmVydGV4Lmdsc2xcIjtcbmltcG9ydCBmcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tIFwiLi9mcmFnbWVudC5nbHNsXCI7XG5pbXBvcnQgeyBnZXRBbmRCaW5kQXJyYXlCdWZmZXIgfSBmcm9tIFwiLi4vY29tbW9uL2J1ZmZlclwiO1xuaW1wb3J0IHsgZ2V0QW5kQmluZFRleHR1cmUgfSBmcm9tIFwiLi4vY29tbW9uL3RleHR1cmVcIjtcblxuZnVuY3Rpb24gcmVuZGVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbikge1xuICBjb25zdCBwcm9ncmFtID0gZ2V0UHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG4gIGlmICghcHJvZ3JhbSkgcmV0dXJuO1xuICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuICBjb25zdCB0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX3RleENvb3JkXCIpO1xuICBjb25zdCByZXNvbHV0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKFxuICAgIHByb2dyYW0sXG4gICAgXCJ1X3Jlc29sdXRpb25cIixcbiAgKTtcbiAgY29uc3QgdGV4dHVyZVNpemVVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfdGV4dHVyZVNpemVcIixcbiAgKTtcbiAgY29uc3Qga2VybmVsTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X2tlcm5lbFswXVwiKTtcbiAgY29uc3Qga2VybmVsV2VpZ2h0TG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X2tlcm5lbFdlaWdodFwiKTtcblxuICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbCk7XG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzKTtcbiAgc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsKTtcbiAgY2xlYXIoZ2wsIDAsIDAsIDAsIDApO1xuXG4gIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgZ2wudW5pZm9ybTJmKHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24sIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG4gIGdsLnVuaWZvcm0yZih0ZXh0dXJlU2l6ZVVuaWZvcm1Mb2NhdGlvbiwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XG4gIC8vIEdhdXNzaWFuIGJsdXIga2VybmVsXG4gIC8vIGNvbnN0IGtlcm5lbCA9IFswLjA2MjUsIDAuMTI1LCAwLjA2MjUsIDAuMTI1LCAwLjI1LCAwLjEyNSwgMC4wNjI1LCAwLjEyNSwgMC4wNjI1XTtcbiAgLy8gRWRnZSBkZXRlY3Rpb24ga2VybmVsXG4gIGNvbnN0IGtlcm5lbCA9IFstMSwgLTEsIC0xLCAtMSwgOCwgLTEsIC0xLCAtMSwgLTFdO1xuICBnbC51bmlmb3JtMWZ2KGtlcm5lbExvY2F0aW9uLCBrZXJuZWwpO1xuICBnbC51bmlmb3JtMWYoXG4gICAga2VybmVsV2VpZ2h0TG9jYXRpb24sXG4gICAga2VybmVsLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYyArIHZhbCwgMCksXG4gICk7XG5cbiAgY29uc3Qgc2l6ZSA9IDI7XG4gIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbiAgY29uc3Qgbm9ybWFsaXplID0gZmFsc2U7XG4gIGNvbnN0IHN0cmlkZSA9IDA7XG4gIGNvbnN0IG9mZnNldCA9IDA7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbixcbiAgICBzaXplLFxuICAgIHR5cGUsXG4gICAgbm9ybWFsaXplLFxuICAgIHN0cmlkZSxcbiAgICBvZmZzZXQsXG4gICk7XG5cbiAgc2V0UmVjdGFuZ2xlQnVmZmVyKGdsLCAwLCAwLCAxMDAwLCAxMDAwKTtcblxuICBjb25zdCB0ZXhDb29yZEJ1ZmZlciA9IGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbCk7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgZ2wuYnVmZmVyRGF0YShcbiAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLFxuICAgIF0pLFxuICAgIGdsLlNUQVRJQ19EUkFXLFxuICApO1xuXG4gIGNvbnN0IHRleHR1cmUgPSBnZXRBbmRCaW5kVGV4dHVyZShnbCk7XG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG5cbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMSk7XG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgaW1hZ2UpO1xuXG4gIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KTtcbn1cblxuZnVuY3Rpb24gc2V0UmVjdGFuZ2xlQnVmZmVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4pIHtcbiAgY29uc3QgeDEgPSB4O1xuICBjb25zdCB4MiA9IHggKyB3aWR0aDtcbiAgY29uc3QgeTEgPSB5O1xuICBjb25zdCB5MiA9IHkgKyBoZWlnaHQ7XG4gIGdsLmJ1ZmZlckRhdGEoXG4gICAgZ2wuQVJSQVlfQlVGRkVSLFxuICAgIG5ldyBGbG9hdDMyQXJyYXkoW3gxLCB5MSwgeDIsIHkxLCB4MSwgeTIsIHgxLCB5MiwgeDIsIHkxLCB4MiwgeTJdKSxcbiAgICBnbC5TVEFUSUNfRFJBVyxcbiAgKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2ViZ2wtY2FudmFzXCIpO1xuICBjb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuICBpZiAoIWdsKSB7XG4gICAgdGhyb3cgXCJXZWJHTCBub3Qgc3VwcG9ydGVkXCI7XG4gIH1cbiAgaWYgKCFjYW52YXMpIHtcbiAgICB0aHJvdyBcIk5vIGNhbnZhc1wiO1xuICB9XG5cbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2Uuc3JjID0gXCIuL2JlcmdhLmpwZ1wiO1xuICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVuZGVyKGdsLCBjYW52YXMsIGltYWdlKTtcbiAgfTtcbn1cblxubWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9