
class ParticlePool {
  constructor() {
    this.particles = this.intitializeParticles();
  }

  intitializeParticles() {
    const initalCount = 100;

    return _.map(_.range(initalCount), (particle) => ({
      visible: false,
      xPos: -10,
      yPos: -10,
      direction: 0,
      speed: 1,
      type: 'normal',
      lifeSpan: 3,
      owner: null,
    }))
  }
}