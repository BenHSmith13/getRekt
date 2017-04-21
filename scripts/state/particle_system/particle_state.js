
class ParticleState {
  constructor(particles) {
    this.particles = particles;
  }

  explodeParticle(particle, timeMod) {
    particle.duration -= timeMod / 10;
    if (particle.duration <= 0) { particle.visible = false; }
  }

  bulletExplode(bullet) {
    let newParticle = _.sample(_.filter(this.particles, particle => !particle.visible));
    if (!newParticle) {
      newParticle = {};
      this.particles.push(newParticle)
    }
    newParticle.visible = true;
    newParticle.xPos = bullet.xPos;
    newParticle.yPos = bullet.yPos;
    newParticle.direction = 0;
    newParticle.speed = 0;
    newParticle.type = 'explosion';
    newParticle.duration = 1;
  }

  moveParticles(timeMod) {
    // have a file for each type ?
    _.forEach(this.particles, (particle) => {
      if (particle.visible) {
        if (particle.type === 'explosion') {
          this.explodeParticle(particle, timeMod);
        } else {
          // TODO: use this or huck it
          particle.xPos += particle.speed * Utils.sin(particle.direction) * timeMod;
          particle.yPos += particle.speed * Utils.cos(particle.direction) * timeMod;
          particle.duration -= timeMod / 10;
          particle.angle += particle.speed * timeMod * particle.rotationDirection;
          if (particle.duration <= 0) {
            particle.visible = false;
          }
        }
      }
    });
  }

  updateParticles(bullets, ships, player, timeMod) {
    this.moveParticles(timeMod);
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