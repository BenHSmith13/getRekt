
class ParticleDrawer {
  constructor() {
    this.explosionDrawer = new ExplosionDrawer();
  }

  drawParticles(particles, context) {
    _.forEach(particles, (particle) => {
      if (particle.visible) {
        if (particle.type === 'explosion') {
          this.explosionDrawer.drawExplosion(particle, context);
        } else {
        //  TODO: I dunno
        }
      }
    })
  }
}