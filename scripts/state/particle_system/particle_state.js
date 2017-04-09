
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

  // This also needs to go in a particle System
  activateParticles(brick, particles) {
    const visibleParticles = _.filter(particles, particle => !particle.attributes.visible);
    _.forEach(particles, (particle, index) => {
      particle.attributes.direction = Utils.random(360);
      particle.attributes.rotationDirection = Utils.random(1, -1);
      particle.attributes.angle = 0;
      particle.attributes.duration = 2;
      particle.attributes.color = brick.attributes.color;
      particle.attributes.visible = true;
    });
  }
}