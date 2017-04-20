
class BulletAssets {
  constructor() {
    this.sprites = new Image();
    this.sprites.src = './assets/beams.png';
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


}