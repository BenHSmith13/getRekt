/**
 * Created by bensmith on 1/30/17.
 */

class GameLoop {
  constructor() {
    this.height = 600;
    this.width = 700;
    this.initTime = null;
    this.oldTime = 0;
    this.canvas = null;
    this.state = null;
    this.menu = null;
    this.keys = null;
    this.objects = null;
    this.character = null;
    this.score = 0;
  }

  startGame(firstTime) {
    this.initTime = performance.now();
    this.canvas = new Canvas(this.height, this.width);
    this.canvas.create();

    this.state = new State(this.height, this.width);
    this.menu = new Menu(() => this.restartGame());
    if (firstTime) { this.menu.isActive = true; }
    // Initialize other game objects

    const input = new Input();
    this.keys = input.keysdown;

    this.objects = new GameObjects(this.height, this.width);
    this.gameLoop()
  }

  restartGame() {
    // Restart stuff
    this.initTime = performance.now();
    this.menu.isActive = false;
  //  TODO: reset all other values
  }

  displayTime(miliseconds) {
    const seconds = parseInt(miliseconds / 1000);
    const minutes = parseInt(seconds / 60);
    const displaySeconds = seconds - minutes * 60;
    return `${minutes}:${displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}`;
  }

  displayLives() {
    if (this.state.lives < 3) {
      document.getElementById('life03').style.display = 'none';
    }
    if (this.state.lives < 2) {
      document.getElementById('life02').style.display = 'none';
    }
    if (this.state.lives < 1) {
      document.getElementById('life01').style.display = 'none';
    }
  }

  render(timelapse) {
    this.canvas.clear();
    this.canvas.drawBackground();
    // this.canvas.drawParticles(null);
    this.canvas.drawPlatforms(this.objects.platformPool);
    this.canvas.drawBullets(this.objects.bulletPool);
    this.canvas.drawRect(this.objects.player);
    this.canvas.drawParticles(null);

    if (this.menu.isActive) {
      this.canvas.drawMenu(this.menu);
    } else if(this.state.lives <= 0) {
      this.canvas.gameOver();
    } else if (this.state.countDown > 0) {
      this.canvas.countDown(parseInt(this.state.countDown) + 1);
    }
    document.getElementById('score').innerHTML = _.toString(this.state.score);
    this.displayLives();
  }

  update(deltaTime) {

    if (this.menu.isActive) {
    //  Do nothing, handled by menu
    } else if (this.state.countDown > 0 && !_.isNaN(deltaTime)) {
      this.state.countDown -= deltaTime / 1000;
    } else if (this.state.lives > 0) {
      const { player, platformPool, bulletPool } = this.objects;
      // this.state.updateParticles(null, deltaTime);
      this.state.updatePlatforms(platformPool, deltaTime);
      this.state.updateBullets(bulletPool, player, this.canvas.mousePosition, deltaTime);
      this.state.updatePlayer(player, deltaTime, this.keys);
      this.state.updateParticles(null, deltaTime);
    }
  }

  gameLoop(newTime) {
    const timeLapse = newTime - this.initTime;
    const deltaTime = newTime - this.oldTime;
    this.oldTime = newTime;
    this.update(deltaTime);
    this.render(timeLapse);

    window.requestAnimationFrame(this.gameLoop.bind(this));
  }
}
