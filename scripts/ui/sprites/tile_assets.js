const tileWidth = 32;

class TileAssets {
  constructor() {
    this.tiles = new Image;
    this.tiles.src = './assets/platformertiles.png';
  }

  sky() {
    return {
      tile: this.tiles,
      frameX: 3 * tileWidth + 1,
      frameY: 1 * tileWidth + 1,
      width: tileWidth - 2,
    }
  }

  moon() {
    return {
      tile: this.tiles,
      frameX: 3 * tileWidth + 0.5,
      frameY: 0 * tileWidth + 0.5,
      width: tileWidth - 1,
    }
  }

  stars(n) {
    // n should be 1, 2, or 3
    return {
      tile: this.tiles,
      frameX: (4 + n) * tileWidth + 0.5,
      frameY: 1 * tileWidth + 0.5,
      width: tileWidth - 1,
    }
  }

  ground() {
    return {
      tile: this.tiles,
      frameX: 1 * tileWidth,
      frameY: 0 * tileWidth + 0.5,
      width: tileWidth - 1,
    }
  }

}