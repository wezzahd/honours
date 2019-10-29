class Particle {
  constructor(x, y, rand, img_) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.velocity_v2 = createVector(random(-.1, .1), random(-.1, .1));
    this.acceleration = createVector();
    this.previous_position = createVector();
    this.home = this.position.copy();
    this.lifespan = 255.0;
    this.fill_alpha = 255.0;
    this.rand = rand;
    this.img = img_;
    this.size_v2 = 5;

    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 10;
    this.maxforce = 1;
    this.black = color(0, 0, 0);
    this.gravity = false;
    this.tx = 0.1
    this.colour(this.rand);
    this.local_force = false;
    this.resize = random(0.1, 0.5);
    this.dist_resize = 1.0;

if (isMobile == false) {
  this.maxsize = skip;
}else{
  this.maxsize = skip;
}


  }

  colour(rand) {


    this.fill_col = this.img.get(this.home.x/skip, this.home.y/skip);
    this.stroke_col = this.fill_col;

  }

  run() {
    this.update();
    this.display();
   // this.setHighlight(false);
  }

  // setHighlight(value) {
  //   this.highlight = value;
  // }

 behaviors() {
    this.mouse = createVector(mouseX, mouseY);
    this.flee();
    //this.gravityforces();
    this.dragforces();
   // this.frictionforces();
    var flee = this.flee(this.mouse);
   var arrive = this.arrive(this.home);

   flee.mult(-4.0);
   arrive.mult(0.05);

   if ( mouseIsPressed == true) {

   this.applyForce(flee);


   }
this.applyForce(arrive);
  }



  arrive () {
  var desired = p5.Vector.sub(this.home, this.position);
  var d = desired.mag();

  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
    this.dist_resize = map(d ,0, 100, 1, 2);
  }
  desired.mult(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}







flee() {
    var desired = p5.Vector.sub(this.mouse, this.position);
    var d = dist(this.mouse.x, this.mouse.y, this.position.x, this.position.y);
    this.mouseradius = 80;
    this.positionradius = (this.size_v2/2);


    if (d < this.mouseradius + this.positionradius) {
      desired.setMag(this.maxspeed);
      desired.mult(1.0);
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
    this.c = 0.1;
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
this.colour(this.rand);



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
      this.maxsize = 5;
    }else{


      this.maxsizepercent = [];
      this.maxsizepercent[0] = 5;
      this.maxsizepercent[1] = 5;

       if (displayHeight < 900){

       this.maxsizepercent[2] = 100;

    }else{
      this.maxsizepercent[2] = 300;
     }

      this.maxsize = this.maxsizepercent[int(random(0,3))];
    }
  }

  // gohome() {
  //   this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);
  //   this.fill_alpha = map(this.d, 0, 500, 255, 40);
  //   this.size_v2 = map(this.d, 0, 500, skip, this.maxsize);
  //   if (this.d < 0.05) {
  //     this.local_force = false;
  //   }
  // }




  // Method to display
  display() {

    stroke(this.stroke_col);
    fill(this.fill_col);
    this.b = map (brightness(this.fill_col), 0, 255, 0, skip*5);
    //rectMode(CENTER);
    rect(this.position.x, this.position.y, this.b * this.dist_resize, this.b * this.dist_resize);

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
