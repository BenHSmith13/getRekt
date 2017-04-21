class GameSounds {
  constructor() {
    this.createAudioObjects();
  }

  createAudioObjects() {
    this.explosion = new Audio();
    this.explosion.src = 'assets/sounds/boom.mp3';

    this.background = new Audio();
    this.background.src = 'assets/sounds/background.mp3';
    this.background.loop = true;
  }

  getSound(soundName) {
    return this[soundName];
  }

}