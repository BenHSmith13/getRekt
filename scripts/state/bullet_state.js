
class BulletState {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.reloadTime = 3;
    this.bulletSpeed = 90;
  }

  getMouseAngle(player, mousePosition) {
    return  Math.atan2(mousePosition.yPos - player.yPos, mousePosition.xPos - player.xPos) * 180 / Math.PI;
  }

  updateBullets(bullets, player, mousePosition, timeMod) {
    _.forEach(bullets, (bullet) => {
      if (bullet.attributes.visible) {
        bullet.xPos = bullet.xPos + ( Utils.cos(bullet.attributes.direction) * this.bulletSpeed ) * timeMod;
        bullet.yPos = bullet.yPos + ( Utils.sin(bullet.attributes.direction) * this.bulletSpeed ) * timeMod;
        if (bullet.xPos + bullet.width < 0
          || bullet.xPos - bullet.width > this.width
          || bullet.yPos + bullet.height < 0
          || bullet.yPos - bullet.height > this.height) {
          bullet.attributes.visible = false;
        }
      }
    });

    if (this.reloadTime < 0 ) {
      this.reloadTime = 1;
      let newBullet = _.sample(_.filter(bullets, bullet => !bullet.attributes.visible));
      if (!newBullet) {
        //  make a new bullet
        const nameIndex = _.size(bullets);
        newBullet = GameObjects.newBullet(nameIndex);
        bullets[`bullet_${nameIndex}`] = newBullet;
        // console.log('new Bullet');
      } else {
        newBullet.attributes.visible = true;
        newBullet.attributes.direction = this.getMouseAngle(player, mousePosition);
        newBullet.xPos = player.xPos + player.width / 2;
        newBullet.yPos = player.yPos + player.height / 2;
      }
    } else {
      this.reloadTime -= timeMod;
    }
  }
}
