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

/***/ "./src/3.color/fragment.glsl":
/*!***********************************!*\
  !*** ./src/3.color/fragment.glsl ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\nuniform vec4 u_color;\n\nvoid main() {\n  gl_FragColor = u_color;\n}");

/***/ }),

/***/ "./src/3.color/vertex.glsl":
/*!*********************************!*\
  !*** ./src/3.color/vertex.glsl ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("attribute vec2 a_position;\nuniform vec2 u_resolution;\n \nvoid main() {\n  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;\n  gl_Position = vec4(clipSpaceCoords, 0, 1);\n}");

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
/*!*******************************!*\
  !*** ./src/3.color/script.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.ts");
/* harmony import */ var _common_shader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shader */ "./src/common/shader.ts");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./src/3.color/vertex.glsl");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragment.glsl */ "./src/3.color/fragment.glsl");
/* harmony import */ var _common_buffer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/buffer */ "./src/common/buffer.ts");





const canvas = document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
    throw "WebGL not supported";
}
if (!canvas) {
    throw "No canvas";
}
function render(gl, canvas) {
    const program = (0,_common_shader__WEBPACK_IMPORTED_MODULE_1__.getProgram)(gl, _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"], _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__["default"]);
    if (!program)
        return;
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const colorUniformLocation = gl.getUniformLocation(program, "u_color");
    const positionBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindArrayBuffer)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(canvas);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.setFullScreenViewport)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.clear)(gl, 0, 0, 0, 0);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    for (let i = 0; i < 50; i++) {
        setRectangleBuffer(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}
function setRectangleBuffer(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
}
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
render(gl, canvas);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDLFVBQVUsQ0FDWCxFQUFFLENBQUMsWUFBWSxFQUNmLElBQUksWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUNsRSxFQUFFLENBQUMsV0FBVyxDQUNmLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBYTtJQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9idWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvMy5jb2xvci9mcmFnbWVudC5nbHNsIiwid2VicGFjazovLy8uL3NyYy8zLmNvbG9yL3ZlcnRleC5nbHNsIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy8zLmNvbG9yL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJyYXlCdWZmZXJmMzIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgZGF0YTogbnVtYmVyW10pIHtcbiAgY29uc3QgYnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBbmRTZXRBcnJheUJ1ZmZlckRhdGEoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIGJ1ZmZlcjogV2ViR0xCdWZmZXIsXG4gIGRhdGE6IEFycmF5QnVmZmVyLFxuKSB7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZEVsZW1lbnRCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBbmRTZXRFbGVtZW50QnVmZmVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICBidWZmZXI6IFdlYkdMQnVmZmVyLFxuICBkYXRhOiBBcnJheUJ1ZmZlcixcbikge1xuICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhZGVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB0eXBlOlxuICAgIHwgV2ViR0xSZW5kZXJpbmdDb250ZXh0W1wiVkVSVEVYX1NIQURFUlwiXVxuICAgIHwgV2ViR0xSZW5kZXJpbmdDb250ZXh0W1wiRlJBR01FTlRfU0hBREVSXCJdLFxuICBzb3VyY2U6IHN0cmluZyxcbikge1xuICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcihcbiAgICBgQ3JlYXRpbmcgJHt0eXBlID09PSBnbC5WRVJURVhfU0hBREVSID8gXCJWZXJ0ZXhcIiA6IFwiRnJhZ21lbnRcIn0gc2hhZGVyOiAke2dsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKX1gLFxuICApO1xuICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHZlcnRleFNoYWRlcjogV2ViR0xTaGFkZXIsXG4gIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcixcbikge1xuICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICB2YXIgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcihgQ3JlYXRpbmcgcHJvZ3JhbTogJHtnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKX1gKTtcbiAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyYW0oXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHZlcnRleFNoYWRlclNvdXJjZTogc3RyaW5nLFxuICBmcmFnbWVudFNoYWRlclNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHZlcnRleFNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdmVydGV4U2hhZGVyU291cmNlKTtcbiAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoXG4gICAgZ2wsXG4gICAgZ2wuRlJBR01FTlRfU0hBREVSLFxuICAgIGZyYWdtZW50U2hhZGVyU291cmNlLFxuICApO1xuICBpZiAoIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHJldHVybjtcbiAgcmV0dXJuIGNyZWF0ZVByb2dyYW0oZ2wsIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBkaXNwbGF5V2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGRpc3BsYXlIZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gIGNvbnN0IG5lZWRSZXNpemUgPVxuICAgIGNhbnZhcy53aWR0aCAhPT0gZGlzcGxheVdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQ7XG5cbiAgaWYgKG5lZWRSZXNpemUpIHtcbiAgICBjYW52YXMud2lkdGggPSBkaXNwbGF5V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gbmVlZFJlc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZ1bGxTY3JlZW5WaWV3cG9ydChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgcjogbnVtYmVyLFxuICBnOiBudW1iZXIsXG4gIGI6IG51bWJlcixcbiAgYTogbnVtYmVyLFxuKSB7XG4gIGdsLmNsZWFyQ29sb3IociwgZywgYiwgYSk7XG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICBnbF9GcmFnQ29sb3IgPSB1X2NvbG9yO1xcbn1cIiIsImV4cG9ydCBkZWZhdWx0IFwiYXR0cmlidXRlIHZlYzIgYV9wb3NpdGlvbjtcXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xcbiBcXG52b2lkIG1haW4oKSB7XFxuICB2ZWMyIGNsaXBTcGFjZUNvb3JkcyA9IChhX3Bvc2l0aW9uIC8gdV9yZXNvbHV0aW9uKSAqIDIuIC0gMS47XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoY2xpcFNwYWNlQ29vcmRzLCAwLCAxKTtcXG59XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNsZWFyLFxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplLFxuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQsXG59IGZyb20gXCIuLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IGdldFByb2dyYW0gfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlclwiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNvdXJjZSBmcm9tIFwiLi92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gXCIuL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB7IGdldEFuZEJpbmRBcnJheUJ1ZmZlciB9IGZyb20gXCIuLi9jb21tb24vYnVmZmVyXCI7XG5cbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWJnbC1jYW52YXNcIik7XG5jb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuaWYgKCFnbCkge1xuICB0aHJvdyBcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIjtcbn1cbmlmICghY2FudmFzKSB7XG4gIHRocm93IFwiTm8gY2FudmFzXCI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfcmVzb2x1dGlvblwiLFxuICApO1xuICBjb25zdCBjb2xvclVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfY29sb3JcIik7XG5cbiAgY29uc3QgcG9zaXRpb25CdWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhcyk7XG4gIHNldEZ1bGxTY3JlZW5WaWV3cG9ydChnbCk7XG4gIGNsZWFyKGdsLCAwLCAwLCAwLCAwKTtcblxuICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgZ2wudW5pZm9ybTJmKHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24sIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG5cbiAgY29uc3Qgc2l6ZSA9IDI7XG4gIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbiAgY29uc3Qgbm9ybWFsaXplID0gZmFsc2U7XG4gIGNvbnN0IHN0cmlkZSA9IDA7XG4gIGNvbnN0IG9mZnNldCA9IDA7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbixcbiAgICBzaXplLFxuICAgIHR5cGUsXG4gICAgbm9ybWFsaXplLFxuICAgIHN0cmlkZSxcbiAgICBvZmZzZXQsXG4gICk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDsgaSsrKSB7XG4gICAgc2V0UmVjdGFuZ2xlQnVmZmVyKFxuICAgICAgZ2wsXG4gICAgICByYW5kb21JbnQoMzAwKSxcbiAgICAgIHJhbmRvbUludCgzMDApLFxuICAgICAgcmFuZG9tSW50KDMwMCksXG4gICAgICByYW5kb21JbnQoMzAwKSxcbiAgICApO1xuICAgIGdsLnVuaWZvcm00ZihcbiAgICAgIGNvbG9yVW5pZm9ybUxvY2F0aW9uLFxuICAgICAgTWF0aC5yYW5kb20oKSxcbiAgICAgIE1hdGgucmFuZG9tKCksXG4gICAgICBNYXRoLnJhbmRvbSgpLFxuICAgICAgMSxcbiAgICApO1xuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRSZWN0YW5nbGVCdWZmZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlcixcbikge1xuICBjb25zdCB4MSA9IHg7XG4gIGNvbnN0IHgyID0geCArIHdpZHRoO1xuICBjb25zdCB5MSA9IHk7XG4gIGNvbnN0IHkyID0geSArIGhlaWdodDtcbiAgZ2wuYnVmZmVyRGF0YShcbiAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgbmV3IEZsb2F0MzJBcnJheShbeDEsIHkxLCB4MiwgeTEsIHgxLCB5MiwgeDEsIHkyLCB4MiwgeTEsIHgyLCB5Ml0pLFxuICAgIGdsLlNUQVRJQ19EUkFXLFxuICApO1xufVxuXG5mdW5jdGlvbiByYW5kb21JbnQocmFuZ2U6IG51bWJlcikge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZ2UpO1xufVxuXG5yZW5kZXIoZ2wsIGNhbnZhcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=