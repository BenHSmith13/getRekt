
class State {
  constructor (height, width) {
    this.height = height;
    this.width = width;

    this.countDown = 3;
    this.score = 0;
    this.lives = 3;

    this.sounds = new GameSounds();
    this.bulletState = new BulletState(height, width);
    this.platformState = new PlatformState(height, width);
    this.shipState = new ShipState(height, width);
    this.playerState = new PlayerState(height);
    this.collider = new Collision();
  }

  updateState(data, deltaTime, keys) {
  //  This is going to be the 'do all the things' function;
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    this.platformState.updatePlatforms(data.platforms, timeMod);
    this.shipState.updateShips(data.ships, timeMod);
    this.bulletState.updateBullets(data.bullets, data.player, data.ships, data.mousePosition, timeMod);
    this.playerState.updatePlayer(data.player, timeMod, keys);
    this.collider.collisions(data.bullets, data.ships, this.sounds);
  }

  saveScore() {
    const scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
      scores.push(this.score);
      localStorage.setItem('scores', JSON.stringify(scores));
    } else {
      localStorage.setItem('scores', JSON.stringify([this.score]))
    }
  }

  looseLife(){
    this.lives -= 1;
    if (this.lives <= 0) { this.saveScore(); }
    this.countDown = 3;
  }

  updateScore(something) {
    switch (something) {
      case 0:
      case 1:
        this.score += 5;
        break;
      case 2:
      case 3:
        this.score += 3;
        break;
      case 4:
      case 5:
        this.score += 2;
        break;
      case 6:
      case 7:
        this.score += 1;
        break;
    }
  }
}
