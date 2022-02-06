import GameBoard from '../src/gameBoard';
import Ship from '../src/ship';

let gameBoard;

beforeAll(() => {
  gameBoard = GameBoard();
});

test('placeShip method places a ship on the gameboard', () => {
  const ship = gameBoard.placeShip('submarine', 3, [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }]);
  expect(ship).toBeInstanceOf(Ship);
  console.log(ship);
});

test('placeship method throws error if length and num of coordinates are not consistent', () => {
  expect.assertions(1);
  try {
    gameBoard.placeShip('submarine', 2, [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]);
  } catch (e) {
    expect(e).toBeInstanceOf(TypeError);
  }
});

test('receiveAttack method expects to receive a coordinate with x and y values', () => {
  expect.assertions(1);
  try {
    gameBoard.receiveAttack({ x: 1 });
  } catch (e) {
    expect(e).toBeInstanceOf(TypeError);
  }
});

test('receiveAttack method returns true when a ship is hit', () => {
  expect(gameBoard.receiveAttack({ x: 1, y: 2 })).toBe(true);
});

test('receiveAttack method updates missedCoordinates when no hit occurs', () => {
  const missedCoordinates = gameBoard.receiveAttack({ x: 2, y: 2 });
  expect(missedCoordinates).toEqual([{ x: 2, y: 2 }]);
});

test('allShipSunk method returns false when all ships have not sunk', () => {
  expect(gameBoard.allShipsSunk()).toBe(false);
});

test('allShipsSunk method returns true when all ships have sunk', () => {
  gameBoard.receiveAttack({ x: 1, y: 1 });
  gameBoard.receiveAttack({ x: 1, y: 3 });
  expect(gameBoard.allShipsSunk()).toBe(true);
});
