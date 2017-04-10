
class PlatformDrawer {
  constructor(height, width, tileAssets) {
    this.height = height;
    this.width = width;
    this.tileAssets = tileAssets;
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

  drawPlatforms(platforms, context) {
    _.forEach(platforms, (platform) => {
      if (platform.attributes.visible) {
        // TODO: make me not suck
        const brick = this.tileAssets.ground();
        this.drawBrick(brick, context, platform.xPos, platform.yPos);

        if (platform.attributes.grass) {
          const grassImage = this.tileAssets.grass(platform.attributes.grass);
          this.drawBrick(grassImage, context, platform.xPos, platform.yPos - 50);
        }
      }
    });
  }
}