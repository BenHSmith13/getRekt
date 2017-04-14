
class Ship {
  constructor(name) {
    this.name = name;
    this.xPos = -5;
    this.yPos = -5;
    this.height = 0;
    this.width = 0;
    this.type = '';

    this.visible = false;
    this.type = '';
    this.hp = 0;
    this.speed = 0;
    this.bulletType = 'normal';
    this.bulletDirection = 0;
    this.reloadTime = 1;
    this.reload = this.reloadTime;
  }
}