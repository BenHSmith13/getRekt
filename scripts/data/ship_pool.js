
class ShipPool {
  constructor() {

  }

  static newShip(index) {
    return new Ship(`ship_${index}`);
  }

  generateShips() {
    const ships = {};
    _.forEach(_.range(initialBullets), (index) => {
      ships[`ship_${index}`] = ShipPool.newShip(index);
    });
    return ships;
  }
}