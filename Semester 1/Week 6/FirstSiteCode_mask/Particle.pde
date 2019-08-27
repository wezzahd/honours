class Particle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  PVector home;
  float lifespan;
  color c;
  color index;
  color boundary = color(255, 255, 255);
  float r = 15;
  float mass = 1; // Let's do something better here!
  PImage img, img2;
  color col;
  float fill_alpha;
  float line_alpha;
  float size_v2;
  float d;


  Particle(float x, float y, int rand, PImage img_, PImage img2_) {
    acceleration = new PVector();
    velocity = new PVector(random(-.001, .001), random(-.001, .001));//PVector.random2D();
    position = new PVector(x, y);
    home = position.copy();
    lifespan = 255.0;
    fill_alpha = 255.0;
    line_alpha = 0.0;
    img = img_;
    img2 = img2_;
    size_v2 = size;
    colour(rand);
  }

  void colour(int rand) {

    //img.loadPixels(); 
    //  color c = img.pixels[int(position.x) + int(position.y)*img.width];
    c = img.get(int(position.x)*factor, int(position.y)*factor); 
    
    

    int[] random_color_gen = new int[3];
    random_color_gen [0] = color(c >> 16 & 0xFF, 0, 0);
    random_color_gen [1] = color(0, c >> 8 & 0xFF, 0);
    random_color_gen [2] = color(0, 0, c & 0xFF);

    col = random_color_gen [rand];
  }


  void run() {
    update();
    display();
  }

  void intersects(ArrayList<Particle> particles) {
    for (Particle other : particles) {
      if (other != this) {
        PVector dir = PVector.sub(position, other.position);
        if (dir.mag() < 20) {
          dir.setMag(.1); 
          applyForce(dir);
          stroke(col, line_alpha);
          line(position.x, position.y, other.position.x, other.position.y);
        }
      }
    }
  }

  void applyForce(PVector f) {
    f.div(mass);   
    acceleration.add(f);
  }

  // Method to update position
  void update() {
    velocity.add(acceleration);
    position.add(velocity);
    acceleration.mult(0);
    float c = 0.01;//0.001 change drag force for run 2
    float speed = velocity.mag();
    float dragMagnitude = c * speed * speed;
    PVector drag = velocity.get();
    drag.mult(-1); 
    drag.normalize();
    drag.mult(dragMagnitude);
    velocity.add(drag);

    lifespan -= 0.1; 
    
    index = img2.get(int(position.x)*factor, int(position.y)*factor);
    if (index != boundary) {
      velocity.mult(-1);
      //position.x = width/2;
      //position.y = height/2;
    }

    if (size_v2 < 1.) { //1.
      size_v2 += .1;
    }

    if (fill_alpha > 0) {
      fill_alpha -= 5.0;
    }
    if (line_alpha < 255) {
      line_alpha += 2.0;
    }



    if (position.y < 0) {
      velocity.mult(-2);
    } 

    if (position.y > height) {
      velocity.mult(-2);
    }
    if (position.x < 0) {
      velocity.mult(-2);
    } 

    if (position.x > width) {
      velocity.mult(-2);
    }
  }

  // Method to display
  void display() {
    //colour();
    //noFill();
    float d = dist(position.x, position.y, home.x, home.y);
    if (mousePressed) {

      // float maxdist = dist(0, 0, width, height);
      fill_alpha = map(d, 0, 700, 255, 0);
      lifespan = map(d, 0, 700, 255, 0);
      line_alpha = map(d, 0, 700, 0, 150);
      if (d < 200) {
      size_v2 = map(d, 0, 200, size, 1);
      }
      //size = 10;
      //factor = 50;
      //}else{
      //  fill_alpha = 40;
    }

    stroke(col, lifespan);
    fill(col, fill_alpha);
    strokeWeight(1);
    //fill(127, lifespan);
    //ellipse(position.x, position.y, r*2, r*2);
    //point(position.x/factor, position.y/factor);
    ellipse(position.x/factor, position.y/factor, size_v2, size_v2);
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan == 300.0) {
      return true;
    } else {
      return false;
    }
  }
}
