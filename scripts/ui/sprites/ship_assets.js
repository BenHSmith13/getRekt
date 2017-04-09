
class ShipAssets {
  constructor() {
    this.ships = this.makeShipList();
  }

  getAsset(shipName) {
    return this.ships[shipName];
  }

  makeImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  }

  makeShipList() {
   return {
     lightRunner: this.makeImage('./assets/lightRunner.png'),
     scoutShip: this.makeImage('./assets/2.png'),
   }
  }
}