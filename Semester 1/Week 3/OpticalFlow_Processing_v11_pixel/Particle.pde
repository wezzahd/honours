// Simple Particle System

class Particle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float lifespan;
  float maxspeed;
  PVector previous_position;
  PImage img;
  color black = color (0, 0, 0);
  PVector home;
  //ArrayList <PVector> history;





  Particle(PVector l, PImage img_) {
    acceleration = new PVector();
    velocity = new PVector(100, 0);
    position = l.copy();
    previous_position = position.copy();
    home = position.copy();

    lifespan = 0;
    maxspeed = 1;
    img = img_;
   // history = new ArrayList<PVector>();
  }

  void run() {
    update();
    display();
  }

  // Method to update position
  void update() {
    velocity.add(acceleration);
    velocity.limit(maxspeed);
    position.add(velocity);
    acceleration.mult(0);

    //float c = 0.5;
    //float speed = velocity.mag();
    //float dragMagnitude = c * speed * speed;
    //PVector drag = velocity.get();
    //drag.mult(-1); 
    //drag.normalize();
    //drag.mult(dragMagnitude);
    //velocity.add(drag);

    //PVector vec = new PVector (position.x, position.y);
    //history.add(vec);
    //if (history.size() > historysize) {
    //  history.remove(0);
    //}



    lifespan -= .0;
    if (position.y < 0) {
      position.y = height;
      updatePrevious();
    } 

    if (position.y > height) {
      position.y = 0;
      updatePrevious();
    }
    if (position.x < 0) {
      position.x = width;
      updatePrevious();
    } 

    if (position.x > width) {
      position.x = 0;
      updatePrevious();
    }
  }

  void follow(PVector[] vectors) {





    int x = floor(position.x / scl);
    int y = floor(position.y / scl);
    int index = (x-1) + ((y-1) * cols);
    // Sometimes the index ends up out of range, typically by a value under 100.
    // I have no idea why this happens, but I have to do some stupid if-checking
    // to make sure the sketch doesn't crash when it inevitably happens.
    //
    index = index - 1;
    if (index > vectors.length || index < 0) {
      //println("Out of bounds!");
      //println(index);
      //println(vectors.length);
      index = vectors.length - 1;
    }
    PVector force = vectors[index];
    applyForce(force);


    //float scale_x = width/video.width;
    //float scale_y = height/video.height;

    //int flow_x = constrain((int(position.x/scale_x)), 1, video.width -1);
    //int flow_y = constrain((int(position.y/scale_y)), 1, video.height -1);



    //PVector aveFlow = opencv.getFlowAt(flow_x, flow_y);

    //if (aveFlow.mag() < 1) {
    //  aveFlow.x = 0;
    //  aveFlow.y = 0;
    //}

    //applyForce(aveFlow);
  }

  void applyForce(PVector force) {
    acceleration.add(force);
  }

  // Method to display
  void display() {

    float widthScale = width/img.width;
    float heightScale = height/img.height;

    color col = img.get(int(home.x/widthScale), int(home.y/heightScale)); 

    loadPixels();
    screen.loadPixels();
    int ind = int(position.x) + int(position.y) * screen.width;
    int ind2 = constrain(ind, 0, ((screen.width * screen.height)-1));
    screen.pixels[ind2] = col;


//    if (history.size() > historysize -1) {
//      PVector current = history.get(99);

//      int ind3 = int(current.x) + int(current.y) * screen.width;
//      int ind4 = constrain(ind3, 0, ((screen.width * screen.height)-1));

//      screen.pixels[ind4] = black;
      
//    }
      screen.updatePixels();
      updatePrevious();
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
