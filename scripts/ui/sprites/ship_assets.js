
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
     battleShip: this.makeImage('./assets/ships/3.png'),
     heavyBattleShip: this.makeImage('./assets/ships/4.png'),
     heavyGunShip: this.makeImage('./assets/ships/5.png'),
     heavySpeeder: this.makeImage('./assets/ships/6.png'),
     brigadier: this.makeImage('./assets/ships/7.png'),
     speeder: this.makeImage('./assets/ships/9.png'),
     gunShip: this.makeImage('./assets/ships/10.png'),
     necroCruiser: this.makeImage('./assets/ships/12.png'),
     crusader: this.makeImage('./assets/ships/13.png'),
   }
  }
}