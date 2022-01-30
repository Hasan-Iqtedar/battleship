class Ship {
  constructor(type, length) {
    this.type = type;
    this.length = length;
    this.coordinates = [];
    this.hitCoordinates = [];
  }

  hit(coordinate) {
    const indexAlreadyHit = this.hitCoordinates.findIndex((element) => element === coordinate);

    if (indexAlreadyHit !== -1) {
      return false;
    }

    const index = this.coordinates.findIndex((element) => {
      if (element === coordinate) {
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
    let status = true;
    this.coordinates.forEach((element) => {
      if (this.hitCoordinates.findIndex((value) => value === element) === -1) {
        status = false;
      }
    });
    return status;
  }
}

export default Ship;
