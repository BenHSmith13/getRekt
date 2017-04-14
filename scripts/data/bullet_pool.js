// TODO
class BulletPool {
  constructor() {
    this.initialBullets = 50;
  }

  static newBullet(index) {
    return new Bullet(`bullet_${index}`);
  }

  generateBullets() {
    const bullets = {};
    _.forEach(_.range(this.initialBullets), (index) => {
      bullets[`bullet_${index}`] = BulletPool.newBullet(index);
    });
    return bullets;
  }
}