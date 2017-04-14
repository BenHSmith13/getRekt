// TODO
class Bullet {
  constructor(name) {
    this.name = name;
    this.height = 5;
    this.width = 5;
    this.xPos = -10;
    this.yPos = -10;
    this.visible = false;
    this.bulletSpeed = 90;

    this.direction = 0;
    this.owner = null;
  }
}