
class GameObjects {
  constructor(height, width) {
    this.palyer = this.newPlayer(height, width);
    this.particleCount = 40;
  }

  newPlayer(height, width) {
    return new GameObject(
      'player',
      25,
      25,
      width / 2 - 12,
      height /2 - 12,
      {}
    )
  }

  newParticle(index) {
    return new GameObject(`particle_${index}`, 2, 2, 0, 0,
      { visible: false, direction: 0, duration: 2, angle: 0, rotationDirection: 0, color: 'white' }
    );
  }
}
