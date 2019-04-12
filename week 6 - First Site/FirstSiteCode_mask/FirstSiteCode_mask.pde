//import processing.video.*;
//import ch.bildspur.postfx.builder.*;
//import ch.bildspur.postfx.pass.*;
//import ch.bildspur.postfx.*;



ParticleSystem ps;
Repeller repeller;
//Capture video;
//Movie index_boundary;
PImage video;
//PostFX fx;

PImage img;
PImage img2;
boolean first_frame = true;

int x=0;
int y=0;
int size = 5;
int factor = 1;
int square;
float sine;

void setup() {
 //fullScreen(P2D);
 size(1920,1080,P2D);
//size (3840, 2160, P2D);
  ps = new ParticleSystem(new PVector(width/2, 50), img, img2);
  repeller = new Repeller(width/2, height/2);
  //video = loadImage("download.jpg");
  //video = new Capture(this, width, height);
  //fx = new PostFX(this);  

  PImage img = loadImage("download_24.jpg");
  PImage img2 = loadImage("mask_v3.png");
  //img = new PImage(width, height);
  //video.start();

  //img = video;
  //first_frame = false;
  square = int(width/3);
  int square_no = width-(width/3);
  for (int i = square; i < square_no; i+=size) {
    for (int j = (height-square)/2; j < height-((height-square)/2); j+=size) {  
      ps.addParticle((x+i)/factor, (y+j)/factor, 0, img, img2);
      ps.addParticle((x+i)/factor, (y+j)/factor, 1, img, img2);
      ps.addParticle((x+i)/factor, (y+j)/factor, 2, img, img2);
    }
  }
}

//void captureEvent(Capture video) {
//  video.read();
//  if  (first_frame == true) {


//      }
//    }
//  }
//}





void draw() {
  background(0);
  smooth();
  blendMode(ADD);

  ps.update();
  //ps.intersection();
  ps.display();
  if (mousePressed) {
    ps.return_home();
  }
  ps.applyRepeller(repeller);
  
  float sine = abs(1 * cos(TWO_PI * frameCount / 800));
  
  if (sine <= 0.0001) {
    mousePressed = true;
  }else{
    mousePressed = false;
  }
  
  if (keyPressed) {
    mousePressed = true;
    sine = 0;
  }
  
saveFrame("output10/save_####.png");

//  if  (first_frame == false) {
//    video.stop();
//  }
  //blendMode(ADD);
  // fx.render()
  //   .bloom(0.1, 40, 80)
  //   .blur(10, 20)
  //   .compose();
}
