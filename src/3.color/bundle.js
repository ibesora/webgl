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

/***/ "./src/common/shaders.ts":
/*!*******************************!*\
  !*** ./src/common/shaders.ts ***!
  \*******************************/
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
    const needResize = canvas.width !== displayWidth ||
        canvas.height !== displayHeight;
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
/* harmony import */ var _common_shaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shaders */ "./src/common/shaders.ts");
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
    const program = (0,_common_shaders__WEBPACK_IMPORTED_MODULE_1__.getProgram)(gl, _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"], _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
}
function setRectangleBuffer(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
render(gl, canvas);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFakQsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsRUFBeUIsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO0lBQ3hHLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDckIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN0QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxZQUFZLENBQUM7UUFDOUMsRUFBRSxFQUFFLEVBQUU7UUFDTixFQUFFLEVBQUUsRUFBRTtRQUNOLEVBQUUsRUFBRSxFQUFFO1FBQ04sRUFBRSxFQUFFLEVBQUU7UUFDTixFQUFFLEVBQUUsRUFBRTtRQUNOLEVBQUUsRUFBRSxFQUFFO0tBQ1AsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBYTtJQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9idWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjLzMuY29sb3IvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9zcmMvMy5jb2xvci92ZXJ0ZXguZ2xzbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvMy5jb2xvci9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheUJ1ZmZlcmYzMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBudW1iZXJbXSkge1xuICBjb25zdCBidWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xuICByZXR1cm4gYnVmZmVyO1xufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6XG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJWRVJURVhfU0hBREVSXCJdXG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJGUkFHTUVOVF9TSEFERVJcIl0sXG4gIHNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBDcmVhdGluZyAke3R5cGUgPT09IGdsLlZFUlRFWF9TSEFERVIgPyBcIlZlcnRleFwiIDogXCJGcmFnbWVudFwifSBzaGFkZXI6ICR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpfWApO1xuICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlciwgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH1cbiBcbiAgY29uc29sZS5lcnJvcihgQ3JlYXRpbmcgcHJvZ3JhbTogJHtnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKX1gKTtcbiAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U2hhZGVyU291cmNlOiBzdHJpbmcsIGZyYWdtZW50U2hhZGVyU291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3QgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG4gIGlmICghdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuO1xuICByZXR1cm4gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBkaXNwbGF5V2lkdGggID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiBcbiAgY29uc3QgbmVlZFJlc2l6ZSA9IGNhbnZhcy53aWR0aCAgIT09IGRpc3BsYXlXaWR0aCB8fFxuICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodDtcbiBcbiAgaWYgKG5lZWRSZXNpemUpIHtcbiAgICBjYW52YXMud2lkdGggID0gZGlzcGxheVdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICB9XG4gXG4gIHJldHVybiBuZWVkUmVzaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcikge1xuICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIGdsX0ZyYWdDb2xvciA9IHVfY29sb3I7XFxufVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuIFxcbnZvaWQgbWFpbigpIHtcXG4gIHZlYzIgY2xpcFNwYWNlQ29vcmRzID0gKGFfcG9zaXRpb24gLyB1X3Jlc29sdXRpb24pICogMi4gLSAxLjtcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChjbGlwU3BhY2VDb29yZHMsIDAsIDEpO1xcbn1cIiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY2xlYXIsIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUsIHNldEZ1bGxTY3JlZW5WaWV3cG9ydCB9IGZyb20gXCIuLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IGdldFByb2dyYW0gfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlcnNcIjtcbmltcG9ydCB2ZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSBcIi4vdmVydGV4Lmdsc2xcIjtcbmltcG9ydCBmcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tIFwiLi9mcmFnbWVudC5nbHNsXCI7XG5pbXBvcnQgeyBnZXRBbmRCaW5kQXJyYXlCdWZmZXIsIGdldEFycmF5QnVmZmVyZjMyIH0gZnJvbSBcIi4uL2NvbW1vbi9idWZmZXJcIjtcblxuXG5jb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2ViZ2wtY2FudmFzXCIpO1xuY29uc3QgZ2wgPSBjYW52YXM/LmdldENvbnRleHQoXCJ3ZWJnbFwiKTtcbmlmICghZ2wpIHtcbiAgdGhyb3cgXCJXZWJHTCBub3Qgc3VwcG9ydGVkXCI7XG59XG5pZiAoIWNhbnZhcykge1xuICB0aHJvdyBcIk5vIGNhbnZhc1wiO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBwcm9ncmFtID0gZ2V0UHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG4gIGlmICghcHJvZ3JhbSkgcmV0dXJuO1xuICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuICBjb25zdCByZXNvbHV0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidV9yZXNvbHV0aW9uXCIpO1xuICBjb25zdCBjb2xvclVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfY29sb3JcIik7XG5cbiAgY29uc3QgcG9zaXRpb25CdWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhcyk7XG4gIHNldEZ1bGxTY3JlZW5WaWV3cG9ydChnbCk7XG4gIGNsZWFyKGdsLCAwLCAwLCAwLCAwKTtcblxuICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgZ2wudW5pZm9ybTJmKHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24sIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG5cbiAgY29uc3Qgc2l6ZSA9IDI7XG4gIGNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbiAgY29uc3Qgbm9ybWFsaXplID0gZmFsc2U7XG4gIGNvbnN0IHN0cmlkZSA9IDA7XG4gIGNvbnN0IG9mZnNldCA9IDA7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCBzaXplLCB0eXBlLCBub3JtYWxpemUsIHN0cmlkZSwgb2Zmc2V0KVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTA7IGkrKykge1xuICAgIHNldFJlY3RhbmdsZUJ1ZmZlcihnbCwgcmFuZG9tSW50KDMwMCksIHJhbmRvbUludCgzMDApLCByYW5kb21JbnQoMzAwKSwgcmFuZG9tSW50KDMwMCkpO1xuICAgIGdsLnVuaWZvcm00Zihjb2xvclVuaWZvcm1Mb2NhdGlvbiwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSwgMSk7XG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpO1xuICB9XG5cbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHBvc2l0aW9uQnVmZmVyKTtcblxufVxuXG5mdW5jdGlvbiBzZXRSZWN0YW5nbGVCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gIGNvbnN0IHgxID0geDtcbiAgY29uc3QgeDIgPSB4ICsgd2lkdGg7XG4gIGNvbnN0IHkxID0geTtcbiAgY29uc3QgeTIgPSB5ICsgaGVpZ2h0O1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgeDEsIHkxLFxuICAgIHgyLCB5MSxcbiAgICB4MSwgeTIsXG4gICAgeDEsIHkyLFxuICAgIHgyLCB5MSxcbiAgICB4MiwgeTIsXG4gIF0pLCBnbC5TVEFUSUNfRFJBVyk7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbUludChyYW5nZTogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5nZSk7XG59XG5cbnJlbmRlcihnbCwgY2FudmFzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==