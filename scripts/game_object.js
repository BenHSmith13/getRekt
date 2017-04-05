
class GameObject {
  constructor(
    name,
    height = 25,
    width = 25,
    xPos = 0,
    yPos = 0,
    attributes
  ) {
    if (attributes.src) {
      const image = new Image();
      image.src = src;
      this.image = image;
    }

    if (attributes.jumpPower) {
      this.update = (keysPressed, deltaTime) => this.updatePlayer(keysPressed, deltaTime);
    }

    this.name = name;
    this.height = height;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.attributes = attributes;
  }

  updatePlayer(keysPressed, deltaTime) {
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    // platform.xPos = platform.xPos - this.speed * timeMod;
    let { jumping, velocity, jumpPower } = this.attributes;

    if (!jumping && keysPressed[keyMap.space] && velocity === 0) {
      this.attributes.jumping = true;
      velocity = jumpPower*-1;
    }

    // update gravity
    if (velocity < 0) {
      velocity++;
    }
    else {
      // fall slower than you jump
      velocity += 2.0;
    }

    this.yPos += velocity;  // sorta working
    // this.yPos = this.yPos - velocity * timeMod; // make it move over a function of time?

    // stop at bottom of screen
    // will use collision detection at some point
    if (this.yPos + this.height >= 550) {
      this.yPos = 550 - this.height;
      this.attributes.jumping = false;
      velocity = 0;
    }
  }
}