
class Canvas {
  constructor(height, width) {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style = 'padding: 20px';
    this.context = null;
    this.mousePosition = {
      xPos: 0,
      yPos: 0,
    };

    this.tileAssets = new TileAssets();
    this.background = new Background(height, width, this.tileAssets);
    this.shipDrawer = new ShipDrawer();
    this.platformDrawer = new PlatformDrawer(height, width, this.tileAssets);
    this.playerDrawer = new PlayerDrawer();
    this.bulletDrawer = new BulletDrawer();
    this.particleDrawer = new ParticleDrawer();
    this.menuDrawer = new MenuDrawer(height, width);
  }

  create() {
    this.context = this.canvas.getContext("2d");
    const rect = this.canvas.getBoundingClientRect();
    // TODO: make this a named function to clean up, maybe
    this.canvas.addEventListener('mousemove', (e) => {
      this.mousePosition.xPos = e.clientX - rect.left;
      this.mousePosition.yPos = e.clientY - rect.top;
    });
  }

  draw(data){
    this.background.draw(this.context);
    this.shipDrawer.drawShips(data.ships, this.context);
    this.platformDrawer.drawPlatforms(data.platforms, this.context);
    if (data.player.hp > 0) {
      this.playerDrawer.drawPlayer(data.player, this.context);
      this.playerDrawer.drawPlayerHealth(data.player, object => this.drawRect(object), this.context);
    }
    this.bulletDrawer.drawBullets(data.bullets, this.context);
    this.particleDrawer.drawParticles(data.particles, this.context);
    this.drawScore(data.score);
    this.menuDrawer.drawMenu(data.menu, this.context, data.configs);
  }

  drawScore(score) {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.font = "20px 'Press Start 2P'";
    this.context.fillText(score, 40, 30);
    this.context.restore();
  }

  drawRect(object) {
    this.context.save();
    this.context.fillStyle = object.attributes.color;
    if (object.attributes.angle) {
      this.rotateObject(object);
    }
    this.context.fillRect(
      object.xPos,
      object.yPos,
      object.width,
      object.height);
    this.context.stroke();
    this.context.restore();
  }

  clear() {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  rotateObject(object){
    this.context.translate(object.xPos, object.yPos);
    this.context.rotate(Utils.degToRad(object.attributes.angle));
    this.context.translate(-object.xPos, -object.yPos);
  }
}
