document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 800;

  const images = {};
  images.player = new Image();
  images.player.src = './src/assets/images/ninja_run_right.png'

  const playerWidth = 73;
  const playerHeight = 92;
  let playerFrameX = 0; //the first frame of the player
  let playerFrameY = 0; //the first frame of the player 
  let playerX = 0;
  let playerY = 0;
  const playerSpeed = 12;

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

});