class GameSounds {
  constructor() {
    this.createAudioObjects();
  }

  createAudioObjects() {
    this.explosion = new Audio();
    this.explosion.src = 'assets/sounds/boom.mp3';
    this.background = new Audio();
    // find different sound clip for background
    this.background.src = 'assets/sounds/boom.mp3';
    this.background.loop = true;
  }

  getSound(soundName) {
    return this[soundName];
  }

}