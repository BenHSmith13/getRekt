
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
    this.fallCollision(player, platforms, timeMod)
  }

  jump(player, timeMod, platforms) {
    // update gravity
    if (player.velocity < 0) {
      player.velocity = player.velocity + this.gravityModifier;
    } else {
      // fall slower than you jump
      player.velocity += this.gravityModifier;
    }
    player.yPos += (player.velocity * timeMod);

    this.fallCollision(player, platforms, timeMod)
  }

  fallCollision(player, platforms, timeMod){
    // If no blocks then just along bottom
    if (player.yPos + player.height >= this.bottom) {
      player.yPos = this.bottom - player.height;
      player.state = 'running';
      player.velocity = 0;
    } else {
      // let nearPlatforms = [];
      //  _.forEach(platforms, plat => {
      //   if(plat.xPos > 255 && plat.xPos < 375) {
      //     nearPlatforms.push(plat);
      //   }
      // });
      // If platform to land on??

      _.forEach(platforms, np => {
        if(player.xPos + player.width >= np.xPos
          && player.xPos <= np.xPos + np.width
          && player.yPos + player.height >= np.yPos)
        {
          player.yPos = np.yPos - player.height;
          player.state = 'running';
          player.velocity = 0;
        }
      })
      // player.velocity += this.gravityModifier;
    }
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