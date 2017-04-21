class ExplosionAssets {
  constructor() {
    this.explosions = new Image;
    this.explosions.src = './assets/explosionFull.png';
    this.tileSize = 256;

    this.tiles = this.generateTiles();
  }

  generateTiles() {
    const tiles = [];
    _.forEach(_.range(4), row => {
      _.forEach(_.range(8), col => {
        tiles.push({
          tile: this.explosions,
          frameX: col * this.tileSize,
          frameY: row * this.tileSize,
          width: this.tileSize,
        });
      });
    });
    return tiles;
  }

}