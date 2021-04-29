class Player {
  constructor() {
    this.x = 200;
    this.y = 685; //710
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 10;
    this.speedY = 0;
    this.moving = false;
    this.jumping = false;
    this.CANVASWIDTH = 600;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
  }

}

// module.exports = Player;