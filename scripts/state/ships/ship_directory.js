const shipScale = 0.5;

class ShipDirectory {
  constructor() {
    this.ships = this.directory();
  }

  getRandomShip() {
    const rand = _.random(110);
  //  Modify this logic to adjust how frequently different ships appear
    if (rand < 10) {
      return this.ships.lightRunner;
    } else if (rand < 20) {
      return this.ships.scoutShip;
    } else if (rand < 30) {
      return this.ships.battleShip;
    } else if (rand < 40) {
      return this.ships.heavyBattleShip;
    } else if (rand < 50) {
      return this.ships.heavyGunShip;
    } else if (rand < 60) {
      return this.ships.heavySpeeder;
    } else if (rand < 70) {
      return this.ships.brigadier;
    } else if (rand < 80) {
      return this.ships.speeder;
    } else if (rand < 90) {
      return this.ships.gunShip;
    } else if (rand < 100) {
      return this.ships.necroCruiser;
    } else if (rand <= 110) {
      return this.ships.crusader;
    }
  };

  directory() {
    return {
      lightRunner: {
        type: 'lightRunner',  // 1
        height: 95 * shipScale,
        width: 227 * shipScale,
        hp: 20,
        totalHealth: 20,
        speed: 10,
        bulletType: 'normal',
        bulletDirection: 135,
        reloadTime: 1,
      },
      scoutShip: {
        type: 'scoutShip',  // 2
        height: 69 * shipScale,
        width: 105 * shipScale,
        hp: 20,
        totalHealth: 20,
        speed: 20,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      battleShip: {
        type: 'battleShip',  // 3
        height: 124 * shipScale,
        width: 290 * shipScale,
        hp: 20,
        totalHealth: 20,
        speed: 20,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      heavyBattleShip: {
        type: 'heavyBattleShip',  // 4
        height: 124 * shipScale,
        width: 290 * shipScale,
        hp: 40,
        totalHealth: 40,
        speed: 20,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      speeder: {
        type: 'speeder', // 9.png
        height: 45 * shipScale,
        width: 127 * shipScale,
        hp: 30,
        totalHealth: 30,
        speed: 30,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      heavySpeeder: {
        type: 'heavySpeeder', // 6.png
        height: 100 * shipScale,
        width: 234 * shipScale,
        hp: 30,
        totalHealth: 30,
        speed: 30,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      brigadier: {
        type: 'brigadier',  // 7
        height: 136 * shipScale,
        width: 288 * shipScale,
        hp: 20,
        totalHealth: 20,
        speed: 20,
        bulletType: 'normal',
        bulletDirection: () => _.random(30, 160),
        reloadTime: 0.5,
      },
      crusader: {
        type: 'crusader',  // 13
        height: 113 * shipScale,
        width: 223 * shipScale,
        hp: 60,
        totalHealth: 60,
        speed: 15,
        bulletType: 'normal',  // I need more bullet types
        bulletDirection: 135,
        reloadTime: 1.5,
      },
      necroCruiser: {
        type: 'necroCruiser',  // 12
        height: 135 * shipScale,
        width: 289 * shipScale,
        hp: 60,
        totalHealth: 60,
        speed: 15,
        bulletType: 'normal',  // I need more bullet types
        bulletDirection: 135,
        reloadTime: 1.5,
      },
      gunShip: {
        type: 'gunShip', // 10
        height: 157 * shipScale,
        width: 213 * shipScale,
        hp: 40,
        totalHealth: 40,
        speed: 5,
        bulletType: 'heavy',
        bulletDirection: 90,
        reloadTime: 1.5,
      },
      heavyGunShip: {
        type: 'heavyGunShip', // 5.png
        height: 390 * shipScale,
        width: 523 * shipScale,
        hp: 100,
        totalHealth: 100,
        speed: 3,
        bulletType: ['heavy', 'normal'], // TODO: multiple types?
        bulletDirection: 90,
        reloadTime: 1.5,
      },
    }
  }
}