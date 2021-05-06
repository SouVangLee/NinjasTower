// const Player = require('./player');
// const Platform = require('./platforms');

class Game {
  constructor() {
    this.player = new Player();
    this.obstacles = [];
    this.platforms = [];
    this.platformX = 200; //first platform location X
    this.platformY = 650; //first platform location Y
    this.createFloor();
    this.createPlatforms();
    this.startTimer = 1;
    this.obstacleTimer = 0;
    this.score = 0;
    this.startGame = false;
    this.startMusic = false;
    this.gameOver = false;
  }

  //////////////////////////////////////////////////////////
  ///////////////     OBSTACLE       ///////////////////////

  createObstacle() {
    const obstacleXPos = [-57, 594]; //initial obstacle x pos;
    const DIR = ['LEFT', 'RIGHT'] //create obstacle on the left or right side of map
    let x = obstacleXPos[Math.round(Math.random())];
    let y = Math.floor(Math.random() * 800);
    let dir = (x === -57) ? DIR[0] : DIR[1];

    this.obstacles.push(new Obstacle(x, y, dir));
  }

  moveObstacle() {
    this.obstacles.forEach((obstacle, idx) => {
      if (obstacle.dir === 'LEFT' && obstacle.x < this.player.CANVASWIDTH) {
        obstacle.x += obstacle.speed;
      } else if (obstacle.dir === 'RIGHT' && obstacle.x > -110) {
        obstacle.x -= obstacle.speed;
      } else if (obstacle.x <= -25 || obstacle.x > 600) {
        this.obstacles.splice(idx, 1);
        this.score++; //UPDATE SCORE
      }
    });
  }

  /////////////////////////////////////////////////////////
  ///////////////     PLATFORMS        ///////////////////////

  createFloor(){
    let x = 0;
    for (let i = 0; i < 7; i++) {
      this.platforms.push(new Platform(x, 770));
      x += 95;
    }
  }

  createPlatforms() {
    let platformGapY = -100;
    let platformGapX = [100, -100]
    let chooseGapX = platformGapX[Math.round(Math.random())]
    if (this.platformX < 0) this.platformX += 200;
    if (this.platformX > this.player.CANVASWIDTH - 100) this.platformX -= 100;
    this.platforms.push(new Platform(this.platformX, this.platformY));
    this.platformX += chooseGapX;
    if (this.platformY > 100) {
      this.platformY += platformGapY;
    } 
  }

  movePlatforms() {
    this.platforms.forEach((platform, idx) => {
      platform.y += platform.speed;

      if (platform.y > this.player.CANVASHEIGHT - 35) {
        this.platforms.splice(idx, 1);
        
        if (this.platforms.length < 8) {
          this.createPlatforms();
        }
      }
    });
  }

  /////////////////////////////////////////////////////////
  ///////////////     PLAYER        ///////////////////////

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

    this.updatePlayer();
  }

  handleFrame() {
    if (this.player.moving && this.player.frameX < 10) {
      this.player.frameX++;
    } else {
      this.player.frameX = 0;
    }
  }

  handleJump() {
    if ((this.player.jumping && this.player.y > 10 && this.player.jumpHeight > 0)) {
      this.player.y -= this.player.speedY; //jump up
      this.player.jumpHeight -= this.player.speedY; 
    }

    if (this.player.jumpHeight === 0 || this.player.y <= 10) {
      this.player.falling = true;
      this.handleFall();
    }
  }

  handleFall() {
    this.player.jumping = false;
    if (this.player.jumpHeight === 0 || this.player.y <= 10 || this.player.falling) {
      this.player.y += this.player.speedY; //fall down
      this.player.fallHeight -= this.player.speedY;
      this.updatePlayer();
    }

    if (!this.player.fallHeight) {
      this.resetHeight();
      this.player.falling = false;
    }
  }

  resetHeight() {
    this.player.jumpHeight = 150;
    this.player.fallHeight = 150;
  }

  updatePlayer() {
    this.platforms.forEach(platform => {
      let playerTotalX = this.player.x + this.player.width; //total width of each player frame
      let playerTotalY = this.player.y + this.player.height; //total height of each player frame

      let platformTotalX = platform.x + platform.width; //total width of each platform frame
      let platformTotalY = platform.y + platform.height; //total height of each platform frame

      if (this.player.x >= platform.x && this.player.x <= platformTotalX &&
        playerTotalY >= platform.y && playerTotalY <= platformTotalY) {
          // this.player.y = platform.y
        this.player.jump = false;
        this.resetHeight();
      } else {
        this.falling = true;
      }

      // if (playerTotalX >= platform.x && playerTotalX <= platformTotalX &&
      //   playerTotalY >= platform.y && playerTotalY <= platformTotalY &&
      //   this.player.x >= platform.x && this.player.x <= platformTotalX) {
      //     this.player.jump = true;
      //     this.resetHeight();
      //     // this.player.y += this.player.speedY;
      // }
    });
  }
}

// module.exports = Game;