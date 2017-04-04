
const initialPlatforms = 16;

class GameObjects {
  constructor(height, width) {
    this.player = this.newPlayer(height, width);
    this.shipPool = {};
    this.platformPool = this.generatePlatforms(height, width);
    this.bulletPool = {};
  }

  newPlayer(height, width) {
    return new GameObject(
      'player',
      25,
      25,
      width / 2 - 12,
      height /2 - 12,
      {
        color: 'white',
      }
    )
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

  newParticle(index) {
    return new GameObject(`particle_${index}`, 2, 2, 0, 0,
      { visible: false, direction: 0, duration: 2, angle: 0, rotationDirection: 0, color: 'white' }
    );
  }
}
