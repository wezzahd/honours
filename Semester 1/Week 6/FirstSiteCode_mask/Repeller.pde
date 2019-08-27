
// A very basic Repeller class
class Repeller {
  
  // Gravitational Constant
 // float G = 1000; //map(mouseX,0, width, 0, 10000);
  // position
  PVector position;
  float r = 10;
  float min = 0;//00;
  float max =  700;//700;

  Repeller(float x, float y)  {
    position = new PVector(x,y);
  }

  void display() {
    stroke(0);
    strokeWeight(2);
    fill(0);
    ellipse(position.x,position.y,48,48);
  }

  // Calculate a force to push particle away from repeller
  PVector repel(Particle p) {
    PVector dir = PVector.sub(position,p.position);      // Calculate direction of force
    float sine = abs(1 * cos(TWO_PI * frameCount / 400));
    if (mousePressed) {
    sine = 0;
    min = 0;
  }
    
    
   float G = map(sine,0, 1, min, max);
  // float G = map(mouseX,0, width, 0, 1000);
    float d = dir.mag();                       // Distance between objects
    dir.normalize();                           // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    d = constrain(d,5,100);                    // Keep distance within a reasonable range
    float force = 1 * G / (d * d);            // Repelling force is inversely proportional to distance
    dir.mult(force);                           // Get force vector --> magnitude * direction
    return dir;
  }  
}
