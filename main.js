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

/***/ "./src/ShipPlacementHandler.js":
/*!*************************************!*\
  !*** ./src/ShipPlacementHandler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _domHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHandler */ \"./src/domHandler.js\");\n\n\nconst ShipPlacementHandler = (() => {\n  let orientation = 'horizontal';\n  let length = 3;\n  const name = 'submarine';\n  const maxShips = 4;\n  let status = false;\n  let numShips = 0;\n\n  const main = document.querySelector('.game-board-container');\n\n  const getOrientation = () => orientation;\n  const getLength = () => length;\n  const getName = () => name;\n  const getStatus = () => status;\n  const getNumShips = () => numShips;\n\n  const setOrinetation = (newOrinetation) => {\n    orientation = newOrinetation;\n  };\n\n  const setLength = (newLength) => {\n    length = newLength;\n  };\n\n  const setStatus = (newStatus) => {\n    status = newStatus;\n  };\n\n  const setNumShips = (num) => {\n    numShips = num;\n  };\n\n  const toggleOrinetation = () => {\n    if (getOrientation() === 'horizontal') {\n      setOrinetation('vertical');\n    } else {\n      setOrinetation('horizontal');\n    }\n    console.log(getOrientation());\n  };\n\n  const renderCells = (board, rows, columns, playerBoard, computerBoard, computerPlayer) => {\n    const mouseoverhandler = (e) => {\n      let cell = e.target;\n      const colIndex = cell.getAttribute('data-col');\n\n      if (getOrientation() === 'horizontal') {\n        if (colIndex <= columns - getLength()) {\n          for (let i = 0; i < getLength(); i++) {\n            cell.classList.add('ship-placement-cell');\n            cell = cell.nextSibling;\n          }\n        } else {\n          cell.classList.add('ship-placement-cell-invalid');\n        }\n      } else {\n        let rowIndex = cell.getAttribute('data-row');\n        let row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);\n\n        if (rowIndex <= rows - getLength()) {\n          for (let i = 0; i < getLength(); i++) {\n            cell.classList.add('ship-placement-cell');\n            row.forEach((element) => {\n              if (element.getAttribute('data-col') == colIndex) {\n                cell = element;\n              }\n            });\n            rowIndex++;\n            row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);\n          }\n        } else {\n          cell.classList.add('ship-placement-cell-invalid');\n        }\n      }\n    };\n\n    const mouseoutHandler = (e) => {\n      let cell = e.target;\n      const colIndex = cell.getAttribute('data-col');\n\n      if (getOrientation() === 'horizontal') {\n        if (colIndex <= columns - getLength()) {\n          for (let i = 0; i < getLength(); i++) {\n            cell.classList.remove('ship-placement-cell');\n            cell = cell.nextSibling;\n          }\n        } else {\n          cell.classList.remove('ship-placement-cell-invalid');\n        }\n      } else {\n        let rowIndex = cell.getAttribute('data-row');\n        let row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);\n\n        for (let i = 0; i < getLength(); i++) {\n          cell.classList.remove('ship-placement-cell');\n          row.forEach((element) => {\n            if (element.getAttribute('data-col') == colIndex) {\n              cell = element;\n            }\n          });\n          rowIndex++;\n          row = board.querySelectorAll(`[data-row='${parseInt(rowIndex, 10) + 1}']`);\n        }\n      }\n    };\n\n    const clickHandler = (e) => {\n      const cells = document.querySelectorAll('.ship-placement-cell');\n      const coordinates = [];\n\n      cells.forEach((cell) => {\n        const coordinate = {\n          x: parseInt(cell.getAttribute('data-row'), 10),\n          y: parseInt(cell.getAttribute('data-col'), 10),\n        };\n        coordinates.push(coordinate);\n        cell.style.cssText = 'background-color: rgba(0,0,0,0.7)';\n      });\n      playerBoard.placeShip('submarine', 3, coordinates);\n\n      setNumShips(getNumShips() + 1);\n\n      if (getNumShips() === maxShips) {\n        setStatus(true);\n      }\n\n      if (getStatus() === true) {\n        main.innerHTML = '';\n\n        _domHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initialize(\n          10,\n          10,\n          playerBoard.getPlayerShips(),\n          playerBoard,\n          computerBoard,\n          computerPlayer,\n        );\n      }\n    };\n\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < columns; j++) {\n        const cell = document.createElement('div');\n        cell.classList.add('cell');\n        cell.setAttribute('data-row', `${i}`);\n        cell.setAttribute('data-col', `${j}`);\n\n        cell.addEventListener('mouseover', mouseoverhandler);\n        cell.addEventListener('mouseout', mouseoutHandler);\n        cell.addEventListener('click', clickHandler);\n\n        board.appendChild(cell);\n      }\n    }\n  };\n\n  const inputShipsToBePlaced = (playerBoard, computerBoard, computerPlayer) => {\n    const rows = 10;\n    const columns = 10;\n\n    const board = document.createElement('div');\n    const container = document.createElement('div');\n\n    board.classList.add('game-board');\n    container.classList.add('container');\n\n    board.style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;\n\n    const btn = document.createElement('button');\n    const line = document.createElement('h2');\n\n    btn.classList.add('rotate-btn');\n    btn.addEventListener('click', toggleOrinetation);\n\n    line.textContent = `Place your ${getName()}`;\n    btn.textContent = 'Rotate';\n\n    container.append(line, btn);\n    main.append(board, container);\n\n    renderCells(board, rows, columns, playerBoard, computerBoard, computerPlayer);\n  };\n\n  return { inputShipsToBePlaced };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShipPlacementHandler);\n\n\n//# sourceURL=webpack://battleship/./src/ShipPlacementHandler.js?");

