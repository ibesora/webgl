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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FDaEIsRUFBWSxFQUNaLFlBQW9CLEVBQ3BCLENBQVMsRUFDVCxDQUFTLEVBQ1QsS0FBZTtJQUVmLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBYTtJQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9idWZmZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvNC5zaW5nbGUtZHJhdy1jYWxsL2ZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vc3JjLzQuc2luZ2xlLWRyYXctY2FsbC92ZXJ0ZXguZ2xzbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvNC5zaW5nbGUtZHJhdy1jYWxsL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJyYXlCdWZmZXJmMzIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgZGF0YTogbnVtYmVyW10pIHtcbiAgY29uc3QgYnVmZmVyID0gZ2V0QW5kQmluZEFycmF5QnVmZmVyKGdsKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBbmRTZXRBcnJheUJ1ZmZlckRhdGEoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIGJ1ZmZlcjogV2ViR0xCdWZmZXIsXG4gIGRhdGE6IEFycmF5QnVmZmVyLFxuKSB7XG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5kQmluZEVsZW1lbnRCdWZmZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRBbmRTZXRFbGVtZW50QnVmZmVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICBidWZmZXI6IFdlYkdMQnVmZmVyLFxuICBkYXRhOiBBcnJheUJ1ZmZlcixcbikge1xuICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xuICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhZGVyKFxuICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICB0eXBlOlxuICAgIHwgV2ViR0xSZW5kZXJpbmdDb250ZXh0W1wiVkVSVEVYX1NIQURFUlwiXVxuICAgIHwgV2ViR0xSZW5kZXJpbmdDb250ZXh0W1wiRlJBR01FTlRfU0hBREVSXCJdLFxuICBzb3VyY2U6IHN0cmluZyxcbikge1xuICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gc2hhZGVyO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcihcbiAgICBgQ3JlYXRpbmcgJHt0eXBlID09PSBnbC5WRVJURVhfU0hBREVSID8gXCJWZXJ0ZXhcIiA6IFwiRnJhZ21lbnRcIn0gc2hhZGVyOiAke2dsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKX1gLFxuICApO1xuICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHZlcnRleFNoYWRlcjogV2ViR0xTaGFkZXIsXG4gIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcixcbikge1xuICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICB2YXIgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBwcm9ncmFtO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcihgQ3JlYXRpbmcgcHJvZ3JhbTogJHtnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKX1gKTtcbiAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyYW0oXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHZlcnRleFNoYWRlclNvdXJjZTogc3RyaW5nLFxuICBmcmFnbWVudFNoYWRlclNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHZlcnRleFNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdmVydGV4U2hhZGVyU291cmNlKTtcbiAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoXG4gICAgZ2wsXG4gICAgZ2wuRlJBR01FTlRfU0hBREVSLFxuICAgIGZyYWdtZW50U2hhZGVyU291cmNlLFxuICApO1xuICBpZiAoIXZlcnRleFNoYWRlciB8fCAhZnJhZ21lbnRTaGFkZXIpIHJldHVybjtcbiAgcmV0dXJuIGNyZWF0ZVByb2dyYW0oZ2wsIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICBjb25zdCBkaXNwbGF5V2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGRpc3BsYXlIZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gIGNvbnN0IG5lZWRSZXNpemUgPVxuICAgIGNhbnZhcy53aWR0aCAhPT0gZGlzcGxheVdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQ7XG5cbiAgaWYgKG5lZWRSZXNpemUpIHtcbiAgICBjYW52YXMud2lkdGggPSBkaXNwbGF5V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gbmVlZFJlc2l6ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZ1bGxTY3JlZW5WaWV3cG9ydChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgcjogbnVtYmVyLFxuICBnOiBudW1iZXIsXG4gIGI6IG51bWJlcixcbiAgYTogbnVtYmVyLFxuKSB7XG4gIGdsLmNsZWFyQ29sb3IociwgZywgYiwgYSk7XG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXG52YXJ5aW5nIHZlYzQgY29sb3I7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XFxufVwiIiwiZXhwb3J0IGRlZmF1bHQgXCJhdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWM0IGFfY29sb3I7XFxuXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG5cXG52YXJ5aW5nIHZlYzQgY29sb3I7XFxuIFxcbnZvaWQgbWFpbigpIHtcXG4gIHZlYzIgY2xpcFNwYWNlQ29vcmRzID0gKGFfcG9zaXRpb24gLyB1X3Jlc29sdXRpb24pICogMi4gLSAxLjtcXG4gIGNvbG9yID0gYV9jb2xvcjtcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChjbGlwU3BhY2VDb29yZHMsIDAsIDEpO1xcbn1cIiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgY2xlYXIsXG4gIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUsXG4gIHNldEZ1bGxTY3JlZW5WaWV3cG9ydCxcbn0gZnJvbSBcIi4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0UHJvZ3JhbSB9IGZyb20gXCIuLi9jb21tb24vc2hhZGVyXCI7XG5pbXBvcnQgdmVydGV4U2hhZGVyU291cmNlIGZyb20gXCIuL3ZlcnRleC5nbHNsXCI7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXJTb3VyY2UgZnJvbSBcIi4vZnJhZ21lbnQuZ2xzbFwiO1xuaW1wb3J0IHsgZ2V0QW5kQmluZEFycmF5QnVmZmVyLCBnZXRBcnJheUJ1ZmZlcmYzMiB9IGZyb20gXCIuLi9jb21tb24vYnVmZmVyXCI7XG5cbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWJnbC1jYW52YXNcIik7XG5jb25zdCBnbCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuaWYgKCFnbCkge1xuICB0aHJvdyBcIldlYkdMIG5vdCBzdXBwb3J0ZWRcIjtcbn1cbmlmICghY2FudmFzKSB7XG4gIHRocm93IFwiTm8gY2FudmFzXCI7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnN0IHByb2dyYW0gPSBnZXRQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcbiAgaWYgKCFwcm9ncmFtKSByZXR1cm47XG4gIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gIGNvbnN0IGNvbG9yQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfY29sb3JcIik7XG4gIGNvbnN0IHJlc29sdXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgcHJvZ3JhbSxcbiAgICBcInVfcmVzb2x1dGlvblwiLFxuICApO1xuXG4gIGNvbnN0IHBvc2l0aW9uQW5kQ29sb3JCdWZmZXIgPSBnZXRBbmRCaW5kQXJyYXlCdWZmZXIoZ2wpO1xuICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhcyk7XG4gIHNldEZ1bGxTY3JlZW5WaWV3cG9ydChnbCk7XG4gIGNsZWFyKGdsLCAwLCAwLCAwLCAwKTtcblxuICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29sb3JBdHRyaWJ1dGVMb2NhdGlvbik7XG4gIGdsLnVuaWZvcm0yZihyZXNvbHV0aW9uVW5pZm9ybUxvY2F0aW9uLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xuXG4gIC8vIFdlJ2xsIHN0b3JlIHBvc2l0aW9uIGFuZCBjb2xvciBpbiB0aGUgc2FtZSBidWZmZXIuIFBvc2l0aW9uIHdpbGwgYmUgZW5jb2RlZCB1c2luZyBmbG9hdHNcbiAgLy8gYW5kIGNvbG9yIHVzaW5nIHVuc2lnbmVkIGJ5dGVzLlxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sXG4gICAgMixcbiAgICBnbC5GTE9BVCxcbiAgICBmYWxzZSxcbiAgICAxMiAvKiBOZWVkcyB0byBiZSBpbiBieXRlcyAqLyxcbiAgICAwLFxuICApO1xuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgIGNvbG9yQXR0cmlidXRlTG9jYXRpb24sXG4gICAgNCxcbiAgICBnbC5VTlNJR05FRF9CWVRFLFxuICAgIHRydWUsXG4gICAgMTIsXG4gICAgOCAvKiBOZWVkcyB0byBiZSBpbiBieXRlcyAqLyxcbiAgKTtcblxuICAvLyBDcmVhdGUgYXJyYXkgYnVmZmVyXG4gIGNvbnN0IGJ5dGVzUGVyVmVydGV4ID0gMTI7IC8vIDQgYnl0ZXMgcGVyIGNvb3JkaW5hdGUgKyAxIGJ5dGUgcGVyIGNvbG9yIGNvbXBvbmVudFxuICBjb25zdCB2ZXJ0aWNlc1BlclJlY3RhbmdsZSA9IDY7XG4gIGNvbnN0IHJlY3RhbmdsZXMgPSA1MDtcbiAgY29uc3QgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKFxuICAgIGJ5dGVzUGVyVmVydGV4ICogdmVydGljZXNQZXJSZWN0YW5nbGUgKiByZWN0YW5nbGVzLFxuICApO1xuXG4gIC8vIEZpbGwgYXJyYXkgYnVmZmVyIHVzaW5nIGEgZGF0YSB2aWV3IHRvIG1peCB0eXBlc1xuICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICBbLi4ubmV3IEFycmF5KHJlY3RhbmdsZXMpXS5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgY29uc3QgY29sb3IgPSBbXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICBNYXRoLnJhbmRvbSgpICogMjU1LjAsXG4gICAgICAyNTUuMCxcbiAgICBdO1xuICAgIGNvbnN0IHgxID0gcmFuZG9tSW50KDMwMCk7XG4gICAgY29uc3QgeTEgPSByYW5kb21JbnQoMzAwKTtcbiAgICBjb25zdCB4MiA9IHJhbmRvbUludCgzMDApO1xuICAgIGNvbnN0IHkyID0gcmFuZG9tSW50KDMwMCk7XG4gICAgY29uc3QgcmVjdGFuZ2xlT2Zmc2V0ID0gYnl0ZXNQZXJWZXJ0ZXggKiB2ZXJ0aWNlc1BlclJlY3RhbmdsZSAqIGk7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQsIHgxLCB5MSwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXgsIHgyLCB5MSwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXggKiAyLCB4MSwgeTIsIGNvbG9yKTtcbiAgICBhZGRWZXJ0ZXgoZHYsIHJlY3RhbmdsZU9mZnNldCArIGJ5dGVzUGVyVmVydGV4ICogMywgeDEsIHkyLCBjb2xvcik7XG4gICAgYWRkVmVydGV4KGR2LCByZWN0YW5nbGVPZmZzZXQgKyBieXRlc1BlclZlcnRleCAqIDQsIHgyLCB5MSwgY29sb3IpO1xuICAgIGFkZFZlcnRleChkdiwgcmVjdGFuZ2xlT2Zmc2V0ICsgYnl0ZXNQZXJWZXJ0ZXggKiA1LCB4MiwgeTIsIGNvbG9yKTtcbiAgfSk7XG5cbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlciwgZ2wuU1RBVElDX0RSQVcpO1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgcG9zaXRpb25BbmRDb2xvckJ1ZmZlcik7XG4gIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2ICogNTApO1xufVxuXG5mdW5jdGlvbiBhZGRWZXJ0ZXgoXG4gIGR2OiBEYXRhVmlldyxcbiAgdmVydGV4T2Zmc2V0OiBudW1iZXIsXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICBjb2xvcjogbnVtYmVyW10sXG4pIHtcbiAgZHYuc2V0RmxvYXQzMih2ZXJ0ZXhPZmZzZXQsIHgsIHRydWUpO1xuICBkdi5zZXRGbG9hdDMyKHZlcnRleE9mZnNldCArIDQsIHksIHRydWUpO1xuICBkdi5zZXRVaW50OCh2ZXJ0ZXhPZmZzZXQgKyA4LCBjb2xvclswXSk7XG4gIGR2LnNldFVpbnQ4KHZlcnRleE9mZnNldCArIDksIGNvbG9yWzFdKTtcbiAgZHYuc2V0VWludDgodmVydGV4T2Zmc2V0ICsgMTAsIGNvbG9yWzJdKTtcbiAgZHYuc2V0VWludDgodmVydGV4T2Zmc2V0ICsgMTEsIGNvbG9yWzNdKTtcbn1cblxuZnVuY3Rpb24gcmFuZG9tSW50KHJhbmdlOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmdlKTtcbn1cblxucmVuZGVyKGdsLCBjYW52YXMpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9