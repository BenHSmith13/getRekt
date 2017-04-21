
class MenuDrawer {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  menuScreen(menu, context) {
    context.save();
    context.font = "60px 'Press Start 2P'";
    context.textAlign = "center";
    context.fillStyle = menu.currentItem === menu.menuItems.newGame ? "blue" : "white";
    context.fillText(menu.menuItems.newGame, this.width/2, this.height/2 - 150);
    context.fillStyle = menu.currentItem === menu.menuItems.highScores ? "blue" : "white";
    context.fillText(menu.menuItems.highScores, this.width/2, this.height/2 - 50);
    context.fillStyle = menu.currentItem === menu.menuItems.credits ? "blue" : "white";
    context.fillText(menu.menuItems.credits, this.width/2, this.height/2 + 50);
    context.fillStyle = menu.currentItem === menu.menuItems.reconfigure ? "blue" : "white";
    context.fillText(menu.menuItems.reconfigure, this.width/2, this.height/2 + 150);
    context.restore();
  }

  gameOver(menu, context) {
    context.save();
    context.font = "100px 'Press Start 2P'";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game", this.canvas.width/2, this.canvas.height/2 - 55);
    context.fillText("Over", this.canvas.width/2, this.canvas.height/2 + 55);
    context.restore();
  }

  drawMenu(menu, context) {
    switch (menu.screen) {
      case 'menu':
        this.menuScreen(menu, context);
        break;

      case 'highScores':
        // TODO:
        break;

      case 'gameOver':
        this.gameOver(menu, context);
        break;

      case 'none':
      default:
        break;
    }
  }
}