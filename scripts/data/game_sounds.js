class GameSounds {
  constructor() {
    this.createAudioObjects();
  }

  createAudioObjects() {
    this.explosion = new Audio();
    this.explosion.src = 'assets/sounds/boom.mp3';

    this.background = new Audio('assets/sounds/Jono_Bacon_-_01_-_Free_Software_Song_2_Instrumental.mp3');
  }

  getSound(soundName) {
    return this[soundName];
  }

  loopBackgroundAudio() {
    this.background.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.background.play();
  }

}