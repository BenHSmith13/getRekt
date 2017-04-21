
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
