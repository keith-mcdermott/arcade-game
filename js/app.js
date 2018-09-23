//the following code was developed with reference to various JS sources, including Stack Overflow (https://stackoverflow.com/), Matthew Cranford (https://matthewcranford.com) and Ryan Boris (https://www.youtube.com/watch?v=JcQYGbg0IkQ)

// Enemies player must avoid
var Enemy = function(x, y, speed) {
    this.colX = 101;
    this.rowY = 83;
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

    if(this.x < 5*this.colX){
      this.x += this.speed * dt;
    } else {
      this.x = -this.colX;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
class Player {
  constructor() {
    this.colX=101;
    this.rowY=83;
    this.gameOver = false;
    this.x = this.colX * 2;
    this.y = this.rowY * 4 + 55;
    this.sprite = 'images/char-boy.png'
  }

  update() {

    for(let enemy of allEnemies){
      if(this.y === enemy.y && (this.x < enemy.x + this.colX/1.4 && enemy.x < this.x + this.colX/1.4)){
        this.reset();
      }
//if player wins the game
      if (this.y < 55){
//display game win modal
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';

//temporarily stop enemies
        for(enemy of allEnemies){
          enemy.speed=0;
        }
//****a future update should include temporarily pausing player movement here****

//collapse modal, reset player and generate new random enemy speeds after clicking play again button
        document.getElementById('play-again-btn').addEventListener('click', function(){
          modal.style.display = 'none';

          player.reset();

          for(enemy of allEnemies){
            enemy.speed=randSpeed();
          }
        });
      }
    }
  }

  //draw sprite at current position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//move player in response to key strokes, while keeping sprite within bounds of board and centered on each tile
  handleInput(input) {
    if (input == 'left' && this.x > 0) {
      //moves player one tile at a time
      this.x -= this.colX;
    } else if (input == 'up' && this.y > 0) {
      this.y -= this.rowY;
    } else if (input == 'right' && this.x < (4 * this.colX)) {
      this.x += this.colX;
    } else if (input == 'down' && this.y < (5 * this.rowY - this.rowY / 2)) {
      this.y += this.rowY;
    }
  }

//reset player to start after collision
  reset() {
    this.x = this.colX * 2;
    this.y = this.rowY * 4 + 55;
  }
};

const player = new Player();

//generates a random number between 150 and 400 to be used for enemy speed
function randSpeed() {
  return (Math.random() * (4 - 1.5) + 1.5)*100;
}

//creates enemies and assigns them to one of three rows
const enemy1 = new Enemy(-101,0, randSpeed());
const enemy2 = new Enemy(-101,83, randSpeed());
const enemy3 = new Enemy(-101, (2*83), randSpeed());
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
//****a future update could include adding more enemies and randomly assigning them to rows ****


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
