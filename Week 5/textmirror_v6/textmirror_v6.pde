// Exercise 17-9: Using textWidth(), redo Example 17-4 (the text "mirror") to use a 
// non-fixed-width font with proper character spacing.


import processing.video.*;

// Size of each cell in the grid, ratio of window size to video size
int videoScale = 10;
// Number of columns and rows in our system
int cols, rows;
// Variable to hold onto capture object
Movie video;

// A String and Font
String chars = "10110010";
PFont f;
//float tr_z = 5;
float scaler = 8;
float fac;


void setup() {

  size(1280, 720, P2D);
  //blendMode(ADD);
  //size(displayWidth, displayHeight,P3D);
  //size(640, 480,P3D);
  //set up columns and rows
  cols = width/videoScale;
  rows = height/videoScale;
  video = new Movie(this, "eye4.mp4");
  video.loop();

  // Load the font
  f = createFont("Source Code Pro", 50);
  //println(PFont.list());
}

void draw() { 
  // Read image from the camera
  //if (video.available()) {
  //  video.read();
  //}
  video.loadPixels();
  //image(video,0,0,width,height);

  background(0);

 translate(width/2, height/2);
  scale(scaler);
  translate(-(width/2), -(height/2));
  //translate(width/2-(width+width/3), 0);

  //translate(width/2, height/2);
  // Use a variable to count through chars in String
  int charcount = 0;

  // Begin loop for rows
  for ( int j = 0; j < rows; j++) {
    // Begin loop for columns, instead of pixel by pixel now
    // we move with a variable floating point x,  based on character width
    float x = 0;  //0
    while (x < width) { //width
      // Where are we, pixel-wise for y?
      int y = j*videoScale;
      // Where are we pixel-wise for x? Convert to int, scale down, and make sure we don't go offscreen 
      int pix = constrain((int) (x / videoScale), 0, cols);

      // Looking up the appropriate color in the pixel array
      color c = video.pixels[pix+j*video.width]; 
      float sz = ((brightness(c)/255) * videoScale)+1;
      float a = brightness(c);

      // Displaying an individual character from the String
      // Instead of a rectangle
      textFont(f, 4.2);
      color red =  color (c >> 16 & 0xFF, 0, 0);
      color green = color (0, c >> 8 & 0xFF, 0 );
      color blue = color (0, 0, c & 0xFF);


      String chars = nfs(int(red(red)), 3);
      String chars2 = nfs(int(green(green)), 3);
      String chars3 = nfs(int(blue(blue)), 3);

      if (scaler > 5) {
        fac = map(scaler, 10, 5, 3.5, 1) ;
      }else{
      fac = 1;
      }


      char ch = chars.charAt(charcount);
      //textSize(sz*4);
      //text(ch, x, y);
      // textAlign(CENTER);

      for (int i = 1; i <= chars.length(); i++) {
        fill(red);
        text(chars.substring(i-1, i), (x*fac)+(1*fac), y+i *3);

        fill(green);
        text(chars2.substring(i-1, i), (x*fac)+(2*fac), y+i *3);

        fill(blue);
        text(chars3.substring(i-1, i), (x*fac)+(3*fac), y+i *3);

        //fill(0);
        // text(chars3.substring(i-1, i), (x*fac)+(3*fac), y+i *3);
      }

      // Go on to the next character, loop back to zero at end
      charcount = (charcount + 1) % chars.length();
      // Move x according to character's widt
      x += textWidth(ch);
    }
  }
  if (scaler >=0.61) { 
   scaler -= 0.1;
  }else{
    scaler = 0.61;
 }
}

void keyPressed() {
  if (key == 'z') {scaler -= 0.1;} // smaller
  if (key == 'x') {scaler += 0.1;} // bigger
  if (key == 'c') {scaler = 1;} // reset scale
}
 
 // Called every time a new frame is available to read
void movieEvent(Movie m) {
  m.read();
}