
class ShipDrawer {
  constructor () {
    this.shipAssets = new ShipAssets();
  }

  drawShip(ship, context) {
    context.save();
    context.drawImage(
      this.shipAssets.getAsset(ship.type),
      ship.xPos,
      ship.yPos,
      ship.width,
      ship.height
    );
    context.restore();
  }

  drawShips(ships, context) {
    _.forEach(ships, (ship) => {
      if (ship.visible) {
        this.drawShip(ship, context);
      }
    });
  }
}