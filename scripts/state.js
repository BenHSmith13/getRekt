
class State {
  constructor (height, width) {
    this.height = height;
    this.width = width;
    this.speed = 20;

    this.countDown = 3;
    this.score = 0;
    this.lives = 3;
  }

  updatePosition(object, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
  }

  // this needs to be in a particle system
  updateParticles(particles, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
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

  saveScore() {
    const scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
      scores.push(this.score);
      localStorage.setItem('scores', JSON.stringify(scores));
    } else {
      localStorage.setItem('scores', JSON.stringify([this.score]))
    }
  }

  looseLife(){
    this.lives -= 1;
    if (this.lives <= 0) { this.saveScore(); }
    this.countDown = 3;
  }

  updateScore(something) {
    switch (something) {
      case 0:
      case 1:
        this.score += 5;
        break;
      case 2:
      case 3:
        this.score += 3;
        break;
      case 4:
      case 5:
        this.score += 2;
        break;
      case 6:
      case 7:
        this.score += 1;
        break;
    }
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

  collisions(ball, paddle, bricks, brickParticles) {
  //  Collision detection here
  }
}
