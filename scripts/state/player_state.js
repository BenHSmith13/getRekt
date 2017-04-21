
class PlayerState {
  constructor(height) {
    this.strideTime = 1;
    this.stride = this.strideTime;

    this.bottom = height - 50;
    this.gravityModifier = 5; // BIGGER means faster up and down
  }

  run(player, timeMod, platforms) {
    this.stride -= timeMod;
    if (this.stride <= 0) {
      this.stride = this.strideTime;
      player.animation = player.animation >= 3 ? 0 : player.animation + 1;
    }
    this.fallCollision(player, platforms, timeMod, true)
  }

  jump(player, timeMod, platforms) {
    // update gravity
    if (player.velocity < 0) {
      player.velocity = player.velocity + this.gravityModifier;
      player.yPos += (player.velocity * timeMod);
    } else {
      // fall slower than you jump
      player.velocity += this.gravityModifier;
      this.fallCollision(player, platforms, timeMod, false)
    }
  }

  fallCollision(player, platforms, timeMod, running = null){
    if (running){
      const playerPosition = player.xPos + player.width / 2;
      const platsUnderFoot = this.platformUnderFoot(playerPosition, platforms);

      const myBlock = _.find(platsUnderFoot, platform => {
        if (platform.yPos == player.yPos + 40){
          return platform;
        }
      })
      if(!myBlock){
        player.state = 'jumping';
      }
    } else {
      // Jumping
      // If no blocks then just along bottom
      if (player.yPos + player.height >= this.bottom) {
        player.yPos = this.bottom - player.height;
        player.state = 'running';
        player.velocity = 0;
      }
      else {
        // If platform to land on??
        _.forEach(platforms, platform => {
          if(player.xPos + player.width >= platform.xPos
            && player.xPos <= platform.xPos + platform.width
            && player.yPos + player.height >= platform.yPos)
          {
            player.yPos = platform.yPos - player.height;
            player.state = 'running';
            player.velocity = 0;
          }
        })
      }
      player.yPos += (player.velocity * timeMod);
    }
  }

  platformUnderFoot(playerPosition, platforms) {
    return _.filter(platforms, plat => {
      if(playerPosition > plat.xPos && playerPosition < plat.xPos + plat.width) {
        return plat
      }
    });
  }

  updatePlayer(player, timeMod, keys, platforms) {
    if (player.state === 'running') {
      this.run(player, timeMod, platforms );
    }
    if (player.state !== 'jumping' && keys[keyMap[localStorage.reconfigured]] && player.velocity === 0) {
      player.state = 'jumping';
      player.velocity = player.jumpPower * -1;
    }
    if (player.state === 'jumping') {
      this.jump(player, timeMod, platforms);
    }
  }
}