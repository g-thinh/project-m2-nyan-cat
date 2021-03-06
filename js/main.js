// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};

// ################################ MUSIC ######################################

const levelUpSound = document.getElementById("levelup-music");
levelUpSound.loop = false;

const gameOverSound = document.getElementById("gameover-music");
gameOverSound.loop = false;


const deathSound = document.getElementById("death-music");
deathSound.loop = false;

function levelUp() {
  levelUpSound.play();
  setTimeout(function(){ levelUpSound.pause(); }, 500);
  // levelUpSound.pause();
}

function gameOver() {
  gameOverSound.play();
  setTimeout(function(){ gameOverSound.pause(); }, 1000);
  // levelUpSound.pause();
}

function died() {
  deathSound.play();
  setTimeout(function(){ deathSound.pause(); }, 500);
  // levelUpSound.pause();
}

// ################################ LEVELS #####################################

const level = document.createElement("h2");
level.innerText = `Level ${levelCount}`;
level.id = "level";
level.classList.add("msg");
level.style.left = "200px"; //looks centered enough
level.style.top = `0px`;
document.getElementById('app').appendChild(level);

// ############################### LIVES ######################################

const lives = document.createElement("div");
lives.id = "lives";
document.getElementById('app').appendChild(lives);

function createLives() {
  for(let i=0; i < 3; i++) {
    let life = document.createElement("img");
    life.src = "images/player.png";
    life.id = `life-${i+1}`;
    life.classList.add("lives");
    // life.width = "50px";
    // life.height = "50px";
    life.style.left = "200px"; //looks centered enough
    life.style.top = `0px`;
    document.getElementById('lives').appendChild(life);
  }
  livesCount = 3;
}
createLives();


// ################################ SCOREBOARD ################################

const scoreboard = document.createElement("h2");
scoreboard.innerText = count;
scoreboard.id = "score";
scoreboard.classList.add("msg");
scoreboard.style.left = "15px"; //looks centered enough
scoreboard.style.top = `0px`;
document.getElementById('app').appendChild(scoreboard);


const scoreMsg = document.createElement("h2");
scoreMsg.innerText = `Score: ${count}`;
scoreMsg.id = "totalscore";
scoreMsg.classList.add("msg");
scoreMsg.classList.toggle("visible");
scoreMsg.style.left = "15px"; //looks centered enough
scoreMsg.style.top = `${GAME_HEIGHT*0.70}px`;
document.getElementById('app').appendChild(scoreMsg);


// ################################ START BUTTON ################################

//create a start button that will initiate the gameLoop method, instead of it being
//started onload.
const startBtn = document.createElement("button")
startBtn.innerText = "Start";
startBtn.id = "start";
startBtn.classList.add("start-btn");
startBtn.style.left = "70px"; //looks centered enough
startBtn.style.top = `${GAME_HEIGHT/2}px`;
document.getElementById('app').appendChild(startBtn);


//create a text element that will appear hidden when the game starts
const startMsg = document.createElement("h2");
startMsg.innerText = "Ready to Play?";
startMsg.id = "start-msg";
startMsg.classList.add("msg");
startMsg.style.top = `${GAME_HEIGHT/3}px`;
startMsg.style.left = "32px"; //looks centered enough
document.getElementById('app').appendChild(startMsg);



//Add functionality to the start button, when clicked.
document.getElementById("start").addEventListener("click", function() {


  //the button and start message will disappear
  startBtn.classList.toggle("visible");
  startMsg.classList.toggle("visible");

  //the left and right arrow keys will enable the player to move
  document.addEventListener('keydown', keydownHandler);

  //enable the music loop to play;
  document.getElementById("bg-music").play();

  //the game loop starts
  gameEngine.gameLoop();
});

// ############################## RESTART BUTTON ###############################

//create a restart button that is initially hidden, and will only appear when 
//the gameloop end condition is met (player dies).
const restartBtn = document.createElement("button")
restartBtn.innerText = "Restart";
restartBtn.id = "restart";
restartBtn.classList.add("restart-btn");
restartBtn.classList.toggle("visible");
restartBtn.style.left = "70px"; //looks centered enough
restartBtn.style.top = `${GAME_HEIGHT/2}px`;
document.getElementById('app').appendChild(restartBtn);


//create a text element that will appear hidden when the game restarts
const endMsg = document.createElement("h2");
endMsg.innerText = "You Lost!";
endMsg.id = "end-msg";
endMsg.classList.add("msg");
endMsg.classList.toggle("visible");
endMsg.style.top = `${GAME_HEIGHT/3}px`;
endMsg.style.left = "90px"; //looks centered enough
document.getElementById('app').appendChild(endMsg);

//Add functionality to the restart button, when clicked.
document.getElementById("restart").addEventListener("click", function() {

  createLives();

  //the button and end message will disappear
  restartBtn.classList.toggle("visible");
  endMsg.classList.toggle("visible");
  score.classList.toggle("visible");
  document.getElementById("totalscore").classList.toggle("visible");

  //the left and right arrow keys will be re-enabled, previously removed
  //when the first game loop finished
  document.addEventListener('keydown', keydownHandler);

  //reenable the music loop to play;
  document.getElementById("bg-music").play();



  //restart the game loop
  gameEngine.gameLoop();
  //restart the score

  count = 0;
  console.log("i have this many lives left:",livesCount);
});


// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
//document.addEventListener('keydown', keydownHandler);



// // We call the gameLoop method to start the game
// gameEngine.gameLoop();
