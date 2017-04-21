
class PlayerState {
  constructor(height) {
    this.strideTime = 1;
    this.stride = this.strideTime;

    this.bottom = height - 50;
    this.gravityModifier = 5; // BIGGER means faster up and down
  }

  run(player, timeMod) {
    this.stride -= timeMod;
    if (this.stride <= 0) {
      this.stride = this.strideTime;
      player.animation = player.animation >= 3 ? 0 : player.animation + 1;
    }
  }

  jump(player, timeMod) {
    // update gravity
    if (player.velocity < 0) {
      player.velocity = player.velocity + this.gravityModifier;
    } else {
      // fall slower than you jump
      player.velocity += this.gravityModifier;
    }
    player.yPos += (player.velocity * timeMod);

    // stop at bottom of screen
    // will use collision detection at some point
    this.fallCollision(player)
  }

  fallCollision(player){
    // If no blocks then just along bottom
    if (player.yPos + player.height >= this.bottom) {
      player.yPos = this.bottom - player.height;
      player.state = 'running';
      player.velocity = 0;
    } else {
      let nearPlatforms = _.map(this.platforms, plat => {
        if(plat.xPos > 310 && plat.xPos < 350) {
          return plat;
        }
      });
      // If platform to land on??
      debugger
    }
  }

  updatePlayer(player, timeMod, keys, platforms) {
    this.platforms = platforms;
    // console.log(player.state);
    if (player.state === 'running') {
      this.run(player, timeMod);
    }
    if (player.state !== 'jumping' && keys[keyMap[localStorage.reconfigured]] && player.velocity === 0) {
      // console.log('CALLED');
      player.state = 'jumping';
      player.velocity = player.jumpPower * -1;
    }
    if (player.state === 'jumping') {
      this.jump(player, timeMod);
    }
  }
}