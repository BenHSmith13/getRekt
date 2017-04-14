
class ShipPool {
  constructor() {

  }

  static newShip(index) {
    return new GameObject(
      `ship_${index}`,
      5,
      5,
      -10,
      -10,
      {
        visible: false,
      }
    );
  }

  generateShips() {
    const ships = {};
    _.forEach(_.range(initialBullets), (index) => {
      ships[`ship_${index}`] = ShipPool.newShip(index);
    });
    return ships;
  }
}