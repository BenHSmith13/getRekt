
class BulletState {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getMouseAngle(player, mousePosition) {
    return  Math.atan2(mousePosition.yPos - player.yPos, mousePosition.xPos - player.xPos) * 180 / Math.PI;
  }

  moveBullets(bullets, timeMod) {
    _.forEach(bullets, (bullet) => {
      if (bullet.visible) {
        bullet.prevXPos = bullet.xPos;
        bullet.prevYPos = bullet.yPos;
        bullet.xPos = bullet.xPos + ( Utils.cos(bullet.direction) * bullet.bulletSpeed ) * timeMod;
        bullet.yPos = bullet.yPos + ( Utils.sin(bullet.direction) * bullet.bulletSpeed ) * timeMod;
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
      // TODO: extract this
      let newBullet = _.sample(_.filter(bullets, bullet => !bullet.visible));
      if (!newBullet) {
        //  make a new bullet
        const nameIndex = _.size(bullets);
        newBullet = BulletPool.newBullet(nameIndex);
        bullets[`bullet_${nameIndex}`] = newBullet;
        // console.log('new Bullet');
      } else {
        newBullet.visible = true;
        newBullet.owner = 'player';
        newBullet.direction = this.getMouseAngle(player, mousePosition);
        newBullet.xPos = player.xPos + player.width / 2;
        newBullet.prevXPos = player.xPos + player.width / 2;
        newBullet.yPos = player.yPos + player.height / 2;
        newBullet.prevYPos = player.yPos + player.height / 2;
      }
    } else {
      player.reload -= timeMod;
    }
  }

  shipBullets(bullets, ships, timeMod) {
    _.forEach(ships, (ship) => {
      if (ship.visible) {
        if (ship.reload < 0) {
          ship.reload = ship.reloadTime;
          let newBullet = _.sample(_.filter(bullets, bullet => !bullet.visible));
          if (!newBullet) {
            //  make a new bullet
            const nameIndex = _.size(bullets);
            newBullet = BulletPool.newBullet(nameIndex);
            bullets[`bullet_${nameIndex}`] = newBullet;
            // console.log('new Bullet');
          } else {
            newBullet.visible = true;
            if (_.isFunction(ship.bulletDirection)) {
              newBullet.direction = ship.bulletDirection();
            } else {
              newBullet.direction = ship.bulletDirection;
            }
            newBullet.owner = ship.type;
            newBullet.prevXPos = ship.xPos + ship.width / 2;
            newBullet.xPos = ship.xPos + ship.width / 2;
            newBullet.prevYPos = ship.yPos + ship.height / 2;
            newBullet.yPos = ship.yPos + ship.height / 2;
          }
        } else {
          ship.reload -= timeMod;
        }
      }
    });
  }

  updateBullets(bullets, player, ships, mousePosition, timeMod){
    this.moveBullets(bullets, timeMod);
    this.playerBullets(bullets, player, mousePosition, timeMod);
    this.shipBullets(bullets, ships, timeMod);
  }
}