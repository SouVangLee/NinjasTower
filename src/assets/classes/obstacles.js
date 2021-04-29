class Obstacle {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 13;
    this.dir = dir;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 6;
  }
}

//module.exports = Obstacle;