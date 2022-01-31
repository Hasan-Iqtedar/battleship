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
  expect(ship.hit({ x: 3, y: 2 })).toBe(false);
});

test('hit method expects to receive a coordinate with x and y values', () => {
  expect.assertions(1);
  try {
    ship.hit(4);
  } catch (e) {
    expect(e).toBeInstanceOf(TypeError);
  }
});

test('hit method returns true when there is a hit', () => {
  ship.coordinates.push({ x: 1, y: 1 }, { x: 1, y: 2 });
  expect(ship.hit({ x: 1, y: 1 })).toBe(true);
});

test('hit method updates hitCoordinates', () => {
  ship.hit({ x: 1, y: 1 });
  expect(ship.hitCoordinates).toEqual([{ x: 1, y: 1 }]);
});

test('isSunk method when all coordinates have not been hit', () => {
  expect(ship.isSunk()).toBe(false);
});

test('isSunk method when all coordinates have been hit', () => {
  ship.hit({ x: 1, y: 2 });
  expect(ship.isSunk()).toBe(true);
});
