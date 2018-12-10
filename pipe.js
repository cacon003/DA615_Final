class Pipe {
  constructor() {
		
    //size of opening in pipe determined by varibles
    let spacing = random(pipeOpeningMin, pipeOpeningMax);
    //center of the pipe opening can vary in the y axis
    let center = random(spacing, height - spacing);

    
    this.top = center - spacing / 2;	//top pipe
    this.topY = 0		//top pipe
    this.bottom = height - (center + spacing / 2); //bottom pipe
    this.bottomY = height - this.bottom; //bottom pipe
    this.xpos = width; //xpos of pipes
    this.width = 50;		//width of pipes
    
    this.highlight = false;
  }

  touches(bird) {
		//determins intersection of bird and top and bottom pipe
    if ( //top pipe
      bird.xpos + bird.rad > this.xpos &&
      bird.ypos + bird.rad > this.topY &&
      bird.xpos - bird.rad < this.xpos + this.width &&
      bird.ypos - bird.rad < this.topY + this.top ||

      //bottom pipe
      bird.xpos + bird.rad > this.xpos &&
      bird.ypos + bird.rad > this.bottomY &&
      bird.xpos - bird.rad < this.xpos + this.width &&
      bird.ypos - bird.rad < this.bottomY + this.bottom) {
      this.highlight = true;
      return true;
    } else {
      this.highlight = false;
      return false;
    }
  }

  //detects when bird passes through pipes
  passes(bird) {
    if (
      bird.xpos <= (this.xpos + this.width + 1) &&
      bird.xpos >= (this.xpos + this.width)
    ) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    noStroke();
    fill(255);
    if (this.highlight) {
      fill(125, 255, 85);
    }
    //(x,y,w,h)
    rect(this.xpos, this.topY, this.width, this.top); //top pipe
    rect(this.xpos, this.bottomY, this.width, this.bottom); //bottom pipe
  }

  //moves the pipes
  update() {
    this.xpos -= speed;
  }

  //detects when pipe is off screen
  offscreen() {
    if (this.xpos < -this.width) {
      return true;
    } else {
      return false;
    }
  }
}