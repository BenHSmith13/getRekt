
class PlayerState {
  constructor() {
    this.strideTime = 1;
    this.stride = this.strideTime;
  }

  changeStride(stride) {
    if (stride === 'run01') { return 'run02'; }
    else if (stride === 'run02') { return 'run03'; }
    else if (stride === 'run03') { return 'run04'; }
    else if (stride === 'run04') { return 'run01'; }
  }

  run(player, timeMod) {
    this.stride -= timeMod;
    if (this.stride <= 0) {
      this.stride = this.strideTime;
      // For some reason If I put this in if statements it breaks??
      player.setState(this.changeStride(player.state));
    }
  }

  updatePlayer(player, timeMod, keys) {
    // TODO: if not jumping
    this.run(player, timeMod);
  }

  // TODO: this is the jumping code, incorporate it
  jump(keysPressed, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 1000 : 0;
    const gravityModifier = 5; // BIGGER means faster up and down

    if (!this.attributes.jumping && keysPressed[keyMap[localStorage.reconfigured]] && this.attributes.velocity === 0) {
      this.attributes.jumping = true;
      this.attributes.velocity = this.attributes.jumpPower*-1;
    }

    // update gravity
    if (this.attributes.velocity < 0) {
      this.attributes.velocity = this.attributes.velocity + gravityModifier;
    }
    else {
      // fall slower than you jump
      this.attributes.velocity += gravityModifier;
    }

    this.yPos += (this.attributes.velocity * timeMod);

    // stop at bottom of screen
    // will use collision detection at some point
    if (this.yPos + this.height >= 550) {
      this.yPos = 550 - this.height;
      this.attributes.jumping = false;
      this.attributes.velocity = 0;
    }
  }
}