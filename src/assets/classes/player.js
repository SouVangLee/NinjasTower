class Player {
  constructor() {
    this.x = 200;
    this.y = 700;
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 10;
    this.speedY = 20;
    this.moving = false;
    this.jumping = false;
    this.CANVASWIDTH = 800;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
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

    console.log("KEYS", this.KEYS);
    console.log("FRAMEY", this.frameY);
    console.log("FRAMEX", this.frameX);
    // if (this.KEYS[' '] && this.frameX > 5) {
    //   this.y = this.speedY;
    // } else {
    //   this.y = this.speedY;
    // }
  }

  handleFrameX() {
    if (this.moving && this.frameX < 10) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
}
