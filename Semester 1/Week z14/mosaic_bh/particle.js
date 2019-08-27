class Particle {
  constructor(x, y, rand, img_) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector();
    this.previous_position = createVector();
    this.home = this.position.copy();
    this.lifespan = 255.0;
    this.fill_alpha = 255.0;
    this.rand = rand;
    this.img = img_;
    this.size_v2 = skip;
    this.maxsize = 80;
    this.radius = 25;
    this.highlight = false;
    this.maxspeed = 10;
    this.maxforce = 1;
    //this.angle = 0.0; //random(0,360);
    //this.aVelocity = 0;
    //this.aAcceleration = 0;
    this.black = color(0, 0, 0);
    this.gravity = false;
    this.tx = 0.1
    this.colour(this.rand);

  }

  colour(rand) {

    this.color = this.img.get(this.home.x, this.home.y, this.size_v2, this.size_v2);


    // 		this.r = red(this.c);
    // 		this.g = green(this.c);
    // 		this.b = blue(this.c);

    // 		this.random_color_gen = [];
    // 		this.random_color_gen[0] = color(this.r, 0, 0); //(this.c >> 16 & 0xFF, 0, 0);
    // 		this.random_color_gen[1] = color(0, this.g, 0); //color(0, this.c >> 8 & 0xFF, 0);
    // 		this.random_color_gen[2] = color(0, 0, this.b); //color(0, 0, this.c & 0xFF);
    // 		this.random_color_gen[3] = color(this.r, 0, 0); //(this.c >> 16 & 0xFF, 0, 0);
    // 		this.random_color_gen[4] = color(0, this.g, 0); //color(0, this.c >> 8 & 0xFF, 0);
    // 		this.random_color_gen[5] = color(0, 0, this.b); //color(0, 0, th

    // 		this.fill_col = this.random_color_gen[rand];
    // 		this.stroke_col = this.random_color_gen[(rand + 3)];

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
   // this.gravityforces();
    this.dragforces();
    this.frictionforces();
    // var flee = this.flee(this.mouse);
    // flee.mult(.5);
    // this.applyForce(flee);
  }





  flee() {
    var desired = p5.Vector.sub(this.mouse, this.position);
    var d = desired.mag();

    if (d < eraser_size) {
      desired.setMag(this.maxspeed);
      desired.mult(10);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
      this.gravity = true; //
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
    // let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    this.dir = p5.Vector.sub(this.position, other.position);
    return (this.dir.magSq() < ((this.size_v2 / 4) * (this.size_v2 / 4)));
    //return (d < this.radius + other.radius);
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


    //this.aVelocity += this.aAcceleration;
    //this.aVelocity = constrain(this.aVelocity, -0.01, 0.01);
    //this.angle += this.aVelocity;
   // this.colour(this.rand);


    if (this.gravity == true && this.size_v2 < this.maxsize) {
      this.size_v2 += 0.5;
    }

    if (this.lifespan > 255.) {
      this.lifespan -= 0.5;
    }
    if (this.fill_alpha > 100.0) {
      this.fill_alpha -= 1.0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
      //this.velocity.mult(-2);
    }

    if (this.position.y > height) {
      this.position.y = 0;
      //this.velocity.mult(-2);
    }
    if (this.position.x < 0) {
      this.position.x = height;
      //this.velocity.mult(-2);
    }

    if (this.position.x > width) {
      this.position.x = 0;
      //this.velocity.mult(-2);
    }

  }

  gohome() {
    this.d = dist(this.position.x, this.position.y, this.home.x, this.home.y);
    this.fill_alpha = map(this.d, 0, 500, 255, 40);
    this.size_v2 = map(this.d, 0, 500, skip, this.maxsize);
    //this.angle = map(this.d, 0.0, 50.0, this.currentangle, 0.0);
    //this.aVelocity = 0;
    //this.aAcceleration = 0;
    if (this.d < 0.05) {
      //this.angle = 0;
    }
  }




  // Method to display
  display() {


tint(255,this.fill_alpha);    image(this.color,this.position.x,this.position.y,this.size_v2,this.size_v2);

    //noStroke();
  // fill(this.color);
  //  rect(this.position.x,this.position.y,skip,skip);
    // beginShape(TRIANGLE_STRIP);
    // noStroke();
    // fill(this.color);
    // vertex(this.position.x, this.position.y);
    // vertex(this.position.x+skip, this.position.y);
    //       vertex(this.position.x, this.position.y+skip);
    // //vertex(this.position.x+skip, (this.position.y+skip));
    // endShape();

//     loadPixels();
//     let dens = pixelDensity();
//     for (let i = 0; i < dens; i++) {
//       for (let j = 0; j < dens; j++) {
//         // loop over
//         this.index = (4 * ((int(this.position.y * dens + j)) * width * dens + (int(this.position.x * dens + i))));

//         pixels[this.index] = red(this.color);
//         pixels[this.index + 1] = green(this.color);
//         pixels[this.index + 2] = blue(this.color);
//         pixels[this.index + 3] = alpha(this.color);


//       }
//     }
//     updatePixels();

    //this.updatePrevious();

    if (mouseIsPressed == true) {
      var d = dist(this.position.x, this.position.y, this.home.x, this.home.y);
      if (d < 0.05) {
        this.black = this.color;
      }
    } else {
      this.black = color(0, 0, 0);
    }
  }

  updatePrevious() {
    this.previous_position.x = this.position.x;
    this.previous_position.y = this.position.y;
  }







  //}

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
