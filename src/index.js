// const Player = require("./assets/classes/player.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-player");
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 800;

  const player = new Player();

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

  //const background = new Image();
  //background.src = ""

  // function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  //   ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  // }

  window.addEventListener("keydown", (e) => {
    const GAMEKEYS = ['ArrowRight', 'ArrowLeft', ' ']

    if (GAMEKEYS.includes(e.key) && e.key !== ' ') {
      player.KEYS[e.key] = true;
      player.moving = true;
      player.currentKey = e.key
    };

    if (e.key === ' ') {
      player.jumping = true;
      player.KEYS[e.key] = true;
      player.moving = true;
      player.currentKey = e.key
    }
  });

  window.addEventListener("keyup", (e) => {
    delete player.KEYS[e.key];
    player.moving = false;
    player.jumping = false;
  });


  let fpsInterval, current, then, elapsed;

  // set FPS rate
  function startAnimation(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    current = Date.now();
    elapsed = current - then;

    if (elapsed > fpsInterval) {
      then = current - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //render idle frame
      if (!player.moving && !player.jumping) {
        //switch idle sprite
        if (player.currentKey === 'ArrowRight') {
          player.frameX = 11;
        } else {
          player.frameX = 0;
        }
        player.width = 46;
        player.height = 88;

        ctx.drawImage(
          playerIdleSprite, 
          player.width * player.frameX,
          0,
          player.width, 
          player.height, 
          player.x, 
          player.y, 
          player.width,
          player.height
        );
      } else if (player.moving && !player.jumping) {
        //render moving sprite
        player.width = 73;
        player.height = 92;
        ctx.drawImage(
          playerRunSprite, 
          player.width * player.frameX, 
          player.height * player.frameY, 
          player.width, 
          player.height, 
          player.x, 
          player.y, 
          player.width,
          player.height
        );
      
        player.handleFrameX();
        player.movePlayer();
      } else {
        //render jump sprite
        player.width = 72;
        player.height = 97;
        ctx.drawImage(
          playerRunSprite, 
          player.width * player.frameX, 
          player.height * player.frameY, 
          player.width, 
          player.height, 
          player.x, 
          player.y, 
          player.width,
          player.height
        );
      
        player.handleFrameX();
        player.movePlayer();
      }
    }
  };

  startAnimation(45);
});
































// const images = {};
// images.player = new Image();
// images.player.src = './src/assets/images/ninja_run_right.png'

  // const playerWidth = 73;
  // const playerHeight = 92;
  // let playerFrameX = 0; //the first frame of the player
  // let playerFrameY = 0; //the first frame of the player 
  // let playerX = 0;
  // let playerY = 0;
  // const playerSpeed = 15;

  // function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  //   ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
  // }

  // function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   drawSprite(
  //     images.player, 
  //     playerWidth * playerFrameX, 
  //     playerHeight * playerFrameY, 
  //     playerWidth, 
  //     playerHeight,
  //     playerX, 
  //     playerY,
  //     playerWidth,
  //     playerHeight
  //   );
  //     //animates sprite
  //   if (playerFrameX < 10) playerFrameX++;
  //   else playerFrameX = 0;

  //   //move player
  //   if (playerX < canvas.width + playerWidth) playerX += playerSpeed;
  //   else playerX = 0 - playerWidth;
  // }

  // window.onload = setInterval(animate, 1000/30);

  // window.addEventListener('resize', () =>{
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });

