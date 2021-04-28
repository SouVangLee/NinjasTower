class Player {
  constructor() {
    this.x = 200;
    this.y = 710; //710
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 15;
    this.speedY = 20;
    this.moving = false;
    this.jumping = false;
    this.CANVASWIDTH = 800;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
    this.countY = 0;
  }

  movePlayer() {
    //move right. 75px away from right wall
    if (this.KEYS.ArrowRight && this.x < this.CANVASWIDTH - 55) {
      this.x += this.speed;
      this.frameY = 1;
      this.moving = true;
    }

    //move left. 5px away from left wall
    if (this.KEYS.ArrowLeft && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 0;
      this.moving = true;
    }
  }

  handleFrameY() {
    if (this.jumping && this.y > 0) {
      this.y -= this.speedY;
      this.countY += this.speedY;
    } else if (!this.jumping && this.y < this.CANVASHEIGHT){
      this.y += this.countY;
      this.countY = 0;
    }
    console.log("CHECK COUNTY", this.countY);
  }

  handleFrameX() {
    if (this.moving && this.frameX < 10) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
}
