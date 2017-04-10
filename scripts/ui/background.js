const tileSize = 50;

class Background {
  constructor(height, width, tileAssets) {
    this.height = height;
    this.width = width;

    this.tileAssests = tileAssets;

    this.starSpots = this.generateStarSpots();
  }

  draw(context) {
  //  if we want any cool background effects this is the place to do it
    context.save();
    this.drawSky(context);
    this.drawStars(context);
    this.drawMoon(context);
    context.restore();
  }

  drawBrick(brick, context, x, y) {
    context.drawImage(
      brick.tile,
      brick.frameX,
      brick.frameY,
      brick.width,
      brick.width,
      x,
      y,
      tileSize,
      tileSize
    );
  }

  drawSky(context) {
    _.forEach(_.range(this.width / tileSize), (x) => {
      _.forEach(_.range(this.height / tileSize), (y) => {
        const sky = this.tileAssests.sky();
        this.drawBrick(sky, context, x * tileSize, y * tileSize);
      });
    });
  }

  drawMoon(context) {
    const moon = this.tileAssests.moon();
    this.drawBrick(moon, context, 10 * tileSize, 1 * tileSize);
  }

  drawStars(context) {
    _.forEach(this.starSpots, (spot) => {
      const star = this.tileAssests.stars(spot.star);
      this.drawBrick(star, context, spot.x * tileSize, spot.y * tileSize);
    });
  }

  generateStarSpots() {
    const spots = [];
    _.forEach(_.range(this.width / tileSize), (x) => {
      _.forEach(_.range(this.height / tileSize), (y) => {
        const star = _.random(3);
        if (star) {
          spots.push({ star, x, y });
        }
      });
    });
    return spots;
  }
}
