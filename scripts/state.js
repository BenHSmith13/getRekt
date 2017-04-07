
class State {
  constructor (height, width) {
    this.height = height;
    this.width = width;
    this.speed = 20;

    this.countDown = 3;
    this.score = 0;
    this.lives = 3;
    this.centerPlatforms = [];

    this.reloadTime = 3;
    this.bulletSpeed = 90;

    this.platformLevels = {
      0: true,
      1: false,
      2: false,
    }
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

  updatePlayer(player, deltaTime, keysPressed) {
    player.update(keysPressed, deltaTime);
  }

  updatePlatforms(platforms, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    let furthestX = 0;
    _.forEach(platforms, (platform) => {
      if (platform.attributes.visible) {
        platform.xPos = platform.xPos - this.speed * timeMod;

        // this is check to see if we need to draw more squares
        const xDist = platform.xPos + platform.width;
        if (xDist > furthestX) { furthestX = xDist; }

        // disable platforms off the back
        if (platform.xPos + platform.width < 0) {
          platform.attributes.visible = false;
        }
      }
    });

    if (furthestX < this.width) {
      this.platformLevels[1] = this.platformLevels[1] ? !!_.random(2) : _.random(5) > 3;
      this.platformLevels[2] = this.platformLevels[1] && !!_.random();

      // Adds platforms to the end of the drawing scope
      _.forEach(this.platformLevels, (level, index) => {
        if (level) {
          let newPlatform = _.sample(_.filter(platforms, platform => !platform.attributes.visible));
          if (!newPlatform) {
            const nameIndex = _.size(platforms);
            platforms[`platform_${nameIndex}`] = GameObjects.newPlatform(this.height, this.width, nameIndex, parseInt(index), true);
          } else {
            newPlatform.xPos = this.width;
            newPlatform.yPos = this.height - 50 * (parseInt(index) + 1);
            newPlatform.attributes.visible = true;
          }
        }
      })
    }
  }

  getMouseAngle(player, mousePosition) {
    return  Math.atan2(mousePosition.yPos - player.yPos, mousePosition.xPos - player.xPos) * 180 / Math.PI;
  }

  updateBullets(bullets, player, mousePosition, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    _.forEach(bullets, (bullet) => {
      if (bullet.attributes.visible) {
        bullet.xPos = bullet.xPos + ( Utils.cos(bullet.attributes.direction) * this.bulletSpeed ) * timeMod;
        bullet.yPos = bullet.yPos + ( Utils.sin(bullet.attributes.direction) * this.bulletSpeed ) * timeMod;
        if (bullet.xPos + bullet.width < 0
          || bullet.xPos - bullet.width > this.width
          || bullet.yPos + bullet.height < 0
          || bullet.yPos - bullet.height > this.height) {
          bullet.attributes.visible = false;
        }
      }
    });

    if (this.reloadTime < 0 ) {
      this.reloadTime = 1;
      let newBullet = _.sample(_.filter(bullets, bullet => !bullet.attributes.visible));
      if (!newBullet) {
      //  make a new bullet
      } else {
        newBullet.attributes.visible = true;
        newBullet.attributes.direction = this.getMouseAngle(player, mousePosition);
        newBullet.xPos = player.xPos + player.width / 2;
        newBullet.yPos = player.yPos + player.height / 2;
      }
    } else {
      this.reloadTime -= timeMod;
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
