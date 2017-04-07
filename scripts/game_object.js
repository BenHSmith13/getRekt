
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
    const timeMod = deltaTime ? deltaTime / 1000 : 0;
    const gravityModifier = 5;

    if (!this.attributes.jumping && keysPressed[keyMap.space] && this.attributes.velocity === 0) {
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