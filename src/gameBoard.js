import Ship from './ship';

const GameBoard = () => {
  const ships = [];
  const missedCoordinates = [];

  const placeShip = (type, length, coordinates) => {
    if (Object.keys(coordinates).length !== length) {
      throw new TypeError('Length and num of coordinates mismatch');
    }

    const ship = new Ship(type, length);
    ship.coordinates.push(...coordinates);
    ships.push(ship);

    return ship;
  };

  const receiveAttack = (coordinate) => {
    if (!(coordinate.x && coordinate.y)) {
      throw new TypeError('Bad input invalid coordinate');
    }

    let coordinateIndex;

    const shipIndex = ships.findIndex((ship) => {
      coordinateIndex = ship.coordinates.findIndex((ele) => {
        if (ele.x === coordinate.x && ele.y === coordinate.y) {
          return true;
        }
        return false;
      });

      if (coordinateIndex !== -1) {
        ship.hit(coordinate);
        return true;
      }
      return false;
    });

    if (shipIndex !== -1) {
      console.log(`Ship: ${shipIndex}, Coordinate Index: ${coordinateIndex}`);
      return true;
    }
    missedCoordinates.push(coordinate);
    return missedCoordinates;
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return { placeShip, receiveAttack, allShipsSunk };
};

export default GameBoard;
