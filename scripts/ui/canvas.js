
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
    this.powerUpDrawer = new PowerUpDrawer();
  }

  create() {
    this.context = this.canvas.getContext("2d");
    const rect = this.canvas.getBoundingClientRect();
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
      this.drawPlayerHealth(data.player);
    }
    this.bulletDrawer.drawBullets(data.bullets, this.context);
    this.particleDrawer.drawParticles(data.particles, this.context);
    this.drawScore(data.score);
    this.menuDrawer.drawMenu(data.menu, this.context, data.configs);
    this.powerUpDrawer.drawPowerUps(data.powerUps, this.context);
  }

  drawScore(score) {
    this.context.save();
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.font = "20px 'Press Start 2P'";
    this.context.fillText(score, 40, 30);
    this.context.restore();
  }

  drawPlayerHealth(player) {
    const precentHealth = player.hp / player.totalHealth;
    this.drawRect(5, 555, 275, 35, 'black');
    this.drawRect(25, 560, 250 * precentHealth, 25, 'orangeRed');
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.font = "10px 'Press Start 2P'";
    this.context.fillText('H', 15, 570);
    this.context.fillText('P', 15, 585);
    this.context.fillText(player.hp, 150, 577);
  }

  drawRect(xPos, yPos, width, height, color) {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(xPos, yPos, width, height);
    this.context.stroke();
    this.context.restore();
  }

  clear() {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }
}
