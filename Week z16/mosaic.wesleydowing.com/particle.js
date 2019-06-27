class Particle {
  constructor(x, y, rand, img_) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.velocity_v2 = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector();
    this.previous_position = createVector();
    this.home = this.position.copy();
    this.lifespan = 255.0;
    this.fill_alpha = 255.0;
    this.rand = rand;
    this.img = img_;
    this.size_v2 = skip;
    this.maxsize = 200;
    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 10;
    this.maxforce = 1;
    this.black = color(0, 0, 0);
    this.gravity = false;
    this.tx = 0.1
    this.colour(this.rand);
    this.local_force = true;
    this.resize = random(0.1, 0.5);


  }

  colour(rand) {

    this.color = this.img.get(this.home.x, this.home.y, this.size_v2, this.size_v2);

  }

  run() {
    this.update();
    this.display();
    this.setHighlight(false);
  }

  setHighlight(value) {
    this.highlight = value;
  }

 behaviors() {
    this.mouse = createVector(mouseX, mouseY);
    this.flee();
    //this.gravityforces();
    this.dragforces();
   // this.frictionforces();
    var flee = this.flee(this.mouse);
    flee.mult(-1.);
    this.applyForce(flee);
  }




flee() {
    var desired = p5.Vector.sub(this.mouse, this.position);
    var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
    this.mouseradius = eraser_size;
    this.positionradius = (this.size_v2/2);


    //var d = desired.mag();

    if (d < this.mouseradius + this.positionradius) {
      desired.setMag(this.maxspeed);
      desired.mult(10.0);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.local_force = true;
      return steer;
   } else {
     return createVector(0, 0);
    }
}

  gravityforces() {

    var g = map(noise(this.tx), 0, 1, 1.0, 1.2);

    this.gravity_force = createVector(g, 0);
    if (this.gravity == true) {
      this.applyForce(this.gravity_force);
      this.applyForce(this.friction);
    }

    if (mouseIsPressed) {
      this.gravity = false;
    }
  }

  dragforces() {
    this.c = 0.01;
    this.speed = this.velocity.mag();
    this.dragMagnitude = this.c * this.speed * this.speed;
    this.drag = this.velocity.copy();
    this.drag.mult(-1);
    this.drag.normalize();
    this.drag.mult(this.dragMagnitude);
    this.velocity.add(this.drag);
  }

  frictionforces() {
    this.friction_c = 1.0;
    this.friction = this.velocity.copy();
    this.friction.mult(-1);
    this.friction.normalize();
    this.friction.mult(this.friction_c);
  }





  intersects(other) {
    this.dir = p5.Vector.sub(this.position, other.position);
    return (this.dir.magSq() < ((this.size_v2 / 4) * (this.size_v2 / 4)));
  }


  intersectForce() {
    this.dir.setMag(.3);
    this.applyForce(this.dir);
  }



  applyForce(f) {
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 0.0;
    this.velocity.limit(5);


    // if (this.gravity == true && this.size_v2 < this.maxsize) {
    //   this.size_v2 += 0.5;
    // }

    if (this.local_force == true) {
        this.velocity = this.velocity_v2;
    }



    if (this.lifespan > 255.) {
      this.lifespan -= 0.5;
    }
    if (this.fill_alpha > 100.0) {
      this.fill_alpha -= 1.0;
    }
    if (this.position.y < 0) {
      //this.position.y = height;
      this.velocity.mult(-2);
    }

    if (this.position.y > height) {
    //  this.position.y = 0;
      this.velocity.mult(-2);
    }
    if (this.position.x < 0) {
      //this.position.x = height;
      this.velocity.mult(-2);
    }

    if (this.position.x > width) {
      //this.position.x = 0;
      this.velocity.mult(-2);
    }

    if (this.size_v2 < this.maxsize) {
      this.size_v2 += this.resize;

    }

    if (this.local_force == false) {
      this.maxsize = skip;
    }else{


      this.maxsizepercent = [];
      this.maxsizepercent[0] = skip;
      this.maxsizepercent[1] = skip;

       //if (displayHeight < 900){

       this.maxsizepercent[2] = 100;

    // }else{
     //  this.maxsizepercent[2] = 200;
     //}

      this.maxsize = this.maxsizepercent[int(random(0,3))];
    }
  }

  gohome() {
    this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);
    this.fill_alpha = map(this.d, 0, 500, 255, 40);
    this.size_v2 = map(this.d, 0, 500, skip, this.maxsize);
    if (this.d < 0.05) {
      this.local_force = false;
    }
  }




  // Method to display
  display() {

    // if (this.d > 0.05 && mouseIsPressed) {
    //   this.local_force = false;
    // }

image(this.color,this.position.x,this.position.y,this.size_v2,this.size_v2);
  }


  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
