
class BulletAssets {
  constructor() {
    this.sprites = new Image();
    this.sprites.src = './assets/beams.png';
  }

  shipShot() {
    return {
      tile: this.sprites,
      frameX: 25,
      frameY: 300,
      width: 45,
      height: 75
    }
  }

  playerShot() {
    return {
      tile: this.sprites,
      frameX: 310,
      frameY: 25,
      width: 45,
      height: 100
    }
  }

  heavyShot() {
    return {
      tile: this.sprites,
      frameX: 215,
      frameY: 300,
      width: 45,
      height: 100
    }
  }

  shotGun() {
    return {
      tile: this.sprites,
      frameX: 235,
      frameY: 215,
      width: 45,
      height: 75
    }
  }

  bombShot() {
    return {
      tile: this.sprites,
      frameX: 230,
      frameY: 95,
      width: 50,
      height: 100
    }
  }

  precisionShot() {
    return {
      tile: this.sprites,
      frameX: 120,
      frameY: 220,
      width: 45,
      height: 75
    }
  }


}