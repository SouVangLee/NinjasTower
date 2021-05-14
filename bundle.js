/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/classes/game.js":
/*!************************************!*\
  !*** ./src/assets/classes/game.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(/*! ./player */ "./src/assets/classes/player.js");
const Platform = __webpack_require__(/*! ./platforms */ "./src/assets/classes/platforms.js");
const Obstacle = __webpack_require__(/*! ./obstacles */ "./src/assets/classes/obstacles.js");


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

    this.player.y ++;
    this.platformCollision();
  }

  handleFrame() {
    if (this.player.moving && this.player.frameX < 10) {
      this.player.frameX++;
    } else {
      this.player.frameX = 0;
    }
  }

  handleJump() {
    if ((this.player.jumping && this.player.y > 0 && this.player.jumpHeight > 0)) {
      this.player.y -= this.player.speedY; //jump up
      this.player.jumpHeight -= this.player.speedY; 
    } else {
      this.player.y += this.player.speedY;
    }

    if (this.player.jumpHeight === 0 || this.player.y <= 0) {
      this.player.falling = true;
      this.handleFall();
    }
  }

  handleFall() {
    this.player.jumping = false;
    this.player.jumpHeight = 0;
    this.player.handleFall = 120;
    if (this.player.jumpHeight === 0 || this.player.y <= 0 || this.player.falling) {
      this.player.y += this.player.speedY; //fall down
      this.player.fallHeight -= this.player.speedY;
      this.platformCollision();
    }

    if (!this.player.fallHeight) {
      this.resetHeight();
      this.player.falling = false;
    }
  }

  resetHeight() {
    this.player.jumpHeight = 120;
    this.player.fallHeight = 120;
  }

  platformCollision() {
    this.platforms.forEach(platform => {
      let playerX = this.player.x;
      let playerMidX = this.player.x + (this.player.width / 2); //midpoint X-coord of the player frame
      let playerTotalX = this.player.x + this.player.width; //total width of each player frame
      let playerTotalY = this.player.y + this.player.height; //total height of each player frame
      let platformTotalX = platform.x + platform.width; //total width of each platform frame

      if (((playerX >= platform.x && playerX <= platformTotalX) ||
          (playerMidX >= platform.x && playerMidX <= platformTotalX) ||
          (playerTotalX >= platform.x && playerTotalX <= platformTotalX)) &&
          (playerTotalY >= platform.y && playerTotalY <= platform.y + platform.height)) {
            this.player.y = platform.y - this.player.height;
      }
    });
  }
}

module.exports = Game;

/***/ }),

/***/ "./src/assets/classes/obstacles.js":
/*!*****************************************!*\
  !*** ./src/assets/classes/obstacles.js ***!
  \*****************************************/
/***/ ((module) => {

class Obstacle {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 13;
    this.dir = dir;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 6;
  }
}

module.exports = Obstacle;

/***/ }),

/***/ "./src/assets/classes/platforms.js":
/*!*****************************************!*\
  !*** ./src/assets/classes/platforms.js ***!
  \*****************************************/
/***/ ((module) => {

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 95;
    this.height = 30;
    this.speed = 1;
  }
}

module.exports = Platform

/***/ }),

/***/ "./src/assets/classes/player.js":
/*!**************************************!*\
  !*** ./src/assets/classes/player.js ***!
  \**************************************/
