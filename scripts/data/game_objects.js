
const initialPlatforms = 16;
const initialBullets = 50;
const initialShips = 5;

class GameObjects {
  constructor(height, width) {
    const shipPool = new ShipPool();
    this.player = new Player();
    
    this.platformPool = this.generatePlatforms(height, width);
    this.bulletPool = this.generateBullets();
    this.shipPool = shipPool.generateShips();
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

  static newBullet(index) {
    return new GameObject(
      `bullet_${index}`,
      5,
      5,
      -10,
      -10,
      {
        color: 'blue',
        visible: false,
        direction: 0,
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

  generateBullets() {
    const bullets = {};
    _.forEach(_.range(initialBullets), (index) => {
      bullets[`bullet_${index}`] = GameObjects.newBullet(index);
    });
    return bullets;
  }

  newParticle(index) {
    return new GameObject(`particle_${index}`, 2, 2, 0, 0,
      { visible: false, direction: 0, duration: 2, angle: 0, rotationDirection: 0, color: 'white' }
    );
  }
}
