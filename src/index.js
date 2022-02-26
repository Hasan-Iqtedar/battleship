import ShipPlacementHandler from './ShipPlacementHandler';
import GameBoard from './gameBoard';
import Player from './player';

const computerPlayer = Player(true);
const playerBoard = GameBoard(10, 10);
const computerBoard = GameBoard(10, 10);

const computerShipsCoordinates = [
  [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ],
  [
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 6, y: 4 },
  ],
  [
    { x: 8, y: 5 },
    { x: 8, y: 6 },
    { x: 8, y: 7 },
  ],
  [
    { x: 0, y: 5 },
    { x: 0, y: 6 },
  ],
];

computerBoard.placeShip('submarine', 3, computerShipsCoordinates[0]);
computerBoard.placeShip('battleship', 4, computerShipsCoordinates[1]);
computerBoard.placeShip('carrier', 3, computerShipsCoordinates[2]);
computerBoard.placeShip('fighter', 2, computerShipsCoordinates[3]);

ShipPlacementHandler.inputShipsToBePlaced(
  playerBoard,
  computerBoard,
  computerPlayer,
);
