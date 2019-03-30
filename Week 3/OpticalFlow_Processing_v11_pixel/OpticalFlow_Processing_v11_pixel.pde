import processing.video.*;


//Capture video;
OpenSimplexNoise noise;

ArrayList<Particle> particles;

int videoScale = 1;
int cols, rows;
PVector[] flowField;
boolean first_frame = true;
PImage video;
PImage screen;

//int historysize = ;


float inc = -0.1;
int scl = 10;
float zoff = 0;


void setup() {
  size(1080, 1080, P2D);

  cols = floor(width/videoScale);  
  rows = floor(height/videoScale);
  video = loadImage("stones5.jpg");//new Capture(this, width, height);
  flowField = new PVector[(cols*rows)];
  particles = new ArrayList<Particle>();
  noise = new OpenSimplexNoise();

  screen = createImage(width, height, RGB);

 // video.start();
  captureEvent();
}

void draw() {

  float yoff = 0;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      int index = (x + y * cols);

      float n = (float) noise.eval(xoff, yoff, zoff);
      float angle = map(n, -1, 1, 0, TWO_PI);

      PVector v = PVector.fromAngle(angle);
      v.setMag(0.1);

      flowField[index] = v;

      xoff = xoff + inc;
    }
    yoff = yoff + inc;
  }
  zoff = zoff + (inc / 50);


// Looping through backwards to delete
for (int i = particles.size()-1; i >= 0; i--) {
  Particle p = particles.get(i);
  p.run();
  p.follow(flowField);
  if (p.isDead()) {
    particles.remove(i);
  }
}
image(screen, 0, 0);
//saveFrame("output/flow-####.png");
}

//void captureEvent(Capture video) {
  void captureEvent() {
 // video.read();
  if  (first_frame == true) {
    first_frame = false;


    int square = 212;//int(width/3);
    int square_no = 868; //width-(width/3);
    for (int i = square; i < square_no; i+=videoScale) {
      for (int j = square; j < square_no; j+= videoScale) {  
        particles.add(new Particle(new PVector(i, j), video));
      }
    }
  }
}
