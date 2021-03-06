// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.


class Enemy {

  // The constructor takes 2 arguments.
  // - theRoot refers to the parent DOM element.
  //   We need a way to add the DOM element we create in this constructor to our DOM.
  // - enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
  // Since the constructor takes 2 parameters
  // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
  // create an instance of this class.
  constructor(theRoot, enemySpot) {
    // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
    // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    this.spot = enemySpot;
    //this.count = 0;
    // The x position of the enemy is determined by its width and its spot. We need this information for the lifetime
    // of the instance, so we make it a property of the instance. (Why is this information needed for the lifetime of the instance?)
    this.x = enemySpot * ENEMY_WIDTH;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a property
    // of the instance since it is needed throughout its lifetime. The destroyed property will indicate whether this enemy
    // is still in play. It is set to true whenever the enemy goes past the bottom of the screen.
    // It is used in the Engine to determine whether or not an enemy is in a particular column.
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement('img');

    // We give it a src attribute to specify which image to display.
    this.domElement.src = './images/enemy.png';
    //this.domElement.src = 'assets/Nyan_cat.gif';
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    //this.speed = Math.random() / 2 + 0.25;

    //######################### LEVEL SPEED ###################################
    //created the level feature that increases speed
    if(levelCount == 1) {
      this.speed = Math.random() / 2 + 0.15;
    } else if(levelCount == 2) {
      this.speed = Math.random() / 2 + 0.20;
    } else if (levelCount == 3) {
      this.speed = Math.random() / 2 + 0.30;
    } else if (levelCount == 4) {
      this.speed = Math.random() / 2 + 0.40;
    } else if (levelCount == 5) {
      this.speed = Math.random() / 2 + 0.50;
    } 

    //depending on how many enemies were dodged by the player (destroyed), the
    //level is set.
    if(count <= 10) {
      levelCount = 1;
    } else if (count <=20) {
      levelCount = 2;
    } else if (count <=30) {
      levelCount = 3;
    } else if (count <=40) {
      levelCount = 4;
    } else if (count <=50) {
      levelCount = 5;
    }

  }


  // We set the speed property of the enemy. This determines how fast it moves down the screen.
  // To make sure that every enemy has a different speed, we use Math.random()
  // this method will be called on the enemy instance every few milliseconds. The parameter
  // timeDiff refers to the number of milliseconds since the last update was called.
  update(timeDiff) {
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
      count++;
      scoreboard.innerText = count*500;
    }
    
    //Update the score on screen, each enemy is worth 500 pts
    scoreboard.innerText = count*500;
    scoreMsg.innerText = `Score: ${count*500}`;

    //Update the Level based on the global levelCount variable
    level.innerText = `Level ${levelCount}`;

  }


  //method gets called whenever an enemy collides with the player
  kill = () => {
    //a single life from the life bar gets removed
    let life = document.getElementById(`life-${livesCount}`);
    //console.log(life);
    lives.removeChild(life);

    //the life counter goes down by 1
    livesCount--;

    //to avoid crashing the game whenever a restart is initiated, should not
    //remove more enemies than needed when the game condition ends.
    if(livesCount != 0) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
      //console.log(livesCount);
    } else {
      return;
    }
  }
}
