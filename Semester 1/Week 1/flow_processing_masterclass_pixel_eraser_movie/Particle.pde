class Particle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  PVector home;
  float lifespan;
  color c;
  float r = 15;
  PImage img;
  color col;
  float fill_alpha;
  float size_v2;
  int rand;
  float maxsize;
  float angle;
  float aVelocity, aAcceleration;
  float maxspeed, maxforce;
  PVector mouse, steer, gravity_force, friction;
  PVector previous_position;
  color black = color (0, 0, 0);
  boolean gravity;


  Particle(float x, float y, int rand_, PImage img_) {
    acceleration = new PVector();
    velocity = new PVector(0, 0);//PVector.random2D();
    position = new PVector(x, y);
    home = position.copy();
    previous_position = position.copy();

    lifespan = 255.0;
    fill_alpha = 255.0;
    maxsize = 300;
    maxspeed = 10;
    maxforce = 5;
    angle = 0.0;
    aVelocity = random(-0.1, 0.1);//0;
    aAcceleration = random(-0.001, 0.001);//0;
    img = img_;
    size_v2 = skip;
    rand = rand_;
    gravity = false;
  }

  void colour(int rand) {

    c = img.get(int(home.x)*factor, int(home.y)*factor);
  }

  void run() {
    update();
    display();
  }

  void intersects(ArrayList<Particle> particles) {
    for (Particle other : particles) {
      if (other != this) {
        PVector dir = PVector.sub(position, other.position);
        if (dir.mag() < size_v2/2) {
          dir.setMag(1); 
          applyForce(dir);
        }
      }
    }
  }

  void behaviours() {
    mouse = new PVector(mouseX, mouseY);
    flee();
    gravity();
   // drag();
    friction();
  }


  void flee () {
    PVector desired = PVector.sub(mouse, position);
    float d = desired.mag();

    if (d < eraser_size) {
      desired.setMag(maxspeed);
      desired.mult(-1);
      steer = PVector.sub(desired, velocity);
      steer.limit(maxforce);   
      applyForce(steer);
      gravity = true;
    }
  }

  void applyForce(PVector f) {
    acceleration.add(f);
  }

  void gravity() {
    gravity_force = new PVector(0, 1.0);
    if (gravity == true) {
      applyForce(gravity_force);
      applyForce(friction);
    }

    if (mousePressed) {
      gravity = false;
    }
  }

  void drag() {
    float c = 0.01;
    float speed = velocity.mag();
    float dragMagnitude = c * speed * speed;
    PVector drag = velocity.get();
    drag.mult(-1); 
    drag.normalize();
    drag.mult(dragMagnitude);
    velocity.add(drag);
  }

  void friction() {
    float c = 1.0;
    friction = velocity.get();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);
  }

  // Method to update position
  void update() {
    velocity.add(acceleration);
    position.add(velocity);
    acceleration.mult(0);
    colour(rand);


    lifespan -= 0.0; 




    if (fill_alpha > 40) {
      fill_alpha -= 1.0;
    }
    if (position.y < 0) {
      velocity.mult(-1);
    } 

    if (position.y > height) {
      velocity.mult(-1);
    }
    if (position.x < 0) {
      velocity.mult(-1);
    } 

    if (position.x > width) {
      velocity.mult(-1);
    }
  }

  // Method to display
  void display() {


    loadPixels();
    screen.loadPixels();
    int ind = int(position.x) + int(position.y) * screen.width;
    int ind2 = constrain(ind, 0, ((screen.width * screen.height)-1));

    int ind3 = int(previous_position.x) + int(previous_position.y) * screen.width;
    int ind4 = constrain(ind3, 0, ((screen.width * screen.height)-1));



    screen.pixels[ind2] = c;
    screen.pixels[ind4] = black;

    screen.updatePixels();
    updatePrevious();

    float d = dist(position.x, position.y, home.x, home.y);
    if (d < 0.01) {
      black = c;
    } else {
      black = color(0, 0, 0);
    }
  }


  void updatePrevious() {
    previous_position.x = position.x;
    previous_position.y = position.y;
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}