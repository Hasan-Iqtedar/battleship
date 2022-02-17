/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DomHandler = (() => {\n  const playerBoardGrid = document.querySelector('#player-board');\n\n  const attackBoard = (e, rows, columns, playerBoard, computerBoard, computerPlayer) => {\n    const coordinate = {\n      x: parseInt(e.target.getAttribute('data-row'), 10),\n      y: parseInt(e.target.getAttribute('data-col'), 10),\n    };\n\n    if (computerBoard.receiveAttack(coordinate) === true) {\n      e.target.style.cssText = 'background-color: maroon';\n    }\n    if (computerBoard.allShipsSunk()) {\n      console.log('done');\n    }\n    // ai attacks back.\n    // computerBoard.\n    const computerAttackCoordinate = computerPlayer.guessRandomCoordinate(rows, columns);\n\n    if (playerBoard.receiveAttack(computerAttackCoordinate) === true) {\n      const cellRow = playerBoardGrid.querySelectorAll(`[data-row='${computerAttackCoordinate.x}']`);\n      cellRow.forEach((cell) => {\n        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {\n          cell.style.cssText = 'background-color: maroon';\n        }\n      });\n    } else {\n      const cellRow = playerBoardGrid.querySelectorAll(`[data-row='${computerAttackCoordinate.x}']`);\n\n      cellRow.forEach((cell) => {\n        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {\n          cell.style.cssText = 'background-color: rgb(230, 230, 112)';\n        }\n      });\n    }\n  };\n\n  const initialize = (rows, columns, playerShips, playerBoard, computerBoard, computerPlayer) => {\n    const gameboards = document.getElementsByClassName('game-board');\n    gameboards[0].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;\n    gameboards[1].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;\n\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < columns; j++) {\n        const cell1 = document.createElement('div');\n        const cell2 = document.createElement('div');\n        cell1.classList.add('cell');\n        cell2.classList.add('cell');\n\n        cell1.setAttribute('data-row', `${i}`);\n        cell2.setAttribute('data-row', `${i}`);\n\n        cell1.setAttribute('data-col', `${j}`);\n        cell2.setAttribute('data-col', `${j}`);\n\n        cell2.addEventListener('click', (e) => {\n          attackBoard(e, rows, columns, playerBoard, computerBoard, computerPlayer);\n        });\n\n        playerShips.forEach((element) => {\n          if (element.x === i && element.y === j) {\n            cell1.style.cssText = 'background-color: black';\n          }\n        });\n\n        gameboards[0].appendChild(cell1);\n        gameboards[1].appendChild(cell2);\n      }\n    }\n  };\n\n  const renderContent = () => {};\n\n  return {\n    initialize,\n    renderContent,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomHandler);\n\n\n//# sourceURL=webpack://battleship/./src/domHandler.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst GameBoard = (rows = 10, columns = 10) => {\n  const ships = [];\n  const missedCoordinates = [];\n\n  const placeShip = (type, length, coordinates) => {\n    if (Object.keys(coordinates).length !== length) {\n      throw new TypeError('Length and num of coordinates mismatch');\n    }\n\n    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](type, length);\n    ship.coordinates.push(...coordinates);\n    ships.push(ship);\n\n    return ship;\n  };\n\n  const receiveAttack = (coordinate) => {\n    if ((coordinate.x !== 0 && coordinate.y !== 0) && !(coordinate.x && coordinate.y)) {\n      throw new TypeError('Bad input invalid coordinate');\n    }\n\n    let coordinateIndex;\n\n    const shipIndex = ships.findIndex((ship) => {\n      coordinateIndex = ship.coordinates.findIndex((ele) => {\n        if (ele.x === coordinate.x && ele.y === coordinate.y) {\n          return true;\n        }\n        return false;\n      });\n\n      if (coordinateIndex !== -1) {\n        ship.hit(coordinate);\n        return true;\n      }\n      return false;\n    });\n\n    // console.log(`Ship: ${shipIndex}, Coordinate Index: ${coordinateIndex}`);\n    if (shipIndex !== -1) {\n      console.log(`Ship: ${shipIndex}, Coordinate Index: ${coordinateIndex}`);\n      return true;\n    }\n    missedCoordinates.push(coordinate);\n    return missedCoordinates;\n  };\n\n  const allShipsSunk = () => ships.every((ship) => ship.isSunk());\n\n  return {\n    rows, columns, placeShip, receiveAttack, allShipsSunk,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n//# sourceURL=webpack://battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHandler */ \"./src/domHandler.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\n\nconst player = (0,_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\nconst computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(true);\n\nconst playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 10);\nconst computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 10);\n\nconst playerShips = [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }];\nconst computerShips = [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }];\n\nplayerBoard.placeShip('submarine', 3, playerShips);\ncomputerBoard.placeShip('submarine', 3, computerShips);\n\nconsole.log('Hello World');\n_domHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initialize(10, 10, playerShips, playerBoard, computerBoard, computerPlayer);\n\nplayer.setTurn(true);\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Player = (isComputer = false) => {\n  let turn = false;\n\n  const getTurn = () => turn;\n  const setTurn = (newTurn) => {\n    turn = newTurn;\n  };\n\n  if (isComputer) {\n    const guessRandomCoordinate = (rows, columns) => ({\n      x: Math.floor(Math.random() * rows),\n      y: Math.floor(Math.random() * columns),\n    });\n\n    // const getRandomCoordinate = (rows, columns) => {\n    //   let randomCoordinate;\n    //   while (true) {\n    //     randomCoordinate = guessRandomCoordinate(rows, columns);\n\n    //     if ()\n\n    //   }\n    // };\n\n    return { getTurn, setTurn, guessRandomCoordinate };\n  }\n\n  return { getTurn, setTurn };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(type, length) {\n    this.type = type;\n    this.length = length;\n    this.coordinates = [];\n    this.hitCoordinates = [];\n  }\n\n  hit(coordinate) {\n    const indexAlreadyHit = this.hitCoordinates.findIndex((element) => {\n      if (element.x === coordinate.x && element.y === coordinate.y) {\n        return true;\n      }\n      return false;\n    });\n\n    if (indexAlreadyHit !== -1) {\n      return false;\n    }\n    this.hitCoordinates.push(coordinate);\n  }\n\n  isSunk() {\n    if (this.coordinates.length === 0) {\n      return false;\n    }\n\n    if (this.coordinates.length === this.hitCoordinates.length) {\n      return true;\n    }\n\n    return false;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;