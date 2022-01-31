import GameBoard from '../src/gameBoard';
import Ship from '../src/ship';

test('placeShip method places a ship on the gameboard', () => {
  const gameBoard = GameBoard();
  const ship = gameBoard.placeShip('submarine', 3, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]);
  expect(ship).toBeInstanceOf(Ship);
  console.log(ship);
});
