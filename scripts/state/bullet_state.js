
class BulletState {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getMouseAngle(player, mousePosition) {
    return  Math.atan2(mousePosition.yPos - (player.yPos + player.height / 2 - 30), mousePosition.xPos - (player.xPos + player.width / 2)) * 180 / Math.PI;
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

  makeNewPlayerBullet(bullets, player, mousePosition, directionMod) {
    let newBullet = _.sample(_.filter(bullets, bullet => !bullet.visible));
    if (!newBullet) {
      const nameIndex = _.size(bullets);
      newBullet = BulletPool.newBullet(nameIndex);
      bullets[`bullet_${nameIndex}`] = newBullet;
    } else {
      newBullet.visible = true;
      newBullet.owner = 'player';
      newBullet.type = player.currentBulletType;
      newBullet.height = 30;
      newBullet.width = 15;
      newBullet.direction = this.getMouseAngle(player, mousePosition) + directionMod;
      newBullet.xPos = player.xPos + player.width / 2;
      newBullet.yPos = player.yPos + player.height / 2 - 30;
      newBullet.prevXPos = newBullet.xPos;
      newBullet.prevYPos = newBullet.yPos;
    }
  }

  playerBullets(bullets, player, mousePosition, sounds, timeMod) {
    if (player.hp <= 0) { return; }
    if (player.reload < 0 ) {
      player.reload = player.reloadTime;
      sounds.playLaser01();
      this.makeNewPlayerBullet(bullets, player, mousePosition, 0);
      if (player.currentBulletType === 'shotGun') {
        this.makeNewPlayerBullet(bullets, player, mousePosition, 20);
        this.makeNewPlayerBullet(bullets, player, mousePosition, -20);
      }
    } else {
      player.reload -= timeMod;
    }
  }

  shipBullets(bullets, ships, player, sounds, timeMod) {
    _.forEach(ships, (ship) => {
      if (ship.visible) {
        if (ship.reload < 0) {
          ship.reload = ship.reloadTime;
          sounds.playLaser05();
          let newBullet = _.sample(_.filter(bullets, bullet => !bullet.visible));
          if (!newBullet) {
            const nameIndex = _.size(bullets);
            newBullet = BulletPool.newBullet(nameIndex);
            bullets[`bullet_${nameIndex}`] = newBullet;
          } else {
            newBullet.visible = true;
            if (_.isFunction(ship.bulletDirection)) {
              newBullet.direction = ship.bulletDirection(ship, player);
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

  updateBullets(bullets, player, ships, mousePosition, sounds, timeMod, currentBulletType){
    this.moveBullets(bullets, timeMod);
    this.playerBullets(bullets, player, mousePosition, sounds, timeMod, currentBulletType);
    this.shipBullets(bullets, ships, player, sounds, timeMod);
  }
}
