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

/***/ "./src/4.single-draw-call/fragment.glsl":
/*!**********************************************!*\
  !*** ./src/4.single-draw-call/fragment.glsl ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\nvarying vec4 color;\n\nvoid main() {\n  gl_FragColor = color;\n}");

/***/ }),

/***/ "./src/4.single-draw-call/vertex.glsl":
/*!********************************************!*\
  !*** ./src/4.single-draw-call/vertex.glsl ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("attribute vec2 a_position;\nattribute vec4 a_color;\n\nuniform vec2 u_resolution;\n\nvarying vec4 color;\n \nvoid main() {\n  vec2 clipSpaceCoords = (a_position / u_resolution) * 2. - 1.;\n  color = a_color;\n  gl_Position = vec4(clipSpaceCoords, 0, 1);\n}");

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
/*!******************************************!*\
  !*** ./src/4.single-draw-call/script.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.ts");
/* harmony import */ var _common_shaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shaders */ "./src/common/shaders.ts");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./src/4.single-draw-call/vertex.glsl");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragment.glsl */ "./src/4.single-draw-call/fragment.glsl");
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
    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const positionAndColorBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindArrayBuffer)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(canvas);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.setFullScreenViewport)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.clear)(gl, 0, 0, 0, 0);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    // We'll store position and color in the same buffer. Position will be encoded using floats
    // and color using unsigned bytes.
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 12 /* Needs to be in bytes */, 0);
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.UNSIGNED_BYTE, true, 12, 8 /* Needs to be in bytes */);
    // Create array buffer
    const bytesPerVertex = 12; // 4 bytes per coordinate + 1 byte per color component
    const verticesPerRectangle = 6;
    const rectangles = 50;
    const buffer = new ArrayBuffer(bytesPerVertex * verticesPerRectangle * rectangles);
    // Fill array buffer using a data view to mix types
    const dv = new DataView(buffer);
    [...new Array(rectangles)].forEach((_, i) => {
        const color = [Math.random() * 255.0, Math.random() * 255.0, Math.random() * 255.0, 255.0];
        const x1 = randomInt(300);
        const y1 = randomInt(300);
        const x2 = randomInt(300);
        const y2 = randomInt(300);
        const rectangleOffset = bytesPerVertex * verticesPerRectangle * i;
        addVertex(dv, rectangleOffset, x1, y1, color);
        addVertex(dv, rectangleOffset + bytesPerVertex, x2, y1, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 2, x1, y2, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 3, x1, y2, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 4, x2, y1, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 5, x2, y2, color);
    });
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionAndColorBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 50);
}
function addVertex(dv, vertexOffset, x, y, color) {
    dv.setFloat32(vertexOffset, x, true);
    dv.setFloat32(vertexOffset + 4, y, true);
    dv.setUint8(vertexOffset + 8, color[0]);
    dv.setUint8(vertexOffset + 9, color[1]);
    dv.setUint8(vertexOffset + 10, color[2]);
    dv.setUint8(vertexOffset + 11, color[3]);
}
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
render(gl, canvas);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9idWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjLzQuc2luZ2xlLWRyYXctY2FsbC9mcmFnbWVudC5nbHNsIiwid2VicGFjazovLy8uL3NyYy80LnNpbmdsZS1kcmF3LWNhbGwvdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjLzQuc2luZ2xlLWRyYXctY2FsbC9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheUJ1ZmZlcmYzMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBudW1iZXJbXSkge1xuICBjb25zdCBidWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xuICByZXR1cm4gYnVmZmVyO1xufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6XG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJWRVJURVhfU0hBREVSXCJdXG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJGUkFHTUVOVF9TSEFERVJcIl0sXG4gIHNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBDcmVhdGluZyAke3R5cGUgPT09IGdsLlZFUlRFWF9TSEFERVIgPyBcIlZlcnRleFwiIDogXCJGcmFnbWVudFwifSBzaGFkZXI6ICR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpfWApO1xuICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlciwgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH1cbiBcbiAgY29uc29sZS5lcnJvcihgQ3JlYXRpbmcgcHJvZ3JhbTogJHtnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKX1gKTtcbiAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U2hhZGVyU291cmNlOiBzdHJpbmcsIGZyYWdtZW50U2hhZGVyU291cmNlOiBzdHJpbmcpIHtcbiAgY29uc3QgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG4gIGlmICghdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuO1xuICByZXR1cm4gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBkaXNwbGF5V2lkdGggID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiBcbiAgY29uc3QgbmVlZFJlc2l6ZSA9IGNhbnZhcy53aWR0aCAgIT09IGRpc3BsYXlXaWR0aCB8fFxuICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodDtcbiBcbiAgaWYgKG5lZWRSZXNpemUpIHtcbiAgICBjYW52YXMud2lkdGggID0gZGlzcGxheVdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICB9XG4gXG4gIHJldHVybiBuZWVkUmVzaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlcikge1xuICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnZhcnlpbmcgdmVjNCBjb2xvcjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXG59XCIiLCJleHBvcnQgZGVmYXVsdCBcImF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XFxuYXR0cmlidXRlIHZlYzQgYV9jb2xvcjtcXG5cXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xcblxcbnZhcnlpbmcgdmVjNCBjb2xvcjtcXG4gXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBjbGlwU3BhY2VDb29yZHMgPSAoYV9wb3NpdGlvbiAvIHVfcmVzb2x1dGlvbikgKiAyLiAtIDEuO1xcbiAgY29sb3IgPSBhX2NvbG9yO1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGNsaXBTcGFjZUNvb3JkcywgMCwgMSk7XFxufVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjbGVhciwgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSwgc2V0RnVsbFNjcmVlblZpZXdwb3J0IH0gZnJvbSBcIi4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0UHJvZ3JhbSB9IGZyb20gXCIuLi9jb21tb24vc2hhZGVyc1wiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNvdXJjZSBmcm9tIFwiLi92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gXCIuL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB7IGdldEFuZEJpbmRBcnJheUJ1ZmZlciwgZ2V0QXJyYXlCdWZmZXJmMzIgfSBmcm9tIFwiLi4vY29tbW9uL2J1ZmZlclwiO1xuXG5cbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWJnbC1jYW52YXNcIik7XG5jb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuaWYgKCFnbCkge1xuICB0aHJvdyBcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIjtcbn1cbmlmICghY2FudmFzKSB7XG4gIHRocm93IFwiTm8gY2FudmFzXCI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IGNvbG9yQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfY29sb3JcIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X3Jlc29sdXRpb25cIik7XG5cbiAgY29uc3QgcG9zaXRpb25BbmRDb2xvckJ1ZmZlciA9IGdldEFuZEJpbmRBcnJheUJ1ZmZlcihnbCk7XG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzKTtcbiAgc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsKTtcbiAgY2xlYXIoZ2wsIDAsIDAsIDAsIDApO1xuXG4gIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb2xvckF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgZ2wudW5pZm9ybTJmKHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24sIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG5cbiAgLy8gV2UnbGwgc3RvcmUgcG9zaXRpb24gYW5kIGNvbG9yIGluIHRoZSBzYW1lIGJ1ZmZlci4gUG9zaXRpb24gd2lsbCBiZSBlbmNvZGVkIHVzaW5nIGZsb2F0c1xuICAvLyBhbmQgY29sb3IgdXNpbmcgdW5zaWduZWQgYnl0ZXMuXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAxMiAvKiBOZWVkcyB0byBiZSBpbiBieXRlcyAqLywgMCk7XG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgY29sb3JBdHRyaWJ1dGVMb2NhdGlvbiwgNCwgZ2wuVU5TSUdORURfQllURSwgdHJ1ZSwgMTIsIDggLyogTmVlZHMgdG8gYmUgaW4gYnl0ZXMgKi8pO1xuXG4gIC8vIENyZWF0ZSBhcnJheSBidWZmZXJcbiAgY29uc3QgYnl0ZXNQZXJWZXJ0ZXggPSAxMiAvLyA0IGJ5dGVzIHBlciBjb29yZGluYXRlICsgMSBieXRlIHBlciBjb2xvciBjb21wb25lbnRcbiAgY29uc3QgdmVydGljZXNQZXJSZWN0YW5nbGUgPSA2O1xuICBjb25zdCByZWN0YW5nbGVzID0gNTA7XG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlc1BlclZlcnRleCAqIHZlcnRpY2VzUGVyUmVjdGFuZ2xlICogcmVjdGFuZ2xlcyk7XG5cbiAgLy8gRmlsbCBhcnJheSBidWZmZXIgdXNpbmcgYSBkYXRhIHZpZXcgdG8gbWl4IHR5cGVzXG4gIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gIFsuLi5uZXcgQXJyYXkocmVjdGFuZ2xlcyldLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICBjb25zdCBjb2xvciA9IFtNYXRoLnJhbmRvbSgpKjI1NS4wLCBNYXRoLnJhbmRvbSgpKjI1NS4wLCBNYXRoLnJhbmRvbSgpKjI1NS4wLCAyNTUuMF07XG4gICAgY29uc3QgeDEgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCB5MSA9IHJhbmRvbUludCgzMDApO1xuICAgIGNvbnN0IHgyID0gcmFuZG9tSW50KDMwMCk7XG4gICAgY29uc3QgeTIgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCByZWN0YW5nbGVPZmZzZXQgPSBieXRlc1BlclZlcnRleCAqIHZlcnRpY2VzUGVyUmVjdGFuZ2xlICogaTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCwgeDEsIHkxLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCwgeDIsIHkxLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCAqIDIsIHgxLCB5MiwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXggKiAzLCB4MSwgeTIsIGNvbG9yKTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCArIGJ5dGVzUGVyVmVydGV4ICogNCwgeDIsIHkxLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCAqIDUsIHgyLCB5MiwgY29sb3IpO1xuICB9KTtcblxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyLCBnbC5TVEFUSUNfRFJBVyk7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkFuZENvbG9yQnVmZmVyKTtcbiAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYqNTApO1xuXG59XG5cbmZ1bmN0aW9uIGFkZFZlcnRleChkdjogRGF0YVZpZXcsIHZlcnRleE9mZnNldDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IG51bWJlcltdKSB7XG4gIGR2LnNldEZsb2F0MzIodmVydGV4T2Zmc2V0LCB4LCB0cnVlKTtcbiAgZHYuc2V0RmxvYXQzMih2ZXJ0ZXhPZmZzZXQgKyA0LCB5LCB0cnVlKTtcbiAgZHYuc2V0VWludDgodmVydGV4T2Zmc2V0ICsgOCwgY29sb3JbMF0pO1xuICBkdi5zZXRVaW50OCh2ZXJ0ZXhPZmZzZXQgKyA5LCBjb2xvclsxXSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDEwLCBjb2xvclsyXSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDExLCBjb2xvclszXSk7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbUludChyYW5nZTogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5nZSk7XG59XG5cbnJlbmRlcihnbCwgY2FudmFzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==