class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.coordinates = [];
    this.hitCoordinates = [];
  }

  hit(coordinate) {
    if (!(coordinate.x && coordinate.y)) {
      throw new TypeError('Bad input');
    }

    const indexAlreadyHit = this.hitCoordinates.findIndex((element) => {
      if (element.x === coordinate.x && element.y === coordinate.y) {
        return true;
      }
      return false;
    });

    if (indexAlreadyHit !== -1) {
      return false;
    }

    const index = this.coordinates.findIndex((element) => {
      if (element.x === coordinate.x && element.y === coordinate.y) {
        return true;
      }
      return false;
    });

    if (index !== -1) {
      this.hitCoordinates.push(coordinate);
      return true;
    }
    return false;
  }

  isSunk() {
    if (this.coordinates.length === 0) {
      return false;
    }

    let status = true;
    this.coordinates.forEach((element) => {
      if (this.hitCoordinates.findIndex((value) => {
        if (value.x === element.x && value.y === element.y) {
          return true;
        }
        return false;
      }) === -1) {
        status = false;
      }
    });
    return status;
  }
}

export default Ship;
