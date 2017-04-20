class Collision {

  collisions(allBullets, allShips, sounds) {
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
              sounds.getSound('explosion').currentTime = 0;
              sounds.getSound('explosion').play()
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
