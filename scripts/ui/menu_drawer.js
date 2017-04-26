
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

  countDown(menu, context) {
    context.save();
    context.font = "300px 'Press Start 2P'";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(parseInt(menu.countDown) + 1, this.width/2, this.height - this.height / 4);
    context.restore();
  }

  gameOver(menu, context) {
    context.save();
    context.font = "75px 'Press Start 2P'";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over", this.width/2, 150);
    context.fillText(`${_.map(menu.gameOverItems.initials, index => menu.alphabet[index]).join('')}`, this.width/2, this.height/2);

    if (!menu.gameOverItems.submit) {
      context.fillRect(235 + menu.gameOverItems.position * 75, this.height/2, 70, 25);
    }

    context.font = "50px 'Press Start 2P'";
    context.fillStyle = menu.gameOverItems.submit ? "blue" : "white";
    context.fillText("Submit Score", this.width/2, this.height - 100);
    context.restore();
  }

  highScores(menu, context) {
    const scores = _.orderBy(menu.highScores, 'score', 'desc');
    context.save();
    context.font = "50px 'Press Start 2P'";
    context.fillStyle = "white";
    context.textAlign = "center";
    _.forEach(scores, (score, index) => {
      context.fillText(`${score.name}      ${score.score}`, this.width/2, 75 + 75 * index);
    });
    context.restore();
  }

  reconfigure(menu, context, configs) {
    context.save();
    context.fillStyle = "white";
    context.textAlign = "center";
    context.font = "30px 'Press Start 2P'";
    context.fillText('Default Key Controls', this.width / 2, 75);
    context.font = "20px 'Press Start 2P'";
    context.fillText(`Jump:  'space bar'`, this.width/2, 150);

    context.font = "30px 'Press Start 2P'";
    context.fillText('Choose keyboard key', this.width/2, 300);
    context.fillText('and then hit enter', this.width/2, 350);
    context.font = "20px 'Press Start 2P'";
    context.fillText(`New Jump:  '${configs}'`, this.width/2, 425);
    context.restore();
  }

  credits(menu, context) {
    context.save();
    context.fillStyle = "white";
    context.textAlign = "center";
    context.font = "50px 'Press Start 2P'";
    context.fillText('Developed By', this.width/2, 75);
    context.font = "30px 'Press Start 2P'";
    context.fillText(`Ben Call  &  Ben Smith`, this.width/2, 150);

    context.font = "50px 'Press Start 2P'";
    context.fillText('Assets By', this.width/2, 280);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`https://opengameart.org/content/dirt-platformer-tiles`, this.width/2, 330);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`https://opengameart.org/content/spaceships-top-down`, this.width/2, 360);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`https://opengameart.org/content/lasers-and-beams`, this.width/2, 390);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`https://opengameart.org/content/explosion-sprite`, this.width/2, 420);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`http://soundbible.com/1986-Bomb-Exploding.html`, this.width/2, 450);
    context.font = "11px 'Press Start 2P'";
    context.fillText(`http://freemusicarchive.org/music/Jono_Bacon/`, this.width/2, 480);
    context.restore();
  }

  drawMenu(menu, context, configs) {
    switch (menu.screen) {
      case 'menu':
        this.menuScreen(menu, context);
        break;

      case 'countDown':
        this.countDown(menu, context);
        break;

      case 'highScores':
        this.highScores(menu, context);
        break;

      case 'gameOver':
        this.gameOver(menu, context);
        break;

      case 'credits':
        this.credits(menu, context);
        break;

      case 'reconfigure':
        this.reconfigure(menu, context, configs);
        break;

      case 'none':
      default:
        break;
    }
  }
}