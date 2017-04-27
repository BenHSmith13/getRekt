
class Player {
  constructor() {
    this.name = 'Player';
    this.height = 40;
    this.width = 40;
    this.xPos = 315;
    this.yPos = 510;

    this.jumping = false;
    this.velocity = 0;
    this.jumpPower = 75;
    this.speed = 5;
    this.hp = 2500;
    this.totalHealth = 2500;

    this.state = 'running';
    this.animation = 0;
    this.reloadTime = 1;
    this.reload = this.reloadTime;
  }
}