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
/* harmony import */ var _common_shader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shader */ "./src/common/shader.ts");
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
    const program = (0,_common_shader__WEBPACK_IMPORTED_MODULE_1__.getProgram)(gl, _vertex_glsl__WEBPACK_IMPORTED_MODULE_2__["default"], _fragment_glsl__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
        const color = [
            Math.random() * 255.0,
            Math.random() * 255.0,
            Math.random() * 255.0,
            255.0,
        ];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2J1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3NoYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy80LnNpbmdsZS1kcmF3LWNhbGwvZnJhZ21lbnQuZ2xzbCIsIndlYnBhY2s6Ly8vLi9zcmMvNC5zaW5nbGUtZHJhdy1jYWxsL3ZlcnRleC5nbHNsIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy80LnNpbmdsZS1kcmF3LWNhbGwvc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gIHJldHVybiBidWZmZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcnJheUJ1ZmZlcmYzMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBudW1iZXJbXSkge1xuICBjb25zdCBidWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShkYXRhKSwgZ2wuU1RBVElDX0RSQVcpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdHlwZTpcbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIlZFUlRFWF9TSEFERVJcIl1cbiAgICB8IFdlYkdMUmVuZGVyaW5nQ29udGV4dFtcIkZSQUdNRU5UX1NIQURFUlwiXSxcbiAgc291cmNlOiBzdHJpbmcsXG4pIHtcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgYENyZWF0aW5nICR7dHlwZSA9PT0gZ2wuVkVSVEVYX1NIQURFUiA/IFwiVmVydGV4XCIgOiBcIkZyYWdtZW50XCJ9IHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCxcbiAgKTtcbiAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyLFxuICBmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXIsXG4pIHtcbiAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYENyZWF0aW5nIHByb2dyYW06ICR7Z2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSl9YCk7XG4gIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmFtKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHN0cmluZyxcbiAgZnJhZ21lbnRTaGFkZXJTb3VyY2U6IHN0cmluZyxcbikge1xuICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNvdXJjZSk7XG4gIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gY3JlYXRlU2hhZGVyKFxuICAgIGdsLFxuICAgIGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICBmcmFnbWVudFNoYWRlclNvdXJjZSxcbiAgKTtcbiAgaWYgKCF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSByZXR1cm47XG4gIHJldHVybiBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY29uc3QgZGlzcGxheVdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcblxuICBjb25zdCBuZWVkUmVzaXplID1cbiAgICBjYW52YXMud2lkdGggIT09IGRpc3BsYXlXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0O1xuXG4gIGlmIChuZWVkUmVzaXplKSB7XG4gICAgY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIG5lZWRSZXNpemU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBnbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHI6IG51bWJlcixcbiAgZzogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGE6IG51bWJlcixcbikge1xuICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudmFyeWluZyB2ZWM0IGNvbG9yO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIGdsX0ZyYWdDb2xvciA9IGNvbG9yO1xcbn1cIiIsImV4cG9ydCBkZWZhdWx0IFwiYXR0cmlidXRlIHZlYzIgYV9wb3NpdGlvbjtcXG5hdHRyaWJ1dGUgdmVjNCBhX2NvbG9yO1xcblxcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XFxuXFxudmFyeWluZyB2ZWM0IGNvbG9yO1xcbiBcXG52b2lkIG1haW4oKSB7XFxuICB2ZWMyIGNsaXBTcGFjZUNvb3JkcyA9IChhX3Bvc2l0aW9uIC8gdV9yZXNvbHV0aW9uKSAqIDIuIC0gMS47XFxuICBjb2xvciA9IGFfY29sb3I7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoY2xpcFNwYWNlQ29vcmRzLCAwLCAxKTtcXG59XCIiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNsZWFyLFxuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplLFxuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQsXG59IGZyb20gXCIuLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IGdldFByb2dyYW0gfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlclwiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNvdXJjZSBmcm9tIFwiLi92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyU291cmNlIGZyb20gXCIuL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB7IGdldEFuZEJpbmRBcnJheUJ1ZmZlciwgZ2V0QXJyYXlCdWZmZXJmMzIgfSBmcm9tIFwiLi4vY29tbW9uL2J1ZmZlclwiO1xuXG5jb25zdCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2ViZ2wtY2FudmFzXCIpO1xuY29uc3QgZ2wgPSBjYW52YXM/LmdldENvbnRleHQoXCJ3ZWJnbFwiKTtcbmlmICghZ2wpIHtcbiAgdGhyb3cgXCJXZWJHTCBub3Qgc3VwcG9ydGVkXCI7XG59XG5pZiAoIWNhbnZhcykge1xuICB0aHJvdyBcIk5vIGNhbnZhc1wiO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBwcm9ncmFtID0gZ2V0UHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG4gIGlmICghcHJvZ3JhbSkgcmV0dXJuO1xuICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpO1xuICBjb25zdCBjb2xvckF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX2NvbG9yXCIpO1xuICBjb25zdCByZXNvbHV0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKFxuICAgIHByb2dyYW0sXG4gICAgXCJ1X3Jlc29sdXRpb25cIixcbiAgKTtcblxuICBjb25zdCBwb3NpdGlvbkFuZENvbG9yQnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXMpO1xuICBzZXRGdWxsU2NyZWVuVmlld3BvcnQoZ2wpO1xuICBjbGVhcihnbCwgMCwgMCwgMCwgMCk7XG5cbiAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGNvbG9yQXR0cmlidXRlTG9jYXRpb24pO1xuICBnbC51bmlmb3JtMmYocmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcblxuICAvLyBXZSdsbCBzdG9yZSBwb3NpdGlvbiBhbmQgY29sb3IgaW4gdGhlIHNhbWUgYnVmZmVyLiBQb3NpdGlvbiB3aWxsIGJlIGVuY29kZWQgdXNpbmcgZmxvYXRzXG4gIC8vIGFuZCBjb2xvciB1c2luZyB1bnNpZ25lZCBieXRlcy5cbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLFxuICAgIDIsXG4gICAgZ2wuRkxPQVQsXG4gICAgZmFsc2UsXG4gICAgMTIgLyogTmVlZHMgdG8gYmUgaW4gYnl0ZXMgKi8sXG4gICAgMCxcbiAgKTtcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICBjb2xvckF0dHJpYnV0ZUxvY2F0aW9uLFxuICAgIDQsXG4gICAgZ2wuVU5TSUdORURfQllURSxcbiAgICB0cnVlLFxuICAgIDEyLFxuICAgIDggLyogTmVlZHMgdG8gYmUgaW4gYnl0ZXMgKi8sXG4gICk7XG5cbiAgLy8gQ3JlYXRlIGFycmF5IGJ1ZmZlclxuICBjb25zdCBieXRlc1BlclZlcnRleCA9IDEyOyAvLyA0IGJ5dGVzIHBlciBjb29yZGluYXRlICsgMSBieXRlIHBlciBjb2xvciBjb21wb25lbnRcbiAgY29uc3QgdmVydGljZXNQZXJSZWN0YW5nbGUgPSA2O1xuICBjb25zdCByZWN0YW5nbGVzID0gNTA7XG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihcbiAgICBieXRlc1BlclZlcnRleCAqIHZlcnRpY2VzUGVyUmVjdGFuZ2xlICogcmVjdGFuZ2xlcyxcbiAgKTtcblxuICAvLyBGaWxsIGFycmF5IGJ1ZmZlciB1c2luZyBhIGRhdGEgdmlldyB0byBtaXggdHlwZXNcbiAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgWy4uLm5ldyBBcnJheShyZWN0YW5nbGVzKV0uZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgIGNvbnN0IGNvbG9yID0gW1xuICAgICAgTWF0aC5yYW5kb20oKSAqIDI1NS4wLFxuICAgICAgTWF0aC5yYW5kb20oKSAqIDI1NS4wLFxuICAgICAgTWF0aC5yYW5kb20oKSAqIDI1NS4wLFxuICAgICAgMjU1LjAsXG4gICAgXTtcbiAgICBjb25zdCB4MSA9IHJhbmRvbUludCgzMDApO1xuICAgIGNvbnN0IHkxID0gcmFuZG9tSW50KDMwMCk7XG4gICAgY29uc3QgeDIgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCB5MiA9IHJhbmRvbUludCgzMDApO1xuICAgIGNvbnN0IHJlY3RhbmdsZU9mZnNldCA9IGJ5dGVzUGVyVmVydGV4ICogdmVydGljZXNQZXJSZWN0YW5nbGUgKiBpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0LCB4MSwgeTEsIGNvbG9yKTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCArIGJ5dGVzUGVyVmVydGV4LCB4MiwgeTEsIGNvbG9yKTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCArIGJ5dGVzUGVyVmVydGV4ICogMiwgeDEsIHkyLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCAqIDMsIHgxLCB5MiwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXggKiA0LCB4MiwgeTEsIGNvbG9yKTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCArIGJ5dGVzUGVyVmVydGV4ICogNSwgeDIsIHkyLCBjb2xvcik7XG4gIH0pO1xuXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHBvc2l0aW9uQW5kQ29sb3JCdWZmZXIpO1xuICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNiAqIDUwKTtcbn1cblxuZnVuY3Rpb24gYWRkVmVydGV4KFxuICBkdjogRGF0YVZpZXcsXG4gIHZlcnRleE9mZnNldDogbnVtYmVyLFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgY29sb3I6IG51bWJlcltdLFxuKSB7XG4gIGR2LnNldEZsb2F0MzIodmVydGV4T2Zmc2V0LCB4LCB0cnVlKTtcbiAgZHYuc2V0RmxvYXQzMih2ZXJ0ZXhPZmZzZXQgKyA0LCB5LCB0cnVlKTtcbiAgZHYuc2V0VWludDgodmVydGV4T2Zmc2V0ICsgOCwgY29sb3JbMF0pO1xuICBkdi5zZXRVaW50OCh2ZXJ0ZXhPZmZzZXQgKyA5LCBjb2xvclsxXSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDEwLCBjb2xvclsyXSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDExLCBjb2xvclszXSk7XG59XG5cbmZ1bmN0aW9uIHJhbmRvbUludChyYW5nZTogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5nZSk7XG59XG5cbnJlbmRlcihnbCwgY2FudmFzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==