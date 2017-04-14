
class PlayerDrawer {
  constructor() {
    this.playerAssets = new PlayerAssets();
  }

  drawPlayer(player, context) {
    const asset = this.playerAssets.getAsset(player.state);
    context.save();
    context.drawImage(
      asset.tile,
      asset.frameX,
      asset.frameY,
      asset.width,
      asset.width,
      player.xPos,
      player.yPos,
      player.width,
      player.height
    );
    context.restore();
  }
}