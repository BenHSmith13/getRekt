
class BulletDrawer {
  constructor() {
    this.bulletAsset = new BulletAssets();
  }

  drawBullet(bullet, context) {
    const asset = this.bulletAsset.playerShot();
    context.save();
    context.translate(bullet.xPos, bullet.yPos);
    context.rotate(Utils.degToRad(bullet.direction + 90));
    context.translate(-bullet.xPos, -bullet.yPos);
    context.drawImage(
      asset.tile,
      asset.frameX,
      asset.frameY,
      asset.width,
      asset.height,
      bullet.xPos,
      bullet.yPos,
      bullet.width,
      bullet.height
    );
    context.restore();
  }

  drawBullets(bullets, context) {
    _.forEach(bullets, (bullet) => {
      if (bullet.visible) {
        this.drawBullet(bullet, context);
      }
    });
  }
}