# NinjasTower
A vertical jumping game where the user must dodge many ninja stars without getting hit or falling off of platforms. 
Users can use the left and right arrow keys to move the player, and space bar to jump. 
The score system is based on how many ninja stars you have dodged and has disappeared from the screen. 
Getting hit or falling off the platform will generate a 'Game Over' screen.

![Ninja's Tower Objective](https://user-images.githubusercontent.com/70188998/116821432-b943b680-ab2e-11eb-8669-9a12aa1d9781.jpg)
![gameover](https://user-images.githubusercontent.com/70188998/118312327-0405ec80-b4a6-11eb-93fc-84fccdb91a8c.jpg)

## Code Snippet
Here is a code snippet of checking whether a player can land on a platform or not.
```jsx
platformCollision() {
    this.platforms.forEach(platform => {
      let playerX = this.player.x;
      let playerMidX = this.player.x + (this.player.width / 2); //midpoint X-coord of the player frame
      let playerTotalX = this.player.x + this.player.width; //total width of each player frame
      let playerTotalY = this.player.y + this.player.height; //total height of each player frame
      let platformTotalX = platform.x + platform.width; //total width of each platform frame

      if (((playerX >= platform.x && playerX <= platformTotalX) ||
          (playerMidX >= platform.x && playerMidX <= platformTotalX) ||
          (playerTotalX >= platform.x && playerTotalX <= platformTotalX)) &&
          (playerTotalY >= platform.y && playerTotalY <= platform.y + platform.height)) {
            this.player.y = platform.y - this.player.height;
      }
    });
```
## Credits
Music by Brandon & Derek Fiechter - Samurai Warrior.
