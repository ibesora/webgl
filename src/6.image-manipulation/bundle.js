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
/* harmony export */   bindAndSetArrayBufferData: () => (/* binding */ bindAndSetArrayBufferData),
/* harmony export */   bindAndSetElementBuffer: () => (/* binding */ bindAndSetElementBuffer),
/* harmony export */   getAndBindArrayBuffer: () => (/* binding */ getAndBindArrayBuffer),
/* harmony export */   getAndBindElementBuffer: () => (/* binding */ getAndBindElementBuffer),
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
function bindAndSetArrayBufferData(gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
}
function getAndBindElementBuffer(gl) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    return buffer;
}
function bindAndSetElementBuffer(gl, buffer, data) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDUixNQUFNLHFCQUFxQixDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDWixNQUFNLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUMxQixLQUFLLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQztJQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHO1FBQ2IsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9idWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi90ZXh0dXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjLzYuaW1hZ2UtbWFuaXB1bGF0aW9uL2ZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vc3JjLzYuaW1hZ2UtbWFuaXB1bGF0aW9uL3ZlcnRleC5nbHNsIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy82LmltYWdlLW1hbmlwdWxhdGlvbi9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFycmF5QnVmZmVyZjMyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGRhdGE6IG51bWJlcltdKSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbCk7XG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGRhdGEpLCBnbC5TVEFUSUNfRFJBVyk7XG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQW5kU2V0QXJyYXlCdWZmZXJEYXRhKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICBidWZmZXI6IFdlYkdMQnVmZmVyLFxuICBkYXRhOiBBcnJheUJ1ZmZlcixcbikge1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGRhdGEsIGdsLlNUQVRJQ19EUkFXKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZEJpbmRFbGVtZW50QnVmZmVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQW5kU2V0RWxlbWVudEJ1ZmZlcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgYnVmZmVyOiBXZWJHTEJ1ZmZlcixcbiAgZGF0YTogQXJyYXlCdWZmZXIsXG4pIHtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdHlwZTpcbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIlZFUlRFWF9TSEFERVJcIl1cbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIkZSQUdNRU5UX1NIQURFUlwiXSxcbiAgc291cmNlOiBzdHJpbmcsXG4pIHtcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgYENyZWF0aW5nICR7dHlwZSA9PT0gZ2wuVkVSVEVYX1NIQURFUiA/IFwiVmVydGV4XCIgOiBcIkZyYWdtZW50XCJ9IHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCxcbiAgKTtcbiAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyLFxuICBmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXIsXG4pIHtcbiAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYENyZWF0aW5nIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSl9YCk7XG4gIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHN0cmluZyxcbiAgZnJhZ21lbnRTaGFkZXJTb3VyY2U6IHN0cmluZyxcbikge1xuICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNvdXJjZSk7XG4gIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKFxuICAgIGdsLFxuICAgIGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICBmcmFnbWVudFNoYWRlclNvdXJjZSxcbiAgKTtcbiAgaWYgKCF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSByZXR1cm47XG4gIHJldHVybiBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kVGV4dHVyZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICByZXR1cm4gdGV4dHVyZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY29uc3QgZGlzcGxheVdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcblxuICBjb25zdCBuZWVkUmVzaXplID1cbiAgICBjYW52YXMud2lkdGggIT09IGRpc3BsYXlXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0O1xuXG4gIGlmIChuZWVkUmVzaXplKSB7XG4gICAgY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIG5lZWRSZXNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBnbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHI6IG51bWJlcixcbiAgZzogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGE6IG51bWJlcixcbikge1xuICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgdV9pbWFnZTtcXG51bmlmb3JtIHZlYzIgdV90ZXh0dXJlU2l6ZTtcXG51bmlmb3JtIGZsb2F0IHVfa2VybmVsWzldO1xcbnVuaWZvcm0gZmxvYXQgdV9rZXJuZWxXZWlnaHQ7XFxuXFxudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBvbmVQaXhlbCA9IHZlYzIoMS4wLCAxLjApIC8gdV90ZXh0dXJlU2l6ZTtcXG4gIHZlYzQgY29sb3JTdW0gPVxcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgLTEpKSAqIHVfa2VybmVsWzBdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsIC0xKSkgKiB1X2tlcm5lbFsxXSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAtMSkpICogdV9rZXJuZWxbMl0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgIDApKSAqIHVfa2VybmVsWzNdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsICAwKSkgKiB1X2tlcm5lbFs0XSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAgMCkpICogdV9rZXJuZWxbNV0gK1xcbiAgICB0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCArIG9uZVBpeGVsICogdmVjMigtMSwgIDEpKSAqIHVfa2VybmVsWzZdICtcXG4gICAgdGV4dHVyZTJEKHVfaW1hZ2UsIHZfdGV4Q29vcmQgKyBvbmVQaXhlbCAqIHZlYzIoIDAsICAxKSkgKiB1X2tlcm5lbFs3XSArXFxuICAgIHRleHR1cmUyRCh1X2ltYWdlLCB2X3RleENvb3JkICsgb25lUGl4ZWwgKiB2ZWMyKCAxLCAgMSkpICogdV9rZXJuZWxbOF07XFxuXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KChjb2xvclN1bSAvIHVfa2VybmVsV2VpZ2h0KS5yZ2IsIDEuMCk7XFxufVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XFxuXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXG52YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcXG4gXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBjbGlwU3BhY2VDb29yZHMgPSAoYV9wb3NpdGlvbiAvIHVfcmVzb2x1dGlvbikgKiAyLiAtIDEuO1xcbiAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoY2xpcFNwYWNlQ29vcmRzLCAwLCAxKTtcXG59XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNsZWFyLFxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplLFxuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQsXG59IGZyb20gXCIuLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IGdldFByb2dyYW0gfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlclwiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNvdXJjZSBmcm9tIFwiLi92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gXCIuL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB7IGdldEFuZEJpbmRBcnJheUJ1ZmZlciB9IGZyb20gXCIuLi9jb21tb24vYnVmZmVyXCI7XG5pbXBvcnQgeyBnZXRBbmRCaW5kVGV4dHVyZSB9IGZyb20gXCIuLi9jb21tb24vdGV4dHVyZVwiO1xuXG5mdW5jdGlvbiByZW5kZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuKSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfdGV4Q29vcmRcIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfcmVzb2x1dGlvblwiLFxuICApO1xuICBjb25zdCB0ZXh0dXJlU2l6ZVVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihcbiAgICBwcm9ncmFtLFxuICAgIFwidV90ZXh0dXJlU2l6ZVwiLFxuICApO1xuICBjb25zdCBrZXJuZWxMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfa2VybmVsWzBdXCIpO1xuICBjb25zdCBrZXJuZWxXZWlnaHRMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfa2VybmVsV2VpZ2h0XCIpO1xuXG4gIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXMpO1xuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2wpO1xuICBjbGVhcihnbCwgMCwgMCwgMCwgMCk7XG5cbiAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC51bmlmb3JtMmYocmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbiAgZ2wudW5pZm9ybTJmKHRleHR1cmVTaXplVW5pZm9ybUxvY2F0aW9uLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgLy8gR2F1c3NpYW4gYmx1ciBrZXJuZWxcbiAgLy8gY29uc3Qga2VybmVsID0gWzAuMDYyNSwgMC4xMjUsIDAuMDYyNSwgMC4xMjUsIDAuMjUsIDAuMTI1LCAwLjA2MjUsIDAuMTI1LCAwLjA2MjVdO1xuICAvLyBFZGdlIGRldGVjdGlvbiBrZXJuZWxcbiAgY29uc3Qga2VybmVsID0gWy0xLCAtMSwgLTEsIC0xLCA4LCAtMSwgLTEsIC0xLCAtMV07XG4gIGdsLnVuaWZvcm0xZnYoa2VybmVsTG9jYXRpb24sIGtlcm5lbCk7XG4gIGdsLnVuaWZvcm0xZihcbiAgICBrZXJuZWxXZWlnaHRMb2NhdGlvbixcbiAgICBrZXJuZWwucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKSxcbiAgKTtcblxuICBjb25zdCBzaXplID0gMjtcbiAgY29uc3QgdHlwZSA9IGdsLkZMT0FUO1xuICBjb25zdCBub3JtYWxpemUgPSBmYWxzZTtcbiAgY29uc3Qgc3RyaWRlID0gMDtcbiAgY29uc3Qgb2Zmc2V0ID0gMDtcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLFxuICAgIHNpemUsXG4gICAgdHlwZSxcbiAgICBub3JtYWxpemUsXG4gICAgc3RyaWRlLFxuICAgIG9mZnNldCxcbiAgKTtcblxuICBzZXRSZWN0YW5nbGVCdWZmZXIoZ2wsIDAsIDAsIDEwMDAsIDEwMDApO1xuXG4gIGNvbnN0IHRleENvb3JkQnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICBnbC5idWZmZXJEYXRhKFxuICAgIGdsLkFSUkFZX0JVRkZFUixcbiAgICBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsXG4gICAgXSksXG4gICAgZ2wuU1RBVElDX0RSQVcsXG4gICk7XG5cbiAgY29uc3QgdGV4dHVyZSA9IGdldEFuZEJpbmRUZXh0dXJlKGdsKTtcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcblxuICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAxKTtcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWFnZSk7XG5cbiAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpO1xufVxuXG5mdW5jdGlvbiBzZXRSZWN0YW5nbGVCdWZmZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlcixcbikge1xuICBjb25zdCB4MSA9IHg7XG4gIGNvbnN0IHgyID0geCArIHdpZHRoO1xuICBjb25zdCB5MSA9IHk7XG4gIGNvbnN0IHkyID0geSArIGhlaWdodDtcbiAgZ2wuYnVmZmVyRGF0YShcbiAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgbmV3IEZsb2F0MzJBcnJheShbeDEsIHkxLCB4MiwgeTEsIHgxLCB5MiwgeDEsIHkyLCB4MiwgeTEsIHgyLCB5Ml0pLFxuICAgIGdsLlNUQVRJQ19EUkFXLFxuICApO1xufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWJnbC1jYW52YXNcIik7XG4gIGNvbnN0IGdsID0gY2FudmFzPy5nZXRDb250ZXh0KFwid2ViZ2xcIik7XG4gIGlmICghZ2wpIHtcbiAgICB0aHJvdyBcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIjtcbiAgfVxuICBpZiAoIWNhbnZhcykge1xuICAgIHRocm93IFwiTm8gY2FudmFzXCI7XG4gIH1cblxuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5zcmMgPSBcIi4vYmVyZ2EuanBnXCI7XG4gIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW5kZXIoZ2wsIGNhbnZhcywgaW1hZ2UpO1xuICB9O1xufVxuXG5tYWluKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=