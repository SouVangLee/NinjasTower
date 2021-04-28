// const Player = require('./player');
// const Platform = require('./platforms');

class Game {
  constructor() {
    this.player = new Player();
    this.platforms = [];
    this.platformX = 200; //first platform location X
    this.platformY = 770; //first platform location Y
    // this.platforms.push(new Platform(this.platformX, this.platformY));
    this.createPlatforms();
  }

  // create platforms
  createPlatforms() {
    let i = 0;
    while (i < 7) {
      let platformGapY = -125;
      let platformGapX = [100, -100]
      let chooseGapX = platformGapX[Math.round(Math.random())]
      if (this.platformX < 0) this.platformX += 200;
      if (this.platformX > this.player.CANVASWIDTH - 100) this.platformX -= 100;
      this.platforms.push(new Platform(this.platformX, this.platformY));
      this.platformX += chooseGapX;
      if (this.platformY > 100) {
        this.platformY += platformGapY;
      } 
      i++;
      // } 
    }
  }

  // updatePlayerLanding() {
  //   this.platforms.forEach(platform => {
  //     if (this.player.x)
  //   });
  // }

}

// module.exports = Game;