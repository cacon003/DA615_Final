let bird; //bird object, only ever need one
let pipes = []; //pipe array

let pipeSpacing = 160;
let pipeOpeningMin = 150;
let pipeOpeningMax = 300;
let gravity = 0.5;
let speed = 2;
let points = 0
let beginGame = false

function setup() {
  createCanvas(400, 600);
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, height - 30);
  scoreElem.style('color', 'black');

  textElem = createDiv('Press the Spacebar to Begin, and use the Spacebar to Move');
  textElem.position((width / 2) - 180, height / 2);
  textElem.style('color', 'black');
}

function draw() {
  background(0, 191, 255); //dark syk blue background
  //wait to begin the game until space bar is pressed
  if (beginGame == true) {
    //iterate through pipes backwards because I am removing items from array
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      //delete pipes that move off screen from array
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
      //detect if bird passes through pipe and add a point
      if (pipes[i].passes(bird)) {
        gamePoint()
      }
      //game starts over if bird touches pipe
      if (pipes[i].touches(bird)) {
        gameOver();
      }
    }

    //update and show the bird
    bird.update();
    bird.show();

    //add new pipes based on pipeSpacing varible, gets more diffucult over time
    if (frameCount % pipeSpacing == 0) {
      pipes.push(new Pipe());
    }
  }
}

//gets called when a point needs to be added
function gamePoint() {
  points++;
  scoreElem.html('Score = ' + (points));

  //increese the dificulty every 5 points, modify game elements
  if (points % 5 == 0) {
    pipeSpacing = pipeSpacing - 10;
    pipeOpeningMin = pipeOpeningMin - 10;
    pipeOpeningMax = pipeOpeningMax - 20;
    gravity = gravity + 0.075;
  }

}

//runs when the game is over
function gameOver() {
  //clears all pipes from the pipe array
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes.splice(i, 1);
  }
  //displays score using popup message
  alert("GAME OVER\nYour Score Was : " + points + "\n\nPress OK/ Close or Enter Key to Start a New Game");
  points = 0; //reset points
  scoreElem.html('Score = ' + (points)); //update points display
  beginGame = false //set boolen to false and will wait for spacebar
  textElem.html('Press the Spacebar to Begin, and use the Spacebar to Move');


}

function startGame() {
  bird = new Bird(); //create the bird
  pipes.push(new Pipe()); //create a pipe by adding to the array
  //resets all the game elements and stats
  pipeSpacing = 160;
  pipeOpeningMin = 150;
  pipeOpeningMax = 300;
  gravity = 0.5;
  speed = 2;
  points = 0
}

function keyPressed() {
  if (key == ' ') {
    //this action is run when each game begins
    if (beginGame == false) {
      beginGame = true; //allows the draw loop to run
      startGame();
      textElem.html(''); //clears the on screen text
    }
    bird.up(); //moves the bird up
    bird.wingUp = true; //when the spacebar is pressed the bird will change its wing position
  }

}

function keyReleased() {
  bird.wingUp = false; //return the wing to normal when spacebar is releaced
}