
class ShipPool {
  constructor() {
    this.initialShips = 5;
  }

  static newShip(index) {
    return new Ship(`ship_${index}`);
  }

  generateShips() {
    const ships = {};
    _.forEach(_.range(this.initialShips), (index) => {
      ships[`ship_${index}`] = ShipPool.newShip(index);
    });
    return ships;
  }
}