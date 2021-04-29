// const Player = require('./player');
// const Platform = require('./platforms');

class Game {
  constructor() {
    this.player = new Player();
    this.platforms = [];
    this.platformX = 200; //first platform location X
    this.platformY = 650; //first platform location Y
    // this.platforms.push(new Platform(this.platformX, this.platformY));
    this.createFloor();
    this.createPlatforms();
    this.timer = 3;
  }

  createFloor(){
    let x = 0;
    for (let i = 0; i < 7; i++) {
      this.platforms.push(new Platform(x, 770));
      x += 95;
    }
  }

  // create platforms
  createPlatforms() {
    let i = 0;
    while (i < 6) {
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

  movePlatforms() {
    // console.log("PLATFORMS", this.platforms);
    this.platforms.forEach(platform => {
      platform.y += 2;
    });
  }

  movePlayer() {
    //move right
    if (this.player.KEYS.ArrowRight && this.player.x < this.player.CANVASWIDTH - 55) {
      this.player.x += this.player.speed;
      this.player.frameY = 1;
      this.player.moving = true;
    }

    //move left
    if (this.player.KEYS.ArrowLeft && this.player.x > 0) {
      this.player.x -= this.player.speed;
      this.player.frameY = 0;
      this.player.moving = true;
    }

    this.updatePlayerLanding();

    if ((this.player.jumping && this.player.y > 0)) {
      this.player.speedY = 20;
      this.player.y -= this.player.speedY;
    } else if (!this.player.jumping ) {
      this.player.y += this.player.speedY;
    }
  }

  handleFrame() {
    if (this.player.moving && this.player.frameX < 10) {
      this.player.frameX++;
    } else {
      this.player.frameX = 0;
    }
  }


  updatePlayerLanding() {
    this.platforms.forEach(platform => {
      let platformTotalX = platform.x + platform.width; //total width of each platform frame
      let platformTotalY = platform.y + platform.height; //total height of each platform frame
      let playerTotalX = this.player.x + this.player.width; //total width of each player frame
      let playerTotalY = this.player.y + this.player.height; //total height of each player frame

      if (playerTotalX >= platform.x && playerTotalX <= platformTotalX &&
        playerTotalY >= platform.y && playerTotalY <= platformTotalY &&
        this.player.x >= platform.x && this.player.x <= platformTotalX) {
          this.player.speedY = 0;
      }
    });
  }

}

// module.exports = Game;