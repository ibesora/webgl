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

/***/ "./src/8.indexed-vertices/fragment.glsl":
/*!**********************************************!*\
  !*** ./src/8.indexed-vertices/fragment.glsl ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\nvarying vec4 color;\n\nvoid main() {\n  gl_FragColor = color;\n}");

/***/ }),

/***/ "./src/8.indexed-vertices/vertex.glsl":
/*!********************************************!*\
  !*** ./src/8.indexed-vertices/vertex.glsl ***!
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
  !*** ./src/8.indexed-vertices/script.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.ts");
/* harmony import */ var _common_shader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shader */ "./src/common/shader.ts");
/* harmony import */ var _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertex.glsl */ "./src/8.indexed-vertices/vertex.glsl");
/* harmony import */ var _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragment.glsl */ "./src/8.indexed-vertices/fragment.glsl");
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
    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const positionAndColorBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindArrayBuffer)(gl);
    const indexBuffer = (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.getAndBindElementBuffer)(gl);
    if (!positionAndColorBuffer || !indexBuffer)
        return;
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(canvas);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.setFullScreenViewport)(gl);
    (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.clear)(gl, 0, 0, 0, 0);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    const bytesPerVertex = 12; // 4 bytes per coordinate (2 in total) + 4 bytes per color
    // We'll store position and color in the same buffer. Position will be encoded using floats
    // and color using unsigned bytes.
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, bytesPerVertex /* Needs to be in bytes */, 0);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.UNSIGNED_BYTE, true, bytesPerVertex, 8 /* Needs to be in bytes */);
    // Create array buffer
    const verticesPerRectangle = 4;
    const indexesPerRectangle = 6;
    const rectangles = 50;
    const buffer = new ArrayBuffer(bytesPerVertex * verticesPerRectangle * rectangles);
    const indexBufferValues = new Array();
    // Fill array buffer using a data view to mix types
    const dv = new DataView(buffer);
    [...new Array(rectangles)].forEach((_, i) => {
        const color = [
            Math.random() * 255.0,
            Math.random() * 255.0,
            Math.random() * 255.0,
            255.0
        ];
        const x1 = randomInt(300);
        const y1 = randomInt(300);
        const x2 = randomInt(300);
        const y2 = randomInt(300);
        const rectangleOffset = bytesPerVertex * verticesPerRectangle * i;
        addVertex(dv, rectangleOffset, x1, y1, color);
        addVertex(dv, rectangleOffset + bytesPerVertex, x2, y1, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 2, x1, y2, color);
        addVertex(dv, rectangleOffset + bytesPerVertex * 3, x2, y2, color);
        const indexOffset = verticesPerRectangle * i;
        indexBufferValues.push(indexOffset, indexOffset + 1, indexOffset + 2, indexOffset + 2, indexOffset + 1, indexOffset + 3);
    });
    (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.bindAndSetArrayBufferData)(gl, positionAndColorBuffer, buffer);
    (0,_common_buffer__WEBPACK_IMPORTED_MODULE_4__.bindAndSetElementBuffer)(gl, indexBuffer, new Uint8Array(indexBufferValues));
    gl.drawElements(gl.TRIANGLES, indexesPerRectangle * 50, gl.UNSIGNED_BYTE, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2J1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3NoYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy84LmluZGV4ZWQtdmVydGljZXMvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9zcmMvOC5pbmRleGVkLXZlcnRpY2VzL3ZlcnRleC5nbHNsIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy84LmluZGV4ZWQtdmVydGljZXMvc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheUJ1ZmZlcmYzMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBudW1iZXJbXSkge1xuICBjb25zdCBidWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZEFuZFNldEFycmF5QnVmZmVyRGF0YShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgYnVmZmVyOiBXZWJHTEJ1ZmZlcixcbiAgZGF0YTogQXJyYXlCdWZmZXIsXG4pIHtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kRWxlbWVudEJ1ZmZlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZEFuZFNldEVsZW1lbnRCdWZmZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIGJ1ZmZlcjogV2ViR0xCdWZmZXIsXG4gIGRhdGE6IEFycmF5QnVmZmVyLFxuKSB7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGRhdGEsIGdsLlNUQVRJQ19EUkFXKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6XG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJWRVJURVhfU0hBREVSXCJdXG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJGUkFHTUVOVF9TSEFERVJcIl0sXG4gIHNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBjb25zb2xlLmVycm9yKFxuICAgIGBDcmVhdGluZyAke3R5cGUgPT09IGdsLlZFUlRFWF9TSEFERVIgPyBcIlZlcnRleFwiIDogXCJGcmFnbWVudFwifSBzaGFkZXI6ICR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpfWAsXG4gICk7XG4gIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcixcbiAgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyLFxuKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBDcmVhdGluZyBwcm9ncmFtOiAke2dsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pfWApO1xuICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZ3JhbShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdmVydGV4U2hhZGVyU291cmNlOiBzdHJpbmcsXG4gIGZyYWdtZW50U2hhZGVyU291cmNlOiBzdHJpbmcsXG4pIHtcbiAgY29uc3QgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihcbiAgICBnbCxcbiAgICBnbC5GUkFHTUVOVF9TSEFERVIsXG4gICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UsXG4gICk7XG4gIGlmICghdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikgcmV0dXJuO1xuICByZXR1cm4gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IGRpc3BsYXlXaWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgY29uc3QgZGlzcGxheUhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG5cbiAgY29uc3QgbmVlZFJlc2l6ZSA9XG4gICAgY2FudmFzLndpZHRoICE9PSBkaXNwbGF5V2lkdGggfHwgY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodDtcblxuICBpZiAobmVlZFJlc2l6ZSkge1xuICAgIGNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcbiAgfVxuXG4gIHJldHVybiBuZWVkUmVzaXplO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RnVsbFNjcmVlblZpZXdwb3J0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICByOiBudW1iZXIsXG4gIGc6IG51bWJlcixcbiAgYjogbnVtYmVyLFxuICBhOiBudW1iZXIsXG4pIHtcbiAgZ2wuY2xlYXJDb2xvcihyLCBnLCBiLCBhKTtcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnZhcnlpbmcgdmVjNCBjb2xvcjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXG59XCIiLCJleHBvcnQgZGVmYXVsdCBcImF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XFxuYXR0cmlidXRlIHZlYzQgYV9jb2xvcjtcXG5cXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xcblxcbnZhcnlpbmcgdmVjNCBjb2xvcjtcXG4gXFxudm9pZCBtYWluKCkge1xcbiAgdmVjMiBjbGlwU3BhY2VDb29yZHMgPSAoYV9wb3NpdGlvbiAvIHVfcmVzb2x1dGlvbikgKiAyLiAtIDEuO1xcbiAgY29sb3IgPSBhX2NvbG9yO1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGNsaXBTcGFjZUNvb3JkcywgMCwgMSk7XFxufVwiIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBjbGVhcixcbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSxcbiAgc2V0RnVsbFNjcmVlblZpZXdwb3J0LFxufSBmcm9tIFwiLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRQcm9ncmFtIH0gZnJvbSBcIi4uL2NvbW1vbi9zaGFkZXJcIjtcbmltcG9ydCB2ZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSBcIi4vdmVydGV4Lmdsc2xcIjtcbmltcG9ydCBmcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tIFwiLi9mcmFnbWVudC5nbHNsXCI7XG5pbXBvcnQge1xuICBiaW5kQW5kU2V0QXJyYXlCdWZmZXJEYXRhLFxuICBiaW5kQW5kU2V0RWxlbWVudEJ1ZmZlcixcbiAgZ2V0QW5kQmluZEFycmF5QnVmZmVyLFxuICBnZXRBbmRCaW5kRWxlbWVudEJ1ZmZlcixcbiAgZ2V0QXJyYXlCdWZmZXJmMzIsXG59IGZyb20gXCIuLi9jb21tb24vYnVmZmVyXCI7XG5cbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWJnbC1jYW52YXNcIik7XG5jb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuaWYgKCFnbCkge1xuICB0aHJvdyBcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIjtcbn1cbmlmICghY2FudmFzKSB7XG4gIHRocm93IFwiTm8gY2FudmFzXCI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IGNvbG9yQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfY29sb3JcIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfcmVzb2x1dGlvblwiLFxuICApO1xuXG4gIGNvbnN0IHBvc2l0aW9uQW5kQ29sb3JCdWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBjb25zdCBpbmRleEJ1ZmZlciA9IGdldEFuZEJpbmRFbGVtZW50QnVmZmVyKGdsKTtcblxuICBpZiAoIXBvc2l0aW9uQW5kQ29sb3JCdWZmZXIgfHwgIWluZGV4QnVmZmVyKSByZXR1cm47XG5cbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXMpO1xuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2wpO1xuICBjbGVhcihnbCwgMCwgMCwgMCwgMCk7XG5cbiAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGNvbG9yQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC51bmlmb3JtMmYocmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcblxuICBjb25zdCBieXRlc1BlclZlcnRleCA9IDEyOyAvLyA0IGJ5dGVzIHBlciBjb29yZGluYXRlICgyIGluIHRvdGFsKSArIDQgYnl0ZXMgcGVyIGNvbG9yXG4gIC8vIFdlJ2xsIHN0b3JlIHBvc2l0aW9uIGFuZCBjb2xvciBpbiB0aGUgc2FtZSBidWZmZXIuIFBvc2l0aW9uIHdpbGwgYmUgZW5jb2RlZCB1c2luZyBmbG9hdHNcbiAgLy8gYW5kIGNvbG9yIHVzaW5nIHVuc2lnbmVkIGJ5dGVzLlxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sXG4gICAgMixcbiAgICBnbC5GTE9BVCxcbiAgICBmYWxzZSxcbiAgICBieXRlc1BlclZlcnRleCAvKiBOZWVkcyB0byBiZSBpbiBieXRlcyAqLyxcbiAgICAwLFxuICApO1xuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgIGNvbG9yQXR0cmlidXRlTG9jYXRpb24sXG4gICAgMyxcbiAgICBnbC5VTlNJR05FRF9CWVRFLFxuICAgIHRydWUsXG4gICAgYnl0ZXNQZXJWZXJ0ZXgsXG4gICAgOCAvKiBOZWVkcyB0byBiZSBpbiBieXRlcyAqLyxcbiAgKTtcblxuICAvLyBDcmVhdGUgYXJyYXkgYnVmZmVyXG4gIGNvbnN0IHZlcnRpY2VzUGVyUmVjdGFuZ2xlID0gNDtcbiAgY29uc3QgaW5kZXhlc1BlclJlY3RhbmdsZSA9IDY7XG4gIGNvbnN0IHJlY3RhbmdsZXMgPSA1MDtcbiAgY29uc3QgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKFxuICAgIGJ5dGVzUGVyVmVydGV4ICogdmVydGljZXNQZXJSZWN0YW5nbGUgKiByZWN0YW5nbGVzLFxuICApO1xuICBjb25zdCBpbmRleEJ1ZmZlclZhbHVlcyA9IG5ldyBBcnJheSgpO1xuXG4gIC8vIEZpbGwgYXJyYXkgYnVmZmVyIHVzaW5nIGEgZGF0YSB2aWV3IHRvIG1peCB0eXBlc1xuICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICBbLi4ubmV3IEFycmF5KHJlY3RhbmdsZXMpXS5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgY29uc3QgY29sb3IgPSBbXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICAyNTUuMFxuICAgIF07XG4gICAgY29uc3QgeDEgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCB5MSA9IHJhbmRvbUludCgzMDApO1xuICAgIGNvbnN0IHgyID0gcmFuZG9tSW50KDMwMCk7XG4gICAgY29uc3QgeTIgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCByZWN0YW5nbGVPZmZzZXQgPSBieXRlc1BlclZlcnRleCAqIHZlcnRpY2VzUGVyUmVjdGFuZ2xlICogaTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCwgeDEsIHkxLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCwgeDIsIHkxLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCAqIDIsIHgxLCB5MiwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXggKiAzLCB4MiwgeTIsIGNvbG9yKTtcbiAgICBjb25zdCBpbmRleE9mZnNldCA9IHZlcnRpY2VzUGVyUmVjdGFuZ2xlICogaTtcbiAgICBpbmRleEJ1ZmZlclZhbHVlcy5wdXNoKFxuICAgICAgaW5kZXhPZmZzZXQsXG4gICAgICBpbmRleE9mZnNldCArIDEsXG4gICAgICBpbmRleE9mZnNldCArIDIsXG4gICAgICBpbmRleE9mZnNldCArIDIsXG4gICAgICBpbmRleE9mZnNldCArIDEsXG4gICAgICBpbmRleE9mZnNldCArIDMsXG4gICAgKTtcbiAgfSk7XG5cbiAgYmluZEFuZFNldEFycmF5QnVmZmVyRGF0YShnbCwgcG9zaXRpb25BbmRDb2xvckJ1ZmZlciwgYnVmZmVyKTtcbiAgYmluZEFuZFNldEVsZW1lbnRCdWZmZXIoZ2wsIGluZGV4QnVmZmVyLCBuZXcgVWludDhBcnJheShpbmRleEJ1ZmZlclZhbHVlcykpO1xuXG4gIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIGluZGV4ZXNQZXJSZWN0YW5nbGUgKiA1MCwgZ2wuVU5TSUdORURfQllURSwgMCk7XG59XG5cbmZ1bmN0aW9uIGFkZFZlcnRleChcbiAgZHY6IERhdGFWaWV3LFxuICB2ZXJ0ZXhPZmZzZXQ6IG51bWJlcixcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIGNvbG9yOiBudW1iZXJbXSxcbikge1xuICBkdi5zZXRGbG9hdDMyKHZlcnRleE9mZnNldCwgeCwgdHJ1ZSk7XG4gIGR2LnNldEZsb2F0MzIodmVydGV4T2Zmc2V0ICsgNCwgeSwgdHJ1ZSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDgsIGNvbG9yWzBdKTtcbiAgZHYuc2V0VWludDgodmVydGV4T2Zmc2V0ICsgOSwgY29sb3JbMV0pO1xuICBkdi5zZXRVaW50OCh2ZXJ0ZXhPZmZzZXQgKyAxMCwgY29sb3JbMl0pO1xuICBkdi5zZXRVaW50OCh2ZXJ0ZXhPZmZzZXQgKyAxMSwgY29sb3JbM10pO1xufVxuXG5mdW5jdGlvbiByYW5kb21JbnQocmFuZ2U6IG51bWJlcikge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZ2UpO1xufVxuXG5yZW5kZXIoZ2wsIGNhbnZhcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=