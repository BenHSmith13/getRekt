
class ExplosionDrawer {
  constructor () {
    this.explosionAssets = new ExplosionAssets();
    this.explodeWidth = 64;
  }

  drawExplosion(particle, context) {
    const thing = 1 / 32;
    const index = 1 - particle.duration / thing;
    const explosion = _.nth(this.explosionAssets.tiles, parseInt(index));
    if (explosion) {
      context.save();
      context.drawImage(
        explosion.tile,
        explosion.frameX,
        explosion.frameY,
        explosion.width,
        explosion.width,
        particle.xPos,
        particle.yPos,
        this.explodeWidth,
        this.explodeWidth
      );
      context.restore();
    }
  }
}
