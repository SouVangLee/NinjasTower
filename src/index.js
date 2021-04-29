// const webpack = require('webpack');
// const Player = require("./assets/classes/player.js");
// const Game = require("./assets/classes/game.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-player");
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 800;

  const game = new Game();

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
  ///////////////////       Draw Functions     ////////////////////////////

  //render obstacles
  function drawObstacles() {
    game.obstacles.forEach(obstacle => {
      obstacle.frameX = (obstacle.dir === 'LEFT') ?  1 : 0;
      // console.log("FRAMEX", obstacle.frameX)
      
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
      game.platforms.forEach(platform => {
        ctx.drawImage(platformImg, platform.x, platform.y, platform.width, platform.height)
      });
  }

  //////////////////////////////////////////////////////////////////////
  /////////////////// Event Listener ////////////////////////////////
  window.addEventListener("keydown", (e) => {
    const GAMEKEYS = ['ArrowRight', 'ArrowLeft', ' ']
    if (GAMEKEYS.includes(e.key) && e.key !== ' ') {
      game.player.KEYS[e.key] = true;
      game.player.moving = true;
      game.player.currentKey = e.key;
    };

    if (e.key === ' ') {
      game.player.jumping = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    game.player.KEYS[e.key] = false;
    game.player.moving = false;
    game.player.jumping = false;
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

    if (elapsed > fpsInterval) {
      then = current - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spriteChecker = playerIdleSprite;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      drawPlatforms();

      //render idle frame
      if (!game.player.moving && !game.player.jumping) {
        //switch idle sprite
        if (game.player.currentKey === 'ArrowRight') {
          game.player.frameX = 11;
        } else {
          game.player.frameX = 0;
        }
        game.player.frameY = 0;
        game.player.width = 46;
        game.player.height = 88;

        //render moving sprite: 1 = Face Right, 0 = Face Left
      } else if (game.player.moving && !game.player.jumping) {
        if (game.player.currentKey === 'ArrowRight') {
          game.player.frameY = 1;
        } else {
          game.player.frameY = 0;
        }
        game.player.width = 73;
        game.player.height = 92;
        spriteChecker = playerRunSprite;

        //render jump sprite: 1 = Face Right, 0 = Face Left
      } else {
        if (game.player.currentKey === 'ArrowRight') {
          game.player.frameY = 1;
        } else {
          game.player.frameY = 0;
        }
        game.player.frameX = 4;
        game.player.width = 72;
        game.player.height = 97;
        spriteChecker = playerJumpSprite;
      }

      //ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
      ctx.drawImage(
        spriteChecker, 
        game.player.width * game.player.frameX, 
        game.player.height * game.player.frameY, 
        game.player.width, 
        game.player.height, 
        game.player.x, 
        game.player.y, 
        game.player.width,
        game.player.height
      );
      
      if (game.player.moving && !game.player.jumping) { 
        game.handleFrame();
      }
      game.movePlayer();
      drawObstacles();
      
      if (game.startTimer === 0) {
        clearGameTimer();
        game.movePlatforms();
        game.moveObstacle();
      }

      if (game.startTimer === 0 && game.obstacleTimer % 50 === 0) {
        game.obstacleTimer = 0;
        game.createObstacle();
      }
    }

    ///////////   Game Over   /////////////////////
    if (game.player.y > canvas.height) {
      window.cancelAnimationFrame(requestAnimate);
      clearObstacle();
      return game.score;
    }

    let playerHitboxX = game.player.x + 20;
    let playerHitboxY = game.player.y + 10;
    let playerHitboxLength = game.player.x + game.player.width;
    let playerHitboxHeight = game.player.y + game.player.height;

    game.obstacles.forEach(obstacle => {
      let obstacleLength = obstacle.x + obstacle.width;
      let obstacleHeight = obstacle.y + obstacle.height;

      if ((obstacle.dir === "LEFT" && 
          obstacleLength >= playerHitboxX &&
          obstacleLength <= playerHitboxLength &&
          obstacleHeight >= playerHitboxY &&
          obstacleHeight <= playerHitboxHeight) ||

          (obstacle.dir === "RIGHT" &&
          obstacle.x >= game.player.x &&
          obstacle.x <= (playerHitboxLength - 20) &&
          obstacle.y >= game.player.y &&
          obstacle.y <= game.player.y + game.player.height - 10)) {
            window.cancelAnimationFrame(requestAnimate);
            clearObstacle();
            game.obstacles = [];
            return game.score;
      }
          
      // } else if 
      //     ( obstacle.dir === "RIGHT" &&
      //       obstacle.x >= game.player.x &&
      //       obstacle.x <= (playerHitboxLength - 25) &&
      //       obstacle.y >= game.player.y &&
      //       obstacle.y <= game.player.y + game.player.height - 10) {
      //         window.cancelAnimationFrame(requestAnimate);
      //         clearObstacle();
      //         game.obstacles = [];
      //         return game.score;
      //}
    });

  };

  //////////////////////////////////////////////////////////
  ///////////    Obstacle Intervals    /////////////////////

  var startObstacle = setInterval(addObstaclesTimer, 50);

  function addObstaclesTimer() {
    // console.log("obstacleTimer", game.obstacleTimer);
    game.obstacleTimer += 1;
  }

  function clearObstacle() {
    clearInterval(startObstacle);
  }

  ///////////////////////////////////////////////////////
  ///////////   Start Game Timer    /////////////////////

  var startGameTimer = setInterval(gameTimer, 1000);
  
  function gameTimer() {
    console.log("gameTimer", game.startTimer);
    game.startTimer -= 1;
  }

  function clearGameTimer() {
    clearInterval(startGameTimer);
  }

  //////////////////////////////////////////////////////
  ////////////////   Start Game   /////////////////////
  
  function gameStart(fps) {
    startPlayerAnimation(fps);
  }
  
  gameStart(60);

});
