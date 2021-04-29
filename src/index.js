// const webpack = require('webpack');
// const Player = require("./assets/classes/player.js");
// const Game = require("./assets/classes/game.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-player");
  const canvasPlatform = document.getElementById("canvas-platform");
  const ctx = canvas.getContext('2d');
  const platformCtx = canvasPlatform.getContext('2d');

  canvas.width = canvasPlatform.width = 600;
  canvas.height = canvasPlatform.height = 800;

  // const player = new Player();
  const game = new Game();

  // create sprite images
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

  const platformImg = new Image();
  platformImg.src = "./src/assets/images/platform.png";
  

  // render platforms
  function drawPlatforms() {
      game.platforms.forEach(platform => {
        ctx.drawImage(platformImg, platform.x, platform.y, platform.width, platform.height)
      });
  }

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

  // set FPS rate
  let fpsInterval, current, then, elapsed;

  function startPlayerAnimation(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    animatePlayer();
  }

  function animatePlayer() {
    requestAnimationFrame(animatePlayer);
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
    }
  };

  startPlayerAnimation(30);
});
