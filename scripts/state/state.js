
class State {
  constructor (height, width, particles) {
    this.height = height;
    this.width = width;

    this.score = 0;

    this.sounds = new GameSounds();
    this.soundPlaying = false;
    this.bulletState = new BulletState(height, width);
    this.platformState = new PlatformState(height, width);
    this.shipState = new ShipState(height, width);
    this.playerState = new PlayerState(height);
    this.particleState = new ParticleState(particles);
    this.collider = new Collision();
  }

  updateState(data) {
    if(!this.soundPlaying){
      // this.sounds.getSound('background').play();
      this.soundPlaying = true;
    }
    const timeMod = data.deltaTime ? data.deltaTime / 100 : 0;
    this.platformState.updatePlatforms(data.platforms, timeMod);
    this.shipState.updateShips(data.ships, timeMod);
    this.bulletState.updateBullets(data.bullets, data.player, data.ships, data.mousePosition, timeMod);
    this.playerState.updatePlayer(data.player, timeMod, data.keys, data.platforms);
    this.collider.collisions(
      data.player,
      data.bullets,
      data.ships,
      this.sounds,
      score => this.updateScore(score),
      this.particleState
    );
    this.particleState.updateParticles(data.bullets, data.ships, data.player, timeMod);
  }

  updateScore(score) {
    this.score += score;
  }
}
