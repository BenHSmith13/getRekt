
const initialPlatforms = 16;

class GameObjects {
  constructor(height, width) {
    const shipPool = new ShipPool();
    const bulletPool = new BulletPool();
    const particlePool = new ParticlePool();

    this.player = new Player();

    this.platformPool = this.generatePlatforms(height, width);
    this.bulletPool = bulletPool.generateBullets();
    this.shipPool = shipPool.generateShips();
    this.particles = particlePool.particles;
  }

  reset() {
    // TODO: there may be more values I need to reset
    this.player.hp = this.player.totalHealth;
    this.player.currentBulletType = 'normal';
    _.forEach(this.bulletPool, (bullet) => { bullet.visible = false; });
    _.forEach(this.shipPool, (ship) => { ship.visible = false; });
    _.forEach(this.particles, (particle) => { particle.visible = false; });
  }

  static newPlatform(height, width, index, level = 0, offscreen ) {
    return new GameObject(
      `platform_${index}`,
      50,
      50,
      offscreen ? width : width / 14 * index,
      height - 50 * (level + 1),
      {
        color: 'brown',
        visible: true,
        grass: _.random(2),
      }
    );
  }

  generatePlatforms(height, width) {
    const platforms = {};
    _.forEach(_.range(initialPlatforms), (index) => {
      platforms[`platform_${index}`] = GameObjects.newPlatform(height, width, index);
    });
    return platforms;
  }
}
