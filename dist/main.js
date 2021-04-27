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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n  canvas.width = 600;\n  canvas.height = 800;\n\n  const images = {};\n  images.player = new Image();\n  images.player.src = './src/assets/images/ninja_run_right.png'\n\n  const playerWidth = 73;\n  const playerHeight = 92;\n  let playerFrameX = 0; //the first frame of the player\n  let playerFrameY = 0; //the first frame of the player \n  let playerX = 0;\n  let playerY = 0;\n  const playerSpeed = 12;\n\n  // function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){\n  //   ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)\n  // }\n\n  // function animate() {\n  //   ctx.clearRect(0, 0, canvas.width, canvas.height);\n  //   drawSprite(\n  //     images.player, \n  //     playerWidth * playerFrameX, \n  //     playerHeight * playerFrameY, \n  //     playerWidth, \n  //     playerHeight,\n  //     playerX, \n  //     playerY,\n  //     playerWidth,\n  //     playerHeight\n  //   );\n  //     //animates sprite\n  //   if (playerFrameX < 10) playerFrameX++;\n  //   else playerFrameX = 0;\n\n  //   //move player\n  //   if (playerX < canvas.width + playerWidth) playerX += playerSpeed;\n  //   else playerX = 0 - playerWidth;\n  // }\n\n  // window.onload = setInterval(animate, 1000/30);\n\n  // window.addEventListener('resize', () =>{\n  //   canvas.width = window.innerWidth;\n  //   canvas.height = window.innerHeight;\n  // });\n\n});\n\n//# sourceURL=webpack://NinjasCastle/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;