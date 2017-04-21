class Collision {

  platformCollision(player, platforms) {
    debugger
  }

  collisions(player, allBullets, allShips, sounds, updateScore, particleSystem) {
    let ships = [];
    let playerBullets = [];
    let alienBullets = [];
    _.forEach(allBullets, (bullet)=>{
      if(bullet.visible) {
        if (bullet.owner === 'player') {
          playerBullets.push(bullet)
        } else {
          alienBullets.push(bullet)
        }
      }
    });

    _.forEach(allShips, (ship)=>{
      if(ship.visible){ships.push(ship)}
    });

    this.playerKillsAliens(playerBullets, ships, sounds, updateScore, particleSystem);
    this.playerShot(alienBullets, player, sounds);
  }

  playerKillsAliens(playerBullets, ships, sounds, updateScore, particleSystem) {
    _.forEach(playerBullets, (bullet) => {
      let rayCasts = this.rayCast(bullet);
      _.forEach(ships, (ship) => {
        _.forEach(rayCasts, (steps) => {
          if (this.isHitting(bullet, steps.xPos, steps.yPos, ship)){
            bullet.visible = false;
            ship.hp -= 5;
            particleSystem.bulletExplode(bullet);

            if (ship.hp <= 0) {
              updateScore(ship.totalHealth);
              sounds.getSound('explosion').currentTime = 0;
              sounds.getSound('explosion').play();
              // do particle effects here?
              ship.visible = false;
            }
            return false;
          }
        })
      })
    })
  }

  playerShot(alienBullets, player, sounds) {
    _.forEach(alienBullets, (bullet) => {
      let rayCasts = this.rayCast(bullet);
      _.forEach(rayCasts, (steps) => {
        if (this.isHitting(bullet, steps.xPos, steps.yPos, player)){
          bullet.visible = false;
          player.hp -= 10;
          return false;
        }
      })
    })
  }

  rayCast(bullet) {
    let rayCasts = [];
    const divider = 9;
    let m = this.slopeModifier(bullet);
    let increment = Math.abs((bullet.xPos - bullet.prevXPos)) / divider;

    for(let i = 0; i < divider; i++){
      let newX = bullet.prevXPos + (increment*i);
      let newY = m*(newX - bullet.xPos) + bullet.yPos;
      rayCasts.push({
        xPos: newX,
        yPos: newY
      });
    }
    return rayCasts;
  }

  slopeModifier(b) {
    return (b.prevYPos - b.yPos) / (b.prevXPos - b.xPos);
  }

  isHitting(bullet, xPos, yPos, object){
    if (xPos < object.xPos + object.width &&
      xPos + bullet.width > object.xPos &&
      yPos < object.yPos + object.height &&
      bullet.height + yPos > object.yPos) {
      return true
    }
    return false;
  }
}
