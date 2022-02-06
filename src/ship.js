class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.coordinates = [];
    this.hitCoordinates = [];
  }

  hit(coordinate) {
    const indexAlreadyHit = this.hitCoordinates.findIndex((element) => {
      if (element.x === coordinate.x && element.y === coordinate.y) {
        return true;
      }
      return false;
    });

    if (indexAlreadyHit !== -1) {
      return false;
    }
    this.hitCoordinates.push(coordinate);
  }

  isSunk() {
    if (this.coordinates.length === 0) {
      return false;
    }

    if (this.coordinates.length === this.hitCoordinates.length) {
      return true;
    }

    return false;
  }
}

export default Ship;
