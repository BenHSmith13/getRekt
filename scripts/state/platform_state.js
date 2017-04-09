
class PlatformState {
  constructor (height, width) {
    this.height = height;
    this.width = width;
    this.speed = 20;
    this.platformLevels = {
      0: true,
      1: false,
      2: false,
    }
  }

  updatePlatforms(platforms, timeMod) {
    let furthestX = 0;
    _.forEach(platforms, (platform) => {
      if (platform.attributes.visible) {
        platform.xPos = platform.xPos - this.speed * timeMod;

        // this is check to see if we need to draw more squares
        const xDist = platform.xPos + platform.width;
        if (xDist > furthestX) { furthestX = xDist; }

        // disable platforms off the back
        if (platform.xPos + platform.width < 0) {
          platform.attributes.visible = false;
        }
      }
    });

    if (furthestX < this.width) {
      this.platformLevels[1] = this.platformLevels[1] ? !!_.random(2) : _.random(5) > 3;
      this.platformLevels[2] = this.platformLevels[1] && !!_.random();

      // Adds platforms to the end of the drawing scope
      _.forEach(this.platformLevels, (level, index) => {
        if (level) {
          let newPlatform = _.sample(_.filter(platforms, platform => !platform.attributes.visible));
          if (!newPlatform) {
            const nameIndex = _.size(platforms);
            platforms[`platform_${nameIndex}`] = GameObjects.newPlatform(this.height, this.width, nameIndex, parseInt(index), true);
          } else {
            newPlatform.xPos = this.width;
            newPlatform.yPos = this.height - 50 * (parseInt(index) + 1);
            newPlatform.attributes.visible = true;
          }
        }
      })
    }
  }
}