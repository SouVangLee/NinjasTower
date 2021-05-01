class Player {
  constructor() {
    this.x = 220;
    this.y = 600; //710
    this.width = 46;
    this.height = 88;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 7;
    this.speedY = 0;
    this.moving = false;
    this.jumping = false;
    this.CANVASWIDTH = 600;
    this.CANVASHEIGHT = 800;
    this.KEYS = {};
    this.currentKey = 'ArrowRight';
    this.timer = 3;
  }

}

// module.exports = Player;