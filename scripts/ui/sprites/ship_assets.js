
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
     lightRunner: this.makeImage('./assets/ships/1.png'),
     scoutShip: this.makeImage('./assets/ships/2.png'),
     gunShip: this.makeImage('./assets/ships/10.png'),
   }
  }
}