import Ship from '../src/ship';

let ship;

beforeAll(() => {
  ship = new Ship('submarine', 3);
});

test('Each ship has a type and length upon creation', () => {
  expect(ship.type).toBeTruthy();
  expect(ship.length).toBeTruthy();
});

test('hit method updates hitCoordinates', () => {
  ship.coordinates.push({ x: 1, y: 1 }, { x: 1, y: 2 });
  ship.hit({ x: 1, y: 1 });
  expect(ship.hitCoordinates).toEqual([{ x: 1, y: 1 }]);
});

test('hit method return false if coordinate already hit', () => {
  expect(ship.hit({ x: 1, y: 1 })).toBe(false);
});

test('isSunk method when all coordinates have not been hit', () => {
  expect(ship.isSunk()).toBe(false);
});

test('isSunk method when all coordinates have been hit', () => {
  ship.hit({ x: 1, y: 2 });
  expect(ship.isSunk()).toBe(true);
});
