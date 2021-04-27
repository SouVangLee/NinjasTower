class Player {

  constructor() {
    this.x = 150;
    this.y = 200;
    this.width = 73;
    this.height = 92;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 9;
    this.moving = false;
  }

  createPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }


  
}

module.exports = Player;