/***/ }),

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst DomHandler = (() => {\n  let playerBoardGrid = null;\n  const main = document.querySelector('.game-board-container');\n\n  const updateComputerBoard = (e, computerBoard) => {\n    const coordinate = {\n      x: parseInt(e.target.getAttribute('data-row'), 10),\n      y: parseInt(e.target.getAttribute('data-col'), 10),\n    };\n\n    if (computerBoard.receiveAttack(coordinate) === true) {\n      e.target.style.cssText = 'background-color: maroon';\n    }\n    if (computerBoard.allShipsSunk()) {\n      console.log('done');\n      _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setRunning(false);\n    }\n  };\n\n  const updatePlayerBoard = (rows, columns, playerBoard, computerPlayer) => {\n    const computerAttackCoordinate = computerPlayer.guessRandomCoordinate(\n      rows,\n      columns,\n    );\n\n    if (playerBoard.receiveAttack(computerAttackCoordinate) === true) {\n      const cellRow = playerBoardGrid.querySelectorAll(\n        `[data-row='${computerAttackCoordinate.x}']`,\n      );\n      cellRow.forEach((cell) => {\n        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {\n          cell.style.cssText = 'background-color: maroon';\n        }\n      });\n    } else {\n      const cellRow = playerBoardGrid.querySelectorAll(\n        `[data-row='${computerAttackCoordinate.x}']`,\n      );\n\n      cellRow.forEach((cell) => {\n        if (cell.getAttribute('data-col') == computerAttackCoordinate.y) {\n          cell.style.cssText = 'background-color: rgb(230, 230, 112)';\n        }\n      });\n    }\n\n    if (playerBoard.allShipsSunk()) {\n      console.log('done');\n      _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setRunning(false);\n    }\n  };\n\n  const initialize = (\n    rows,\n    columns,\n    playerShips,\n    playerBoard,\n    computerBoard,\n    computerPlayer,\n  ) => {\n    const gameBoard1 = document.createElement('div');\n    const gameBoard2 = document.createElement('div');\n    console.log(playerShips);\n    gameBoard1.classList.add('game-board');\n    gameBoard2.classList.add('game-board');\n\n    gameBoard1.id = 'player-board';\n\n    main.append(gameBoard1, gameBoard2);\n    playerBoardGrid = document.querySelector('#player-board');\n\n    const gameboards = document.getElementsByClassName('game-board');\n    gameboards[0].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;\n    gameboards[1].style.cssText = `grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr)`;\n\n    const handler = (e) => {\n      updateComputerBoard(e, computerBoard);\n      updatePlayerBoard(rows, columns, playerBoard, computerPlayer);\n    };\n\n    const endGame = () => {\n      if (_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isRunning() === false) {\n        console.log('Hello ending....');\n        gameboards[1].childNodes.forEach((cell) => {\n          cell.removeEventListener('click', handler);\n          cell.removeEventListener('click', endGame);\n        });\n      }\n    };\n\n    for (let i = 0; i < rows; i++) {\n      for (let j = 0; j < columns; j++) {\n        const cell1 = document.createElement('div');\n        const cell2 = document.createElement('div');\n        cell1.classList.add('cell');\n        cell2.classList.add('cell');\n\n        cell1.setAttribute('data-row', `${i}`);\n        cell2.setAttribute('data-row', `${i}`);\n\n        cell1.setAttribute('data-col', `${j}`);\n        cell2.setAttribute('data-col', `${j}`);\n\n        cell2.addEventListener('click', handler);\n        cell2.addEventListener('click', endGame);\n\n        playerShips.forEach((ship) => {\n          ship.coordinates.forEach((element) => {\n            if (element.x === i && element.y === j) {\n              cell1.style.cssText = 'background-color: black';\n            }\n          });\n        });\n\n        gameboards[0].appendChild(cell1);\n        gameboards[1].appendChild(cell2);\n      }\n    }\n  };\n  return {\n    initialize,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomHandler);\n\n\n//# sourceURL=webpack://battleship/./src/domHandler.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst GameModule = (() => {\n  let running = true;\n\n  const isRunning = () => running;\n  const setRunning = (value) => { running = value; };\n\n  return {\n    isRunning, setRunning,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameModule);\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst GameBoard = (rows = 10, columns = 10) => {\n  const ships = [];\n  const missedCoordinates = [];\n\n  const getPlayerShips = () => ships;\n\n  const placeShip = (type, length, coordinates) => {\n    if (Object.keys(coordinates).length !== length) {\n      throw new TypeError('Length and num of coordinates mismatch');\n    }\n\n    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](type, length);\n    ship.coordinates.push(...coordinates);\n    ships.push(ship);\n\n    return ship;\n  };\n\n  const receiveAttack = (coordinate) => {\n    if (\n      coordinate.x !== 0\n      && coordinate.y !== 0\n      && !(coordinate.x && coordinate.y)\n    ) {\n      throw new TypeError('Bad input invalid coordinate');\n    }\n\n    let coordinateIndex;\n\n    const shipIndex = ships.findIndex((ship) => {\n      coordinateIndex = ship.coordinates.findIndex((ele) => {\n        if (ele.x === coordinate.x && ele.y === coordinate.y) {\n          return true;\n        }\n        return false;\n      });\n\n      if (coordinateIndex !== -1) {\n        ship.hit(coordinate);\n        return true;\n      }\n      return false;\n    });\n\n    // console.log(`Ship: ${shipIndex}, Coordinate Index: ${coordinateIndex}`);\n    if (shipIndex !== -1) {\n      console.log(`Ship: ${shipIndex}, Coordinate Index: ${coordinateIndex}`);\n      return true;\n    }\n    missedCoordinates.push(coordinate);\n    return missedCoordinates;\n  };\n\n  const allShipsSunk = () => ships.every((ship) => ship.isSunk());\n\n  return {\n    rows,\n    columns,\n    placeShip,\n    receiveAttack,\n    allShipsSunk,\n    getPlayerShips,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n//# sourceURL=webpack://battleship/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ShipPlacementHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShipPlacementHandler */ \"./src/ShipPlacementHandler.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\n\n\n// const player = Player();\nconst computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(true);\n\nconst playerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 10);\nconst computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(10, 10);\n\n// const playerShips = [\n//   { x: 2, y: 1 },\n//   { x: 2, y: 2 },\n//   { x: 2, y: 3 },\n// ];\nconst computerShips = [\n  { x: 2, y: 2 },\n  { x: 3, y: 2 },\n  { x: 4, y: 2 },\n];\n\n// playerBoard.placeShip('submarine', 3, playerShips);\ncomputerBoard.placeShip('submarine', 3, computerShips);\n\nconsole.log('Hello World');\n\n_ShipPlacementHandler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].inputShipsToBePlaced(playerBoard, computerBoard, computerPlayer);\n\nconst playerShips = playerBoard.getPlayerShips();\n// console.log(playerShips);\n\n// DomHandler.initialize(\n//   10,\n//   10,\n//   playerShips,\n//   playerBoard,\n//   computerBoard,\n//   computerPlayer,\n// );\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Player = (isComputer = false) => {\n  // let turn = false;\n\n  // const getTurn = () => turn;\n  // const setTurn = (newTurn) => {\n  //   turn = newTurn;\n  // };\n\n  if (isComputer) {\n    const guessRandomCoordinate = (rows, columns) => ({\n      x: Math.floor(Math.random() * rows),\n      y: Math.floor(Math.random() * columns),\n    });\n\n    // const getRandomCoordinate = (rows, columns) => {\n    //   let randomCoordinate;\n    //   while (true) {\n    //     randomCoordinate = guessRandomCoordinate(rows, columns);\n\n    //     if ()\n\n    //   }\n    // };\n\n    return { guessRandomCoordinate };\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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