/***/ ((module) => {

class Player {
  constructor() {
    this.x = 220;
    this.y = 575;
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 7;
    this.speedY = 10;
    this.moving = false;
    this.jumping = false;
    this.falling = false;
    this.jumpHeight = 120;
    this.fallHeight = 120;
    this.CANVASWIDTH = 600;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
  }

}

module.exports = Player;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// const Player = require("./assets/classes/player.js");
const Game = __webpack_require__(/*! ./assets/classes/game.js */ "./src/assets/classes/game.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 800;
  let playMusic = document.getElementById('music-play');
  let muteMusic = document.getElementById('music-mute');
  let score = document.getElementById('score');
  let totalScore = document.getElementById('total-score');
  let endGame = document.getElementById('game-over');
  let song = document.getElementById('song');



  const game = new Game();
  const { player, obstacles, platforms } = game;

  //////////////////////////////////////////////////////////////////////////
  ///////////////  create sprite images     ////////////////////////////////
  // run sprite size 73x92
  const playerRunSprite = new Image();
  playerRunSprite.src = "./src/assets/images/ninja_run.png";

  //idle sprite size 46x88
  const playerIdleSprite = new Image();
  playerIdleSprite.src = "./src/assets/images/ninja_idle.png"

  //jump sprite size 72x97
  const playerJumpSprite = new Image();
  playerJumpSprite.src = "./src/assets/images/ninja_jump.png"

  const background = new Image();
  background.src = "./src/assets/images/background.png"

  //platform sprite size 95x30
  const platformImg = new Image();
  platformImg.src = "./src/assets/images/platform.png";

  //kunai size 64x13;
  const kunaiLeftRightImg = new Image();
  kunaiLeftRightImg.src = "./src/assets/images/kunai_left_right.png";

  //////////////////////////////////////////////////////////////////////////
  ///////////////////       Music Functions     ////////////////////////////
  function musicOn() {
    if (!muteMusic.classList.contains('hidden')) {
      muteMusic.classList.add('hidden');
    }
    if (playMusic.classList.contains('hidden')) {
      playMusic.classList.remove('hidden');
    }
    game.startMusic = true;
    song.play();
  }

  function musicOff() {
    if (!playMusic.classList.contains('hidden')) {
      playMusic.classList.add('hidden');
    }
    if (muteMusic.classList.contains('hidden')) {
      muteMusic.classList.remove('hidden');
    }
    game.startMusic = false;
    song.pause();
  }

  // playMusic.onclick = musicOff;
  // muteMusic.onclick = musicOn;

  //////////////////////////////////////////////////////////////////////////
  ///////////////////       Draw Functions     ////////////////////////////
  //render obstacles
  function drawObstacles() {
    obstacles.forEach(obstacle => {
      obstacle.frameX = (obstacle.dir === 'LEFT') ?  1 : 0;
      
      // ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
      ctx.drawImage(
        kunaiLeftRightImg, 
        obstacle.width * obstacle.frameX, 
        obstacle.height * obstacle.frameY, 
        obstacle.width, 
        obstacle.height, 
        obstacle.x, 
        obstacle.y, 
        obstacle.width,
        obstacle.height
      );
    });
  }
  

  // render platforms
  function drawPlatforms() {
      platforms.forEach(platform => {
        ctx.drawImage(platformImg, platform.x, platform.y, platform.width, platform.height)
      });
  }

  //////////////////////////////////////////////////////////////////////
  /////////////////// Event Listener ////////////////////////////////
  window.addEventListener("keydown", (e) => {
    const GAMEKEYS = ['ArrowRight', 'ArrowLeft', ' ']

    //instructions    
    let splash = document.getElementById('splash-container');
    if (!splash.classList.contains('hidden')) {
      splash.classList.add('hidden');
    }

    //start Game
    if (!game.startGame) {
      game.startGame = true;
      game.startMusic = true;
      gameStart(60);
      musicOn();
    }
    
    //restart
    if (game.gameOver && e.key === 'r') {
      restart();
    }

    //toggle music
    if (game.startMusic && e.key === 'm') {
      musicOff();
    } else {
      musicOn();
    }

    if (GAMEKEYS.includes(e.key) && e.key !== ' ') {
      player.KEYS[e.key] = true;
      player.moving = true;
      player.currentKey = e.key;
    };

    if (e.key === ' ' && !player.jumping && player.jumpHeight === 120) {
      player.jumping = true;
    }
  });

  
  window.addEventListener("keyup", (e) => {
    player.KEYS[e.key] = false;
    player.moving = false;
  });


  //////////////////////////////////////////////////////////////////////
  /////////////////////    Animate Function    /////////////////////////
  // set FPS rate
  let fpsInterval, current, then, elapsed;

  function startPlayerAnimation(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    animateGame();
  }

  function animateGame() {
    requestAnimate = requestAnimationFrame(animateGame);
    current = Date.now();
    elapsed = current - then;
    let spriteChecker;

    getScore();

    if (elapsed > fpsInterval) {
      then = current - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spriteChecker = playerIdleSprite;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      drawPlatforms();

      //render idle frame
      if (!player.moving && !player.jumping) {
        //switch idle sprite: ArrowRight = face right, ArrowLeft = face left
        if (player.currentKey === 'ArrowRight') {
          player.frameX = 11;
        } else {
          player.frameX = 0;
        }
        player.frameY = 0;
        player.width = 46;
        player.height = 88;

        //render moving sprite: 1 = face right, 0 = face reft
      } else if (player.moving && !player.jumping) {
        if (player.currentKey === 'ArrowRight') {
          player.frameY = 1;
        } else {
          player.frameY = 0;
        }
        player.width = 73;
        player.height = 92;
        spriteChecker = playerRunSprite;

        //render jump sprite: 1 = face right, 0 = face reft
      } else {
        if (player.currentKey === 'ArrowRight') {
          player.frameY = 1;
        } else {
          player.frameY = 0;
        }
        player.frameX = 4;
        player.width = 72;
        player.height = 97;
        spriteChecker = playerJumpSprite;
      }
      
      if (player.moving && !player.jumping) { 
        game.handleFrame();
      }

      drawObstacles();
      game.handleJump(); //jump
      game.movePlayer(); //move

      //ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
      ctx.drawImage(
        spriteChecker, 
        player.width * player.frameX, 
        player.height * player.frameY, 
        player.width, 
        player.height, 
        player.x, 
        player.y, 
        player.width,
        player.height
      );
      
      if (game.startTimer === 0) {
        clearGameTimer();
        game.movePlatforms();
        game.moveObstacle();
      }

      //create new obstacles
      if (game.startTimer === 0 && game.obstacleTimer % 50 === 0) {
        game.obstacleTimer = 0;
        game.createObstacle();
      }
    }

    ///////////   Game Over Logic  /////////////////////
    let playerHitboxX = player.x + 20;
    let playerHitboxY = player.y + 10;
    let playerHitboxLength = player.x + player.width;
    let playerHitboxHeight = player.y + player.height;

    obstacles.forEach(obstacle => {
      let obstacleLength = obstacle.x + obstacle.width;
      let obstacleHeight = obstacle.y + obstacle.height;

      //if player falls off the map
      if ((player.y > canvas.height) ||

        //check for object collision
        (obstacle.dir === "LEFT" && 
        obstacleLength >= playerHitboxX &&
        obstacleLength <= playerHitboxLength &&
        obstacleHeight >= playerHitboxY &&
        obstacleHeight <= playerHitboxHeight) ||

        (obstacle.dir === "RIGHT" &&
        obstacle.x >= player.x &&
        obstacle.x <= (playerHitboxLength - 30) &&
        obstacle.y >= player.y &&
        obstacle.y <= player.y + player.height - 10)) {

          window.cancelAnimationFrame(requestAnimate);
          gameOver();
          clearObstacle();
          return game.score;
      }
    });

  };

  function getScore() {
    document.getElementById("score").innerHTML = `Score: ${game.score}`
  }

  //////////////////////////////////////////////////////////
  ///////////    Obstacle Intervals Timer   ///////////////
  var startObstacle = setInterval(addObstaclesTimer, 15);

  function addObstaclesTimer() {
    game.obstacleTimer += 1;
  }

  function clearObstacle() {
    clearInterval(startObstacle);
  }

  ///////////////////////////////////////////////////////
  ///////////   Start Game Timer    /////////////////////
  var startGameTimer = setInterval(gameTimer, 1000);
  
  function gameTimer() {
    game.startTimer -= 1;
  }

  function clearGameTimer() {
    clearInterval(startGameTimer);
  }

  //////////////////////////////////////////////////////
  ////////////////   Play Game Functions  /////////////////////
  function gameStart(fps) {
    if (score.classList.contains('hidden')) {
      score.classList.remove('hidden');
    }
    if (!totalScore.classList.contains('hidden')) {
      totalScore.classList.add('hidden');
    }
    if (!endGame.classList.contains('hidden')) {
      endGame.classList.add('hidden');
    }
    game.score = 0;
    startPlayerAnimation(fps);
  }

  function gameOver() {
    game.gameOver = true;
    if (!score.classList.contains('hidden')) {
      score.classList.add('hidden');
    }
    if (totalScore.classList.contains('hidden')) {
      totalScore.innerHTML = `Total Score: ${game.score}`
      totalScore.classList.remove('hidden');
    }
    if (endGame.classList.contains('hidden')) {
      endGame.classList.remove('hidden');
    }
  }

  function restart() {
    game.obstacles = [];
    game.score = 0;
    game.startGame = false;
    game.gameOver = false;
    if (!endGame.classList.contains('hidden')) {
      endGame.classList.add('hidden');
    }
    window.history.go(0);
  }

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map