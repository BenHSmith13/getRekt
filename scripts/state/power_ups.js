
class PowerUps {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.speed = 20;

    this.powerUps = {};
    this.initializePowerUps();

    this.types = ['health'];

    this.potentialSpawnRate = 5;
    this.spawnCounter = this.potentialSpawnRate;
  }

  getPowerUp() {
    let newPowerUp = _.sample(_.filter(this.powerUps, up => !up.visible));
    if (!newPowerUp) {
      const name = `powerUp_${_.size(this.powerUps)}`;
      newPowerUp = {
        name,
        visible: false,
        xPos: -5,
        yPos: -5,
        type: null,
        animationTime: 2,
        duration: 5,
      };
      this.powerUps[name] = newPowerUp;
    }
    return this.powerUps[newPowerUp.name];
  }

  initializePowerUps() {
    this.getPowerUp();
  }

  movePowerUps(timeMod) {
    _.forEach(this.powerUps, (pUp) => {
      if (pUp.visible) {
        pUp.xPos -= this.speed * timeMod;
      }
    });
  }

  generateNewPowerUp(timeMod) {
    this.spawnCounter -= timeMod / 10;
    if (this.spawnCounter <= 0) {
      this.spawnCounter = this.potentialSpawnRate;
      if (_.random()) {
        console.log('POWERING UP');
        const powerUp = this.getPowerUp();
        powerUp.visible = true;
        powerUp.xPos = this.width + 25;
        powerUp.yPos = this.height - (75 + 50 * _.random(3));
        powerUp.type = _.nth(this.types, _.random(this.types.length - 1));
      }
    }
  }

  updatePowerUps(timeMod) {
    this.movePowerUps(timeMod);
    this.generateNewPowerUp(timeMod);
  }
}