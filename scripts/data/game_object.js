
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
}