

class ShipState {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.spawnCounter = 20;
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
        // ship.yPos = ship.yPos * timeMod;
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
        newShip = GameObjects.newShip(nameIndex);
        ships[`ship_${nameIndex}`] = newShip;
        console.log('new Ship');
      } else {
        newShip.attributes.visible = true;
        // newShip.attributes.type = '';
        newShip.xPos = this.width;
        newShip.yPos = _.random(6) * 50;
        newShip.width = 100;
        newShip.height = 75;
      }
    } else {
      this.spawnCounter -= timeMod;
    }
  }
}