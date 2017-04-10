
class ShipDirectory {
  constructor() {
    this.ships = this.directory();
  }

  getShip(shipName) {
    return this.ships[shipName];
  }

  getRandomShip() {
    const rand = _.random(100);
  //  Modify this logic to adjust how frequently different ships appear
    if (rand < 33) {
      return this.ships.lightRunner;
    } else if (rand < 66) {
      return this.ships.scoutShip;
    } else {
      return this.ships.gunShip;
    }
  };

  directory() {
    return {
      lightRunner: {
        name: 'lightRunner',
        height: 95,
        width: 227,
        hp: 20,
      },
      scoutShip: {
        name: 'scoutShip',
        height: 69,
        width: 105,
        hp: 20,
      },
      gunShip: {
        name: 'gunShip',
        height: 157,
        width: 213,
        hp: 40,
      }
    }
  }
}