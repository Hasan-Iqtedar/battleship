import Ship from './ship';

const GameBoard = (rows = 10, columns = 10) => {
  const ships = [];
  const missedCoordinates = [];

  const occupiedRows = [];
  const occupiedColumns = [];

  const getPlayerShips = () => ships;

  const placeShip = (type, length, coordinates) => {
    if (Object.keys(coordinates).length !== length) {
      throw new TypeError('Length and num of coordinates mismatch');
    }

    const ship = new Ship(type, length);
    ship.coordinates.push(...coordinates);
    ships.push(ship);

    coordinates.forEach((element) => {
      occupiedRows.push(element.x);
      occupiedColumns.push(element.y);
    });
    return ship;
  };

  const receiveAttack = (coordinate) => {
    if (
      coordinate.x !== 0
      && coordinate.y !== 0
      && !(coordinate.x && coordinate.y)
    ) {
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
      return true;
    }
    missedCoordinates.push(coordinate);
    return missedCoordinates;
  };

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    rows,
    columns,
    placeShip,
    receiveAttack,
    allShipsSunk,
    getPlayerShips,
  };
};

export default GameBoard;
