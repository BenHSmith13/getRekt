
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
      frameX: 300,
      frameY: 210,
      width: 45,
      height: 100
    }
  }

  shotGun() {
    return {
      tile: this.sprites,
      frameX: 310,
      frameY: 25,
      width: 45,
      height: 100
    }
  }


}