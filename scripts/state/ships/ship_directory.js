
class ShipDirectory {
  constructor() {
    this.ships = this.directory();
  }

  getShip(shipName) {
    return this.ships[shipName];
  }

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
      }
    }
  }
}