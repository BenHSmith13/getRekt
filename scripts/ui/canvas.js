
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
    }
    this.bulletDrawer.drawBullets(data.bullets, this.context);
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

  drawCircle(object) {
    this.context.save();
    this.context.beginPath();
    this.context.arc(object.xPos, object.yPos, object.width, 0, 2*Math.PI);
    this.context.fillStyle = _.get(object, 'attributes.color', 'blue');
    this.context.fill();
    this.context.stroke();
    this.context.restore();
  }

  countDown(n) {
    this.context.save();
    this.context.font = "300px 'Press Start 2P'";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText(n, this.canvas.width/2, this.canvas.height - this.canvas.height / 4);
    this.context.restore();
  }

  gameOver() {
    this.context.save();
    this.context.font = "100px 'Press Start 2P'";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Game", this.canvas.width/2, this.canvas.height/2 - 55);
    this.context.fillText("Over", this.canvas.width/2, this.canvas.height/2 + 55);
    this.context.restore();
  }

  clear() {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  drawParticles(particles) {
    _.forEach(particles, (particle) => {
      if (particle.attributes.visible) {
        this.drawRect(particle)
      }
    });
  }

  rotateObject(object){
    this.context.translate(object.xPos, object.yPos);
    this.context.rotate(Utils.degToRad(object.attributes.angle));
    this.context.translate(-object.xPos, -object.yPos);
  }

  drawMenu(menu) {
    this.context.save();
    this.context.font = "60px 'Press Start 2P'";
    this.context.textAlign = "center";
    this.context.fillStyle = menu.currentItem === menu.items.newGame ? "blue" : "white";
    this.context.fillText(menu.items.newGame, this.canvas.width/2, this.canvas.height/2 - 150);
    this.context.fillStyle = menu.currentItem === menu.items.highScores ? "blue" : "white";
    this.context.fillText(menu.items.highScores, this.canvas.width/2, this.canvas.height/2 - 50);
    this.context.fillStyle = menu.currentItem === menu.items.credits ? "blue" : "white";
    this.context.fillText(menu.items.credits, this.canvas.width/2, this.canvas.height/2 + 50);
    this.context.fillStyle = menu.currentItem === menu.items.reconfigure ? "blue" : "white";
    this.context.fillText(menu.items.reconfigure, this.canvas.width/2, this.canvas.height/2 + 150);
    this.context.restore();
  }
}