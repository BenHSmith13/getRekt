
// maybe...
const playerTileWidth = 64;

class PlayerAssets {
  constructor() {
    this.sprites = new Image();
    this.sprites.src = './assets/player/player.png';
  }

  run01() {
    return {
      tile: this.sprites,
      frameX: 20,
      frameY: 175,
      width: playerTileWidth,
    }
  }

  run02() {
    return {
      tile: this.sprites,
      frameX: 105,
      frameY: 175,
      width: playerTileWidth,
    }
  }

  run03() {
    return {
      tile: this.sprites,
      frameX: 180,
      frameY: 175,
      width: playerTileWidth,
    }
  }

  run04() {
    return {
      tile: this.sprites,
      frameX: 255,
      frameY: 175,
      width: playerTileWidth,
    }
  }

  getAsset(playerState) {
    switch (playerState) {
      case 'standing':
        return this.standing();
      case 'run01':
        return this.run01();
      case 'run02':
        return this.run02();
      case 'run03':
        return this.run03();
      case 'run04':
        return this.run04();
      default:
        return this.standing();
    }
  }

  standing() {
    return {
      tile: this.sprites,
      frameX: 100,
      frameY: 100,
      width: playerTileWidth,
    }
  }
}