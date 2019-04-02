import processing.video.*;

Movie video;
OpenSimplexNoise noise;

int x = 0;
int y = 0;
int size = 1;
int frameno = 120;
int w = size; 
int h = size; 
float increment = 0.01;
float zoff = 0.0; 
float zincrement = 0.01; 
ArrayList frames = new ArrayList();

void setup () {
 //size (640, 480, P2D);
 size(1280,720,P2D);
  background(0);
 // fullScreen(P2D);

  // This the default video input, see the GettingStartedCapture 
  // example if it creates an error
  video = new Movie(this,"clock.mp4");
  
  noise = new OpenSimplexNoise();

  // Start capturing the images from the camera
  video.loop();
  //video.speed(.3);
}

void movieEvent(Movie m) {
  m.read();
  // Copy the current video frame into an image, so it can be stored in the buffer
  PImage img = createImage(width, height, RGB);
  video.loadPixels();
  arrayCopy(video.pixels, img.pixels);

  frames.add(img);

  // Once there are enough frames, remove the oldest one when adding a new one
  if (frames.size() > frameno) {
    frames.remove(0);
  }
}

void draw () { 

//background(255);

  for (int i = 0; i < 1; i++) {
    timeDisp(i);
  }
}  


void timeDisp(int num) {
  // video.loadPixels();
  loadPixels();
  float xoff = 0.0; // Start xoff at 0
  
  int square = int(video.width/3);
    int square_no = video.width-(video.width/3);
  
  
  
  for (int x = square; x < square_no; x+=size) {  
    xoff += increment;   // Increment xoff 
    float yoff = 0.0; 
    for (int y = (height-square)/2; y < height-((height-square)/2); y+=size) { 
       yoff += increment; // Increment yoff
      
      float n = (float) noise.eval(xoff,yoff,zoff);
      float bright = map(n, -1, 1, 0, 255);
      
      //float bright = noise(xoff,yoff,zoff)*255;
      //color col = video.pixels[x + y*video.width];
      
      
      int random = int(map(bright, 0, 255, 1, frameno));//int(random(1, frameno));

      if (random < frames.size()) {
        PImage img = (PImage)frames.get(random);
        color c = img.pixels[x + y*video.width];
        int loc = x + y* video.width;

        pixels[loc] = c;
        //fill(c);
        //noStroke();
        ////strokeWeight(size);
        //rect(x, y, size, size);

        //w = w + 1;
        //x = x + 10;
        //h = h +1;
        if (x > width) {
          //w = 50;
          //h= 50;
          //x = 0;

          //y= y+10;
        }
      }
      updatePixels();
    }
  }
}