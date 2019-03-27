import processing.video.*;

ParticleSystem ps;
Movie myMovie;



PImage img;
boolean first_frame = true;

PImage screen;


int eraser_size = 25;
int x=0;
int y=0;
int skip = 1;
int factor = 1;
int square;

void setup() {
  // fullScreen(P2D);
  size(720, 720, P2D);
  ps = new ParticleSystem(new PVector(width/2, 50), img);
  screen = createImage(width, height, RGB);
  myMovie = new Movie(this, "ocean2.mov");
  myMovie.loop();


  //video.start();
}

void MovieEvent(Movie m) {

  m.read();

  if  (first_frame == true) {

    //img = video;
    first_frame = false;
    square = int(width/3);
    int square_no = width-(width/3);
    for (int i = square; i < square_no; i+=skip) {
      for (int j = (height-square)/2; j < height-((height-square)/2); j+=skip) {  
        ps.addParticle((x+i)/factor, (y+j)/factor, 0, myMovie);
      }
    }
  }
}





void draw() {
  // blendMode(ADD);

  background(0);


  ps.update();
  // ps.intersection();
  ps.display();

  // if (keyPressed) {
  //ps.applyRepeller(repeller);
  // }

  ps.behaviours();
  if (mousePressed) {
    ps.return_home();
  }  

  image(screen, 0, 0);
  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, eraser_size * 2, eraser_size * 2);

  //
}