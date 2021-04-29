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

    
    if (this.player.jumping && this.player.y > 0) {
      this.player.speedY = 20;
      this.player.y -= this.player.speedY;
    } else if (!this.player.jumping && this.player.y < this.player.CANVASHEIGHT - 100) {
      this.player.y += this.player.speedY;
      this.updatePlayerLanding();
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
      // console.log("PlayerX", this.player.x);
      // console.log("Player Y", this.player.y);

      if (playerTotalX >= platform.x && playerTotalX <= platformTotalX &&
        playerTotalY >= platform.y && playerTotalY <= platformTotalY &&
        this.player.x >= platform.x && this.player.x <= platformTotalX) {
          this.player.speedY = 0;
      } else {
        // this.player.jumping = true;
      }
      // console.log("Update Player Landing", this.player.speedY)
    });
  }

}

// module.exports = Game;