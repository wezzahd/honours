

import processing.video.*;
Movie myMovie;


int cols, rows;
int scl = 5;
int w = 800;
int h = 800;
PImage img, img2;
color c;
float zaxis = 200;
float zheight =0;

float flying = 0;

float[][] terrain;

float a = 0;
float sw=5;
float rot = 90;

void setup() {
  size(720, 720, P3D);
  cols = w / scl;
  rows = h/ scl;
  terrain = new float[cols][rows];
  myMovie = new Movie(this, "oceantexture.mp4");
  myMovie.loop();
  myMovie.speed(0.05);
  img = loadImage("background.jpg");
  img2 = loadImage("ocean.png");
}

void movieEvent(Movie m) {
  m.read();
}




void draw() {
  lights();
  //lightSpecular(102, 102, 102);
  smooth();
  //lights();

  flying -= 0.01;

  float yoff = flying;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      //float bright = brightness(c);
      // terrain[x][y] = map(bright, 0, 255, -50, 50);

      zheight = map(zaxis, 0, -600, 400, 0); 
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, (-zheight), zheight);

      // c = int(map(terrain[x][y], -50, 50, 0, 255)) ;
      xoff += 0.2;
    }
    yoff += 0.2;
  }



  background(0);
  //image(img,0,0);

  // fill (c);
  //fill(0, 71, 145, 200);
  //shininess(5.0);
  //directionalLight(102, 102, 102, 0, 0, -1);
  //lightSpecular(204, 204, 204);
  //pointLight(100, 100, 100, 35, 40, 36);
  ////spotLight(255, 255, 255, 50, 50, 0, 
  //          0.5, 0.5, -1, PI/16, 10); 

  if (zaxis > -600) {

    zaxis = zaxis - 1.0;
  }


  sw = map(zaxis, 200, -600, 5, 2);


  translate(width/2, height/2, zaxis); //-900

  float sine = (1 * cos(TWO_PI * frameCount / 500));

  if (rot > 0) {

    rot = map(sine, -1, 1, 0, 90);
  }

  rotateX(radians(rot));
  rotateZ(radians(a));
  translate(-w/2, -h/2);
  for (int y = 0; y < rows-1; y++) {
    beginShape(POINTS);
    for (int x = 0; x < cols; x++) {
      //texture(myMovie);
      c = myMovie.get(x, y);

      strokeWeight(sw);

      stroke(c);

      vertex(x*scl, y*scl, terrain[x][y], x*scl, y*scl);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1], x*scl, (y+1)*scl);
      //rect(x*scl, y*scl, scl, scl);
    }
    endShape();
  }

  if (a < 360) { 
    a = a+0.5;
  }
   saveFrame("output13/terrain2_####.png");
}
