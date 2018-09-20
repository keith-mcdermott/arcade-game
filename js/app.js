// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // x position
    //y position
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if enenmy has not passed boundary
      //move foreward
      //increment x by spped * dt
    //else
      //reset pos to start
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player Class

class Player {
  constructor() {
    this.x = 101*2;
    this.y = (83*5)-(83/2);
    //sets y start point in center of fifth tile from top
    this.sprite = 'images/char-boy.png'
  }
  //draw sprite at current position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //this.x and this.y are current position
  }

  handleInput(input) {
    if (input == 'left'){
      //moves player sprite one tile at a time
      this.x -= 101;
    } else if (input == 'up'){
      this.y -= 83;
    } else if (input == 'right'){
      this.x += 101;
    } else if (input == 'down'){
      this.y +=83;
    }
  }
};

const player = new Player();
//  Constructor
    // Properties
      //x position
      //y position
      //sprite image
    //Methods
      //Update position
        //Did collision occur here?
          //did player collide with enemy?
        //Did win occur here?
          //did player reach last tile
      //render (draw/redraw every game loop)
        //draw sprite at x and y coordinate
      //handle input from event listener on users keyboard
        //update x and y according to input

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Initilize new Player object (only need one)
//init allEnemies array
//for each enemy create and push new Enemy object into allEnemies array

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
