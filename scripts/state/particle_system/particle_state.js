
class ParticleState {
  constructor() {

  }

  // this needs to be in a particle system
  updateParticles(particles, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    // Switch over different particle types
    // have a file for each type

    _.forEach(particles, (particle) => {
      if (particle.attributes.visible) {
        particle.xPos += this.ballSpeed * Utils.sin(particle.attributes.direction) * timeMod;
        particle.yPos += this.ballSpeed * Utils.cos(particle.attributes.direction) * timeMod;
        particle.attributes.duration -= timeMod / 10;
        particle.attributes.angle += this.ballSpeed * timeMod * particle.attributes.rotationDirection;
        if (particle.attributes.duration <= 0) {
          particle.attributes.visible = false;
        }
      }
    });
  }
}