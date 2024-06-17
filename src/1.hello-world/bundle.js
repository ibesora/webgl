/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/shaders.ts":
/*!*******************************!*\
  !*** ./src/common/shaders.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProgram: () => (/* binding */ createProgram),
/* harmony export */   createShader: () => (/* binding */ createShader)
/* harmony export */ });
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
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
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}


/***/ }),

/***/ "./src/common/utils.ts":
/*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resizeCanvasToDisplaySize: () => (/* binding */ resizeCanvasToDisplaySize)
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
/*!*************************************!*\
  !*** ./src/1.hello-world/script.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./src/common/utils.ts");
/* harmony import */ var _common_shaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/shaders */ "./src/common/shaders.ts");


const canvas = document.querySelector("#webgl-canvas");
const gl = canvas?.getContext("webgl");
if (!gl) {
    throw "WebGL not supported";
}
const vertexShaderSource = `
  attribute vec4 a_position;
 
  void main() {
    gl_Position = a_position;
  }
`;
const vertexShader = (0,_common_shaders__WEBPACK_IMPORTED_MODULE_1__.createShader)(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
  }
`;
const fragmentShader = (0,_common_shaders__WEBPACK_IMPORTED_MODULE_1__.createShader)(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = (0,_common_shaders__WEBPACK_IMPORTED_MODULE_1__.createProgram)(gl, vertexShader, fragmentShader);
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
(0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
const primitiveType = gl.TRIANGLES;
const count = 3;
gl.drawArrays(primitiveType, offset, count);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFOUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QixFQUFFLENBQUMsdUJBQXVCLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUV0RCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFL0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUN0QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNqQixFQUFFLENBQUMsbUJBQW1CLENBQ2xCLHlCQUF5QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFFckUsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNuQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFkZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjLzEuaGVsbG8td29ybGQvc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6XG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJWRVJURVhfU0hBREVSXCJdXG4gICAgfCBXZWJHTFJlbmRlcmluZ0NvbnRleHRbXCJGUkFHTUVOVF9TSEFERVJcIl0sXG4gIHNvdXJjZTogc3RyaW5nLFxuKSB7XG4gIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIHJldHVybiBzaGFkZXI7XG4gIH1cblxuICBjb25zb2xlLmxvZyhnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlciwgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gIGlmIChzdWNjZXNzKSB7XG4gICAgcmV0dXJuIHByb2dyYW07XG4gIH1cbiBcbiAgY29uc29sZS5sb2coZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY29uc3QgZGlzcGxheVdpZHRoICA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgY29uc3QgZGlzcGxheUhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gXG4gIGNvbnN0IG5lZWRSZXNpemUgPSBjYW52YXMud2lkdGggICE9PSBkaXNwbGF5V2lkdGggfHxcbiAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQ7XG4gXG4gIGlmIChuZWVkUmVzaXplKSB7XG4gICAgY2FudmFzLndpZHRoICA9IGRpc3BsYXlXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcbiAgfVxuIFxuICByZXR1cm4gbmVlZFJlc2l6ZTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUgfSBmcm9tIFwiLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBjcmVhdGVQcm9ncmFtLCBjcmVhdGVTaGFkZXIgfSBmcm9tIFwiLi4vY29tbW9uL3NoYWRlcnNcIjtcblxuY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYmdsLWNhbnZhc1wiKTtcbmNvbnN0IGdsID0gY2FudmFzPy5nZXRDb250ZXh0KFwid2ViZ2xcIik7XG5pZiAoIWdsKSB7XG4gIHRocm93IFwiV2ViR0wgbm90IHN1cHBvcnRlZFwiO1xufVxuXG5jb25zdCB2ZXJ0ZXhTaGFkZXJTb3VyY2UgPSBgXG4gIGF0dHJpYnV0ZSB2ZWM0IGFfcG9zaXRpb247XG4gXG4gIHZvaWQgbWFpbigpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IGFfcG9zaXRpb247XG4gIH1cbmA7XG5jb25zdCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNvdXJjZSk7XG5cblxuY29uc3QgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBgXG4gIHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuICB2b2lkIG1haW4oKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLCAwLCAwLjUsIDEpO1xuICB9XG5gO1xuY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xuXG5jb25zdCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG5cbmNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG5jb25zdCBwb3NpdGlvbkJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHBvc2l0aW9uQnVmZmVyKTtcblxuY29uc3QgcG9zaXRpb25zID0gW1xuICAwLCAwLFxuICAwLCAwLjUsXG4gIDAuNywgMCxcbl07XG5nbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzKTtcblxuZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcblxuZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcbmdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuXG5nbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG5cbmdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmZlcik7XG4gXG5jb25zdCBzaXplID0gMjtcbmNvbnN0IHR5cGUgPSBnbC5GTE9BVDtcbmNvbnN0IG5vcm1hbGl6ZSA9IGZhbHNlO1xuY29uc3Qgc3RyaWRlID0gMDtcbmNvbnN0IG9mZnNldCA9IDA7XG5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHNpemUsIHR5cGUsIG5vcm1hbGl6ZSwgc3RyaWRlLCBvZmZzZXQpXG5cbmNvbnN0IHByaW1pdGl2ZVR5cGUgPSBnbC5UUklBTkdMRVM7XG5jb25zdCBjb3VudCA9IDM7XG5nbC5kcmF3QXJyYXlzKHByaW1pdGl2ZVR5cGUsIG9mZnNldCwgY291bnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9