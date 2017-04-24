
class PowerUpDrawer {
  constructor() {

  }

  drawPowerUps(powerUps, context) {
    context.save();
    context.fillStyle = 'green';
    _.forEach(powerUps, (ups) => {
      if (ups.visible) {
        context.fillRect(ups.xPos, ups.yPos, 20, 20);
      }
    });
    context.restore();
  }
}