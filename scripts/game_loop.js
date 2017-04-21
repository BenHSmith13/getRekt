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
    this.score = 0;
    this.sounds = null;
  }

  startGame(firstTime) {
    this.initTime = performance.now();
    this.canvas = new Canvas(this.height, this.width);
    this.canvas.create();

    this.objects = new GameObjects(this.height, this.width);
    this.state = new State(this.height, this.width, this.objects.particles);
    this.menu = new Menu(() => this.restartGame(), this.state);
    if (firstTime) { this.menu.isActive = true; }
    // Initialize other game objects

    const input = new Input();
    this.keys = input.keysdown;

    this.gameLoop()
  }

  restartGame() {
    this.initTime = performance.now();
    this.menu.countDown = 3;
    this.menu.screen = 'countDown';
    this.objects.reset();
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

    document.getElementById('score').innerHTML = _.toString(this.state.score);
  }

  update(deltaTime) {
    const { player, platformPool, bulletPool, shipPool } = this.objects;

    if (player.hp <= 0 && this.menu.screen === null) { this.menu.screen = 'gameOver'; }

    if (this.menu.screen !== 'countDown' && this.menu.screen !== null) {
    //  Do nothing, handled by menu
    } else if (this.menu.countDown > 0 && !_.isNaN(deltaTime)) {
      this.menu.countDown -= deltaTime / 1000;
    } else {
      if (this.menu.screen === 'countDown') { this.menu.screen = null; }
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
