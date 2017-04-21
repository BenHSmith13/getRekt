class GameSounds {
  constructor() {
    this.createAudioObjects();
  }

  createAudioObjects() {
    this.explosion = new Audio();
    this.explosion.src = 'assets/sounds/boom.mp3';

    this.explosion06 = new Audio('assets/sounds/Explosion6.ogg');
    this.explosion06.volume = 0.5;

    this.background = new Audio('assets/sounds/Jono_Bacon_-_01_-_Free_Software_Song_2_Instrumental.mp3');

    this.laser01 = new Audio('assets/sounds/Laser_Shoot.ogg');
    this.laser01.volume = 0.2;

    this.laser05 = new Audio('assets/sounds/Laser_Shoot5.ogg');
    this.laser05.volume = 0.2;
  }

  playLaser01() {
    this.laser01.currentTime = 0;
    this.laser01.play();
  }

  playLaser05() {
    this.laser05.currentTime = 0;
    this.laser05.play();
  }

  playExplosion06() {
    this.explosion06.currentTime = 0;
    this.explosion06.play();
  }

  getSound(soundName) {
    return this[soundName];
  }



  loopBackgroundAudio() {
    this.background.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    // this.background.play();
  }

}