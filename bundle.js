/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// const Player = require("./assets/classes/player.js");
// const Game = require("./assets/classes/game.js");

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

  playMusic.onclick = musicOff;
  muteMusic.onclick = musicOn;

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

/******/ })()
;
//# sourceMappingURL=bundle.js.map