import Ship from './ship';

const GameBoard = () => {
  const ships = [];

  const placeShip = (type, length, coordinates) => {
    const ship = new Ship(type, length);
    ship.coordinates.push(...coordinates);
    ships.push(ship);

    return ship;
  };

  return { placeShip };
};

export default GameBoard;
