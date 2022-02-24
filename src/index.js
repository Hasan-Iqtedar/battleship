import ShipPlacementHandler from './ShipPlacementHandler';

import GameBoard from './gameBoard';
import Player from './player';

// const player = Player();
const computerPlayer = Player(true);

const playerBoard = GameBoard(10, 10);
const computerBoard = GameBoard(10, 10);

// const playerShips = [
//   { x: 2, y: 1 },
//   { x: 2, y: 2 },
//   { x: 2, y: 3 },
// ];
const computerShips = [
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
];

// playerBoard.placeShip('submarine', 3, playerShips);
computerBoard.placeShip('submarine', 3, computerShips);

console.log('Hello World');

ShipPlacementHandler.inputShipsToBePlaced(playerBoard, computerBoard, computerPlayer);

const playerShips = playerBoard.getPlayerShips();
// console.log(playerShips);

// DomHandler.initialize(
//   10,
//   10,
//   playerShips,
//   playerBoard,
//   computerBoard,
//   computerPlayer,
// );
