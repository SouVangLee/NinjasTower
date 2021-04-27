/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/classes/player.js":
/*!**************************************!*\
  !*** ./src/assets/classes/player.js ***!
  \**************************************/
/***/ ((module) => {

eval("class Player {\n  constructor() {\n    this.x = 150;\n    this.y = 200;\n    this.vy = 0;\n    this.vx = 0;\n    this.width = 73;\n    this.height = 92;\n    this.weight = 1;\n    this.state = \"IDLE\";\n  }\n  createPlayer() {\n    ctx.fillStyle = 'red';\n    ctx.fillRect(this.x, this.y, this.width, this.height);\n  }\n\n  \n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://NinjasCastle/./src/assets/classes/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_classes_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/classes/player */ \"./src/assets/classes/player.js\");\n/* harmony import */ var _assets_classes_player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_classes_player__WEBPACK_IMPORTED_MODULE_0__);\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n  canvas.width = 600;\n  canvas.height = 800;\n\n  const images = {};\n  images.player = new Image();\n  images.player.src = './src/assets/images/ninja_run_right.png'\n\n  // const playerWidth = 73;\n  // const playerHeight = 92;\n  // let playerFrameX = 0; //the first frame of the player\n  // let playerFrameY = 0; //the first frame of the player \n  // let playerX = 0;\n  // let playerY = 0;\n  // const playerSpeed = 15;\n\n  // function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){\n  //   ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)\n  // }\n\n  // function animate() {\n  //   ctx.clearRect(0, 0, canvas.width, canvas.height);\n  //   drawSprite(\n  //     images.player, \n  //     playerWidth * playerFrameX, \n  //     playerHeight * playerFrameY, \n  //     playerWidth, \n  //     playerHeight,\n  //     playerX, \n  //     playerY,\n  //     playerWidth,\n  //     playerHeight\n  //   );\n  //     //animates sprite\n  //   if (playerFrameX < 10) playerFrameX++;\n  //   else playerFrameX = 0;\n\n  //   //move player\n  //   if (playerX < canvas.width + playerWidth) playerX += playerSpeed;\n  //   else playerX = 0 - playerWidth;\n  // }\n\n  // window.onload = setInterval(animate, 1000/30);\n\n  // window.addEventListener('resize', () =>{\n  //   canvas.width = window.innerWidth;\n  //   canvas.height = window.innerHeight;\n  // });\n\n});\n\n//# sourceURL=webpack://NinjasCastle/./src/index.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;