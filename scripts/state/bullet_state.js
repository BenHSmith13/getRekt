
class BulletState {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.bulletSpeed = 90;
  }

  getMouseAngle(player, mousePosition) {
    return  Math.atan2(mousePosition.yPos - player.yPos, mousePosition.xPos - player.xPos) * 180 / Math.PI;
  }

  moveBullets(bullets, timeMod) {
    _.forEach(bullets, (bullet) => {
      if (bullet.visible) {
        bullet.xPos = bullet.xPos + ( Utils.cos(bullet.direction) * this.bulletSpeed ) * timeMod;
        bullet.yPos = bullet.yPos + ( Utils.sin(bullet.direction) * this.bulletSpeed ) * timeMod;
        if (bullet.xPos + bullet.width < 0
          || bullet.xPos - bullet.width > this.width
          || bullet.yPos + bullet.height < 0
          || bullet.yPos - bullet.height > this.height) {
          bullet.visible = false;
        }
      }
    });
  }

  playerBullets(bullets, player, mousePosition, timeMod) {
    if (player.reload < 0 ) {
      player.reload = player.reloadTime;
      let newBullet = _.sample(_.filter(bullets, bullet => !bullet.visible));
      if (!newBullet) {
        //  make a new bullet
        const nameIndex = _.size(bullets);
        newBullet = BulletPool.newBullet(nameIndex);
        bullets[`bullet_${nameIndex}`] = newBullet;
        // console.log('new Bullet');
      } else {
        newBullet.visible = true;
        newBullet.direction = this.getMouseAngle(player, mousePosition);
        newBullet.xPos = player.xPos + player.width / 2;
        newBullet.yPos = player.yPos + player.height / 2;
      }
    } else {
      player.reload -= timeMod;
    }
  }

  shipBullets(bullets, ships, timeMod) {

  }

  updateBullets(bullets, player, ships, mousePosition, timeMod){
    this.moveBullets(bullets, timeMod);
    this.playerBullets(bullets, player, mousePosition, timeMod);
    this.shipBullets(bullets, ships, timeMod);
  }
}
