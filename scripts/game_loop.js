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

  startGame(firstTime) {
    this.initTime = performance.now();
    this.canvas = new Canvas(this.height, this.width);
    this.canvas.create();

    this.objects = new GameObjects(this.height, this.width);
    this.state = new State(this.height, this.width, this.objects.particles);
    this.menu = new Menu(() => this.restartGame());
    if (firstTime) { this.menu.isActive = true; }
    // Initialize other game objects

    const input = new Input();
    this.keys = input.keysdown;

    this.gameLoop()
  }

  restartGame() {
    // Restart stuff
    this.initTime = performance.now();
    this.menu.isActive = false;
  //  TODO: reset all other values
  }

  render(timelapse) {
    this.canvas.clear();

    const { player, platformPool, bulletPool, shipPool, particles } = this.objects;
    const data = {
      ships: shipPool,
      platforms: platformPool,
      player,
      bullets: bulletPool,
      particles,
      menu: this.menu,
    };
    this.canvas.draw(data);

    // if(player.hp <= 0) {
    //   this.canvas.gameOver();
    // } else if (this.state.countDown > 0) {
    //   this.canvas.countDown(parseInt(this.state.countDown) + 1);
    // }
    document.getElementById('score').innerHTML = _.toString(this.state.score);
  }

  update(deltaTime) {

    if (this.menu.isActive) {
    //  Do nothing, handled by menu
    } else if (this.state.countDown > 0 && !_.isNaN(deltaTime)) {
      this.state.countDown -= deltaTime / 1000;
    } else {
      const { player, platformPool, bulletPool, shipPool } = this.objects;
      const data = {
        keys: this.keys,
        player,
        deltaTime,
        platforms: platformPool,
        bullets: bulletPool,
        ships: shipPool,
        mousePosition: this.canvas.mousePosition,
      };

      this.state.updateState(data);
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
