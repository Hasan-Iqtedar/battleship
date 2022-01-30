import Ship from '../src/ship';

let ship;

beforeAll(() => {
  ship = new Ship('submarine', 3);
});

test('Each ship has a type and length upon creation', () => {
  expect(ship.type).toBeTruthy();
  expect(ship.length).toBeTruthy();
});

test('hit method returns false when ship coordinates have not been set up yet', () => {
  expect(ship.hit(5)).toBe(false);
});

test('hit method returns true when there is a hit', () => {
  ship.coordinates.push(1, 2, 3);
  expect(ship.hit(2)).toBe(true);
});

test('hit method updates hitCoordinates', () => {
  ship.hit(2);
  expect(ship.hitCoordinates).toEqual([2]);
});

test('isSunk method when all coordinates have not been hit', () => {
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
});

test('isSunk method when all coordinates have been hit', () => {
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
});
