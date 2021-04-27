// const Player = require("./assets/classes/player.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas-player");
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 800;
  const KEYS = {}; //used for storing key press

  const player = {
    x: 200,
    y: 700,
    width: 73, //width of each sprite
    height: 92, //height of each sprite
    frameX: 0, //starting sprite X-dir on sprite sheet
    frameY: 1, //starting sprite Y-dir  on sprite sheet
    speed: 15, //pixels speed
    moving: false
  }

  // create sprite images
  const playerRunSprite = new Image();
  playerRunSprite.src = "./src/assets/images/ninja_run.png";

  //const background = new Image();
  //background.src = ""

  function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  // function animateRun(){
  //   // ctx.drawImage(background, 10, 0, canvas.width, canvas.height);
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   drawSprite(
  //     playerRunSprite, 
  //     player.width * player.frameX, 
  //     player.height * player.frameY, 
  //     player.width, 
  //     player.height, 
  //     player.x, 
  //     player.y, 
  //     player.width,
  //     player.height
  //   );
    
  //   handleFrameX();
  //   movePlayer();
  //   requestAnimationFrame(animateRun);
  // }

  // animateRun();

  window.addEventListener("keydown", (e) => {
    KEYS[e.key] = true;
    player.moving = true;
  });

  window.addEventListener("keyup", (e) => {
    delete KEYS[e.key];
    player.moving = false;
  });

  function movePlayer() {
    if (KEYS.ArrowRight && player.x < canvas.width - 75) {
      player.x += player.speed;
      player.frameY = 1;
      player.moving = true;
      // console.log("X", player.x)
    }

    if (KEYS.ArrowLeft && player.x > 50) { //50 because when animation turns left. May change
      player.x -= player.speed;
      player.frameY = 0;
      player.moving = true;
    }
  }

  function handleFrameX() {
    if (player.moving && player.frameX < 10) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }

  let fpsInterval, startTime, current, then, elapsed;

  //set FPS rate
  function startAnimation(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    current = Date.now();
    elapsed = current - then;
    if (elapsed > fpsInterval) {
      then = current - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSprite(
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
      
      handleFrameX();
      movePlayer();
    }
  };

  startAnimation(30);
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

