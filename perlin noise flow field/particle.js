class Particle {
  constructor() 
  {
    //vectors or position,velocity,acceleration
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    //property to set max velocity
    this.maxspeed = 7;
    //propertie to store previous positions
    this.prevPos = this.pos.copy();
    //random colour 
    this.hue = random(270,360);
     
  }
// upadates position,velocity,accelerations
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
//makes particle follow the flowfeild
  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
//updates acceleration
  applyForce(force) {
    this.acc.add(force);
  }
//dispays the threads
  show() { 
    colorMode(HSB)
    stroke(this.hue,60,50);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
    //console.log(this.cp)
  }
//upadtes previous positions
  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
//wraps the thread on canvas
  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}