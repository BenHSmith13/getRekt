
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
  }

  updateState(data, deltaTime, keys) {
  //  This is going to be the 'do all the things' function;
    const timeMod = deltaTime ? deltaTime / 100 : 0;
    this.platformState.updatePlatforms(data.platforms, timeMod);
    this.shipState.updateShips(data.ships, timeMod);
    this.bulletState.updateBullets(data.bullets, data.player, data.ships, data.mousePosition, timeMod);
    this.playerState.updatePlayer(data.player, timeMod, keys);
    this.collisions(data.bullets, data.ships);
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

  collisions(allBullets, allShips) {
    let bulletsVis = [];
    _.forEach(allBullets, (bullet)=>{
      if(bullet.visible && bullet.owner === 'player'){bulletsVis.push(bullet)}
    })
    let shipsVis = [];
    _.forEach(allShips, (ship)=>{
      if(ship.visible){shipsVis.push(ship)}
    })

    _.forEach(bulletsVis, (bullet) => {
      let inBetweenCords = [];
      const divider = 9;
      let m = this.slopeModifier(bullet);
      let increment = Math.abs((bullet.xPos - bullet.prevXPos)) / divider;

      for(let i = 0; i < divider; i++){
        let newX = bullet.prevXPos + (increment*i);
        let newY = m*(newX - bullet.xPos) + bullet.yPos;
        inBetweenCords.push({
          xPos: newX,
          yPos: newY
        });
      }

      _.forEach(shipsVis, (ship) => {
        _.forEach(inBetweenCords, (steps) => {
          if (this.isHitting(bullet, steps.xPos, steps.yPos, ship)){
            bullet.visible = false;
            ship.hp -= 5;

            if (ship.hp <= 0) {
              this.sounds.getSound('explosion').currentTime = 0;
              this.sounds.getSound('explosion').play()
              // do particle effects here?
              ship.visible = false;
            }
            return false;
          }
        })
      })
    })
  }

  slopeModifier(b) {
    return (b.prevYPos - b.yPos) / (b.prevXPos - b.xPos);
  }

  isHitting(bullet, xPos, yPos, ship){
    if (xPos < ship.xPos + ship.width &&
      xPos + bullet.width > ship.xPos &&
      yPos < ship.yPos + ship.height &&
      bullet.height + yPos > ship.yPos) {
      return true
    }
    return false;
  }
}
