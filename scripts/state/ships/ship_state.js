

class ShipState {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.shipDirectory = new ShipDirectory();

    this.spawnCounter = 40;
    this.spawnRate = this.spawnCounter;
  }

  // TODO: generic up this function
  outOfScope(ship) {
    return ship.xPos + ship.width < 0
      || ship.xPos - ship.width > this.width
      || ship.yPos + ship.height < 0
      || ship.yPos - ship.height > this.height
  }

  updateShips(ships, timeMod) {
    _.forEach(ships, (ship) => {
      if (ship.attributes.visible) {
        ship.xPos = ship.xPos - ship.attributes.speed * timeMod;
        if (this.outOfScope(ship)) {
          ship.attributes.visible = false;
        }
      }
    });

    // adds new ship to the screen
    if (this.spawnCounter < 0 ) {
      this.spawnCounter = this.spawnRate;
      // TODO: this might also be genericicized
      let newShip = _.sample(_.filter(ships, ship => !ship.attributes.visible));
      if (!newShip) {
        //  make a new ship
        const nameIndex = _.size(ships);
        newShip = ShipPool.newShip(nameIndex);
        ships[`ship_${nameIndex}`] = newShip;
        console.log('new Ship');
      } else {
        // TODO: clean me up
        const shipData = this.shipDirectory.getRandomShip();
        newShip.attributes.visible = true;
        // newShip.attributes.type = '';
        newShip.xPos = this.width;
        newShip.yPos = _.random(6) * 50;
        newShip.width = shipData.width;
        newShip.height = shipData.height;
        // TODO: not merge
        newShip.attributes = _.merge(newShip.attributes, shipData);
      }
    } else {
      this.spawnCounter -= timeMod;
    }
  }
}
