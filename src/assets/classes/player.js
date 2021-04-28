class Player {
  constructor() {
    this.x = 200;
    this.y = 700;
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 10;
    this.moving = false;
    this.jumping = false;
    this.CANVASWIDTH = 800;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
  }

  movePlayer() {
    //move right. 75px away from right wall
    if (this.KEYS.ArrowRight && this.x < this.CANVASWIDTH - 75) {
      this.x += this.speed;
      this.frameY = 1;
      this.moving = true;
    }

    //move left. 5px away from left wall
    if (this.KEYS.ArrowLeft && this.x > 5) {
      this.x -= this.speed;
      this.frameY = 0;
      this.moving = true;
    }

    // if (this.KEYS[' '] && this.frameX > 5) {
    //   this.y -= this.speed * 2;
    // } else {
    //   this.y += this.speed;
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
