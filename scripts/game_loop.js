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
    this.sounds = null;
  }

  backgroundMusic(){

  }

  startGame(firstTime) {
    this.initTime = performance.now();
    this.canvas = new Canvas(this.height, this.width);
    this.canvas.create();
    this.sounds = new GameSounds();

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
    // TODO: Make this cleaner, canvas needs to be a system
    this.canvas.drawPlatforms(this.objects.platformPool);
    this.canvas.drawBullets(this.objects.bulletPool);
    this.canvas.drawRect(this.objects.player);
    // this.canvas.drawShips(this.objects.shipPool);

    // TODO: move all drawing into this draw function
    const { player, platformPool, bulletPool, shipPool } = this.objects;
    const data = {
      ships: shipPool,
    };
    this.canvas.draw(data);

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
      const { player, platformPool, bulletPool, shipPool } = this.objects;
      const data = {
        player,
        platforms: platformPool,
        bullets: bulletPool,
        ships: shipPool,
        mousePosition: this.canvas.mousePosition,
      };

      this.state.updateState(data, deltaTime);
      this.state.updatePlayer(player, deltaTime, this.keys);
    }
  }

  gameLoop(newTime) {
    const timeLapse = newTime - this.initTime;
    const deltaTime = newTime - this.oldTime;
    this.oldTime = newTime;
    this.update(deltaTime);

    // This is just example of how the sound works.
    // We call this when ships explode for example.
    if(timeLapse > 3000 && timeLapse < 5000){
      this.sounds.getSound('explosion').play()
    }

    this.render(timeLapse);

    window.requestAnimationFrame(this.gameLoop.bind(this));
  }
}
