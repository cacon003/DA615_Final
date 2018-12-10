class Bird {
  constructor() {
    this.ypos = height / 2;
    this.xpos = 64; //the birds x postion is fixed the entire game
    this.rad = 16; //raduis of bird

    this.lift = -15;
    this.velocity = 0;
    this.wingUp = false;
  }

  show() {
    //draw the bird
    push();
    translate(this.xpos, this.ypos)
    noStroke();
    fill(255);
    ellipse(0, 0, this.rad * 2); //body
    fill(255, 0, 0)
    triangle(15, 0, 15, 8, 25, 5); //beak
    fill(0);
    ellipse(10, -5, 4) //eye
    if (this.wingUp) {
      fill(200);
      triangle(10, -0, -15, 8, -25, -8); //wing up
    } else {
      fill(230);
      triangle(10, -0, -15, 3, -10, 16); //wing down
    }
    pop();
  }

  //this gets called when the spacebar is pressed, moves the bird up
  up() {
    this.velocity += this.lift;
  }

  //physics engine
  update() {
    this.velocity += gravity;
    this.velocity *= 0.9;
    this.ypos += this.velocity;

    if (this.ypos > height) {
      this.ypos = height;
      this.velocity = 0;
    }

    if (this.ypos < 0) {
      this.ypos = 0;
      this.velocity = 0;
    }
  }
}