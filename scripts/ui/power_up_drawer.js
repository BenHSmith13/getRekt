
class PowerUpDrawer {
  constructor() {
    this.heath = new Image();
    this.heath.src = 'assets/power_ups/repair.png';

    this.heavyBullet = new Image();
    this.heavyBullet.src = 'assets/power_ups/straight_gun.png';

    this.shotGun = new Image();
    this.shotGun.src = 'assets/power_ups/diagonal_gun.png';

    this.bomb = new Image();
    this.bomb.src = 'assets/power_ups/missile.png';
  }

  drawPowerUps(powerUps, context) {
    context.save();
    _.forEach(powerUps, (ups) => {
      if (ups.visible) {
        switch (ups.type) {
          case 'health':
            context.drawImage(this.heath, ups.xPos, ups.yPos, 20, 20);
            break;
          case 'heavyBullet':
            context.drawImage(this.heavyBullet, ups.xPos, ups.yPos, 20, 20);
            break;
          case 'shotGun':
            context.drawImage(this.shotGun, ups.xPos, ups.yPos, 20, 20);
            break;
          case 'bomb':
            context.drawImage(this.bomb, ups.xPos - 10, ups.yPos - 15, 40, 40);
            break;
        }
      }
    });
    context.restore();
  }
}