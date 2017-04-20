
class State {
  constructor (height, width) {
    this.height = height;
    this.width = width;

    this.countDown = 3;
    this.score = 0;

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
    this.collider.collisions(data.player, data.bullets, data.ships, this.sounds, score => this.updateScore(score));
    this.saveScore(data.player);
  }

  saveScore(player) {
    // if(player.hp <= 0){
    //   // TODO, save the score to server
    // }

    // OLD stuff
    // const scores = JSON.parse(localStorage.getItem('scores'));
    // if (scores) {
    //   scores.push(this.score);
    //   localStorage.setItem('scores', JSON.stringify(scores));
    // } else {
    //   localStorage.setItem('scores', JSON.stringify([this.score]))
    // }
  }

  updateScore(score) {
    this.score += score;
  }
}
